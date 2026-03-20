# Deobada Admin MVP Git Package

`Deobada Admin MVP Git Package`는 현재 로컬에서 정상 동작한 어드민을 기준으로, `Downloads` 폴더에 새로 정리한 Git 업로드용 패키지입니다.

## 위치

- `/Users/joonyounglim/Downloads/Deobada_Admin_MVP_git_ready_20260320`

## 정리 기준

- 현재 동작 중인 패키지 기준으로 복사
- `통합 워크벤치` 제외
- `상담 처리 V2` 제외
- Git에 올리기 쉽게 `.git`, `node_modules`, `dist`, 실행 캐시 제외
- 앱 실행에 필요한 mock/in-memory 데이터 포함

## 포함된 더미데이터

실행용 mock 데이터와 대용량 생성 결과까지 같이 넣었습니다.

- `src/app/mockData.ts`
- `src/app/journey/mockJourneys.ts`
- `src/app/mockData/issuanceMock.ts`
- `src/app/mockData/generated/customerMasterDerived.generated.ts`
- `src/app/mockData/generated/intake_case_master_latest.full.json`
- `src/app/mockData/generated/intake_case_master_latest.full.csv`
- `intake_case_master_latest.xlsx`
- `tools/generate_intake_dummy.py`

즉, 지금 폴더만으로도:

- 현재 어드민 화면 실행
- 포함된 더미데이터 기반 검토
- 더미데이터 재생성

까지 가능한 상태로 정리했습니다.

## 실행 방법

```bash
cd "/Users/joonyounglim/Downloads/Deobada_Admin_MVP_git_ready_20260320"
npm install
npm run dev:local
```

같은 로컬 네트워크에서 열려면:

```bash
npm run dev:network
```

## 빌드 확인

```bash
npm run build
npm run preview
```

## 더미데이터 재생성

```bash
npm run generate:intake-dummy
```

## Git 업로드 순서

```bash
cd "/Users/joonyounglim/Downloads/Deobada_Admin_MVP_git_ready_20260320"
git init
git add .
git commit -m "Initial packaged admin MVP"
```

그 다음 원격 저장소 연결 후 직접 push 하면 됩니다.

## 참고

- 이 패키지는 실데이터 API 없이 mock/in-memory 중심으로 동작합니다.
- 더미데이터를 포함했기 때문에 일반 소스 패키지보다 용량이 큽니다.
- `node_modules`와 `dist`는 `.gitignore`로 제외되어 Git 업로드 시 같이 올라가지 않습니다.
