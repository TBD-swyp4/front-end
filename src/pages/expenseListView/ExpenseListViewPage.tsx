import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Background from '@components/background';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

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
            centerContent={
              <TopNavigation.TopBar.CenterTitle style={{ color: '#ffffff' }}>
                소비 내역 조회
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
      <BottomNavigation />
      {showBackground && <Background height="60px" color="#47CFB0" />}
    </>
  );
};

const ExpenseListViewPage = () => {
  return (
    <NavigationLayout>
      <ExpenseListViewContainer>
        <FilterContainer></FilterContainer>
        <SearchContainer>
          <SearchBox />
        </SearchContainer>
        <ExpenseListContainer></ExpenseListContainer>
      </ExpenseListViewContainer>
    </NavigationLayout>
  );
};

export default ExpenseListViewPage;

const ExpenseListViewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FilterContainer = styled.section`
  background-color: ${(props) => props.theme.colors.main};
`;

const SearchContainer = styled.section`
  background-color: ${(props) => props.theme.colors.main};
`;

const SearchBox = styled.div`
  background-color: #ffffff;
`;

const ExpenseListContainer = styled.section``;
