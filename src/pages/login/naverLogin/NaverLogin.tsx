import styled from 'styled-components';
import { useAuthStore } from './../../../store/authStore';
import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
  const navigator = useNavigate();
  return (
    <Button
      onClick={() => {
        useAuthStore.getState().setLoginState();
        navigator('/');
      }}></Button>
  );
};

export default NaverLogin;

const Button = styled.button`
  background-image: url('https://i.ibb.co/Pj8Mfpv/naver-login-large-wide.png');
  background-size: 100%;
  cursor: pointer;
  width: 21.874rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  margin: 5px;
`;
