import svgPaths from "./svg-eiup7kum5t";

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
        <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px]">고객 프로필 요약</p>
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
        <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[46.48px] not-italic text-[#90a1b9] text-[12px] text-center top-[4.69px] translate-x-[-50%]">수정</p>
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

function Text() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">나이</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[12.69px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">성별</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">여</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[156.72px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">지역</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">경기 (남부)</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[300.77px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">3개월 내 병력</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[444.82px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">계약자 피보험자 상이</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[588.86px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">5년 이내 3대질환 병력</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[732.91px] pl-[9.385px] rounded-[6px] top-[12.69px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">설계사 관계</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[12.69px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험가입금액</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[156.72px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text14 />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험가입 종류</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">방문 미팅</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[300.77px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">환급 가능 금액</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">150</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[444.82px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text18 />
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험분쟁 유무</p>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[588.86px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text20 />
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">결정권자 여부</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[732.91px] pl-[9.385px] rounded-[6px] top-[52.67px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">가족 연동 수</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[12.69px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text24 />
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">가족력</p>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[156.72px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">혼인여부</p>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[300.77px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text28 />
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험 해지이력</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.655px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[444.82px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.04px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text30 />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">수술 이력</p>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[588.86px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text32 />
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">법률 서비스 경험 유무</p>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[126.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.992px] h-[27.992px] items-start left-[732.91px] pl-[9.385px] rounded-[6px] top-[92.66px] w-[136.05px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Text34 />
      <Text35 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#f8fafc] h-[133.333px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

export default function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[7.999px] items-start relative size-full" data-name="Container">
      <Container />
      <Container19 />
    </div>
  );
}