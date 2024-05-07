import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import styled from 'styled-components';
import type { NavLayoutProps } from '../../types/navigationTypes';

import { useNavigate } from 'react-router-dom';

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<div>둘러보기</div>}
            rightContent={
              <TopNavigation.TopBar.SettingButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
      <BottomNavigation />
    </>
  );
};

const StatisticsPage = () => {
  return (
    <NavigationLayout>
      <StatisticsContainer>둘러보기(통계)</StatisticsContainer>
    </NavigationLayout>
  );
};

export default StatisticsPage;

const StatisticsContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;

  overflow: auto;
`;
