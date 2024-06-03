import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import GoLoginBird from '@assets/images/bird/goLoginBird.svg?react';
import useToast from '@hooks/useToast';

const GoLogin = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore((state) => {
    return { setLogoutState: state.setLogoutState };
  });
  return (
    <Container>
      <Message>
        <Bird />
        <Text>{`'체험하기'에서는 이용할 수 없어요.`}</Text>
        <Text>로그인 하러 가보실까요?</Text>
      </Message>
      <Button
        $bottom="122px"
        onClick={() => {
          // 로컬 데이터 초기화 넣기?
          setLogoutState();
          showToast('체험하기가 종료되었습니다.');
        }}>
        로그인 하러 가기
      </Button>
      <Button
        className="later"
        $bottom="50px"
        onClick={() => {
          navigate(-1);
        }}>
        나중에 할게요
      </Button>
    </Container>
  );
};

export default GoLogin;

const Container = styled.div`
  ${flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
`;

const Message = styled.div`
  ${flexColumnCenter}
  position: relative;
  gap: 5px;
  margin-bottom: 190px;
`;

const Text = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const Button = styled.div<{ $bottom: string }>`
  ${flexCenter}
  position: absolute;
  bottom: ${(props) => props.$bottom};
  width: 358px;
  height: 60px;
  border-radius: 6px;
  background-color: #47cfb0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &.later {
    background-color: #dddddd;
    color: #767676;
  }
`;

const Bird = styled(GoLoginBird)`
  position: absolute;
  left: -20px;
  top: -40px;
  z-index: -1;
`;
