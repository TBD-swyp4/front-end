// import axios from 'axios';
import styled from 'styled-components';
import { flexCenter } from '@styles/CommonStyles';

type ProviderName = 'naver' | 'kakao' | 'google';

type SocialLoginProps = {
  provider: ProviderName;
};

const SocialLogin = ({ provider }: SocialLoginProps) => {
  const AUTH_URL = `${import.meta.env.VITE_BASE_URL}/users/login/${provider}`;
  const isDevelopment = import.meta.env.MODE === 'development';

  if (isDevelopment) {
    // 로컬일 경우 바로 인증
    return <Button href="/auth">{provider}</Button>;
  } else {
    // 소셜 로그인에 성공하면, 서버에서 "/auth" 페이지로 리다이렉트 시켜준다.
    return <Button href={AUTH_URL}>{provider}</Button>;
  }
};

export default SocialLogin;

// 소셜 로그인 이미지 찾아야함 (피그마 svg 깨짐)
const Button = styled.a`
  ${flexCenter}
  background-color: #b0aeae;
  cursor: pointer;
  width: 358px;
  height: 60px;
  border-radius: 6px;
  margin: 5px;
  font-size: 20px;
`;
