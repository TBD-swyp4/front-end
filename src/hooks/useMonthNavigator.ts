import { useState } from 'react';
import { addMonths } from 'date-fns';

const useMonthNavigator = () => {
  // 현재 날짜 상태를 useState로 관리
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 이전 달로 이동
  const handlePrevMonth = (): void => {
    setCurrentDate((prevDate) => addMonths(prevDate, -1));
  };

  // 다음 달로 이동
  const handleNextMonth = (): void => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return { currentDate, handlePrevMonth, handleNextMonth };
};

export default useMonthNavigator;
