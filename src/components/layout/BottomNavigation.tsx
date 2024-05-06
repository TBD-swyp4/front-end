import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';
const BottomNavigation = () => {
  const navigator = useNavigate();
  return (
    <Wrapper>
      <NavItem
        onClick={() => {
          navigator('/');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>메인</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/dashboard');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>대시보드</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/expense');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>조회</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/add');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>입력</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/statistics');
        }}>
        <NavIcon></NavIcon>
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
  height: 80px; // 하단 네비게이션 바 높이

  background-color: ${(props) => props.theme.colors.navBackground};
  box-shadow: ${(props) => props.theme.shadows.on};
  padding-left: 20px;
  padding-right: 20px;
`;

const NavItem = styled.div`
  width: 50px;
  height: 50px;
  ${flexColumnCenter}
`;

const NavIcon = styled.a`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  background-image: linear-gradient(135deg, beige 1%, ${(props) => props.theme.colors.navFont});
  margin-bottom: 15px;
  //background-color: ${(props) => props.theme.colors.navFont};
`;
const NavTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: ${(props) => props.theme.colors.navFont};
`;
