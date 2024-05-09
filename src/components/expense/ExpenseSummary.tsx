import styled from 'styled-components';
import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';

import type { ExpenseSummaryType } from '@models/expense';
import { getEmotionText } from '@models/emotion';

import SatisfactionRange from '@components/expense/SatisfactionRange';
import { addCommasToNumber } from '@utils/index';

type ExpenseSummaryProps = ExpenseSummaryType & {
  hideHeader?: boolean;
};
const ExpenseSummary = ({
  articleId,
  registerType,
  amount,
  content,
  satisfaction,
  emotion,
  hideHeader = false,
}: ExpenseSummaryProps) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/expense/${id}`);
  };

  return (
    <Container
      onClick={() => {
        handleClick(articleId);
      }}>
      {!hideHeader && (
        <EmotionText>
          {getEmotionText(emotion)} {satisfaction}점
        </EmotionText>
      )}
      <RangeWrapper>
        <SatisfactionRange satisfaction={satisfaction} />
      </RangeWrapper>
      <Info>
        <InfoItem>
          <span className="info-text">내용</span>
          <span className="info-price">{content}</span>
        </InfoItem>
        <InfoItem>
          <span className="info-text">{registerType === 'SPEND' ? '지출' : '절약'}</span>
          <span className="info-price">{addCommasToNumber(amount)}원</span>
        </InfoItem>
      </Info>
    </Container>
  );
};

export default ExpenseSummary;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 2px;
`;

const EmotionText = styled.div`
  width: 100%;
  font-weight: 700;
  color: #333331;
  font-size: 16px;
  margin-bottom: 10px;
`;

const RangeWrapper = styled.div`
  width: 100%;
`;

const Info = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 5px;
`;

const InfoItem = styled.div`
  ${flexBetween}
  width: 100%;
  flex: 1;

  & span.info-text {
    font-size: 14px;
    color: #9f9f9f;
    font-weight: 300;
  }

  & span.info-price {
    color: #333331;
    font-size: 16px;
    font-weight: 700;
  }
`;
