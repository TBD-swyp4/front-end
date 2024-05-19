import type { DashboardPageDataType } from '@models/api/dashboard';
import { Register } from '@models/index';
import styled from 'styled-components';
import EmotionChart from './EmotionChart';
import DailyChart from './DailyChart';
import { flexColumnCenter } from '@styles/CommonStyles';
import { formatYM } from '@utils/index';
import EmotionList from './EmotionList';

type TabContentProps = {
  currentDate: Date;
  registerType: Register;
  data: DashboardPageDataType;
};

const TabContent = ({ currentDate, registerType, data }: TabContentProps) => {
  return (
    <Container>
      <Message>
        <span>이번 달</span>
        <span>
          {`${registerType == 'SPEND' ? '소비' : '절약'}만족도는 
        ${data.satisfactionAverage.toFixed(1)}`}
          <span className="score"> / 5 </span>
          점이에요
        </span>
        <span className="date">{`${formatYM(currentDate)} 기준`}</span>
      </Message>
      <EmotionChart data={data.emotionAmountTotal} />
      <EmotionList data={data.emotionAmountTotal} />
      <DailyChart data={data.dailyAmount} />
    </Container>
  );
};

export default TabContent;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  height: 75px;
  /* background-color: red; */

  font-size: 20px;
  font-weight: 700;
  color: #333331;

  & span.score {
    font-size: 14px;
    color: #767676;
  }

  & > span.date {
    font-size: 10px;
    font-weight: 400;
    color: #767676;
  }
`;
