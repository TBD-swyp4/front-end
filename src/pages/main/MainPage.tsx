import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import Modal from '@components/modal';
import Background from '@components/background';

import type { NavLayoutProps } from '../../types/navigationTypes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

import { flexColumnBetween, mainSection, overflowWithoutScroll } from '@styles/CommonStyles';

import Budget from './components/Budget';
import DayExpenseListTop2 from './components/DayExpenseTop2';
import Calendar from './components/Calendar';

type MainNavProps = NavLayoutProps & {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
};

const NavigationLayout = ({ children, currentDate, previousMonth, nextMonth }: MainNavProps) => {
  const navigate = useNavigate();
  const mainColor = { color: 'white' };
  const monthNavProps = { currentDate, previousMonth, nextMonth, ...mainColor };
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopNavigation.TopBar.LogoWhiteButton />}
            // centerContent={<div>메인</div>}
            rightContent={
              <TopNavigation.TopBar.SettingButton
                style={mainColor}
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorBtn {...monthNavProps} />
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
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);

  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <NavigationLayout {...monthNav}>
        <MainContainer>
          <BudgetContainer>
            <Budget />
          </BudgetContainer>
          <CalendarWrapper>
            <Calendar {...monthNav} />
          </CalendarWrapper>
          <DayListContainer>
            <DayExpenseListTop2 />
          </DayListContainer>
          {/* <button onClick={toggleModal}>모달을 띄워봅시다</button> */}
        </MainContainer>
        {showModal && (
          <Modal onClose={toggleModal}>
            <div>모달 내용이 되는건가</div>
          </Modal>
        )}
        {showBackground && <Background height="36%" color="#47CFB0" />}
      </NavigationLayout>
    </>
  );
};

export default MainPage;

const MainContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 15px;

  ${overflowWithoutScroll}
`;

const BudgetContainer = styled.section`
  ${mainSection}
  ${flexColumnBetween}
  height: 250px;
  width: 100%;
  margin-bottom: 10px;
`;
const CalendarWrapper = styled.section`
  ${mainSection}
  min-height: 150px;
  width: 100%;
  margin-bottom: 2px;
`;
const DayListContainer = styled.section`
  ${mainSection}
  min-height: 240px;
  width: 100%;
`;
