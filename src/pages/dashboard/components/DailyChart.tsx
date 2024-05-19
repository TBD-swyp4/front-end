import { DailyAmountType } from '@models/api/dashboard';
import styled from 'styled-components';

type DailyChartProps = {
  data: DailyAmountType[];
};

const DailyChart = ({ data }: DailyChartProps) => {
  return <Container>{JSON.stringify(data)}</Container>;
};

export default DailyChart;

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: blue;
`;
