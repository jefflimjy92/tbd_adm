import svgPaths from "./svg-y21xau853b";
import clsx from "clsx";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[27px] relative shrink-0">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};
type Text14Props = {
  text: string;
};

function Text14({ text }: Text14Props) {
  return (
    <div className="content-stretch flex items-center justify-center p-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#8291a9] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type Text13Props = {
  text: string;
  additionalClassNames?: string;
};

function Text13({ text, additionalClassNames = "" }: Text13Props) {
  return (
    <div className={clsx("content-stretch flex flex-col items-center justify-center px-[4px] py-[2px] relative rounded-[360px] shrink-0", additionalClassNames)}>
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-white w-full">{text}</p>
    </div>
  );
}
type Helper11Props = {
  additionalClassNames?: string;
};

function Helper11({ additionalClassNames = "" }: Helper11Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center p-[8px] top-[1563px] w-[280px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[87px]" />
      <MdiCalendarOutline />
    </div>
  );
}
type Text12Props = {
  text: string;
};

function Text12({ text }: Text12Props) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black text-nowrap">{text}</p>
      <TablerTrash />
    </div>
  );
}
type Helper10Props = {
  additionalClassNames?: string;
};

function Helper10({ additionalClassNames = "" }: Helper10Props) {
  return (
    <div className={clsx("bg-[#f5f7fa] content-stretch flex h-[35px] items-center p-[8px] relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="PDF 보기" />
    </div>
  );
}
type Helper9Props = {
  additionalClassNames?: string;
};

function Helper9({ additionalClassNames = "" }: Helper9Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center p-[8px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[236px]" />
    </div>
  );
}
type Helper8Props = {
  additionalClassNames?: string;
};

function Helper8({ additionalClassNames = "" }: Helper8Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center p-[8px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[146px]" />
      <Text11 text="본인" />
    </div>
  );
}
type Text11Props = {
  text: string;
  additionalClassNames?: string;
};

function Text11({ text, additionalClassNames = "" }: Text11Props) {
  return (
    <Wrapper additionalClassNames="w-[82px]">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[4px]">{text}</p>
      <Helper2 additionalClassNames="left-[58px] top-[8px]" />
    </Wrapper>
  );
}
type Helper7Props = {
  additionalClassNames?: string;
};

function Helper7({ additionalClassNames = "" }: Helper7Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center p-[8px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="지인" additionalClassNames="w-[95px]" />
      <Text6 text="변경 가능" />
    </div>
  );
}
type Text10Props = {
  text: string;
};

function Text10({ text }: Text10Props) {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex h-[54px] items-center justify-center p-[8px] relative shrink-0 w-[150px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">{text}</p>
    </div>
  );
}
type Helper6Props = {
  additionalClassNames?: string;
};

function Helper6({ additionalClassNames = "" }: Helper6Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[595px] p-[8px] w-[716px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[687px]" />
    </div>
  );
}
type Text9Props = {
  text: string;
  additionalClassNames?: string;
};

function Text9({ text, additionalClassNames = "" }: Text9Props) {
  return (
    <div className={clsx("content-stretch flex gap-[8px] items-center relative shrink-0", additionalClassNames)}>
      <Helper1 additionalClassNames="size-[8px]" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{text}</p>
    </div>
  );
}
type Text8Props = {
  text: string;
};

function Text8({ text }: Text8Props) {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex h-[35px] items-center justify-center p-[8px] relative shrink-0 w-[1295px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{text}</p>
    </div>
  );
}

function TablerTrash() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="tabler:trash">
          <path d={svgPaths.p1fe31900} id="Vector" stroke="var(--stroke-0, #AAAAAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.13%_6.41%_9.37%_11.09%]">
      <div className="absolute inset-[-5.05%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7161 12.7161">
          <g id="Group">
            <path d={svgPaths.p3b317600} id="Vector" stroke="var(--stroke-0, #AAAAAA)" strokeLinejoin="round" strokeWidth="1.16667" />
            <path d={svgPaths.p33897b40} id="Vector_2" stroke="var(--stroke-0, #AAAAAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type Text7Props = {
  text: string;
};

function Text7({ text }: Text7Props) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <p className="font-['Pretendard:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#444] text-[12px] text-nowrap">{text}</p>
      <Helper5 text="2025.07.01" text1="상담팀" />
    </div>
  );
}
type Helper5Props = {
  text: string;
  text1: string;
};

