import { format, startOfMonth, endOfMonth } from 'date-fns';
import styled from 'styled-components';
import { PrevBtn } from '@components/button';

type MonthNavigatorBtnProps = {
  currentDate: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};
const MonthNavigatorBtn = ({
  currentDate,
  handlePrevMonth,
  handleNextMonth,
}: MonthNavigatorBtnProps) => {
  const startDate: Date = startOfMonth(currentDate);
  const endDate: Date = endOfMonth(currentDate);

  const formatDate = (date: Date): string => format(date, 'yyyy.MM.dd');

  return (
    <Wrapper>
      <BtnWrapper>
        <NavBtn onClick={handlePrevMonth} />
      </BtnWrapper>
      <Text>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</Text>
      <BtnWrapper>
        <NavBtn style={{ transform: 'rotate(180deg)' }} onClick={handleNextMonth} />
      </BtnWrapper>
    </Wrapper>
  );
};

export default MonthNavigatorBtn;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
  width: 218px;
`;
const BtnWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  margin-left: 8px;
  margin-right: 8px;
`;
const NavBtn = styled(PrevBtn)`
  width: 10px;
  height: 10px;
  color: black;
  stroke-width: 3;

  &:hover {
    color: black;
    transform: scale(1.2); // 10% 크기 증가
    stroke-width: 4;
  }
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
