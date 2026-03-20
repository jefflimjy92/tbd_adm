/**
 * 주민번호에서 성별 추출
 * @param ssn 주민등록번호 (예: "921103-2******")
 * @returns 성별 ("남" | "여" | "-")
 */
export function getGenderFromSSN(ssn: string): string {
  if (!ssn || ssn.length < 8) return '-';
  
  const genderDigit = ssn.charAt(7); // 주민번호 7번째 자리
  
  if (genderDigit === '1' || genderDigit === '3') return '남';
  if (genderDigit === '2' || genderDigit === '4') return '여';
  
  return '-';
}

/**
 * 주민번호에서 생년월일 추출
 * @param ssn 주민등록번호 (예: "921103-2******")
 * @returns 생년월일 Date 객체
 */
export function getBirthDateFromSSN(ssn: string): Date | null {
  if (!ssn || ssn.length < 6) return null;
  
  const yearPrefix = ssn.charAt(7);
  let year: number;
  const month = parseInt(ssn.substring(2, 4), 10);
  const day = parseInt(ssn.substring(4, 6), 10);
  
  // 1900년대생: 1, 2 / 2000년대생: 3, 4
  if (yearPrefix === '1' || yearPrefix === '2') {
    year = 1900 + parseInt(ssn.substring(0, 2), 10);
  } else if (yearPrefix === '3' || yearPrefix === '4') {
    year = 2000 + parseInt(ssn.substring(0, 2), 10);
  } else {
    // 기본값: 1900년대로 가정
    year = 1900 + parseInt(ssn.substring(0, 2), 10);
  }
  
  return new Date(year, month - 1, day);
}

/**
 * 만나이 계산
 * @param birthDate 생년월일
 * @returns 만나이
 */
export function calculateKoreanAge(birthDate: Date | null): number {
  if (!birthDate) return 0;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  
  // 생일이 지나지 않았으면 -1
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * 보험나이 계산 (만나이 + 6개월 이상이면 +1세)
 * @param birthDate 생년월일
 * @returns 보험나이
 */
export function calculateInsuranceAge(birthDate: Date | null): number {
  if (!birthDate) return 0;
  
  const today = new Date();
  const koreanAge = calculateKoreanAge(birthDate);
  
  // 생일 + 6개월 계산
  const sixMonthsAfterBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth() + 6,
    birthDate.getDate()
  );
  
  // 오늘이 (올해 생일 + 6개월) 이후면 보험나이 = 만나이 + 1
  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const sixMonthsAfter = new Date(thisYearBirthday);
  sixMonthsAfter.setMonth(sixMonthsAfter.getMonth() + 6);
  
  if (today >= sixMonthsAfter) {
    return koreanAge + 1;
  }
  
  return koreanAge;
}

/**
 * 주소에서 광역시/도 추출 및 포맷팅
 * @param address 전체 주소 (예: "경기도 화성시 동탄대로 550")
 * @returns 포맷된 지역 (예: "경기 남부 (화성시)")
 */
export function formatRegion(address: string): string {
  if (!address) return '-';
  
  const parts = address.split(' ');
  if (parts.length < 2) return address;
  
  const province = parts[0]; // 광역시/도
  const city = parts[1]; // 시/군/구
  
  // 경기도 북부/남부 구분
  if (province === '경기도' || province === '경기') {
    const northCities = ['의정부시', '동두천시', '양주시', '파주시', '연천군', '포천시', '가평군'];
    const isNorth = northCities.some(nc => city.includes(nc.replace('시', '').replace('군', '')));
    
    const region = isNorth ? '경기 북부' : '경기 남부';
    return `${region} (${city})`;
  }
  
  // 그 외 광역시/도
  const simplifiedProvince = province.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('도', '');
  return `${simplifiedProvince} (${city})`;
}
