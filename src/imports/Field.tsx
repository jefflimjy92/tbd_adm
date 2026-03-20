import svgPaths from "./svg-hz2gb4p2c4";

function Icon() {
  return (
    <div className="absolute left-0 size-[13.996px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9958 13.9958">
        <g clipPath="url(#clip0_165_4717)" id="Icon">
          <path d={svgPaths.p13408d80} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          <path d={svgPaths.p35473f00} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
        </g>
        <defs>
          <clipPath id="clip0_165_4717">
            <rect fill="white" height="13.9958" width="13.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Label">
      <Icon />
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px]">주소(방문지역)</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">경기 성남시 분당구 판교역로 123</p>
    </div>
  );
}

export default function Field() {
  return (
    <div className="content-stretch flex flex-col gap-[3.994px] items-start relative size-full" data-name="Field">
      <Label />
      <Container />
    </div>
  );
}