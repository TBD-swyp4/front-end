import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import type { EmotionAmountTotalType } from '@models/api/dashboard';
import { calculatePercentages } from '@utils/index';

type EmotionChartProps = {
  data: EmotionAmountTotalType[];
};

const EmotionChart = ({ data }: EmotionChartProps) => {
  return (
    <Container>
      {/* <div>{JSON.stringify(data)}</div> */}
      <div>{calculatePercentages(data.map((data) => data.amount)).join('/')}</div>
    </Container>
  );
};

export default EmotionChart;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 200px;
  background-color: green;
`;
