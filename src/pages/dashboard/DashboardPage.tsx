import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMonthNavigator from '@hooks/useMonthNavigator';
import TabLayout from '@components/layout/TabLayout';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';
import TabContent from './components/TabContent';
import { useQuery } from 'react-query';
import { fetchDashboardData } from '@api/get';
import { formatYMD } from '@utils/index';
import Spinner from '@components/information/Spinner';
import type { TabOption } from './type';

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
  const [selectedTab, setSelectedTab] = useState<TabOption>('TAB_SPEND'); // 지출 탭 기본 선택
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId as TabOption);
  };

  const selectDate = formatYMD(monthNav.currentDate, 'none');
  const registerType = selectedTab === 'TAB_SPEND' ? 'SPEND' : 'SAVE';

  // react-query가 반응해야 하는 것 : slelectedTab 변경, monthNav.currentDate.getMonth()
  const { data, isLoading, error } = useQuery(
    ['dashboardData', monthNav.currentDate.getMonth(), selectedTab],
    () => fetchDashboardData(selectDate, registerType),
    {
      enabled: !!selectDate && !!selectedTab, // selectDate와 selectedTab 모두 유효한 경우에만 쿼리 활성화
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  const tabData = [
    {
      id: 'TAB_SPEND',
      label: '지출',
      content:
        isLoading || error ? (
          <InfoWrapper>{error ? 'error' : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SPEND'} data={data.data} />
        ),
    },
    {
      id: 'TAB_SAVE',
      label: '절약',
      content:
        isLoading || error ? (
          <InfoWrapper>{error ? 'error' : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SAVE'} data={data.data} />
        ),
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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
`;
