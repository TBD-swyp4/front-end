import {
  flexBetween,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import styled from 'styled-components';
import { PrevBtn } from '@components/button';

import { useState } from 'react';

import Modal from '@components/modal';
import TopBar from '@components/layout/TopBar';
import ExpenseSummary from '@components/expense/ExpenseSummary';

import type { ExpenseSummaryType } from '@models/expense';

import { formatYM } from '@utils/index';

type DayExpenseListTop2Props = {
  data: ExpenseSummaryType[];
  currentDate: Date;
};

const DayExpenseListTop2 = ({ data, currentDate }: DayExpenseListTop2Props) => {
  const dataTop2 = data.slice(0, 2);

  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <DateInfo>
          {formatYM(currentDate, 'word')} 내역
          {/* 2건 이하인 경우, 더보기 버튼을 보이지 않는다. */}
          {data.length > 2 && <ShowMoreBtn onClick={toggleModal} />}
        </DateInfo>
        <Summary>
          {dataTop2.length === 0
            ? '작성 내역이 없습니다.'
            : dataTop2.map((x, i) => {
                return (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <ExpenseSummary {...x} hideHeader={true} />
                  </div>
                );
              })}
        </Summary>
      </Container>
      {showModal && (
        <Modal isFullScreen={true} onClose={toggleModal}>
          <ExpenseListPopup>
            <PopupHeader>
              <TopBar
                leftContent={<TopBar.PrevButton onClick={toggleModal} />}
                centerContent={<div>지출/절약 내역</div>}
              />
            </PopupHeader>
            <PopupContent>
              <Title>
                {formatYM(currentDate, 'word')} 총 {data.length}건
              </Title>
              <ListWrapper>
                {data.map((x) => {
                  return (
                    <ExpenseBox key={x.articleId}>
                      <ExpenseSummary {...x} />
                    </ExpenseBox>
                  );
                })}
              </ListWrapper>
            </PopupContent>
          </ExpenseListPopup>
        </Modal>
      )}
    </>
  );
};

export default DayExpenseListTop2;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
`;

const DateInfo = styled.div`
  ${flexBetween}
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #333331;
  margin-bottom: 10px;
`;

const Summary = styled.div`
  width: 100%;
`;

const ShowMoreBtn = styled(PrevBtn)`
  width: 20px;
  height: 20px;
  color: #bcbcbc;
  stroke-width: 1.5;

  transform: rotate(180deg);

  &:hover {
    color: #bcbcbc;
    stroke-width: 2;
    transform: rotate(180deg);
  }
`;

const ExpenseListPopup = styled.div`
  ${overflowWithoutScroll}
  position: relative;

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};

  // 헤더 높이만큼 패딩 넣기
  padding-top: 50px;

  padding-left: 15px;
  padding-right: 15px;
`;

const PopupHeader = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 10;
`;

const PopupContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  color: ${(props) => props.theme.font};
  font-size: 20px;
  font-weight: 600;
`;

const ListWrapper = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 5px;
`;
const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;
