import TopNavigation from '@layout/TopNavigation';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle>내 정보</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.CloseButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
    </>
  );
};

// #20240429.syjang, 환경설정 테스트 페이지입니다. 추후 테마 변경 시 아래와 같이 가져다 쓰면 됩니다.
const SettingPage = () => {
  return (
    <NavigationLayout>
      <SettingContainer></SettingContainer>
    </NavigationLayout>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
`;
