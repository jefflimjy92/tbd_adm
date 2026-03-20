function Label() {
  return (
    <div className="content-stretch flex h-[15.998px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#62748e] text-[12px]">접수 유형</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">방문 미팅</p>
    </div>
  );
}

function Field() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[39.985px] items-start left-0 top-0 w-[208.411px]" data-name="Field">
      <Label />
      <Container />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[15.998px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#62748e] text-[12px]">접수 일자</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">2026-01-20 14:00</p>
    </div>
  );
}

function Field1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[39.985px] items-start left-[224.41px] top-0 w-[208.411px]" data-name="Field">
      <Label1 />
      <Container1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[15.998px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#62748e] text-[12px]">처리 상태</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#0f766e] text-[14px] top-[0.39px] tracking-[-0.1504px]">진행 중</p>
    </div>
  );
}

function Field2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[39.985px] items-start left-[448.82px] top-0 w-[208.411px]" data-name="Field">
      <Label2 />
      <Container2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex h-[15.998px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#62748e] text-[12px]">담당자</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">최미팅</p>
    </div>
  );
}

function Field3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[39.985px] items-start left-[673.23px] top-0 w-[208.421px]" data-name="Field">
      <Label3 />
      <Container3 />
    </div>
  );
}

export function RequestInfoFields() {
  return (
    <div className="relative h-[39.985px] w-full" data-name="Container">
      <Field />
      <Field1 />
      <Field2 />
      <Field3 />
    </div>
  );
}
