import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';

import MainIcon from '@assets/images/navigation/main.svg?react';
import DashboardIcon from '@assets/images/navigation/dashboard.svg?react';
import AddIcon from '@assets/images/navigation/addExpense.svg?react';
import ViewIcon from '@assets/images/navigation/view.svg?react';
import StatisticsIcon from '@assets/images/navigation/statistics.svg?react';

type BottomNavigationProps = {
  location: string;
};

const BottomNavigation = ({ location }: BottomNavigationProps) => {
  const navigator = useNavigate();

  return (
    <Wrapper>
      <NavItem
        className={`${location == 'main' ? 'select' : ''}`}
        onClick={() => {
          navigator('/');
        }}>
        <NavIcon>
          <MainIcon />
        </NavIcon>
        <NavTitle>메인</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == 'dashboard' ? 'select' : ''}`}
        onClick={() => {
          navigator('/dashboard');
        }}>
        <NavIcon>
          <DashboardIcon />
        </NavIcon>
        <NavTitle>대시보드</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/add');
        }}>
        <NavIcon>
          <AddIcon />
        </NavIcon>
        <NavTitle>내용입력</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == 'expenseList' ? 'select' : ''}`}
        onClick={() => {
          navigator('/expense');
        }}>
        <NavIcon>
          <ViewIcon />
        </NavIcon>
        <NavTitle>조회</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == 'statistics' ? 'select' : ''}`}
        onClick={() => {
          navigator('/statistics');
        }}>
        <NavIcon>
          <StatisticsIcon />
        </NavIcon>
        <NavTitle>둘러보기</NavTitle>
      </NavItem>
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.nav`
  ${flexBetween}
  flex-shrink: 0;

  width: 100%;
  height: 95px; // 하단 네비게이션 바 높이

  background-color: ${(props) => props.theme.colors.navBackground};
  box-shadow: ${(props) => props.theme.shadows.on};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
`;

const NavItem = styled.div`
  ${flexColumnCenter}
  width: 50px;
  height: 50px;
  gap: 5px;

  &.select > a {
    color: #47cfb0;
  }
  &.select > div {
    color: #47cfb0;
    font-weight: 800;
  }
`;

const NavIcon = styled.a`
  width: 24px;
  height: 24px;
  color: #bcbcbc;
`;
const NavTitle = styled.div`
  color: #a7acaa;
  font-size: 12px;
  font-weight: 500;
`;
