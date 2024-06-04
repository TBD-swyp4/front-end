import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import useIsDemoMode from '@hooks/useIsDemo';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { PagePath } from '@models/navigation';

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
  const isDemoMode = useIsDemoMode();

  return (
    <>
      <MetaThemeColor color="#F4F4F4" />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle>
                대시보드
                {isDemoMode && (
                  <span style={{ fontSize: '12px', color: '#47cfb0' }}> (체험중)</span>
                )}
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate(PagePath.Setting);
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
      <BottomNavigation location={PagePath.Dashboard} />
    </>
  );
};

export default NavigationLayout;

const MonthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;
