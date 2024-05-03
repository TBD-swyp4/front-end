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
            centerContent={<div>소비 내역 리스트</div>}
            rightContent={TopNavigation.TopBar.SettingButton}
          />
        }></TopNavigation>
      {children}
      <BottomNavigation />
    </>
  );
};

const ExpenseListViewPage = () => {
  return (
    <NavigationLayout>
      <ExpenseListViewContainer>소비 리스트</ExpenseListViewContainer>
    </NavigationLayout>
  );
};

export default ExpenseListViewPage;

const ExpenseListViewContainer = styled.div`
  width: 100%;
  height: 100%;
`;
