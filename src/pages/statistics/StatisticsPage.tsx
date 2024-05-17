import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';

import TabLayout from '@components/layout/TabLayout';
import { useState } from 'react';

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
              <TopNavigation.TopBar.CenterTitle>둘러보기</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
      <BottomNavigation location="statistics" />
    </>
  );
};

const StatisticsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>('TAB_MBTI'); // 지출 탭 기본 선택
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
  };

  // content에 탭 컴포넌트 넣기
  const tabData = [
    {
      id: 'TAB_MBTI',
      label: 'MBTI별',
      content: <Content>엠비티아이이</Content>,
    },
    {
      id: 'TAB_GENDER',
      label: '성별',
      content: <Content>성별</Content>,
    },
  ];
  return (
    <NavigationLayout>
      <StatisticsContainer>
        <TabLayout
          tabs={tabData}
          selectedTab={selectedTab}
          onTabSelect={handleTabSelect}
          tabHeaderColor="#9F9F9F" // 탭 헤더 글씨 색
          activeTabHeaderColor="#575755" // 선택된 탭 헤더 글씨 색
          indicatorColor="#575755" // 선택된 탭 인디게이터 색 (indicatorRailColor 넘기면 인디게이터 레일 색도 지정 가능)
        />
      </StatisticsContainer>
    </NavigationLayout>
  );
};

export default StatisticsPage;

const StatisticsContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;

// #20240517.syjang, 예시 Content 입니다.
const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1000px; // 스크롤 생기는것 확인하시라고 예시로 1000px 넣어뒀습니다.
  padding-top: 4px; // indigator 영역만큼 padding 주기 ( 패딩 더 추가하시려면, 4px 더해서 계산하면 됩니다. )
`;
