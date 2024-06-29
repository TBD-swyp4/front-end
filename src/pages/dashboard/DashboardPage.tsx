import styled from 'styled-components';

import { useState } from 'react';
import useMonthNavigator from '@hooks/useMonthNavigator';
import useDashboardData from './hooks/useDashboardData';

import NavigationLayout from './navigation';
import TabLayout, { TabProps } from '@components/layout/TabLayout';
import TabContent from './components/TabContent';
import Spinner from '@components/information/Spinner';

import { TabOption } from './type';

import useIsDemoMode from '@hooks/useIsDemo';
import { getRegisterTypeText } from '@models/expense';

const DashboardPage = () => {
  const isDemoMode = useIsDemoMode();
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월
  const navigationProps = { ...monthNav, isDemoMode };

  const [selectedTab, setSelectedTab] = useState<TabOption>('TAB_SPEND'); // 지출 탭 기본 선택
  const registerType = selectedTab === 'TAB_SPEND' ? 'SPEND' : 'SAVE';

  // react-query가 반응해야 하는 것 : slelectedTab 변경, monthNav.currentDate.getMonth()
  const { data, isLoading, error } = useDashboardData(
    monthNav.currentDate,
    selectedTab,
    registerType,
    isDemoMode,
  );

  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId as TabOption);
  };

  const tabData: TabProps<TabOption>[] = [
    {
      id: 'TAB_SPEND',
      label: getRegisterTypeText('SPEND'),
      content:
        !data || isLoading || error ? (
          <InfoWrapper>{error ? <div>An error occurred</div> : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SPEND'} data={data} />
        ),
    },
    {
      id: 'TAB_SAVE',
      label: getRegisterTypeText('SAVE'),
      content:
        !data || isLoading || error ? (
          <InfoWrapper>{error ? <div>An error occurred</div> : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SAVE'} data={data} />
        ),
    },
  ];

  return (
    <NavigationLayout {...navigationProps}>
      <DashboardContainer>
        <TabWrapper>
          <TabLayout tabs={tabData} selectedTab={selectedTab} onTabSelect={handleTabSelect} />
        </TabWrapper>
      </DashboardContainer>
    </NavigationLayout>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 10px;

  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
`;
