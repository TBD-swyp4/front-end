import { flexCenter } from '@styles/CommonStyles';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <Circle />
    </SpinnerWrapper>
  );
};

export default Spinner;

// Spinner 스타일 컴포넌트
const SpinnerWrapper = styled.div`
  ${flexCenter}
  width: 100%;
`;
// 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Circle = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1); // 회색 테두리
  border-top: 8px solid #47cfb0; // 파란색 상단 테두리
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;
