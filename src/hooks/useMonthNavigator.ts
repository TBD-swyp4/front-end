import { useState } from 'react';
import { startOfMonth, addMonths, subMonths } from 'date-fns';

const useMonthNavigator = () => {
  // 현재 날짜 상태를 useState로 관리
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 이전 달로 이동
  const previousMonth = () => {
    const newCurrentDate = subMonths(currentDate, 1);
    setCurrentDate(newCurrentDate);
    setSelectedDate(startOfMonth(newCurrentDate));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    const newCurrentDate = addMonths(currentDate, 1);
    setCurrentDate(newCurrentDate);
    setSelectedDate(startOfMonth(newCurrentDate));
  };

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    previousMonth,
    nextMonth,
  };
};

export default useMonthNavigator;
