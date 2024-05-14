import styled, { css } from 'styled-components';
import { flexBetween, flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { useState } from 'react';

import type { MonthSpend } from '@models/api/main';

import { PrevBtn } from '@components/button';
import { formatYM, compareYMDString, addCommasToNumber } from '@utils/index';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from 'date-fns';

// 현재 날짜를 넘겨받는다.
type CalendarProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  data: MonthSpend[];
};

const Calendar = ({ currentDate, selectedDate, setSelectedDate, data }: CalendarProps) => {
  // 현재 달력에서 보여 줄 상태들 정의
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [showWeekOnly, setShowWeekOnly] = useState(true); // 주/ 월 달력 상태 추가
  const currentMonth = startOfMonth(currentDate);

  // 월요일 시작 설정
  const startDay = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const endDay = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

  const eachDayOfInterval = (start: Date, end: Date) => {
    const days = [];
    let day = start;
    while (day <= end) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }
    return days;
  };

  const days = eachDayOfInterval(startDay, endDay);

  const getDaysOfSelectedWeek = () => {
    const startSelectedWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return eachDayOfInterval(startSelectedWeek, endOfWeek(startSelectedWeek, { weekStartsOn: 1 }));
  };

  const daysToShow = showWeekOnly ? getDaysOfSelectedWeek() : days;

  const handleDayClick = (day: Date) => {
    // 이번달 날짜가 아니면 return
    if (!isSameMonth(day, currentMonth)) return;
    setSelectedDate(day);
    alert(day);
  };

  const toggleWeekView = () => {
    setShowWeekOnly(!showWeekOnly);
  };

  // 넘겨받은 데이터와 보여줄 날짜를 바인딩
  const bindDataDaysToShow = daysToShow.map((dayToShow) => {
    // data에서 날짜가 같은 객체를 찾는다.
    const dataEntry = data.find((x) => compareYMDString(x.date, dayToShow));

    // 같은 날짜가 있다면 daySpend,dataEntry를 넣어주고 없다면 0으로 채운다.
    if (dataEntry) {
      return { date: dayToShow, daySpend: dataEntry.daySpend, daySave: dataEntry.daySave };
    } else {
      return { date: dayToShow, daySpend: 0, daySave: 0 }; // 데이터가 없는 경우 기본값을 설정
    }
  });

  return (
    <Container>
      <TitleWrapper>
        소비 달력
        <Label>
          <LabelItem className="minus">지출</LabelItem>
          <LabelItem>절약</LabelItem>
        </Label>
      </TitleWrapper>
      <WeekInfo>
        {`${formatYM(selectedDate, 'word')} ${Math.ceil(
          (days.findIndex((d) => d.toDateString() === selectedDate.toDateString()) + 1) / 7,
        )}주차`}
      </WeekInfo>
      <CalendarGrid>
        {daysOfWeek.map((day, index) => (
          <DayHeader key={index}>{day}</DayHeader>
        ))}
        {bindDataDaysToShow.map((day, index) => {
          const same: boolean = isSameMonth(day.date, currentMonth);
          return (
            <CalendarDay
              key={index}
              className={`${same ? '' : 'faded'}${isToday(day.date) ? ' bold' : ''}${
                selectedDate.toDateString() === day.date.toDateString() ? ' selected' : ''
              }${day.daySpend !== 0 && same && !showWeekOnly ? ' spend' : ''}${
                day.daySave !== 0 && same && !showWeekOnly ? ' save' : ''
              }`}
              onClick={() => handleDayClick(day.date)}>
              {format(day.date, 'd')}
            </CalendarDay>
          );
        })}
        {showWeekOnly &&
          bindDataDaysToShow.map((day, i) => (
            <ExpenseDetail
              key={i}
              className={`${selectedDate.toDateString() === day.date.toDateString() ? 'selected' : ''}`}>
              <div className="save">+{addCommasToNumber(day.daySave)}</div>
              <div className="spend">-{addCommasToNumber(day.daySpend)}</div>
            </ExpenseDetail>
          ))}
      </CalendarGrid>
      <ToggleButton onClick={toggleWeekView}>
        {showWeekOnly ? <ArrowDown /> : <ArrowUp />}
      </ToggleButton>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 15px;

  position: relative; // 토글 버튼 위치 잡기용

  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  ${flexBetween}
  font-size: 14px;
  font-weight: 400;
  color: #575755;
  width: 100%;

  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;
const Label = styled.div`
  ${flexCenter}
  font-size: 12px;
  gap: 13px;
`;

const LabelItem = styled.div`
  position: relative;
  padding-left: 13px; // 텍스트와 원 사이에 간격을 주기 위함

  &::before {
    content: '';
    position: absolute;
    left: 0; // 왼쪽 끝에서 시작
    top: 50%; // 상위 요소의 중간 높이에 위치
    transform: translateY(-50%); // Y축으로 50% 이동하여 정중앙에 배치
    width: 6px; // 원의 너비
    height: 6px; // 원의 높이
    background-color: #333331;
    border-radius: 50%; // 원형으로 만들기
    display: inline-block; // 인라인 블록 요소로 설정
  }
  &.minus::before {
    background-color: #fc4873;
  }
`;

const WeekInfo = styled.h1`
  font-size: 15px;
  font-weight: 600;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 7개의 칼럼으로 균등 분할
  gap: 10px;

  width: 100%; // 너비는 부모 요소에 맞춤
  margin: 0 auto; // 중앙 정렬

  position: relative;
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  height: 20px; // 고정 높이 설정

  color: #bcbcbc;
  font-weight: 300;
  font-size: 13px;
`;

const CalendarDay = styled.div`
  ${flexCenter}
  background-color: white;
  position: relative; // 작은 원들을 위한 포지셔닝

  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #767676;

  &.faded {
    color: #cccccc;
  }

  &.bold {
    color: #000;
    font-weight: 800;
  }

  &.selected {
    background-color: #333331; // 선택된 날짜 배경색
    color: rgb(255, 255, 255); // 선택된 날짜 글씨색
    border-radius: 50%; // 동그란 형태
  }

  // 소비
  &.spend::after {
    content: '';
    position: absolute;
    bottom: 0px; // 날짜 아래로 위치 조정
    width: 5px;
    height: 5px;
    background-color: #fc4873;
    border-radius: 50%;
  }

  // 절약
  &.save::after {
    content: '';
    position: absolute;
    bottom: 0px; // 날짜 아래로 위치 조정
    width: 5px;
    height: 5px;
    background-color: #333331;
    border-radius: 50%;
  }

  &.save.spend::after {
    left: 50%;
    transform: translateX(-50%) translateX(-5px); // 가운데 정렬 조정
    background-color: #fc4873;
    border-radius: 50%;
    box-shadow: 9.5px 0 0 #333331; // 옆으로 작은 원 하나 더 추가
  }

  // 선택된 날짜일 경우 좀 더 아래에 뜸
  &.selected.both::after,
  &.selected.spend::after,
  &.selected.save::after {
    bottom: -8px; // 날짜 아래로 위치 조정
  }
`;

const ToggleButton = styled.button`
  ${flexCenter}

  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);

  width: 30px;
  height: 30px;
  background-color: #f3f3f3;
  /* border: 0.5px solid #dddddd; */
  border-radius: 50%;
  box-shadow: 0 5px 14.56px 0 #5252521a;
`;

const arrowStyle = css`
  width: 12px;
  height: 12px;
  color: #9f9f9f;
  stroke-width: 2;
`;
const ArrowUp = styled(PrevBtn)`
  ${arrowStyle}
  transform: rotate(90deg);

  &:hover {
    color: #4b4949;
    stroke-width: 3;
    transform: rotate(90deg);
  }
`;

const ArrowDown = styled(PrevBtn)`
  ${arrowStyle}
  transform: rotate(270deg);

  &:hover {
    color: #4b4949;
    stroke-width: 3;
    transform: rotate(270deg);
  }
`;

const ExpenseDetail = styled.div`
  ${flexColumnCenter}

  height: 30px; // 고정 높이 설정

  color: #bcbcbc;
  font-weight: 300;
  font-size: 10px;

  white-space: nowrap; // 텍스트를 한 줄로 표시
  overflow: hidden;
  text-overflow: ellipsis; // 오버플로 텍스트를 엘립시스(...)로 표시
  max-width: 100%; // 너비를 그리드 열의 최대 너비로 제한

  &.selected div {
    position: absolute;
    font-size: 12px;
    font-weight: 700;
  }

  &.selected div.save {
    color: #333331;
    bottom: 20px;
  }

  &.selected div.spend {
    color: #fc4873;
    bottom: 5px;
  }
`;
