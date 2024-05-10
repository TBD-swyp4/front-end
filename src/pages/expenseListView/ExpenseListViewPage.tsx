import styled, { css } from 'styled-components';
import { SearchBtn, PrevBtn } from '@components/button';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Background from '@components/background';
import {
  flexBetween,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';

import ExpenseSummary from '@components/expense/ExpenseSummary';
import mainSub from '../../../public/data/mainSub.json';
import { ExpenseSummaryType } from '@models/expense';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  const [showBackground, setShowBackground] = useState<boolean>(false);
  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle style={{ color: '#ffffff' }}>
                소비 내역 조회
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
      <BottomNavigation />
      {showBackground && <Background height="60px" color="#47CFB0" />}
    </>
  );
};

const ExpenseListViewPage = () => {
  // 데이터 정렬은 최신순 고정(서버에서 그렇게 보내줌)
  const testData = mainSub.data.daySpendList as ExpenseSummaryType[];
  const [isDesc, setIsDesc] = useState<boolean>(true); // 내림차순 = 최신순
  const showData = isDesc ? testData : [...testData].reverse();
  const toggleDesc = () => {
    setIsDesc((prev) => !prev);
  };
  return (
    <NavigationLayout>
      <ExpenseListViewContainer>
        <SearchConditionContainer>
          <FilterWrapper>
            <span className="filter-btn">필터</span>
            <SelectList>
              <Select />
              <Select />
              <Select />
              <Select />
              <Select />
              <Select />
              <Select />
            </SelectList>
          </FilterWrapper>
          <SearchBoxWrapper>
            <SearchBtn />
            <SearchInput type="text" placeholder="감정 메모,소비 내역 등의 키워드를 검색하세요" />
          </SearchBoxWrapper>
        </SearchConditionContainer>
        <ExpenseListContainer>
          <ExpenseListHeader>
            <span className="title">감정소비 리스트</span>
            <span className="sort" onClick={toggleDesc}>
              {isDesc ? (
                <>
                  최신순 <Arrow deg={'270deg'} />
                </>
              ) : (
                <>
                  오래된순 <Arrow deg={'90deg'} />
                </>
              )}
            </span>
          </ExpenseListHeader>
          <ExpenseListContent>
            {showData.map((x) => {
              return (
                <ExpenseBox key={x.articleId}>
                  <ExpenseSummary {...x} />
                </ExpenseBox>
              );
            })}
            <div style={{ height: '5000px', width: '3px' }}></div>
          </ExpenseListContent>
        </ExpenseListContainer>
      </ExpenseListViewContainer>
    </NavigationLayout>
  );
};

export default ExpenseListViewPage;

const ExpenseListViewContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SearchConditionContainer = styled.section`
  ${flexColumnCenter}
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.main};
  width: 100%;
  height: 130px;
  flex-shrink: 0;

  padding: 0 20px 10px 20px;
  gap: 20px;
`;
const FilterWrapper = styled.div`
  ${flexCenter};
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  margin-bottom: 5px;

  & span.filter-btn {
    flex-shrink: 0;
    width: 40px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SelectList = styled.span`
  ${overflowWithoutScroll}
  ${flexCenter}
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
`;

const Select = styled.span`
  width: 70px;
  height: 30px;
  border-radius: 6px;
  background-color: #ffffff;
  flex-shrink: 0;
`;

const SearchBoxWrapper = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
  width: 90%;
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;

  &::placeholder {
    color: #bcbcbc;
  }
`;

const ExpenseListContainer = styled.section`
  ${flexColumnCenter}
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 10px 20px 0 20px;
`;

// 제목, 정렬박스
const ExpenseListHeader = styled.div`
  ${flexBetween}
  width: 100%;
  height: 50px;
  flex-shrink: 0;

  & span.title {
    color: ${(props) => props.theme.font};
    font-size: 20px;
    font-weight: 700;
  }

  & span.sort {
    ${flexCenter}
    gap: 3px;
    color: #767676;
    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
      font-weight: 800;
    }
  }
`;
const ExpenseListContent = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  ${overflowWithoutScroll}
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;

const arrowStyle = css`
  width: 10px;
  height: 10px;
  color: #9f9f9f;
  stroke-width: 4;
`;

const Arrow = styled(PrevBtn)<{ deg: string }>`
  ${arrowStyle}
  transform: rotate(${(props) => props.deg});

  &:hover {
    color: #9f9f9f;
    transform: rotate(90deg);
    stroke-width: 4;
  }
`;
