import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

type DashboardNavProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({
  children,
  currentDate,
  previousMonth,
  nextMonth,
}: DashboardNavProps) => {
  const navigate = useNavigate();
  const monthNavProps = { currentDate, previousMonth, nextMonth };

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle>대시보드</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
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
      <BottomNavigation />
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

const DashboardPage = () => {
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월

  return (
    <NavigationLayout {...monthNav}>
      <DashboardContainer>대시보드</DashboardContainer>
    </NavigationLayout>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;
