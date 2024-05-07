import styled from 'styled-components';
import { useAuthStore } from '@stores/authStore';

type ProviderName = 'naver' | 'kakao'; //| 'google'

type ButtonProps = {
  provider: ProviderName;
};

type SocialLoginProps = {
  provider: ProviderName;
};

const SocialLogin = ({ provider }: SocialLoginProps) => {
  //   const AUTH_URL = `${import.meta.env.VITE_SPINLOG_SERVER_URL}/oauth2/authorization/${provider}`; // api 서버 돌아가면 변경할 것
  const AUTH_URL = `${import.meta.env.VITE_NGROK_URL}/oauth2/authorization/${provider}`;

  const { setLoginState } = useAuthStore((state) => {
    return { setLoginState: state.setLoginState };
  });

  const handleClickLogin = () => {
    location.replace(`${AUTH_URL}`);
    setLoginState();
  };

  return <Button provider={provider} onClick={handleClickLogin} />;
};

export default SocialLogin;

const Button = styled.button<ButtonProps>`
  background-image: ${(props) =>
    props.provider === 'kakao'
      ? 'url("https://i.ibb.co/2cdRQ7x/kakao-login-large-wide.png")'
      : props.provider === 'naver'
        ? 'url("https://i.ibb.co/Pj8Mfpv/naver-login-large-wide.png")'
        : ''}; // google 로그인 이미지 삽입
  // : 'url("https://i.ibb.co/dsadsadsa/google-login-large-wide.png")'};
  background-size: 100%;
  cursor: pointer;
  width: 21.874rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  margin: 5px;
`;
