import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import EmotionChart from './EmotionChart';
import EmotionList from './EmotionList';

import type { DashboardPageDataType } from '@models/api/dashboard';
import type { Register } from '@models/index';

import { formatYM } from '@utils/index';
import DailyChart from './DailyChart';

type EmotionContentProps = {
  currentDate: Date;
  registerType: Register;
  data: DashboardPageDataType;
};

const TabContent = ({ currentDate, registerType, data }: EmotionContentProps) => {
  const isDataExist = data.dailyAmount?.length && data.dailyAmount.length !== 0;
  const registerText = registerType == 'SPEND' ? '소비' : '절약';
  return (
    <Container>
      {!isDataExist ? (
        <EmptyMessage>{`${formatYM(currentDate, 'word')}에는 등록한 ${registerText} 내역이 없습니다.`}</EmptyMessage>
      ) : (
        <>
          <SatisfactionMessage>
            <span>이번 달</span>
            <span>
              {`${registerText}만족도는 
        ${data.satisfactionAverage.toFixed(1)}`}
              <span className="score"> / 5 </span>
              점이에요
            </span>
            <span className="date">{`${formatYM(currentDate)} 기준`}</span>
          </SatisfactionMessage>
          <EmotionChart data={data.emotionAmountTotal} />
          <EmotionList data={data.emotionAmountTotal} />
          <Divider />
          <DailyMessage>
            <span>{`일별 감정${registerText}액`}</span>
            <span className="date">{`${formatYM(currentDate)} 기준`}</span>
          </DailyMessage>
          <DailyChart date={currentDate} data={data.dailyAmount} />
        </>
      )}
    </Container>
  );
};

export default TabContent;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 10px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #767676;
  margin-top: 280px;
`;

const SatisfactionMessage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  height: 75px;

  font-size: 20px;
  font-weight: 700;
  color: #333331;

  & span.score {
    font-size: 16px;
    color: #767676;
  }

  & > span.date {
    font-size: 10px;
    font-weight: 400;
    color: #767676;
  }
`;

const DailyMessage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;

  width: 100%;

  font-size: 16px;
  font-weight: 600;
  color: #575755;

  & > span.date {
    font-size: 10px;
    font-weight: 400;
    color: #767676;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: #e7e7e7;
  margin-bottom: 20px;
`;
