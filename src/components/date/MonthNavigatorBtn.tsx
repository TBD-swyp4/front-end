import { format, startOfMonth, endOfMonth } from 'date-fns';
import styled from 'styled-components';
import { PrevBtn } from '@components/button';
import { flexCenter } from '@styles/CommonStyles';

type MonthNavigatorBtnProps = {
  currentDate: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  color?: string;
};
const MonthNavigatorBtn = ({
  currentDate,
  handlePrevMonth,
  handleNextMonth,
  color = 'black',
}: MonthNavigatorBtnProps) => {
  const startDate: Date = startOfMonth(currentDate);
  const endDate: Date = endOfMonth(currentDate);

  const formatDate = (date: Date): string => format(date, 'yyyy.MM.dd');

  return (
    <Wrapper color={color}>
      <BtnWrapper>
        <NavBtn color={color} onClick={handlePrevMonth} />
      </BtnWrapper>
      <Text>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</Text>
      <BtnWrapper>
        <NavBtn className="rotate-180" color={color} onClick={handleNextMonth} />
      </BtnWrapper>
    </Wrapper>
  );
};

export default MonthNavigatorBtn;

const Wrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  width: 220px;

  color: ${(props) => props.color};
`;
const BtnWrapper = styled.div`
  ${flexCenter}
  height: 100%;
  /* padding-top: 3px; */
  margin-left: 8px;
  margin-right: 8px;
`;
const NavBtn = styled(PrevBtn)<{ color: string }>`
  width: 10px;
  height: 10px;
  color: ${(props) => props.color};
  stroke-width: 3;

  &:hover {
    color: ${(props) => props.color};
    transform: scale(1.2);
    stroke-width: 4;
  }

  &.rotate-180 {
    transform: rotate(180deg);
  }
  &.rotate-180:hover {
    transform: scale(1.2) rotate(180deg);
  }
`;

const Text = styled.span`
  ${flexCenter}
`;
