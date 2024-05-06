import { flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';
import SatisfactionRange from '@components/expense/SatisfactionRange';
const DayExpenseList = () => {
  return (
    <>
      <Container>
        <ScoreText></ScoreText>
        <SatisfactionWrapper>
          <SatisfactionRange />
        </SatisfactionWrapper>
        <ExpenseDetail></ExpenseDetail>
      </Container>
    </>
  );
};

export default DayExpenseList;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 150px;
  background-color: beige;
`;

const ScoreText = styled.div`
  width: 100%;
  height: 30px;
  background-color: red;
`;

const SatisfactionWrapper = styled.div`
  width: 100%;
  height: 80px;
`;
const ExpenseDetail = styled.div`
  width: 100%;
  height: 30px;
  background-color: yellow;
`;
