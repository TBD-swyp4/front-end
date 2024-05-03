import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import type { NavLayoutProps } from '../../types/navigationTypes';

const NavigationLayout = ({ children }: NavLayoutProps) => {
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<div>대시보드</div>}
            rightContent={TopNavigation.TopBar.SettingButton}
          />
        }></TopNavigation>
      {children}
      <BottomNavigation />
    </>
  );
};

const DashboardPage = () => {
  return (
    <NavigationLayout>
      <DashboardContainer>대시보드</DashboardContainer>
    </NavigationLayout>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;
