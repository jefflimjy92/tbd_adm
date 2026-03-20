import svgPaths from "@/imports/svg-wvkn0svars";
import { Phone } from 'lucide-react';

function Icon() {
  return (
    <div className="absolute left-0 size-[13.996px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9958 13.9958">
        <g id="Icon">
          <path d={svgPaths.p39140180} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          <path d={svgPaths.p3209e680} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
        </g>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Label">
      <Icon />
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px]">고객명</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">이영희</p>
    </div>
  );
}

function Field() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[53.364px] items-start left-0 top-0 w-[208.411px]" data-name="Field">
      <Label />
      <Container />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[13.996px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9958 13.9958">
        <g clipPath="url(#clip0_165_4714)" id="Icon">
          <path d={svgPaths.p1cacc600} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
        </g>
        <defs>
          <clipPath id="clip0_165_4714">
            <rect fill="white" height="13.9958" width="13.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Label">
      <Icon1 />
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px]">연락처</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f8fafc] flex-[1_0_0] h-[33.371px] min-h-px min-w-px relative rounded-[4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[8.69px] not-italic text-[#1e293b] text-[14px] top-[7.07px] tracking-[-0.1504px]">010-9876-5432</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fdc700] h-[33.371px] relative rounded-[4px] shrink-0 w-[27.992px] flex items-center justify-center cursor-pointer hover:bg-[#e5b400] transition-colors" data-name="Button">
      <Phone size={12} className="text-[#733E0A]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[7.999px] h-[33.371px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Button />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[53.364px] items-start left-[224.41px] top-0 w-[208.411px]" data-name="Container">
      <Label1 />
      <Container2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[15.998px] items-center relative shrink-0 w-full" data-name="Label">
      <p className="css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#62748e] text-[12px]">주민등록번호</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">921103-2******</p>
    </div>
  );
}

function Field1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[53.364px] items-start left-[448.82px] top-0 w-[208.411px]" data-name="Field">
      <Label2 />
      <Container4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[13.996px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9958 13.9958">
        <g clipPath="url(#clip0_165_4710)" id="Icon">
          <path d={svgPaths.pc16dd00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          <path d="M1.16628 5.83156H12.8294" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
        </g>
        <defs>
          <clipPath id="clip0_165_4710">
            <rect fill="white" height="13.9958" width="13.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Label">
      <Icon3 />
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[17.99px] not-italic text-[#62748e] text-[12px] top-[0.69px]">은행/계좌</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.39px] tracking-[-0.1504px]">신협 137-014-394953</p>
    </div>
  );
}

function Field2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.994px] h-[53.364px] items-start left-[673.23px] top-0 w-[208.421px]" data-name="Field">
      <Label3 />
      <Container5 />
    </div>
  );
}

export function CustomerBasicInfo() {
  return (
    <div className="relative h-[53.364px] w-full" data-name="Container">
      <Field />
      <Container3 />
      <Field1 />
      <Field2 />
    </div>
  );
}
