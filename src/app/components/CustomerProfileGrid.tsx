import svgPaths from "@/imports/svg-eiup7kum5t";

function Icon() {
  return (
    <div className="absolute left-0 size-[13.996px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9958 13.9958">
        <g clipPath="url(#clip0_165_4685)" id="Icon">
          <path d={svgPaths.pe9c7900} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          <path d={svgPaths.p1afe7000} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
        </g>
        <defs>
          <clipPath id="clip0_165_4685">
            <rect fill="white" height="13.9958" width="13.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[97.213px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px] whitespace-nowrap">고객 프로필 요약</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[9.99px] size-[15.998px] top-[3.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g clipPath="url(#clip0_165_4681)" id="Icon">
          <path d={svgPaths.p1a4a400} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
          <path d={svgPaths.p23665580} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
        <defs>
          <clipPath id="clip0_165_4681">
            <rect fill="white" height="15.9983" width="15.9983" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[23.997px] relative rounded-[8px] shrink-0 w-[66.732px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[46.48px] not-italic text-[#90a1b9] text-[12px] text-center top-[4.69px] translate-x-[-50%] whitespace-nowrap">수정</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[23.997px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Label />
          <Button />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[1.992px] items-start pl-[9.385px] rounded-[6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="h-[10.002px] relative shrink-0 w-full" data-name="Text">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">{label}</p>
        </div>
      </div>
      <div className="h-[15.998px] relative shrink-0 w-full" data-name="Text">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileGrid() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[10px] p-4 pb-5" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="grid grid-cols-6 gap-x-4 gap-y-5 relative">
        <ProfileField label="나이" value="-" />
        <ProfileField label="성별" value="여" />
        <ProfileField label="지역" value="경기 (남부)" />
        <ProfileField label="3개월 내 병력" value="-" />
        <ProfileField label="계약자 피보험자 상이" value="-" />
        <ProfileField label="5년 이내 3대질환 병력" value="-" />
        
        <ProfileField label="설계사 관계" value="-" />
        <ProfileField label="보험가입금액" value="-" />
        <ProfileField label="보험가입 종류" value="방문 미팅" />
        <ProfileField label="환급 가능 금액" value="150" />
        <ProfileField label="보험분쟁 유무" value="-" />
        <ProfileField label="결정권자 여부" value="-" />
        
        <ProfileField label="가족 연동 수" value="-" />
        <ProfileField label="가족력" value="-" />
        <ProfileField label="혼인여부" value="-" />
        <ProfileField label="보험 해지이력" value="-" />
        <ProfileField label="수술 이력" value="-" />
        <ProfileField label="법률 서비스 경험 유무" value="-" />
      </div>
    </div>
  );
}

export function CustomerProfileGrid() {
  return (
    <div className="flex flex-col gap-2 w-full" data-name="Container">
      <Container />
      <ProfileGrid />
    </div>
  );
}