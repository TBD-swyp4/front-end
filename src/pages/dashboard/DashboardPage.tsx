import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import TabLayout from '@components/layout/TabLayout';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

type DashboardNavProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({
  children,
  currentDate,
  previousMonth,
  nextMonth,
}: DashboardNavProps) => {
  const navigate = useNavigate();
  const monthNavProps = { currentDate, previousMonth, nextMonth };

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle>대시보드</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
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
      <BottomNavigation location="dashboard" />
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

const DashboardPage = () => {
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월
  const [selectedTab, setSelectedTab] = useState<string>('TAB_SPEND'); // 지출 탭 기본 선택
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
  };
  const tabData = [
    {
      id: 'TAB_SPEND',
      label: '지출',
      content: <Content>Content for Tab 1</Content>,
    },
    {
      id: 'TAB_SAVE',
      label: '절약',
      content: <Content>Content for Tab 2</Content>,
    },
  ];
  return (
    <NavigationLayout {...monthNav}>
      <DashboardContainer>
        <TabLayout tabs={tabData} selectedTab={selectedTab} onTabSelect={handleTabSelect} />
      </DashboardContainer>
    </NavigationLayout>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
