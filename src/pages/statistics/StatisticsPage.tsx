import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';

import TabLayout from '@components/layout/TabLayout';
import { useState } from 'react';
import SlideButton from './components/SlideButton';
import { format, subDays } from 'date-fns';
import CategoriesView from './components/CategoriesView';
import Memo from './components/Memo';
import { Register } from '@models/index';

const EmotionComponent = () => <div>감정 컴포넌트</div>;
const DailyComponent = () => <div>일별 컴포넌트</div>;
const SatisfactionComponent = () => <div>만족모 컴포넌트</div>;

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
  const [registerType, setRegisterType] = useState<Register>('SPEND');
  const [selectedTab, setSelectedTab] = useState<string>('TAB_MBTI');

  const today = format(new Date(), 'yyyy.MM.dd');
  const nintyDaysBefore = format(subDays(new Date(), 90), 'yyyy.MM.dd');

  const handleRegisterTypeClick = (isSpend: boolean) => {
    setRegisterType(isSpend ? 'SAVE' : 'SPEND');
  };
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const categories: { id: string; name: string; component: JSX.Element }[] = [
    { id: 'categoryEmotion', name: '감정', component: <EmotionComponent /> },
    { id: 'categoryDaily', name: '일별', component: <DailyComponent /> },
    { id: 'categoryMemo', name: '메모', component: <Memo /> },
    { id: 'categorySatisfaction', name: '만족도', component: <SatisfactionComponent /> },
  ];

  const tabData = [
    {
      id: 'TAB_MBTI',
      label: 'MBTI별',
      content: <CategoriesView categories={categories} />,
    },
    {
      id: 'TAB_GENDER',
      label: '성별',
      content: <Content>성별</Content>,
    },
  ];

  console.log(registerType); //FIXME: 임시 탭 action

  return (
    <NavigationLayout>
      <OptionContainer>
        <SlideButton onClick={handleRegisterTypeClick} />
        <Period>{`${today}~${nintyDaysBefore}기준`}</Period>
      </OptionContainer>
      <StatisticsContainer>
        <TabLayout
          tabs={tabData}
          selectedTab={selectedTab}
          onTabSelect={handleTabSelect}
          tabHeaderColor="#9F9F9F"
          activeTabHeaderColor="#575755"
          indicatorColor="#575755"
        />
      </StatisticsContainer>
    </NavigationLayout>
  );
};

export default StatisticsPage;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
`;

const Period = styled.div`
  color: #bcbcbc;
  font-size: 12px;
`;
const StatisticsContainer = styled.div`
  background-color: transparent;
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
  height: 1000px; // 스크롤 생기는것 확인하시라고 예시로 1000px 넣어뒀습니다.
`;
