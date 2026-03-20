#!/usr/bin/env python3
"""Generate app mock bundle + full exports from intake_case_master_latest.xlsx."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Tuple

import pandas as pd

MEETING_ALLOWED = {
    "가망 고객",
    "미팅 확정",
    "미팅 완료",
    "후속 진행",
    "보험 재심사",
    "2차 미팅",
    "계약완료",
    "계약실패",
    "현장불가",
    "미팅취소",
    "노쇼",
    "인수 불가",
    "청약 철회/해지",
}

CLAIM_ALLOWED = {
    "접수완료",
    "상담완료",
    "분석중",
    "서류확정",
    "운영전송대기",
    "운영진행중",
    "보완요청",
    "지급심사",
    "지급완료",
    "완료",
}

TERMINAL_MEETING_STATUSES = {"계약완료", "계약실패", "현장불가", "미팅취소", "노쇼", "인수 불가", "청약 철회/해지"}

INSURANCE_KEYWORDS = [
    ("삼성", "삼성화재"),
    ("kb", "KB손해보험"),
    ("db", "DB손해보험"),
    ("메리츠", "메리츠화재"),
    ("현대", "현대해상"),
    ("한화", "한화손해보험"),
    ("흥국", "흥국화재"),
    ("nh", "NH농협손해보험"),
    ("농협", "NH농협손해보험"),
]


@dataclass
class ContractPrimary:
    contract_date: str
    product_code: str
    insurance_raw: str
    status_code: str
    status: str


def clean_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, float) and pd.isna(value):
        return ""
    text = str(value).strip()
    if text.lower() in {"", "nan", "none", "nat"}:
        return ""
    return text


def normalize_token(value: Any) -> str:
    text = clean_text(value)
    text = re.sub(r"[^0-9A-Za-z]+", "", text)
    return text.upper()


def pick_first(row: pd.Series, keys: List[str], default: str = "") -> str:
    for key in keys:
        if key in row.index:
            text = clean_text(row.get(key, ""))
            if text:
                return text
    return default


def parse_datetime(value: Any) -> pd.Timestamp | None:
    text = clean_text(value)
    if not text:
        return None
    parsed = pd.to_datetime(text, errors="coerce")
    if pd.isna(parsed):
        return None
    return parsed


def to_date_str(value: Any, fallback: str = "2026-01-01") -> str:
    parsed = parse_datetime(value)
    return parsed.strftime("%Y-%m-%d") if parsed is not None else fallback


def to_datetime_str(value: Any, fallback: str = "2026-01-01 10:00") -> str:
    parsed = parse_datetime(value)
    return parsed.strftime("%Y-%m-%d %H:%M") if parsed is not None else fallback


def normalize_time_text(value: Any, fallback: str = "10:00") -> str:
    text = clean_text(value)
    if not text:
        return fallback
    match = re.search(r"(\d{1,2}):(\d{2})", text)
    if not match:
        return fallback
    hh = int(match.group(1))
    mm = int(match.group(2))
    if hh < 0 or hh > 23 or mm < 0 or mm > 59:
        return fallback
    return f"{hh:02d}:{mm:02d}"


def to_int(value: Any, default: int = 0) -> int:
    text = clean_text(value).replace(",", "")
    if not text:
        return default
    match = re.search(r"-?\d+", text)
    return int(match.group()) if match else default


def canonical_insurance(raw_value: Any) -> str:
    raw = clean_text(raw_value)
    if not raw:
        return "미확인"
    low = raw.lower().replace(" ", "")
    for key, canonical in INSURANCE_KEYWORDS:
        if key in low or key in raw:
            return canonical
    if re.search(r"[가-힣]", raw) and len(raw) <= 24:
        return raw
    return "미확인"


def normalize_birth(row: pd.Series) -> str:
    birth = clean_text(row.get("생년월일", ""))
    if birth:
        return birth
    rrn = clean_text(row.get("주민번호", ""))
    match = re.match(r"^(\d{6})[- ]?\d+", rrn)
    if match:
        return f"{match.group(1)}-******"
    return ""


def normalize_gender(value: Any) -> str:
    text = clean_text(value)
    if text in {"남", "남자", "남성"}:
        return "남"
    if text in {"여", "여자", "여성"}:
        return "여"
    return text


def derive_request_type(row: pd.Series) -> str:
    consult_norm = clean_text(row.get("상담 구분 정규화", "")).lower()
    consult_raw = clean_text(row.get("상담 구분 raw", "")).lower()
    refund = clean_text(row.get("환급신청", "")).lower()

    if "보상" in consult_norm or "보상" in consult_raw:
        return "간편 청구"
    if "가능" in consult_norm or "환급" in consult_norm:
        return "3년 환급"
    if "환급" in consult_raw:
        return "3년 환급"
    if refund and refund not in {"0", "x", "n", "no", "false", "없음", "미신청", "미동의"}:
        return "3년 환급"
    return "간편 청구"


def normalize_consultation(raw_status: str) -> Tuple[str, str]:
    status_text = clean_text(raw_status)
    if not status_text:
        return "진행중", "-"
    if "대기" in status_text:
        return "대기", "-"
    if any(token in status_text for token in ["인계완료", "계약완료", "미팅확정", "미팅인지 완료", "1차상담완료"]):
        return "완료", "성공"
    if "부재" in status_text:
        return "진행중", "부재"
    if any(token in status_text for token in ["계약불가", "계약실패", "반송"]):
        return "취소", "실패"
    if "진행중" in status_text:
        return "진행중", "-"
    return "진행중", "-"


def normalize_meeting_status(row: pd.Series, request_type: str) -> str:
    bucket = clean_text(row.get("미팅/계약 bucket", ""))
    raw_status = clean_text(row.get("미팅 처리상태", ""))
    raw_code = clean_text(row.get("미팅 처리상태 코드", "")).upper()
    reason = " ".join(
        [
            clean_text(row.get("미팅/계약 사유", "")),
            clean_text(row.get("미팅/계약 사유 상세", "")),
            clean_text(row.get("특이사항", "")),
        ]
    )
    meeting_count = to_int(row.get("미팅 일정 수", ""), 0)
    contract_count = to_int(row.get("계약 행 수", ""), 0)
    mixed_text = " ".join([bucket, raw_status, raw_code, reason])

    if "계약완료" in mixed_text:
        normalized = "계약완료"
    elif "철회" in mixed_text:
        normalized = "청약 철회/해지"
    elif any(token in mixed_text for token in ["장기부재", "부재"]):
        normalized = "노쇼"
    elif "미팅취소" in mixed_text or ("취소" in mixed_text and "미팅" in mixed_text):
        normalized = "미팅취소"
    elif any(token in mixed_text for token in ["인수불가", "심사거절", "uw", "언더라이팅"]):
        normalized = "인수 불가"
    elif any(token in mixed_text for token in ["계약불가", "현장불가", "고객문제"]):
        normalized = "현장불가"
    elif any(token in mixed_text for token in ["계약실패", "역량부족"]):
        normalized = "계약실패"
    elif "배정" in bucket or "미팅확정" in raw_status:
        normalized = "미팅 확정"
    elif "진행중" in mixed_text:
        normalized = "미팅 완료"
    elif "대기" in mixed_text or raw_code == "F":
        normalized = "가망 고객"
    else:
        normalized = "가망 고객"

    if normalized == "미팅 완료":
        if meeting_count >= 2:
            normalized = "2차 미팅"
        elif contract_count == 0 and "보험 미납" in reason:
            normalized = "후속 진행"
        elif request_type == "간편 청구" and contract_count == 0:
            consult_hint = clean_text(row.get("상담 구분 정규화", "")) + clean_text(row.get("상담 구분 raw", ""))
            if "보상" in consult_hint:
                normalized = "후속 진행"

    if normalized not in MEETING_ALLOWED:
        return "가망 고객"
    return normalized


def meeting_status_group(status: str) -> str:
    if status == "계약완료":
        return "WON"
    if status in {"계약실패", "현장불가", "미팅취소", "노쇼", "인수 불가", "청약 철회/해지"}:
        return "LOST"
    if status in {"미팅 완료", "후속 진행", "보험 재심사", "2차 미팅"}:
        return "NEGOTIATING"
    return "PENDING"


def schedule_status_from_meeting(status: str) -> str:
    if status == "미팅 확정":
        return "scheduled"
    if status in {"미팅 완료", "후속 진행", "보험 재심사", "2차 미팅", "계약완료"}:
        return "completed"
    if status in {"계약실패", "현장불가", "미팅취소", "노쇼", "인수 불가", "청약 철회/해지"}:
        return "cancelled"
    return "rescheduled"


def extract_primary_contract(row: pd.Series) -> ContractPrimary:
    for idx in range(1, 18):
        contract_date = clean_text(row.get(f"계약{idx}_계약일", ""))
        product_code = clean_text(row.get(f"계약{idx}_상품코드", ""))
        insurance_raw = clean_text(row.get(f"계약{idx}_보험사", ""))
        status_code = clean_text(row.get(f"계약{idx}_상태코드", "")).upper()
        status = clean_text(row.get(f"계약{idx}_상태", ""))
        if any([contract_date, product_code, insurance_raw, status_code, status]):
            return ContractPrimary(
                contract_date=contract_date,
                product_code=product_code,
                insurance_raw=insurance_raw,
                status_code=status_code,
                status=status,
            )
    return ContractPrimary(contract_date="", product_code="", insurance_raw="", status_code="", status="")


def normalize_claim_status(primary: ContractPrimary, meeting_status: str) -> str:
    status_code = clean_text(primary.status_code).upper()
    status_text = clean_text(primary.status)

    if status_code == "A" or "코드 A" in status_text:
        normalized = "완료"
    elif status_code == "B" or "코드 B" in status_text:
        normalized = "보완요청"
    elif meeting_status in {"미팅 완료", "후속 진행", "보험 재심사", "2차 미팅"}:
        normalized = "분석중"
    else:
        normalized = "접수완료"

    if normalized not in CLAIM_ALLOWED:
        return "접수완료"
    return normalized


def derive_customer_status(consult_status: str, consult_result: str, meeting_status: str, claim_status: str | None) -> str:
    if claim_status in {"완료", "지급완료"}:
        return "완료"
    if claim_status:
        return "청구중"
    if meeting_status == "미팅 확정":
        return "미팅예정"
    if meeting_status in {"미팅 완료", "후속 진행", "보험 재심사", "2차 미팅", "가망 고객"}:
        return "미팅중"
    if meeting_status in TERMINAL_MEETING_STATUSES:
        return "종료"
    if consult_status == "대기":
        return "대기"
    if consult_result == "부재":
        return "재콜"
    if consult_status == "완료":
        return "미팅연결"
    if consult_status == "취소":
        return "종료"
    return "상담중"


def ensure_unique_id(prefix: str, base_token: str, seen: Dict[str, int], fallback_seq: int) -> str:
    token = normalize_token(base_token)
    if not token:
        token = f"ROW{fallback_seq:05d}"
    key = f"{prefix}-{token}"
    seq = seen.get(key, 0)
    seen[key] = seq + 1
    if seq == 0:
        return key
    return f"{key}-{seq + 1}"


def safe_manager(row: pd.Series) -> str:
    return pick_first(row, ["상담 담당자", "미팅 담당자"], default="미배정")


def safe_address(row: pd.Series) -> str:
    return pick_first(row, ["지역", "미팅지역", "방문지역", "미팅1_지역"], default="미확인")


def derive_meeting_datetime(row: pd.Series, request_date: str) -> str:
    meeting_date = pick_first(row, ["미팅일", "미팅1_날짜", "방문일자"], default=request_date)
    meeting_date = to_date_str(meeting_date, fallback=request_date)
    meeting_time = normalize_time_text(pick_first(row, ["미팅1_시간", "방문시간"], default="10:00"), fallback="10:00")
    return f"{meeting_date} {meeting_time}"


def build_bundle(df: pd.DataFrame, app_limit: int) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:
    request_seen: Dict[str, int] = {}

    customers: List[Dict[str, Any]] = []
    requests: List[Dict[str, Any]] = []
    consultations: List[Dict[str, Any]] = []
    meetings: List[Dict[str, Any]] = []
    meeting_execution_queue: List[Dict[str, Any]] = []
    claims_queue: List[Dict[str, Any]] = []
    request_rows: List[Dict[str, Any]] = []
    full_records: List[Dict[str, Any]] = []

    claim_seq = 0

    for idx, (_, row) in enumerate(df.iterrows(), start=1):
        base_key = pick_first(row, ["리드ID", "WR_ID"], default=f"ROW{idx:05d}")
        request_id = ensure_unique_id("R", base_key, request_seen, idx)
        customer_id = f"C-{request_id[2:]}"

        request_type = derive_request_type(row)
        category = "refund" if request_type == "3년 환급" else "simple"

        received_at = to_datetime_str(pick_first(row, ["접수일시", "원문 접수일자"], default="2026-01-01 10:00"))
        request_date = received_at[:10]

        consultation_raw = clean_text(row.get("상담 처리상태", ""))
        consultation_status, consultation_result = normalize_consultation(consultation_raw)
        consultation_manager = safe_manager(row)
        consultation_content = pick_first(
            row,
            ["상담 사유 상세", "상담 사유", "문의내용 원문", "제목", "추가메모 원문"],
            default="상담 메모 없음",
        )

        meeting_status = normalize_meeting_status(row, request_type)
        meeting_datetime = derive_meeting_datetime(row, request_date)
        meeting_location = safe_address(row)

        primary_contract = extract_primary_contract(row)
        contract_count = max(to_int(row.get("계약 행 수", ""), 0), 1 if any([primary_contract.status_code, primary_contract.status, primary_contract.insurance_raw, primary_contract.product_code]) else 0)

        has_claim = contract_count > 0
        claim_status = normalize_claim_status(primary_contract, meeting_status) if has_claim else None
        if has_claim:
            claim_seq += 1

        customer_name = pick_first(row, ["고객명"], default=f"고객{idx}")
        customer_phone = pick_first(row, ["연락처"], default="")
        customer_birth = normalize_birth(row)
        customer_gender = normalize_gender(row.get("성별", ""))
        customer_age = clean_text(row.get("연령대", ""))
        customer_occupation = clean_text(row.get("직업", ""))
        customer_address = meeting_location
        customer_manager = consultation_manager
        customer_status = derive_customer_status(consultation_status, consultation_result, meeting_status, claim_status)

        insurance = canonical_insurance(primary_contract.insurance_raw)
        product_code = primary_contract.product_code or ""

        stage: str
        row_status: str
        team: str
        if has_claim and claim_status:
            stage = "종료" if claim_status in {"완료", "지급완료"} else "청구"
            row_status = claim_status
            team = "-" if stage == "종료" else "청구팀"
        else:
            stage = "종료" if meeting_status in TERMINAL_MEETING_STATUSES else "미팅"
            row_status = meeting_status
            team = "미팅팀"

        full_records.append(
            {
                "requestId": request_id,
                "customerId": customer_id,
                "wrId": clean_text(row.get("WR_ID", "")),
                "leadId": clean_text(row.get("리드ID", "")),
                "receivedAt": received_at,
                "requestDate": request_date,
                "requestType": request_type,
                "category": category,
                "customerName": customer_name,
                "phone": customer_phone,
                "birth": customer_birth,
                "gender": customer_gender,
                "age": customer_age,
                "occupation": customer_occupation,
                "address": customer_address,
                "consultationStatusRaw": consultation_raw,
                "consultationStatus": consultation_status,
                "consultationResult": consultation_result,
                "consultationManager": consultation_manager,
                "consultationReason": consultation_content,
                "meetingStatusRaw": clean_text(row.get("미팅 처리상태", "")),
                "meetingStatus": meeting_status,
                "meetingManager": clean_text(row.get("미팅 담당자", "")) or consultation_manager,
                "meetingDateTime": meeting_datetime,
                "meetingLocation": meeting_location,
                "meetingReason": pick_first(row, ["미팅/계약 사유 상세", "미팅/계약 사유", "특이사항"], default=""),
                "contractCount": contract_count,
                "claimStatus": claim_status or "",
                "insurance": insurance,
                "productCode": product_code,
                "stage": stage,
                "status": row_status,
                "team": team,
                "manager": customer_manager,
            }
        )

        if idx > app_limit:
            continue

        customers.append(
            {
                "id": customer_id,
                "name": customer_name,
                "phone": customer_phone,
                "address": customer_address,
                "birth": customer_birth,
                "manager": customer_manager,
                "status": customer_status,
                "age": customer_age,
                "gender": customer_gender,
                "occupation": customer_occupation,
            }
        )

        requests.append(
            {
                "id": request_id,
                "customerId": customer_id,
                "type": request_type,
                "date": request_date,
            }
        )

        consultations.append(
            {
                "id": f"CS-{idx:05d}",
                "requestId": request_id,
                "customerId": customer_id,
                "customerName": customer_name,
                "date": request_date,
                "status": consultation_status,
                "result": consultation_result,
                "content": consultation_content,
                "manager": consultation_manager,
            }
        )

        meetings.append(
            {
                "id": f"M-{idx:05d}",
                "customerId": customer_id,
                "date": meeting_datetime[:10],
                "time": meeting_datetime[11:],
                "status": schedule_status_from_meeting(meeting_status),
                "manager": clean_text(row.get("미팅 담당자", "")) or consultation_manager,
                "location": meeting_location,
                "type": "방문 미팅" if clean_text(row.get("방문동의", "")).lower() in {"o", "y", "1", "예", "동의"} else "대면 미팅",
            }
        )

        meeting_execution_queue.append(
            {
                "id": f"E-2026-{idx:05d}",
                "requestId": request_id,
                "customerId": customer_id,
                "customer": customer_name,
                "type": request_type,
                "category": category,
                "date": meeting_datetime,
                "status": meeting_status,
                "statusGroup": meeting_status_group(meeting_status),
                "location": meeting_location,
                "manager": clean_text(row.get("미팅 담당자", "")) or consultation_manager,
                "phone": customer_phone,
                "birth": customer_birth,
                "gender": customer_gender,
                "address": customer_address,
                "consultationSummary": pick_first(row, ["미팅/계약 사유 상세", "미팅/계약 사유", "특이사항", "상담 사유 상세"], default="미팅 메모 없음"),
                "consultation": {
                    "criticalDisease": clean_text(row.get("암/뇌/심 질환", "")) or None,
                    "medicalHistory": clean_text(row.get("중대질환 관련 메모", "")) or None,
                },
                "analysis": {
                    "surgeryHistory": pick_first(row, ["수술/시술 이력", "용종 이력"], default="") or None,
                    "familyHistory": clean_text(row.get("피보험자", "")) or None,
                },
            }
        )

        if has_claim and claim_status:
            claims_queue.append(
                {
                    "id": f"CLM-2026-{claim_seq:05d}",
                    "requestId": request_id,
                    "customer": customer_name,
                    "type": request_type,
                    "category": category,
                    "date": to_date_str(primary_contract.contract_date, fallback=request_date),
                    "status": claim_status,
                    "insurance": insurance,
                    "phone": customer_phone,
                    "birth": customer_birth,
                }
            )

        request_rows.append(
            {
                "id": request_id,
                "type": request_type,
                "customer": customer_name,
                "date": request_date,
                "stage": stage,
                "status": row_status,
                "team": team,
                "manager": customer_manager,
            }
        )

    bundle = {
        "customers": customers,
        "requests": requests,
        "consultations": consultations,
        "meetings": meetings,
        "meetingExecutionQueue": meeting_execution_queue,
        "claimsQueue": claims_queue,
        "requestRows": request_rows,
    }
    return bundle, full_records


def write_ts_bundle(bundle: Dict[str, Any], output_path: Path, source_path: Path, app_limit: int, total_rows: int) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(bundle, ensure_ascii=False, indent=2)
    content = (
        "/* eslint-disable */\n"
        "// Auto-generated by tools/generate_intake_dummy.py\n"
        f"// Source: {source_path}\n"
        f"// Generated at: {datetime.now().isoformat(timespec='seconds')}\n"
        f"// App rows: {app_limit} / Total rows: {total_rows}\n\n"
        f"export const CUSTOMER_MASTER_DERIVED_MOCK = {payload};\n"
    )
    output_path.write_text(content, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate intake_case_master_latest based dummy data")
    parser.add_argument("--input", required=True, help="Path to source xlsx")
    parser.add_argument("--app-limit", type=int, default=2000, help="Rows to include in app TS bundle")
    parser.add_argument("--app-ts-out", required=True, help="Output path for app TS bundle")
    parser.add_argument("--full-json-out", required=True, help="Output path for full JSON")
    parser.add_argument("--full-csv-out", required=True, help="Output path for full CSV")
    args = parser.parse_args()

    source_path = Path(args.input)
    if not source_path.exists():
        raise FileNotFoundError(f"Input file not found: {source_path}")

    df = pd.read_excel(source_path, sheet_name="접수건마스터")

    sort_dt = pd.to_datetime(df.get("접수일시"), errors="coerce")
    if "원문 접수일자" in df.columns:
        fallback = pd.to_datetime(df.get("원문 접수일자"), errors="coerce")
        sort_dt = sort_dt.fillna(fallback)
    df = df.assign(_sort_dt=sort_dt.fillna(pd.Timestamp("1970-01-01")))
    df = df.sort_values("_sort_dt", ascending=False).drop(columns=["_sort_dt"]).reset_index(drop=True)

    app_limit = min(max(args.app_limit, 1), len(df))
    bundle, full_records = build_bundle(df, app_limit=app_limit)

    full_json_path = Path(args.full_json_out)
    full_csv_path = Path(args.full_csv_out)
    app_ts_path = Path(args.app_ts_out)

    full_json_path.parent.mkdir(parents=True, exist_ok=True)
    full_csv_path.parent.mkdir(parents=True, exist_ok=True)

    full_json_path.write_text(json.dumps(full_records, ensure_ascii=False, indent=2), encoding="utf-8")
    pd.DataFrame(full_records).to_csv(full_csv_path, index=False, encoding="utf-8-sig")
    write_ts_bundle(bundle, app_ts_path, source_path, app_limit=app_limit, total_rows=len(df))

    required_nulls = {
        "requests.id": sum(1 for row in bundle["requests"] if not clean_text(row.get("id"))),
        "requests.customerId": sum(1 for row in bundle["requests"] if not clean_text(row.get("customerId"))),
        "meetingExecutionQueue.requestId": sum(1 for row in bundle["meetingExecutionQueue"] if not clean_text(row.get("requestId"))),
        "meetingExecutionQueue.status": sum(1 for row in bundle["meetingExecutionQueue"] if not clean_text(row.get("status"))),
    }

    print("[generate_intake_dummy] completed")
    print(f"- source rows: {len(df)}")
    print(f"- app rows: {len(bundle['requests'])}")
    print(f"- customers: {len(bundle['customers'])}")
    print(f"- consultations: {len(bundle['consultations'])}")
    print(f"- meetingExecutionQueue: {len(bundle['meetingExecutionQueue'])}")
    print(f"- claimsQueue: {len(bundle['claimsQueue'])}")
    print(f"- requestRows: {len(bundle['requestRows'])}")
    print(f"- full json: {full_json_path}")
    print(f"- full csv: {full_csv_path}")
    print(f"- app ts: {app_ts_path}")
    print(f"- required null counts: {required_nulls}")


if __name__ == "__main__":
    main()
