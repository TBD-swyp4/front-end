import styled from 'styled-components';
import { flexColumnBetween, mainSection, overflowWithoutScroll } from '@styles/CommonStyles';

import Spinner from '@components/information/Spinner';

import useMainData from './hooks/useMainData';
import useMonthNavigator from '@hooks/useMonthNavigator';

import NavigationLayout from './navigation';
import Budget from './components/Budget';
import DayExpenseListTop2 from './components/DayExpenseTop2';
import Calendar from './components/Calendar';
import useIsDemoMode from '@hooks/useIsDemo';

const MainPage = () => {
  const isDemoMode = useIsDemoMode();
  // monthNav.currentDate : 현재 선택된 월
  const monthNav = useMonthNavigator(); // 헤더의 월 네비게이션
  const navigationProps = { ...monthNav, isDemoMode };
  const { mainData, isLoadingMainData, mainDataError, subData, isLoadingSubData, subDataError } =
    useMainData(monthNav.currentDate, isDemoMode);

  return (
    <NavigationLayout {...navigationProps}>
      <MainContainer>
        <BudgetContainer $isLoading={isLoadingMainData}>
          {!mainData || isLoadingMainData ? (
            <Spinner />
          ) : mainDataError ? (
            <div>An error occurred</div>
          ) : !mainData.budget ? (
            <div>예산 데이터 없음</div>
          ) : (
            <Budget {...mainData.budget} />
          )}
        </BudgetContainer>
        <CalendarWrapper>
          {!mainData || isLoadingMainData ? (
            <Spinner />
          ) : mainDataError ? (
            <div>An error occurred</div>
          ) : !mainData.monthSpendList ? (
            <div>소비 데이터 없음</div>
          ) : (
            <Calendar {...monthNav} data={mainData.monthSpendList} />
          )}
        </CalendarWrapper>
        <DayListContainer>
          {!subData || isLoadingSubData ? (
            <Spinner />
          ) : subDataError ? (
            <div>An error occurred</div>
          ) : !subData.daySpendList ? (
            <div>리스트 데이터 없음</div>
          ) : (
            <DayExpenseListTop2 data={subData.daySpendList} currentDate={monthNav.currentDate} />
          )}
        </DayListContainer>
      </MainContainer>
    </NavigationLayout>
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

const BudgetContainer = styled.section<{ $isLoading: boolean }>`
  ${mainSection}
  ${flexColumnBetween}
  flex-direction:  ${(props) => (props.$isLoading ? 'row' : 'column')};
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
