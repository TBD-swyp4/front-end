import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// 모바일 크기의 화면을 정중앙에 배치시키는 최상단 레이아웃
const RootLayout = () => {
  return (
    <RootLayoutContainer>
      <Outlet />
    </RootLayoutContainer>
  );
};

export default RootLayout;

// 메인 프레임 크기 지정
const RootLayoutContainer = styled.div`
  width: 390px;
  height: 844px;
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
