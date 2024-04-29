import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import './error.css';

const ErrorPage = () => {
  const navigator = useNavigate();
  return (
    <ErrorContainer>
      Error!!
      <button
        onClick={() => {
          navigator(-1);
        }}>
        뒤로가기
      </button>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  width: 390px;
  height: 844px;
  //background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
