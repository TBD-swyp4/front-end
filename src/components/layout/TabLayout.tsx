import useWindowWidthResize from '@hooks/useWindowWidthResize';
import { flexCenter } from '@styles/CommonStyles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type TabProps = {
  id: string;
  label: string;
  content: React.ReactNode; // 탭의 내용을 React 노드로 정의
};

type TabsProps = {
  tabs: TabProps[];
  selectedTab: string;
  onTabSelect: (tabId: string) => void;
  tabHeaderColor?: string;
  activeTabHeaderColor?: string;
  indicatorColor?: string;
  indicatorRailColor?: string;
};

const TabLayout = ({
  tabs,
  selectedTab,
  onTabSelect,
  tabHeaderColor = '#9F9F9F',
  activeTabHeaderColor = '#575755',
  indicatorColor = '#575755',
  indicatorRailColor = '#DDDDDD',
}: TabsProps) => {
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorOffset, setIndicatorOffset] = useState<number>(0);

  const handleResize = useCallback(() => {
    const tab = tabRefs.current[selectedTab];
    if (tab && tab.parentNode && tab.parentNode instanceof HTMLElement) {
      const extraWidth = 70; // 추가 너비
      const rect = tab.getBoundingClientRect(); // 탭의 위치와 크기를 정확히 계산
      const parentRect = tab.parentNode.getBoundingClientRect(); // 부모 요소의 위치와 크기 계산
      const newWidth = rect.width + extraWidth;
      const newOffset = rect.left - parentRect.left - extraWidth / 2; // 부모 요소 기준으로 상대적 위치 계산
      setIndicatorWidth(newWidth);
      setIndicatorOffset(newOffset);
    }
  }, [selectedTab]);

  useEffect(() => {
    handleResize();
  }, [selectedTab, tabs, handleResize]);
  // 윈도우 리사이즈 시에도, 탭 인디게이터가 따라다니도록 호출
  useWindowWidthResize(handleResize);

  return (
    <TabsContainer>
      <TabHeaders>
        {tabs.map((tab) => (
          <TabHeader
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            isactive={(selectedTab === tab.id).toString()}
            activecolor={activeTabHeaderColor}
            color={tabHeaderColor}>
            {tab.label}
          </TabHeader>
        ))}
      </TabHeaders>
      <TabIndicatorRail color={indicatorRailColor} />
      <TabIndicator width={indicatorWidth} offset={indicatorOffset} color={indicatorColor} />
      {tabs.map((tab) => selectedTab === tab.id && <TabPanel key={tab.id}>{tab.content}</TabPanel>)}
    </TabsContainer>
  );
};

export default TabLayout;

const TabsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TabHeaders = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const TabHeader = styled.div<{
  isactive: string;
  activecolor: string;
  color: string;
}>`
  ${flexCenter}
  position: relative;
  cursor: pointer;
  padding: 0 20px 0 20px;
  font-size: 16px;
  height: 30px;
  color: ${(props) => (props.isactive === 'true' ? props.activecolor : props.color)};
  font-weight: ${(props) => (props.isactive === 'true' ? 700 : 400)};
`;

const TabIndicatorRail = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.color};
`;

const TabIndicator = styled.div<{
  width: number;
  offset: number;
  color: string;
}>`
  height: 4px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  position: absolute;
  left: ${(props) => props.offset}px;
  width: ${(props) => props.width}px;
  transition:
    left 0.3s ease,
    width 0.3s ease;
`;

const TabPanel = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
