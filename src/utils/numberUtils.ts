// #,##0 형식 formatter (숫자에 3자리씩 ',' 찍어주는 함수)
export const addCommasToNumber = (number: number | string): string => {
  if (number == undefined || number == null) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// #,##0 포맷된 string 또는 숫자를 다시 #,##0 으로 포맷
export const formatAmountNumber = (
  value: string,
  hasLimit: boolean = false,
  limit: number = 100000000,
): string => {
  /* case )
   * 1. input의 handleChanged에서 #,##0 포맷된 string을 전달받음
   * 2. 서버에서 넘어온 데이터는 숫자 형태의 string으로 넘어옴.
   */
  // 숫자만 포함된 값으로 변환
  let cleanedValue = value.replace(/[^0-9]/g, '');

  // 0으로 시작하지 않도록 제한
  if (cleanedValue.startsWith('0')) {
    cleanedValue = cleanedValue.replace(/^0+/, ''); // 0으로 시작할 경우 0->빈값으로 치환
  }

  // limit을 가지고 있다면, limit을 넘지 못하도록 제한 (제한 숫자로 바꿈)
  if (hasLimit && cleanedValue.length > 0) {
    const numericValue = parseInt(cleanedValue, 10); // 문자열을 정수로 변환
    if (numericValue > limit) {
      cleanedValue = limit.toString(); // 제한 값을 문자열로 변환
    }
  }

  return addCommasToNumber(cleanedValue);
};

// 숫자 배열을 받으면, 각 항목이 전체에서 차지하는 비율 배열을 돌려준다.
export const calculatePercentages = (data: number[]): number[] => {
  const total = data.reduce((sum, value) => sum + value, 0);
  return data.map((value) => parseFloat(((value / total) * 100).toFixed(1)));
};
