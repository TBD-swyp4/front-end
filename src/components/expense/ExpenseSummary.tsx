// 만족도 점수, 물건, 지출, 감정을 props로 넘겨받는다.
import SatisfactionRange from '@components/expense/SatisfactionRange';
import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';
import { addCommasToNumber } from '@utils/index';

type ExpenseSummaryProps = {
  subject: string;
  price: number;
  satisfaction: number;
  emotion: string;
  hideHeader?: boolean;
};
const ExpenseSummary = ({
  subject,
  price,
  satisfaction,
  emotion,
  hideHeader = false,
}: ExpenseSummaryProps) => {
  return (
    <Container>
      {!hideHeader && <EmotionText>{`${emotion} ${satisfaction}점`}</EmotionText>}
      <RangeWrapper>
        <SatisfactionRange satisfaction={satisfaction} />
      </RangeWrapper>
      <Info>
        <InfoItem>
          <span className="info-text">물건</span>
          <span className="info-price">{subject}</span>
        </InfoItem>
        <InfoItem>
          <span className="info-text">지출</span>
          <span className="info-price">{`${addCommasToNumber(price)}원`}</span>
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
