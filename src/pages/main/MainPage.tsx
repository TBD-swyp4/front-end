import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import Modal from '@components/modal';

import type { NavLayoutProps } from '../../types/navigationTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<div>메인</div>}
            rightContent={
              <TopNavigation.TopBar.SettingButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }
        _Extension={<div style={{ width: '100%', height: '30px' }}>대충 날짜 선택</div>}
      />
      {children}
      <BottomNavigation />
    </>
  );
};

const MainPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <NavigationLayout>
        <MainContainer>
          <div>메인apdla</div>
          <button onClick={toggleModal}>모달을 띄워봅시다</button>
        </MainContainer>
        {showModal && (
          <Modal onClose={toggleModal}>
            <div>모달 내용이 되는건가</div>
          </Modal>
        )}
      </NavigationLayout>
    </>
  );
};

export default MainPage;

const MainContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;

  overflow: auto;
`;
