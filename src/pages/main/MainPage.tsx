import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import Background from '@components/background';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

import { flexColumnBetween, mainSection, overflowWithoutScroll } from '@styles/CommonStyles';

import Budget from './components/Budget';
import DayExpenseListTop2 from './components/DayExpenseTop2';
import Calendar from './components/Calendar';

import { ApiResponse } from '@models/api';
import { MainData } from '@models/api/main';
import _data from '../../../public/data/main.json';

type MainNavProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({ children, currentDate, previousMonth, nextMonth }: MainNavProps) => {
  const navigate = useNavigate();
  const mainColor = { color: 'white' };
  const monthNavProps = { currentDate, previousMonth, nextMonth, ...mainColor };

  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopNavigation.TopBar.LogoWhiteButton />}
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                style={mainColor}
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorBtn {...monthNavProps} />
          </MonthNavWrapper>
        }
      />
      {children}
      <BottomNavigation location="main" />
      {showBackground && <Background height="36%" color="#47CFB0" />}
    </>
  );
};

const MonthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;

const MainPage = () => {
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월

  const data: ApiResponse<MainData> = _data as ApiResponse<MainData>; // 일단 타입 단언..
  console.log(data);

  return (
    <>
      <NavigationLayout {...monthNav}>
        <MainContainer>
          <BudgetContainer>
            <Budget {...data.data.budget} />
          </BudgetContainer>
          <CalendarWrapper>
            <Calendar {...monthNav} data={data.data.monthSpendList} />
          </CalendarWrapper>
          <DayListContainer>
            <DayExpenseListTop2 data={data.data.daySpendList} currentDate={monthNav.currentDate} />
          </DayListContainer>
        </MainContainer>
      </NavigationLayout>
    </>
  );
};

export default MainPage;

const MainContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;

  ${overflowWithoutScroll}
`;

const BudgetContainer = styled.section`
  ${mainSection}
  ${flexColumnBetween}
  height: 250px;
  width: 100%;
  margin-bottom: 16px;
`;
const CalendarWrapper = styled.section`
  ${mainSection}
  min-height: 150px;
  width: 100%;
  padding: 5px;
  margin-bottom: 16px;
`;
const DayListContainer = styled.section`
  ${mainSection}
  min-height: 240px;
  width: 100%;
`;
