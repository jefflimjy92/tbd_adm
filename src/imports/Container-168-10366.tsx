import svgPaths from "./svg-1ipc7y1tut";
import { imgVector, imgVector1 } from "./svg-k4hi8";

function Icon() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%_12.5%_12.5%]" data-name="Icon">
      <div className="absolute inset-[12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.749px_-1.75px] mask-size-[13.996px_13.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6631 11.6631">
            <path d={svgPaths.p116c0e00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_41.67%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.248px_-2.333px] mask-size-[13.996px_13.996px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-10%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.7474 6.99789">
            <path d={svgPaths.p3f16b840} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon">
      <Icon2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[83.628px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">고객 입력 사항</p>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute h-[15.987px] left-0 top-[3.99px] w-[97.213px]" data-name="Label">
      <Icon4 />
      <Paragraph />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute contents inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.332px_-1.332px] mask-size-[15.987px_15.988px]" data-name="Vector" style={{ maskImage: `url('${imgVector1}')` }}>
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6551 14.6549">
            <path d={svgPaths.p2d5a1800} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33229" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.992px_-3.331px] mask-size-[15.987px_15.988px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector1}')` }}>
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99686 3.99687">
            <path d={svgPaths.p23b1e700} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33229" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[15.988px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9.98px] size-[15.987px] top-[3.98px]" data-name="Icon1">
      <Icon6 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[15.998px] left-[35.44px] top-[4.69px] w-[22.082px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[11.5px] not-italic text-[#90a1b9] text-[12px] text-center top-[0.69px] translate-x-[-50%]">수정</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[23.987px] left-[768.17px] rounded-[8px] top-0 w-[66.732px]" data-name="Button">
      <Icon1 />
      <Paragraph1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[23.987px] relative shrink-0 w-[834.898px]" data-name="Container">
      <Label />
      <Button />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute contents inset-[12.5%_20.83%]" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33051 4.66525">
            <path d={svgPaths.p3b93f800} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector_2">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83159 5.83159">
            <path d={svgPaths.p1262e580} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon7 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon">
      <Icon8 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[33.122px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">고객명</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute h-[15.987px] left-0 top-0 w-[208.411px]" data-name="Label">
      <Icon9 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">이영희</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[170.233px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Field() {
  return (
    <div className="absolute h-[53.364px] left-0 top-0 w-[208.411px]" data-name="Field">
      <Label4 />
      <Container6 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute contents inset-[8.33%_8.33%_8.63%_8.8%]" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.63%_8.8%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.231px_-1.166px] mask-size-[13.996px_13.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5.02%_-5.03%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7646 12.7876">
            <path d={svgPaths.p30a4e6c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup2 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon1">
      <Icon11 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[33.122px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">연락처</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute h-[15.987px] left-0 top-0 w-[208.411px]" data-name="Label1">
      <Icon12 />
      <Paragraph4 />
    </div>
  );
}

function Container7() {
  return <div className="absolute border-[#e2e8f0] border-[0.693px] border-solid h-[33.36px] left-0 rounded-[4px] top-0 w-[172.431px]" data-name="Container" />;
}

function Paragraph5() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">010-9876-5432</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33.36px] items-start left-0 pl-[8.681px] pr-[54.1px] pt-[7.068px] top-0 w-[172.431px]" data-name="Container">
      <Paragraph5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#f8fafc] h-[33.36px] left-0 rounded-[4px] top-0 w-[172.431px]" data-name="Container1">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[11.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9933 11.9933">
        <g clipPath="url(#clip0_168_8587)" id="Icon">
          <path d={svgPaths.pb98df00} id="Vector" stroke="var(--stroke-0, #733E0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999441" />
        </g>
        <defs>
          <clipPath id="clip0_168_8587">
            <rect fill="white" height="11.9933" width="11.9933" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#fdc700] content-stretch flex h-[33.36px] items-center justify-center left-[180.42px] rounded-[4px] top-0 w-[27.992px]" data-name="Button">
      <Icon13 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[33.36px] left-0 top-[19.97px] w-[208.411px]" data-name="Container2">
      <Container1 />
      <Button1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[53.364px] left-[224.41px] top-0 w-[208.411px]" data-name="Container3">
      <Label1 />
      <Container2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[15.998px] left-0 top-0 w-[66.234px]" data-name="Label2">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">주민등록번호</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">921103-2******</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[106.251px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container4">
      <Paragraph6 />
    </div>
  );
}

function Field1() {
  return (
    <div className="absolute h-[53.364px] left-[448.82px] top-0 w-[208.411px]" data-name="Field1">
      <Label2 />
      <Container4 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute contents inset-[20.83%_8.33%]" data-name="Icon">
      <div className="absolute inset-[20.83%_8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.166px_-2.916px] mask-size-[13.996px_13.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8294 9.33051">
            <path d={svgPaths.p443eb00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_8.33%_58.33%_8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.166px_-5.832px] mask-size-[13.996px_13.996px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.58px_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8294 1.16632">
            <path d="M0.58316 0.58316H12.2463" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon3">
      <Icon15 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[48.569px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">은행/계좌</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[15.987px] left-0 top-0 w-[208.411px]" data-name="Label3">
      <Icon3 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">신협 137-014-394953</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[68.171px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container5">
      <Paragraph8 />
    </div>
  );
}

function Field2() {
  return (
    <div className="absolute h-[53.364px] left-[673.23px] top-0 w-[208.411px]" data-name="Field2">
      <Label3 />
      <Container5 />
    </div>
  );
}

function CustomerBasicInfo() {
  return (
    <div className="h-[53.364px] relative shrink-0 w-full" data-name="CustomerBasicInfo">
      <Field />
      <Container3 />
      <Field1 />
      <Field2 />
    </div>
  );
}

function Label5() {
  return (
    <div className="absolute h-[15.998px] left-0 top-0 w-[47.335px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">접수 유형</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">3년 환급</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[153.726px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container">
      <Paragraph9 />
    </div>
  );
}

function Field4() {
  return (
    <div className="absolute h-[39.985px] left-0 top-0 w-[208.411px]" data-name="Field">
      <Label5 />
      <Container9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">{`경기 성남시 분당구 `}</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[153.726px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container">
      <Paragraph10 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute contents inset-[8.33%_16.67%]" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.333px_-1.166px] mask-size-[13.996px_13.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4968 12.8293">
            <path d={svgPaths.pf273f00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.249px_-4.082px] mask-size-[13.996px_13.996px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66527 4.66527">
            <path d={svgPaths.p27aaaf00} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon16 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup4 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon">
      <Icon17 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[75.304px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">지역</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[114px]" data-name="Label">
      <Icon18 />
      <Paragraph11 />
    </div>
  );
}

function Field5() {
  return (
    <div className="absolute h-[39.985px] left-[224.32px] top-[0.27px] w-[208.411px]" data-name="Field">
      <Container10 />
      <Label6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="absolute h-[15.998px] left-0 top-0 w-[47.335px]" data-name="Label2">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">처리 상태</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#0f766e] text-[14px] top-[-0.31px] tracking-[-0.1504px]">진행 중</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[167.138px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container2">
      <Paragraph12 />
    </div>
  );
}

function Field6() {
  return (
    <div className="absolute h-[39.985px] left-[448.82px] top-0 w-[208.411px]" data-name="Field2">
      <Label7 />
      <Container11 />
    </div>
  );
}

function Label8() {
  return (
    <div className="absolute h-[15.998px] left-0 top-0 w-[33.122px]" data-name="Label3">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">담당자</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[-0.31px] tracking-[-0.1504px]">최미팅</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[19.982px] items-start left-0 overflow-clip pr-[170.233px] pt-[0.39px] top-[19.97px] w-[208.411px]" data-name="Container3">
      <Paragraph13 />
    </div>
  );
}

function Field3() {
  return (
    <div className="absolute h-[39.985px] left-[673.23px] top-0 w-[208.411px]" data-name="Field3">
      <Label8 />
      <Container12 />
    </div>
  );
}

function RequestInfoFields() {
  return (
    <div className="h-[39.985px] relative shrink-0 w-full" data-name="RequestInfoFields">
      <Field4 />
      <Field5 />
      <Field6 />
      <Field3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[15.002px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#90a1b9] text-[10px] top-[0.39px] tracking-[0.1172px]">UTM 구분</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">UTM없음</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[3.994px] h-[60.367px] items-start left-0 pb-[0.693px] pt-[12.686px] px-[12.686px] rounded-[4px] top-0 w-[199.73px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.693px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[15.002px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#90a1b9] text-[10px] top-[0.39px] tracking-[0.1172px]">월 보험금액</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">10-20만원</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[3.994px] h-[60.367px] items-start left-[211.72px] pb-[0.693px] pt-[12.686px] px-[12.686px] rounded-[4px] top-0 w-[199.73px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.693px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15.002px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#90a1b9] text-[10px] top-[0.39px] tracking-[0.1172px]">실손가입여부</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#096] text-[12px] top-[0.69px]">가입 (유)</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[3.994px] h-[60.367px] items-start left-[423.45px] pb-[0.693px] pt-[12.686px] px-[12.686px] rounded-[4px] top-0 w-[199.73px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.693px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[15.002px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#90a1b9] text-[10px] top-[0.39px] tracking-[0.1172px]">직업</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">주부</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[3.994px] h-[60.367px] items-start left-[635.17px] pb-[0.693px] pt-[12.686px] px-[12.686px] rounded-[4px] top-0 w-[199.73px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.693px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[60.367px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container18 />
      <Container21 />
      <Container24 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%_12.5%_12.5%]" data-name="Icon">
      <div className="absolute inset-[12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.749px_-1.75px] mask-size-[13.996px_13.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6631 11.6631">
            <path d={svgPaths.p116c0e00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_41.67%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.248px_-2.333px] mask-size-[13.996px_13.996px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-10%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.7474 6.99789">
            <path d={svgPaths.p3f16b840} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16632" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon19 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[13.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup5 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[13.996px] top-px" data-name="Icon">
      <Icon20 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[15.998px] left-[17.99px] top-[0.68px] w-[83.628px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#62748e] text-[12px] top-[0.69px]">고객 프로필 요약</p>
    </div>
  );
}

function Label9() {
  return (
    <div className="absolute h-[15.987px] left-0 top-[3.99px] w-[97.213px]" data-name="Label">
      <Icon21 />
      <Paragraph14 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute contents inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.332px_-1.332px] mask-size-[15.987px_15.988px]" data-name="Vector" style={{ maskImage: `url('${imgVector1}')` }}>
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6551 14.6549">
            <path d={svgPaths.p2d5a1800} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33229" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.992px_-3.331px] mask-size-[15.987px_15.988px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector1}')` }}>
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99686 3.99687">
            <path d={svgPaths.p23b1e700} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33229" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon22 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[15.988px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup6 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9.98px] size-[15.987px] top-[3.98px]" data-name="Icon1">
      <Icon23 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[15.998px] left-[35.44px] top-[4.69px] w-[22.082px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] left-[11.5px] not-italic text-[#90a1b9] text-[12px] text-center top-[0.69px] translate-x-[-50%]">수정</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[23.987px] left-[768.17px] rounded-[8px] top-0 w-[66.732px]" data-name="Button">
      <Icon24 />
      <Paragraph15 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[23.987px] left-0 top-0 w-[834.898px]" data-name="Container">
      <Label9 />
      <Button2 />
    </div>
  );
}

function Container27() {
  return <div className="absolute border-[#e2e8f0] border-[0.693px] border-solid h-[159.918px] left-0 rounded-[10px] top-0 w-[834.898px]" data-name="Container" />;
}

function Paragraph16() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">나이</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[92.472px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph17 />
    </div>
  );
}

function ProfileField() {
  return (
    <div className="absolute h-[27.981px] left-0 rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">성별</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[92.472px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph18 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">여</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[100.06px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph19 />
    </div>
  );
}

function ProfileField1() {
  return (
    <div className="absolute h-[27.981px] left-[136.48px] rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">지역</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[92.472px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph20 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">경기 (남부)</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[54.338px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph21 />
    </div>
  );
}

function ProfileField2() {
  return (
    <div className="absolute h-[27.981px] left-[272.97px] rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">3개월 내 병력</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[52.195px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph22 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph23 />
    </div>
  );
}

function ProfileField3() {
  return (
    <div className="absolute h-[27.981px] left-[409.45px] rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">계약자 피보험자 상이</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[21.41px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph24 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph25 />
    </div>
  );
}

function ProfileField4() {
  return (
    <div className="absolute h-[27.981px] left-[545.93px] rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">5년 이내 3대질환 병력</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[15.122px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph26 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph27 />
    </div>
  );
}

function ProfileField5() {
  return (
    <div className="absolute h-[27.981px] left-[682.42px] rounded-[6px] top-0 w-[120.485px]" data-name="ProfileField">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">설계사 관계</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[61.601px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph28 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph29 />
    </div>
  );
}

function ProfileField6() {
  return (
    <div className="absolute h-[27.981px] left-0 rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험가입금액</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[55.215px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph30 />
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph31 />
    </div>
  );
}

function ProfileField7() {
  return (
    <div className="absolute h-[27.981px] left-[136.48px] rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험가입 종류</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[52.281px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph32 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">방문 미팅</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[64.155px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph33 />
    </div>
  );
}

function ProfileField8() {
  return (
    <div className="absolute h-[27.981px] left-[272.97px] rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">환급 가능 금액</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[49.359px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph34 />
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">150</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[89.235px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph35 />
    </div>
  );
}

function ProfileField9() {
  return (
    <div className="absolute h-[27.981px] left-[409.45px] rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container46 />
      <Container47 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험분쟁 유무</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[52.281px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph36 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph37 />
    </div>
  );
}

function ProfileField10() {
  return (
    <div className="absolute h-[27.981px] left-[545.93px] rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">결정권자 여부</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[52.281px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph38 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph39 />
    </div>
  );
}

function ProfileField11() {
  return (
    <div className="absolute h-[27.981px] left-[682.42px] rounded-[6px] top-[47.97px] w-[120.485px]" data-name="ProfileField">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">가족 연동 수</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[58.668px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph40 />
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph41 />
    </div>
  );
}

function ProfileField12() {
  return (
    <div className="absolute h-[27.981px] left-0 rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container52 />
      <Container53 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">가족력</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[83.152px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph42 />
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph43 />
    </div>
  );
}

function ProfileField13() {
  return (
    <div className="absolute h-[27.981px] left-[136.48px] rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">혼인여부</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[73.843px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph44 />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph45 />
    </div>
  );
}

function ProfileField14() {
  return (
    <div className="absolute h-[27.981px] left-[272.97px] rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">보험 해지이력</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[52.281px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph46 />
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph47 />
    </div>
  );
}

function ProfileField15() {
  return (
    <div className="absolute h-[27.981px] left-[409.45px] rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">수술 이력</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[70.91px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph48 />
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph49 />
    </div>
  );
}

function ProfileField16() {
  return (
    <div className="absolute h-[27.981px] left-[545.93px] rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[10.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[10px] left-0 not-italic text-[#90a1b9] text-[10px] top-[-0.39px] tracking-[0.1172px]">법률 서비스 경험 유무</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.002px] items-start left-[9.38px] overflow-clip pr-[18.488px] pt-[-0.39px] top-0 w-[111.1px]" data-name="Container">
      <Paragraph50 />
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-0 not-italic text-[#314158] text-[12px] top-[0.69px]">-</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.987px] items-start left-[9.38px] overflow-clip pr-[105.472px] pt-[0.682px] top-[11.99px] w-[111.1px]" data-name="Container">
      <Paragraph51 />
    </div>
  );
}

function ProfileField17() {
  return (
    <div className="absolute h-[27.981px] left-[682.42px] rounded-[6px] top-[95.95px] w-[120.485px]" data-name="ProfileField">
      <Container62 />
      <Container63 />
    </div>
  );
}

function ProfileField18() {
  return <div className="absolute border-[#e2e8f0] border-l-[1.386px] border-solid h-[123.927px] left-0 rounded-[6px] top-0 w-[802.901px]" data-name="ProfileField" />;
}

function Container64() {
  return (
    <div className="absolute h-[123.927px] left-[16px] top-[16px] w-[802.901px]" data-name="Container">
      <ProfileField />
      <ProfileField1 />
      <ProfileField2 />
      <ProfileField3 />
      <ProfileField4 />
      <ProfileField5 />
      <ProfileField6 />
      <ProfileField7 />
      <ProfileField8 />
      <ProfileField9 />
      <ProfileField10 />
      <ProfileField11 />
      <ProfileField12 />
      <ProfileField13 />
      <ProfileField14 />
      <ProfileField15 />
      <ProfileField16 />
      <ProfileField17 />
      {[...Array(18).keys()].map((_, i) => (
        <ProfileField18 key={i} />
      ))}
    </div>
  );
}

function ProfileGrid() {
  return (
    <div className="absolute bg-[#f8fafc] h-[159.918px] left-0 rounded-[10px] top-[31.99px] w-[834.898px]" data-name="ProfileGrid">
      <Container27 />
      <Container64 />
    </div>
  );
}

function CustomerProfileGrid() {
  return (
    <div className="h-[191.904px] relative shrink-0 w-full" data-name="CustomerProfileGrid">
      <Container26 />
      <ProfileGrid />
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[23.997px] items-start pt-[19.992px] px-[19.992px] relative w-full">
        <CustomerProfileGrid />
      </div>
    </div>
  );
}

export default function Container66() {
  return (
    <div className="bg-white relative rounded-[14px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.693px] relative rounded-[inherit] size-full">
        <Container65 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.693px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}