import svgPaths from "./svg-lstkna3oni";
import clsx from "clsx";
import imgMicrosoftExcel from "figma:asset/ae330b18682ac91130a51ee7fc9c7d38eafc4058.png";

function Helper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative shrink-0 w-[980px]">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-0 py-[8px] relative rounded-[inherit] w-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type Text12Props = {
  text: string;
};

function Text12({ text }: Text12Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center overflow-clip pl-[24px] pr-0 py-[8px] relative rounded-[inherit] w-full">
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">{children}</p>
      </div>
    </div>
  );
}
type Text11Props = {
  text: string;
};

function Text11({ text }: Text11Props) {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text10Props = {
  text: string;
};

function Text10({ text }: Text10Props) {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text9Props = {
  text: string;
};

function Text9({ text }: Text9Props) {
  return (
    <div className="bg-[#ffffe4] content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[162px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text8Props = {
  text: string;
};

function Text8({ text }: Text8Props) {
  return (
    <div className="bg-[#ffffe4] content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text7Props = {
  text: string;
};

function Text7({ text }: Text7Props) {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">{text}</p>
    </div>
  );
}
type Text6Props = {
  text: string;
};

function Text6({ text }: Text6Props) {
  return (
    <div className="bg-white content-stretch flex h-[35px] items-center justify-center p-[8px] relative shrink-0 w-[99px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111] text-[12px] text-nowrap">{text}</p>
    </div>
  );
}
type Text5Props = {
  text: string;
};

function Text5({ text }: Text5Props) {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text4Props = {
  text: string;
  additionalClassNames?: string;
};

function Text4({ text, additionalClassNames = "" }: Text4Props) {
  return (
    <div className={clsx("bg-[#f4f4f4] content-stretch flex items-center justify-center p-[8px] relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">{text}</p>
    </div>
  );
}
type Text3Props = {
  text: string;
};

function Text3({ text }: Text3Props) {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex items-center justify-center px-[16px] py-[4px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}

function MdiCalendarOutline() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="mdi:calendar-outline">
          <path d={svgPaths.p20ce1100} fill="var(--fill-0, #E1E1E1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type Text2Props = {
  text: string;
};

function Text2({ text }: Text2Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black text-nowrap tracking-[-0.5px]">
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}

function Helper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex h-[7px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "6.3125", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative text-[#e1e1e1] text-[12px] text-nowrap tracking-[-0.6px]">
            <p className="leading-[18px]">{`>`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Helper additionalClassNames="size-[12px]" />
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return <Wrapper>{text}</Wrapper>;
}

function Component1() {
  return (
    <div className="bg-[#f4f4f4] relative shrink-0 w-[279px]" data-name="기준2">
      <Text text="고객 구분" />
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component2() {
  return (
    <div className="bg-[#f4f4f4] relative shrink-0 w-[279px]" data-name="기준2">
      <Wrapper>{` 기간`}</Wrapper>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component8() {
  return (
    <div className="bg-[#f4f4f4] relative shrink-0 w-[279px]" data-name="기준2">
      <Text text="검색" />
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[279px]" data-name="구분">
      <Component1 />
      <Component2 />
      <Component8 />
    </div>
  );
}

function Component9() {
  return (
    <div className="bg-white relative shrink-0 w-[980px]" data-name="구분값">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-0 py-[8px] relative rounded-[inherit] w-full">
        <Text1 text="가망 고객" />
        <Text1 text="유효 고객" />
        <Text1 text="계약 고객" />
        <Text1 text="종결 고객" />
        <Text1 text="?" />
        <Text1 text="재방문 고객" />
      </div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[1px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center pl-[8px] pr-[4px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Text12 text="가입일자" />
      <Helper1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Text2 text="2025-01-31" />
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="항목1">
      <MdiCalendarOutline />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center px-[2px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Component10 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Text2 text="2025-03-31" />
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="항목1">
      <MdiCalendarOutline />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-center px-[2px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Component11 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Text2 text="오늘" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="1주" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="15일" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="1개월" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="3개월" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="6개월" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px_0.75px_0.75px_0px] border-solid inset-0 pointer-events-none" />
      <Text2 text="1년" />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame13 />
      <Frame14 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Component12() {
  return (
    <Helper2>
      <Frame />
      <Frame10 />
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">~</p>
      </div>
      <Frame3 />
      <Frame15 />
    </Helper2>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center pl-[8px] pr-[4px] py-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Text12 text="고객명" />
      <Helper1 />
    </div>
  );
}

function Component13() {
  return (
    <Helper2>
      <Frame16 />
      <Helper additionalClassNames="h-[18px] w-[446px]" />
    </Helper2>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[980px]" data-name="항목값">
      <Component9 />
      <Component12 />
      <Component13 />
    </div>
  );
}

function Component15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="필터">
      <Component />
      <Component14 />
    </div>
  );
}

function Component16() {
  return (
    <div className="bg-white relative shrink-0 w-[1259px]" data-name="구분값">
      <div className="content-stretch flex gap-[16px] items-center justify-center overflow-clip pl-[8px] pr-0 py-[8px] relative rounded-[inherit] w-full">
        <Text3 text="검색" />
        <Text3 text="초기화" />
      </div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] top-[12px]" data-name="필터">
      <Component15 />
      <Component16 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative shrink-0">
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">
          <span>{`고객 목록 (전체 `}</span>
          <span className="font-['Noto_Sans_KR:Bold',sans-serif] not-italic">nn</span>개)
        </p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-[#22a366] h-[31px] left-[990px] rounded-[8px] top-[5px] w-[130px]">
      <div aria-hidden="true" className="absolute border border-[#22a366] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative size-full">
          <div className="relative shrink-0 size-[27px]" data-name="Microsoft Excel">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgMicrosoftExcel} />
          </div>
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{` 다운로드`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-[#4169e1] h-[31px] left-[1136px] rounded-[8px] top-[5px] w-[87px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white">고객 등록</p>
        </div>
      </div>
    </div>
  );
}

function Component18() {
  return (
    <div className="absolute bg-white left-[12px] top-[176px] w-[1242px]" data-name="구분값">
      <div className="content-stretch flex gap-[16px] items-center overflow-clip pl-[8px] pr-0 py-[8px] relative rounded-[inherit] w-full">
        <Frame20 />
        <Frame18 />
        <Frame17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-bl-[8px] shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none rounded-bl-[8px]" />
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111] text-[16px] text-nowrap">가망</p>
    </div>
  );
}

function Component19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="2고객구분">
      <Text4 text="고객 구분" additionalClassNames="w-[120px]" />
      <Text5 text="가망" />
      <Text5 text="유효" />
      <Text5 text="계약" />
      <Text5 text="계약" />
      <Text5 text="종결" />
      <Text5 text="종결" />
      <Text5 text="종결" />
      <Text5 text="계약" />
      <Text5 text="가망" />
      <Text5 text="가망" />
      <Text5 text="가망" />
      <Text5 text="계약" />
      <Text5 text="종결" />
      <Text5 text="재방문" />
      <Frame9 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex h-[35px] items-center justify-center p-[8px] relative shrink-0 w-[99px]">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0.375px_0.75px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap">유입 구분</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="8.등록일">
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[2px_2px_2px_0px] border-solid inset-0 pointer-events-none" />
      <Frame21 />
      <Text6 text="메타환급" />
      {[...Array(2).keys()].map((_, i) => (
        <Text6 text="틱톡10" />
      ))}
      <Text6 text="환급 소개" />
      <Text6 text="네이버 블로그" />
      <Text6 text="메타환급" />
      <Text6 text="메타3년" />
      <Text6 text="메타강사" />
      <Text6 text="틱톡20" />
      <Text6 text="틱톡11" />
      <Text6 text="틱톡12" />
      <Text6 text="틱톡24" />
      <Text6 text="메타12" />
      <Text6 text="틱톡22" />
      <Text6 text="메타12" />
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="4. 이름">
      <Text7 text="고객명" />
      <Text8 text="신하윤" />
      <Text8 text="김서윤" />
      <Text8 text="김지윤" />
      <Text8 text="최수빈" />
      <Text8 text="윤하린" />
      <Text8 text="이하윤" />
      <Text8 text="김지윤" />
      <Text8 text="박서현" />
      <Text8 text="오지윤" />
      <Text8 text="신도윤" />
      <Text8 text="박서현" />
      <Text8 text="윤하린" />
      <Text8 text="최하은" />
      <Text8 text="신하윤" />
      <Text8 text="이하윤" />
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="5. 전화번호">
      <Text4 text="전화번호" additionalClassNames="w-[162px]" />
      <Text9 text="010-1234-5678" />
      <Text9 text="010-2345-8789" />
      <Text9 text="010-1234-5433" />
      <Text9 text="010-2323-2342" />
      <Text9 text="010-2349-2134" />
      <Text9 text="010-8912-2345" />
      <Text9 text="010-2849-2930" />
      <Text9 text="010-8932-2345" />
      <Text9 text="010-9191-8923" />
      <Text9 text="010-2985-9522" />
      <Text9 text="010-2943-2345" />
      <Text9 text="010-3859-1234" />
      <Text9 text="010-3289-2348" />
      <Text9 text="010-2394-5845" />
      <Text9 text="010-2958-6934" />
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="6.생년월일">
      <Text4 text="생년월일" additionalClassNames="w-[120px]" />
      <Text10 text="2023.12.31" />
      <Text10 text="2024.01.10" />
      <Text10 text="2023.10.20" />
      <Text10 text="2023.11.21" />
      <Text10 text="2023.11.29" />
      <Text10 text="2023.08.25" />
      <Text10 text="2023.10.26" />
      <Text10 text="2023.11.05" />
      <Text10 text="2023.11.16" />
      <Text10 text="2023.09.25" />
      <Text10 text="2023.09.11" />
      <Text10 text="2023.12.22" />
      <Text10 text="2023.12.16" />
      <Text10 text="2023.09.02" />
      <Text10 text="2023.11.30" />
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="7.담당자">
      <Text7 text="보험 담당자" />
      <Text11 text="한유준" />
      <Text11 text="최주원" />
      <Text11 text="김지안" />
      <Text11 text="한유준" />
      <Text11 text="김서윤" />
      <Text11 text="신서윤" />
      <Text11 text="이하윤" />
      <Text11 text="신서윤" />
      <Text11 text="박하준" />
      <Text11 text="박서현" />
      <Text11 text="오수아" />
      <Text11 text="박은서" />
      <Text11 text="신서윤" />
      <Text11 text="오지윤" />
      <Text11 text="오민준" />
    </div>
  );
}

function Component20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="8.등록일">
      <Text7 text="보험 연동" />
      <Text10 text="N" />
      <Text10 text="N" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="N" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
      <Text10 text="Y" />
    </div>
  );
}

function Component21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="8.등록일">
      <Text4 text="최초 등록일" additionalClassNames="w-[120px]" />
      <Text10 text="2025.12.31" />
      <Text10 text="2024.01.10" />
      <Text10 text="2025.10.20" />
      <Text10 text="2025.11.21" />
      <Text10 text="2025.11.29" />
      <Text10 text="2025.08.25" />
      <Text10 text="2025.10.26" />
      <Text10 text="2025.11.05" />
      <Text10 text="2025.11.16" />
      <Text10 text="2025.09.25" />
      <Text10 text="2025.09.11" />
      <Text10 text="2025.12.22" />
      <Text10 text="2025.12.16" />
      <Text10 text="2025.09.02" />
      <Text10 text="2025.11.30" />
    </div>
  );
}

function Component22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="8.등록일">
      <Text7 text="최근 방문일" />
      <Text10 text="2024.12.11" />
      {[...Array(14).keys()].map((_, i) => (
        <Text10 text="2025.1.1" />
      ))}
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(177,177,177,0.55)] content-stretch flex items-center justify-center overflow-clip p-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#575757] text-[12px] text-nowrap">관리</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex h-[35px] items-center justify-center p-[8px] relative shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.75px] border-solid inset-0 pointer-events-none" />
      <Frame22 />
    </div>
  );
}

function Component23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="8.등록일">
      <Text7 text="상세" />
      {[...Array(15).keys()].map((_, i) => (
        <Frame23 key={i} />
      ))}
    </div>
  );
}

function Component24() {
  return (
    <div className="absolute content-stretch flex items-start left-[20px] top-[250px]" data-name="테이블">
      <Component19 />
      <Component7 />
      <Component3 />
      <Component4 />
      <Component5 />
      <Component6 />
      <Component20 />
      <Component21 />
      <Component22 />
      <Component23 />
    </div>
  );
}

function Component25() {
  return (
    <div className="absolute bg-[#f4f4f4] h-[880px] left-[160px] overflow-clip top-[144px] w-[1280px]" data-name="리스트">
      <Component17 />
      <Component18 />
      <Component24 />
    </div>
  );
}

function Component26() {
  return (
    <div className="absolute bg-[#f4f4f4] left-0 top-[143px] w-[157px]" data-name="기준1">
      <div className="content-stretch flex items-start overflow-clip pl-[24px] pr-0 py-[8px] relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
          <p className="leading-[18px]">고객 리스트</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component27() {
  return (
    <div className="absolute bg-white left-0 top-[177px] w-[157px]" data-name="기준1">
      <div className="content-stretch flex flex-col gap-[16px] items-start leading-[0] not-italic overflow-clip pl-[24px] pr-0 py-[8px] relative rounded-[inherit] text-[12px] text-black text-nowrap tracking-[-0.6px] w-full">
        <div className="flex flex-col font-['Noto_Sans_KR:Bold',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">전체 리스트</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">접수 리스트</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">~~~ 리스트</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">~~~ 리스트</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">~~~~ 리스트</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center relative shrink-0">
          <p className="leading-[18px] text-nowrap">~~~ 리스트</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[143px]">
      <Component26 />
      <Component27 />
    </div>
  );
}

function CarbonDocument() {
  return (
    <div className="absolute left-0 size-[26px] top-0" data-name="carbon:document">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="carbon:document">
          <path d={svgPaths.p1dc4a600} fill="var(--fill-0, #B1B1B1)" id="Vector" />
          <path d={svgPaths.p1b8b2e00} fill="var(--fill-0, #B1B1B1)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function EconomicInvestment() {
  return (
    <div className="overflow-clip relative shrink-0 size-[25px]" data-name="economic-investment 1">
      <CarbonDocument />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
      <EconomicInvestment />
      <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.6px]">
        <p className="leading-[18px]">고객 관리</p>
      </div>
    </div>
  );
}

function Component28() {
  return (
    <div className="absolute bg-[#f4f4f4] h-[79px] left-0 top-[64px] w-[157px]" data-name="기준1">
      <div className="content-stretch flex items-center justify-center overflow-clip px-0 py-[8px] relative rounded-[inherit] size-full">
        <Frame19 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[1px_1px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Layer() {
  return (
    <div className="h-[36px] relative shrink-0 w-[52px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 36">
        <g clipPath="url(#clip0_1_822)" id="Layer_1">
          <path d={svgPaths.p17701ef0} fill="var(--fill-0, #4169E1)" id="Vector" />
          <path d={svgPaths.p2772400} fill="var(--fill-0, #444444)" id="Vector_2" />
          <path d={svgPaths.p358b3b80} fill="var(--fill-0, #444444)" id="Vector_3" />
          <path d={svgPaths.p2e9a4500} fill="var(--fill-0, #444444)" id="Vector_4" />
          <path d={svgPaths.p1f1be800} fill="var(--fill-0, #444444)" id="Vector_5" />
          <path d={svgPaths.p3e778900} fill="var(--fill-0, #4169E1)" id="Vector_6" />
        </g>
        <defs>
          <clipPath id="clip0_1_822">
            <rect fill="white" height="36" width="52" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute left-[1373px] size-[50px] top-[7px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="Group 3">
          <circle cx="25" cy="25" fill="var(--fill-0, white)" id="Ellipse 2" r="25" />
          <g id="002-notification-1">
            <rect fill="white" height="25" transform="translate(13 12)" width="25" />
            <path d={svgPaths.p24795d80} fill="var(--fill-0, #FE5C73)" id="Vector" />
            <path d={svgPaths.p289f7000} fill="var(--fill-0, #FE5C73)" id="Vector_2" />
            <path d={svgPaths.p13ffd900} fill="var(--fill-0, #FE5C73)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component29() {
  return (
    <div className="absolute bg-[#f4f4f4] left-0 top-0 w-[1440px]" data-name="기준1">
      <div className="content-stretch flex gap-[48px] items-center overflow-clip px-[32px] py-[8px] relative rounded-[inherit] w-full">
        <Layer />
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">대시보드</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">고객 관리</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">영업 관리</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">계약 관리</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">????</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">정산 관리</p>
        </div>
        <div className="flex flex-col font-['Noto_Sans_KR:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.8px]">
          <p className="leading-[48px]">조직 관리</p>
        </div>
        <Group1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e1e1e1] border-[1px_1px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_KR:Regular',sans-serif] gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#727272] text-[10px] text-nowrap tracking-[-0.5px]">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal] text-nowrap">고객 리스트</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal] text-nowrap">{`>`}</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[171px] top-[80px] w-[1260px]">
      <Frame24 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1260 0.5">
            <line id="Line 1" stroke="var(--stroke-0, #E1E1E1)" strokeWidth="0.5" x2="1260" y1="0.25" y2="0.25" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Noto_Sans_KR:Medium',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[22px] text-black tracking-[-1.1px] w-[min-content]">
        <p className="leading-[18px]">고객 리스트</p>
      </div>
    </div>
  );
}

function Component30() {
  return (
    <div className="absolute contents left-[171px] top-[80px]" data-name="위치">
      <Frame25 />
    </div>
  );
}

export default function Component31() {
  return (
    <div className="bg-white relative size-full" data-name="고객)리스트">
      <Component25 />
      <Group />
      <Component28 />
      <Component29 />
      <Component30 />
    </div>
  );
}