import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';
import { PrevBtn } from '@components/button';
import ExpenseSummary from '@components/expense/ExpenseSummary';
const DayExpenseListTop2 = () => {
  const data = [
    { subject: '엽떡', price: 2000, satisfaction: 3, emotion: '불안' },
    { subject: '택시', price: 12000, satisfaction: 2, emotion: '짜증' },
    { subject: '엽떡', price: 2000, satisfaction: 3, emotion: '불안' },
    { subject: '엽떡', price: 2000, satisfaction: 3, emotion: '불안' },
    { subject: '엽떡', price: 2000, satisfaction: 3, emotion: '불안' },
  ];
  const dataTop2 = data.slice(0, 2);

  return (
    <>
      <Container>
        <DateInfo>
          4월 26일 내역
          <ShowMoreBtn />
        </DateInfo>
        <Summary>
          {dataTop2.length === 0
            ? '작성 내역이 없습니다.'
            : dataTop2.map((x, i) => {
                return (
                  <ExpenseSummaryWrapper key={i}>
                    <ExpenseSummary {...x} hideHeader={true} />
                  </ExpenseSummaryWrapper>
                );
              })}
        </Summary>
      </Container>
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

const ExpenseSummaryWrapper = styled.div`
  margin-bottom: 10px;
`;
