import styled from 'styled-components';
import NotFoundIcon from '@assets/images/icon/404.svg?react';
import { useNavigate } from 'react-router-dom';
import { flexCenter } from '@styles/CommonStyles';

const ErrorPage = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <NotFoundIcon></NotFoundIcon>
      <PrevButton
        onClick={() => {
          navigator(-1);
        }}>
        뒤로가기
      </PrevButton>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  ${flexCenter}
  background-color: transparent;
  width: 100%;
  height: 100%;
  gap: 150px;
  flex-direction: column;
`;

const PrevButton = styled.button`
  width: 300px;
  height: 80px;
  border-radius: 40px;
  border: 6px solid ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.button};
  font-weight: 400;
  font-size: 30px;
  text-align: center;
`;
