import axiosInstance from '@api/axios';

/**
 * 메인 페이지 데이터 (예산, 달력, 요약 정보)
 * @param selectDate
 * @param isSelectDay
 * @returns
 */
export const fetchMainData = async (selectDate: string) => {
  const { data } = await axiosInstance.get('/articles/main', {
    params: {
      selectDate,
      isSelectDay: false,
    },
  });
  return data;
};

export const fetchDataForDay = async (selectDate: string) => {
  const { data } = await axiosInstance.get('/articles/main', {
    params: {
      selectDate,
      isSelectDay: true,
    },
  });
  return data;
};
