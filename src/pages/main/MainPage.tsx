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

import { fetchDataForDay, fetchMainData } from '@api/main';
import { formatYMD } from '@utils/index';
import { useQuery } from 'react-query';
import Spinner from '@components/information/Spinner';

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

  const selectDate = formatYMD(monthNav.currentDate, 'none');

  // 메인 데이터는 "월" 이 바뀌면 재로딩
  const {
    data: mainData,
    isLoading: isLoadingMainData,
    error: mainDataError,
  } = useQuery(['mainData', monthNav.currentDate.getMonth()], () => fetchMainData(selectDate), {
    enabled: !!selectDate,
  });

  const {
    data: subData,
    isLoading: isLoadingSubData,
    error: subDataError,
  } = useQuery(['mainSubData', selectDate], () => fetchDataForDay(selectDate), {
    enabled: !!selectDate,
  });

  if (mainDataError) return <div>An error occurred</div>;

  return (
    <>
      <NavigationLayout {...monthNav}>
        <MainContainer>
          <BudgetContainer isLoading={isLoadingMainData}>
            {isLoadingMainData ? <Spinner /> : <Budget {...mainData.data.budget} />}
          </BudgetContainer>
          <CalendarWrapper>
            {isLoadingMainData ? (
              <Spinner />
            ) : (
              <Calendar {...monthNav} data={mainData.data.monthSpendList} />
            )}
          </CalendarWrapper>
          <DayListContainer>
            {subDataError ? (
              <div>Error..</div>
            ) : isLoadingSubData ? (
              <Spinner />
            ) : (
              <DayExpenseListTop2
                data={subData.data.daySpendList}
                currentDate={monthNav.currentDate}
              />
            )}
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

const BudgetContainer = styled.section<{ isLoading: boolean }>`
  ${mainSection}
  ${flexColumnBetween}
  flex-direction:  ${(props) => (props.isLoading ? 'row' : 'column')};
  min-height: 250px;
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
  min-height: 170px;
  width: 100%;
`;