function Helper5({ text, text1 }: Helper5Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#aaa] text-[12px] text-nowrap">{text}</p>
      <Helper4 />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#aaa] text-[12px] text-nowrap">{`임준영 `}</p>
      <Helper4 />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#aaa] text-[12px] text-nowrap">{text1}</p>
    </div>
  );
}

function Helper4() {
  return (
    <div className="relative shrink-0 size-[2px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Frame 1000002885">
          <path d={svgPaths.p10ff6c00} fill="var(--fill-0, #AAAAAA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type Text6Props = {
  text: string;
  additionalClassNames?: string;
};

function Text6({ text, additionalClassNames = "" }: Text6Props) {
  return (
    <Wrapper additionalClassNames="w-[135px]">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[4px]">{text}</p>
      <Helper2 additionalClassNames="left-[111px] top-[8px]" />
    </Wrapper>
  );
}
type Text5Props = {
  text: string;
  additionalClassNames?: string;
};

function Text5({ text, additionalClassNames = "" }: Text5Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[4px]">{text}</p>
      <Helper2 additionalClassNames="left-[75px] top-[8px]" />
    </Wrapper>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center p-[8px] top-[213px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="선택" />
      <Text4 text="배정 문자" />
      <Text4 text="배정 알림톡" />
    </div>
  );
}
type Text4Props = {
  text: string;
};

function Text4({ text }: Text4Props) {
  return (
    <div className="bg-[#ededed] relative shrink-0">
      <div className="content-stretch flex items-center overflow-clip px-[8px] py-[4px] relative rounded-[inherit]">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function MdiCalendarOutline() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:calendar-outline">
          <path d={svgPaths.p150ef400} fill="var(--fill-0, #B1B1B1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <div style={{ "--transform-inner-width": "7.796875", "--transform-inner-height": "19.5" } as React.CSSProperties} className={clsx("absolute flex h-[11px] items-center justify-center w-[19px]", additionalClassNames)}>
      <div className="flex-none rotate-[270deg]">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative text-[#b1b1b1] text-[16px] text-nowrap">{`<`}</p>
      </div>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("bg-white relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute bg-[#f5f7fa] h-[35px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type Text3Props = {
  text: string;
  additionalClassNames?: string;
};

function Text3({ text, additionalClassNames = "" }: Text3Props) {
  return (
    <div className={additionalClassNames}>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{text}</p>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return <Text3 text={text} additionalClassNames={clsx("absolute bg-[#f4f4f4] content-stretch flex items-center justify-center p-[8px]", additionalClassNames)} />;
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return <Text3 text={text} additionalClassNames={clsx("bg-[#f4f4f4] content-stretch flex items-center justify-center p-[8px] relative shrink-0", additionalClassNames)} />;
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return <Text3 text={text} additionalClassNames={clsx("absolute bg-[#f4f4f4] content-stretch flex items-center justify-center p-[8px] w-[150px]", additionalClassNames)} />;
}

function Frame1() {
  return (
    <div className="bg-[#f5f7fa] h-[35px] relative shrink-0 w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[108px]">
      <Text1 text="접수번호" additionalClassNames="w-[150px]" />
      <Frame1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex h-[35px] items-center p-[8px] relative shrink-0 w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[1116px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[178px] w-[1295px]">
      <Text1 text="계약자 주소" additionalClassNames="w-[150px]" />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[1026px] p-[8px] top-[143px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[146px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[876px] top-[143px]">
      <Frame7 />
      <Text text="연락처" additionalClassNames="left-[876px] top-[143px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white border-[0.5px] border-black border-solid h-[27px] left-[1197px] overflow-clip top-[147px] w-[74.864px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[6.5px] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[3.5px]">KT</p>
      <Helper2 additionalClassNames="left-[49.65px] top-[7.5px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex h-[35px] items-center p-[8px] relative shrink-0 w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[146px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[143px]">
      <Text1 text="고객명" additionalClassNames="w-[150px]" />
      <Frame8 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[596px] p-[8px] top-[143px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[70px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">-</p>
      <Helper1 additionalClassNames="h-[27px] w-[77px]" />
    </div>
  );
}

function Frame74() {
  return (
    <div className="absolute bg-[#f4f4f4] content-stretch flex gap-[8px] items-center justify-center left-[446px] p-[8px] top-[108px] w-[150px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">계약일자</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#b1b1b1] text-[12px] text-nowrap underline">오늘</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[596px] p-[8px] top-[108px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[95px]" />
      <MdiCalendarOutline />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[166px] p-[8px] top-[213px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="선택" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[596px] p-[8px] top-[248px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="계약불가" additionalClassNames="w-[95px]" />
      <Text6 text="불가 사유 선택" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[1026px] p-[8px] top-[108px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="대기" additionalClassNames="w-[95px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[1026px] p-[8px] top-[248px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="대기" additionalClassNames="w-[97px]" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap">사유 : 못 믿겠음</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[166px] p-[8px] top-[248px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="취소" additionalClassNames="w-[96px]" />
      <Text6 text="취소 사유 선택" />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#d4d4d4] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#444] text-[12px] text-nowrap">등록</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="absolute bg-[#f4f4f4] content-stretch flex flex-col gap-[8px] h-[210px] items-center justify-center left-[16px] p-[8px] top-[283px] w-[150px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">메모</p>
      <Frame />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[16px] top-[108px]">
      <div className="absolute h-px left-[884px] top-[198px] w-[350px]" />
      <Frame14 />
      <Frame5 />
      <Group1 />
      <Frame4 />
      <Frame9 />
      <Text text="주민등록번호" additionalClassNames="left-[446px] top-[143px]" />
      <Frame73 />
      <Frame74 />
      <Frame75 />
      <Text text="상담 담당자" additionalClassNames="left-[16px] top-[213px]" />
      <Frame10 />
      <Text text="미팅 담당자" additionalClassNames="left-[446px] top-[213px]" />
      <Helper3 additionalClassNames="left-[596px] w-[280px]" />
      <Text text="미팅 처리상태" additionalClassNames="left-[446px] top-[248px]" />
      <Frame2 />
      <Text text="유입 경로" additionalClassNames="left-[876px] top-[108px]" />
      <Frame30 />
      <Helper3 additionalClassNames="left-[1026px] w-[285px]" />
      <Text text="청구 담당자" additionalClassNames="left-[876px] top-[213px]" />
      <Frame11 />
      <Text text="청구 처리상태" additionalClassNames="left-[876px] top-[248px]" />
      <Text text="상담 처리상태" additionalClassNames="left-[16px] top-[248px]" />
      <Frame3 />
      <Frame76 />
    </div>
  );
}

function IconParkOutlineWrite() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="icon-park-outline:write">
      <Group />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
      <IconParkOutlineWrite />
      <TablerTrash />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Text7 text="성향" />
      <Frame29 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
      <div className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-black">
        <p className="mb-0">방어적인 태도를 보여서 법무법인 대건의 운영을 어필하여 설득하였으나, 지속적인 주의가 필요</p>
        <p className="mb-0">ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇ러ㅏㅁ널이ㅏㅁ널이ㅓㅁ니라어민;ㄹ어ㅣㅁ널ㅇㅁㄴ.ㅇ러ㅣㅁㄴ....</p>
        <p className="mb-0">ㅁㄴㅇㄹㅁㅁㄴㅇㄹㅁㄴ방어적인 태도를 보여서 법무법인 대건의 운영을 어필하여 설득하였으나, 지속적인 주의가 필요</p>
        <p className="mb-0">ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇ러ㅏㅁ널이ㅏㅁ널이ㅓㅁ니라어민;ㄹ어ㅣㅁ널ㅇㅁㄴ.ㅇ러ㅣㅁㄴ....</p>
        <p>ㅁㄴㅇㄹㅁㅁㄴㅇㄹㅁㄴ</p>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-[#ededed] content-stretch flex flex-col gap-[8px] h-[137px] items-start p-[16px] relative rounded-[8px] shrink-0 w-[1115px]">
      <Frame26 />
      <Frame24 />
    </div>
  );
}

function IconParkOutlineWrite1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="icon-park-outline:write">
      <Group />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
      <IconParkOutlineWrite1 />
      <TablerTrash />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Text7 text="병력" />
      <Frame31 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
      <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-black">선천적인 ~~ 질환 있음</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#ededed] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[8px] shrink-0 w-[1115px]">
      <Frame27 />
      <Frame25 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute bg-white h-[210px] left-[166px] top-[283px] w-[1145px]">
      <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[8px] relative rounded-[inherit] size-full">
        <Frame50 />
        <Frame28 />
      </div>
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35px] items-start left-[16px] top-[73px] w-[1295px]">
      <Text8 text="기본 정보" />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35px] items-start left-[16px] top-[517px] w-[1295px]">
      <Text8 text="상담팀 확인 내용" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[1025px] p-[8px] top-[622px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[258px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[875px] top-[622px]">
      <Frame12 />
      <Text text="계좌 번호" additionalClassNames="left-[875px] top-[622px]" />
    </div>
  );
}

function Frame72() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[166px] p-[8px] top-[552px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text9 text="체크리스트 항목1" />
      <Text9 text="체크리스트 항목2" />
      <Text9 text="체크리스트 항목3" />
      <Text9 text="체크리스트 항목4" />
      <Text9 text="체크리스트 항목5" />
      <Text9 text="체크리스트 항목6" />
      <Text9 text="체크리스트 항목7" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[595px] p-[8px] top-[622px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="은행 선택" />
      <Text9 text="본인명의" />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[166px] p-[8px] top-[622px] w-[279px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[146px]" />
      <Text9 text="본인명의" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex h-[70px] items-center justify-center p-[8px] relative shrink-0 w-[150px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-center text-nowrap">
        <p className="mb-0">{`3개월 이내 `}</p>
        <p>입원 및 통원 이력</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex flex-col h-[70px] items-start left-[16px] top-[797px]">
      <Frame13 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[70px] items-center left-[166px] p-[8px] top-[797px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[56px] w-[1117px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[16px] top-[867px]">
      <Text10 text="현재 복용중인 약" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="있음" />
      <Text9 text="없음" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[24px] h-[54px] items-center left-[166px] p-[8px] top-[867px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame33 />
      <Helper1 additionalClassNames="h-[38px] w-[631px]" />
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[16px] top-[920px]">
      <Text10 text="보험연동 동의" />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[183px]">
      <Text9 text="동의" />
      <Text9 text="비동의" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[24px] h-[54px] items-center left-[166px] p-[8px] top-[920px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame45 />
      <Text4 text="알림톡 발송" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35px] items-start left-[16px] top-[657px] w-[1295px]">
      <Text1 text="보험 구두 확인" additionalClassNames="h-[35px] w-[1295px]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[875px] top-[727px]">
      <Helper7 additionalClassNames="left-[1025px] top-[727px] w-[285px]" />
      <Text text="현재 설계사" additionalClassNames="left-[875px] top-[727px]" />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="가입" />
      <Text9 text="미가입" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[166px] p-[8px] top-[692px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame61 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="있음" />
      <Text9 text="없음" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[166px] p-[8px] top-[762px] w-[279px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame62 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-[694px]">
      <Text9 text="중대질환" />
      <Text9 text="암" />
      <Text9 text="뇌" />
      <Text9 text="심장" />
      <Text9 text="수술" />
      <Text9 text="심장" />
      <Text9 text="심장" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[595px] p-[8px] top-[762px] w-[715px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame63 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="가입" />
      <Text9 text="미가입" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[595px] p-[8px] top-[692px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame64 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[16px] top-[517px]">
      <Frame48 />
      <Group2 />
      <Text text="체크리스트" additionalClassNames="left-[16px] top-[552px]" />
      <Frame72 />
      <Text text="은행" additionalClassNames="left-[445px] top-[622px]" />
      <Text text="신청 주소" additionalClassNames="left-[445px] top-[587px]" />
      <Frame41 />
      <Text text="연락처" additionalClassNames="left-[16px] top-[622px]" />
      <Frame42 />
      <Text text="지역" additionalClassNames="left-[16px] top-[587px]" />
      <Helper6 additionalClassNames="top-[587px]" />
      <Helper additionalClassNames="left-[166px] top-[587px] w-[279px]" />
      <Frame36 />
      <Frame44 />
      <Frame38 />
      <Frame39 />
      <Frame46 />
      <Frame47 />
      <Frame19 />
      <Group3 />
      <Text text="월 납입 금액" additionalClassNames="left-[875px] top-[692px]" />
      <Text text="계약자" additionalClassNames="left-[16px] top-[727px]" />
      <Helper8 additionalClassNames="left-[166px] top-[727px] w-[279px]" />
      <Text text="피보험자" additionalClassNames="left-[445px] top-[727px]" />
      <Helper8 additionalClassNames="left-[595px] top-[727px] w-[280px]" />
      <Text text="보험 가입 여부" additionalClassNames="left-[16px] top-[692px]" />
      <Helper9 additionalClassNames="left-[1025px] top-[692px] w-[286px]" />
      <Frame32 />
      <Text text="5년이내 교통사고" additionalClassNames="left-[16px] top-[762px]" />
      <Frame34 />
      <Text text="5년이내 주요 병력" additionalClassNames="left-[445px] top-[762px]" />
      <Frame35 />
      <Text text="실손 가입 여부" additionalClassNames="left-[445px] top-[692px]" />
      <Frame65 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="absolute content-stretch flex flex-col h-[54px] items-start left-[16px] top-[1224px]">
      <Text10 text="피드백 관리" />
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[54px] items-center left-[166px] p-[8px] top-[1224px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="피드백 관리 바로가기" />
    </div>
  );
}

function Frame58() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[166px] p-[8px] top-[1154px] w-[279px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Helper1 additionalClassNames="h-[27px] w-[87px]" />
      <MdiCalendarOutline />
      {[...Array(2).keys()].map((_, i) => (
        <Helper1 additionalClassNames="h-[27px] w-[55px]" />
      ))}
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[875px] top-[1084px]">
      <Helper7 additionalClassNames="left-[1025.34px] top-[1084px] w-[285.655px]" />
      <Text2 text="현재 설계사" additionalClassNames="left-[875px] top-[1084px] w-[150.345px]" />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[875px] top-[1119px]">
      <Helper additionalClassNames="left-[1025.34px] top-[1119px] w-[285.655px]" />
      <Helper additionalClassNames="left-[875px] top-[1119px] w-[150.345px]" />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="가입" />
      <Text9 text="미가입" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[166px] p-[8px] top-[1049px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame67 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="인지" />
      <Text9 text="미인지" />
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[166px] p-[8px] top-[1119px] w-[279px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame77 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[235px]">
      <Text9 text="본인 계약" />
      <Text9 text="가능" />
      <Text9 text="불가능" />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[595px] p-[8px] top-[1119px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame78 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[169px]">
      <Text9 text="가입" />
      <Text9 text="미가입" />
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center justify-center left-[595px] p-[8px] top-[1049px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame79 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35px] items-start left-[16px] top-[1014px] w-[1295px]">
      <Text8 text="미팅팀 확인 내용" />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">미연동</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center p-[8px] relative shrink-0 w-[279px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame80 />
      <Text4 text="알림톡 발송" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[1189px]">
      <Text1 text="보험 연동 내역" additionalClassNames="w-[150px]" />
      <Frame43 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute content-stretch flex items-center left-[594px] top-[1189px]">
      <Helper10 additionalClassNames="w-[280px]" />
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute content-stretch flex items-center left-[874px] top-[1189px]">
      <Text1 text="심평원" additionalClassNames="w-[150px]" />
      <Helper10 additionalClassNames="w-[287px]" />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[16px] top-[1014px]">
      <Frame59 />
      <Frame60 />
      <Text text="미팅 장소" additionalClassNames="left-[445px] top-[1154px]" />
      <Text text="미팅 날짜" additionalClassNames="left-[16px] top-[1154px]" />
      <Helper6 additionalClassNames="top-[1154px]" />
      <Frame58 />
      <Group4 />
      <Group5 />
      <Text text="월 납입 금액" additionalClassNames="left-[875px] top-[1049px]" />
      <Text text="계약자" additionalClassNames="left-[16px] top-[1084px]" />
      <Helper8 additionalClassNames="left-[166px] top-[1084px] w-[279px]" />
      <Text text="피보험자" additionalClassNames="left-[445px] top-[1084px]" />
      <Helper8 additionalClassNames="left-[595px] top-[1084px] w-[280px]" />
      <Text text="보험 가입 여부" additionalClassNames="left-[16px] top-[1049px]" />
      <Helper9 additionalClassNames="left-[1025px] top-[1049px] w-[286px]" />
      <Frame51 />
      <Text text="미팅 과정 인지" additionalClassNames="left-[16px] top-[1119px]" />
      <Frame53 />
      <Text text="피보험자 동반" additionalClassNames="left-[445px] top-[1119px]" />
      <Frame54 />
      <Text text="실손 가입 여부" additionalClassNames="left-[445px] top-[1049px]" />
      <Frame52 />
      <Frame40 />
      <Frame56 />
      <Frame55 />
      <Text text="심평원" additionalClassNames="left-[445px] top-[1189px]" />
      <Frame57 />
    </div>
  );
}

function Frame15() {
  return (
    <Wrapper additionalClassNames="w-[93px]">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22.5px)] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[4px]">임준영</p>
    </Wrapper>
  );
}

function Frame16() {
  return (
    <Wrapper additionalClassNames="w-[166px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-60px)] not-italic text-[#b1b1b1] text-[16px] text-nowrap top-[4px]">010-1234-5678</p>
    </Wrapper>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[596.17px] p-[8px] top-[1493px] w-[714.826px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="배정완료" additionalClassNames="w-[95px]" />
      <Frame15 />
      <Frame16 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[446px] top-[1493px]">
      <Frame17 />
      <Text2 text="대행배정" additionalClassNames="left-[446px] top-[1493px] w-[150.174px]" />
    </div>
  );
}

function Frame66() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35px] items-start left-[16px] top-[1318px] w-[1295px]">
      <Text8 text="청구팀 확인 내용" />
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[24px] h-[70px] items-center left-[166px] p-[8px] top-[1353px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="업로드" />
      {[...Array(5).keys()].map((_, i) => (
        <Text12 text="임준영_주민등록증 사본.jpg" />
      ))}
    </div>
  );
}

function Frame81() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[24px] h-[70px] items-center left-[166px] p-[8px] top-[1423px] w-[1145px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text4 text="업로드" />
      {[...Array(2).keys()].map((_, i) => (
        <Text12 text="지급내역서" />
      ))}
      {[...Array(3).keys()].map((_, i) => (
        <Text12 text="증권" />
      ))}
    </div>
  );
}

function Frame82() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[166px] p-[8px] top-[1493px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text5 text="발급중" additionalClassNames="w-[96px]" />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[264px]">
      <Text9 text="비면제" />
      <Text9 text="소개DB" />
      <Text9 text="이벤트" />
    </div>
  );
}

function Frame69() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex h-[35px] items-center left-[596px] p-[8px] top-[1528px] w-[280px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame83 />
    </div>
  );
}

function Frame18() {
  return (
    <Wrapper additionalClassNames="w-[94px]">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[31px] not-italic text-[12px] text-black text-nowrap top-[6px]">123,456원</p>
    </Wrapper>
  );
}

function Frame70() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[1026px] p-[8px] top-[1528px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Frame18 />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-black text-nowrap">(100만원 이상 : 10%)</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute bg-[#f5f7fa] content-stretch flex gap-[8px] h-[35px] items-center left-[1026px] p-[8px] top-[1563px] w-[285px]">
      <div aria-hidden="true" className="absolute border-[#6c6c6c] border-[0.2px] border-solid inset-0 pointer-events-none" />
      <Text9 text="입금완료" additionalClassNames="w-[96px]" />
      <Text9 text="미입금" additionalClassNames="w-[107px]" />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[16px] top-[1318px]">
      <Group6 />
      <Frame66 />
      <Text text="3종 서류" additionalClassNames="h-[70px] left-[16px] top-[1353px]" />
      <Frame68 />
      <Text text="지급+증권" additionalClassNames="h-[70px] left-[16px] top-[1423px]" />
      <Frame81 />
      <Text text="서류대행" additionalClassNames="left-[16px] top-[1493px]" />
      <Frame82 />
      <Text text="최종 환급금액" additionalClassNames="left-[16px] top-[1528px]" />
      <Helper9 additionalClassNames="left-[166px] top-[1528px] w-[280px]" />
      <Text text="수수료 면제" additionalClassNames="left-[446px] top-[1528px]" />
      <Frame69 />
      <Text text="환급 완료일" additionalClassNames="left-[446px] top-[1563px]" />
      <Helper11 additionalClassNames="left-[596px]" />
      <Text text="최초 접수일" additionalClassNames="left-[16px] top-[1563px]" />
      <Helper11 additionalClassNames="left-[166px]" />
      <Text text="대행 수수료" additionalClassNames="left-[876px] top-[1528px]" />
      <Frame70 />
      <Text text="수수료 입금 확인" additionalClassNames="left-[876px] top-[1563px]" />
      <Frame71 />
    </div>
  );
}

function Thumb() {
  return (
    <div className="absolute bg-[#d4d4d4] content-stretch flex flex-col h-[51px] items-start left-1/2 rounded-[4px] top-px translate-x-[-50%] w-[8px]" data-name="Thumb">
      <div className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c1c1c1] text-[4px] w-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Scrollbar() {
  return (
    <div className="absolute bg-[#fafafa] h-[288px] left-[1296px] top-[293px] w-[15px]" data-name="Scrollbar">
      <Thumb />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_1px_0px_0px_0px_#e8e8e8,inset_-1px_0px_0px_0px_#f0f0f0]" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-center p-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#4169e1] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">기본 정보</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#8291a9] text-[16px] text-nowrap">상담 내용</p>
      <Text13 text="완료" additionalClassNames="bg-[#22a366]" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#8291a9] text-[16px] text-nowrap">미팅 내용</p>
      <Text13 text="미팅 확정" additionalClassNames="bg-[#ff8400]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#8291a9] text-[16px] text-nowrap">청구 내용</p>
      <Text13 text="대행 배정" additionalClassNames="bg-[#a35122]" />
    </div>
  );
}

function Frame84() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[14px]">
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Text14 text="계약 내용" />
      <Text14 text="보험 연동 내역" />
      <Text14 text="심사평가원 내역" />
      <Text14 text="연동 가족" />
      <Text14 text="소개 DB" />
    </div>
  );
}

function Frame85() {
  return (
    <div className="absolute bg-[#d4d4d4] content-stretch flex items-center justify-center left-[1215px] px-[16px] py-[8px] rounded-[8px] top-[26px]">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#444] text-[16px] text-nowrap">메모 추가</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="리스트">
      <Group7 />
      <Frame37 />
      <Frame49 />
      <Group10 />
      <Group8 />
      <Group9 />
      <Scrollbar />
      <Frame84 />
      <Frame85 />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[593px] not-italic text-[16px] text-black text-nowrap top-[1666px]">계약 내용 추가 방법</p>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[593px] not-italic text-[16px] text-black text-nowrap top-[1860px]">계약 내용 추가 방법</p>
    </div>
  );
}