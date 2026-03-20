function Text() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[83.314px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-[0.69px]">9. 동반 신청 고객</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[18.986px] left-[1.99px] rounded-[4px] top-[1.99px] w-[33.295px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[15px] left-[17.5px] not-italic text-[#90a1b9] text-[10px] text-center top-[2.38px] tracking-[0.1172px] translate-x-[-50%]">없음</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#ff2056] h-[18.986px] left-[35.29px] rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1.99px] w-[33.295px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[15px] left-[17.5px] not-italic text-[10px] text-center text-white top-[2.38px] tracking-[0.1172px] translate-x-[-50%]">있음</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f1f5f9] h-[22.969px] relative rounded-[4px] shrink-0 w-[70.574px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[22.969px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[13.325px] relative shrink-0 w-[33.88px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[13.333px] left-0 not-italic text-[#90a1b9] text-[10px] top-[0.69px] tracking-[0.1172px] w-[34px]">동반인 1</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[29.366px] left-0 rounded-[4px] top-0 w-[81.193px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip p-[6px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(15,23,43,0.5)]">이름</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Option() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">관계 선택</p>
    </div>
  );
}

function Option1() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">배우자</p>
    </div>
  );
}

function Option2() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">자녀</p>
    </div>
  );
}

function Option3() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">부모</p>
    </div>
  );
}

function Option4() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">형제/자매</p>
    </div>
  );
}

function Option5() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#0f172b] text-[12px] top-0 w-0">기타</p>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="absolute bg-white h-[29.366px] left-[89.19px] rounded-[4px] top-0 w-[81.193px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start pb-[0.693px] pl-[-421.248px] pr-[502.441px] pt-[-1610.901px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
        <Option3 />
        <Option4 />
        <Option5 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[29.366px] relative shrink-0 w-[170.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TextInput />
        <Dropdown />
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-white h-[29.366px] relative rounded-[4px] shrink-0 w-[170.385px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip p-[6px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(15,23,43,0.5)]">연락처 (- 없이 입력)</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f8fafc] h-[109.433px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[11.993px] items-start pb-[0.693px] pl-[8.692px] pr-[0.693px] pt-[8.692px] relative size-full">
        <Text1 />
        <Container2 />
        <TextInput1 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f8fafc] h-[33.382px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#cad5e2] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-[94.31px] not-italic text-[#62748e] text-[12px] text-center top-[9.38px] translate-x-[-50%]">+ 동반인 추가</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.999px] h-[150.815px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Button2 />
    </div>
  );
}

export default function YesNoInput() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[7.999px] items-start pb-[0.693px] pt-[8.692px] px-[8.692px] relative rounded-[4px] size-full" data-name="YesNoInput">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container1 />
      <Container4 />
    </div>
  );
}