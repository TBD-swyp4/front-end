import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import Modal from '@components/modal';

import type { NavLayoutProps } from '../../types/navigationTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

type MainNavProps = NavLayoutProps & {
  monthNav: {
    currentDate: Date;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
  };
};

const NavigationLayout = ({ children, monthNav }: MainNavProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopNavigation.TopBar.LogoButton />}
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
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorBtn {...monthNav} />
          </MonthNavWrapper>
        }
      />
      {children}
      <BottomNavigation />
    </>
  );
};

const MonthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;

const MainPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <NavigationLayout monthNav={monthNav}>
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
