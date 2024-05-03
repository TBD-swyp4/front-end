import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 상단 바에서 쓰일 아이콘들 선언
import SettingIcon from '@assets/images/icon/settingIcon.svg?react';
import PrevIcon from '@assets/images/icon/prevButton.svg?react';
import CloseIcon from '@assets/images/icon/closeButton.svg?react';
import LogoIcon from '@assets/images/icon/logo.svg?react';

// top bar은 왼/중/오 세가지를 가진다.
type TopBarProps = {
  leftContent?: React.ReactNode; // 주로 뒤로가기 버튼이 들어감
  centerContent?: React.ReactNode; // 주로 화면 이름이나 상태가 들어감
  rightContent?: React.ReactNode; // 주로 x 버튼이나 환경설정이 들어감
};
const TopBar = ({ leftContent, centerContent, rightContent }: TopBarProps) => {
  return (
    <Wrapper>
      <Item type="flex-start">{leftContent}</Item>
      <Item type="center">{centerContent}</Item>
      <Item type="flex-end">{rightContent}</Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50px; // 최상단 바 높이
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 각각 1/3 비율씩 갖도록..
const Item = styled.div<{ type: string }>`
  flex: calc(100% / 3);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.type};
  margin: 10px;
`;

const buttonStyle = css`
  color: #292d32; // svg 파일에 fill 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  stroke: currentColor; // 현재 컬러를 stroke 색상으로 사용
  stroke-width: 3; // svg 파일에 stroke 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  transition:
    color 0.2s,
    transform 0.2s,
    stroke-width 0.2s; // 트랜지션 추가
  cursor: pointer;
  &:hover {
    color: #555; // 마우스 호버 시 색상 변경
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 10;
  }
`;

const CloseBtnWrapper = styled(CloseIcon)`
  ${buttonStyle}
  width: 20px;
  height: 20px;
  justify-content: flex-end;
`;

// 어떤 이벤트가 발생할지 모르는 버튼, 스타일 컴포넌트로 돌려주기
const PrevBtn = styled(PrevIcon)`
  ${buttonStyle}
  width: 20px;
  height: 20px;
`;

const SettingBtnWrapper = styled(SettingIcon)`
  ${buttonStyle}
  width: 24px;
  height: 24px;
`;

// 기능이 확실히 고정된 버튼
const SettingBtn = () => {
  const navigate = useNavigate();
  return (
    <SettingBtnWrapper
      onClick={() => {
        navigate('/setting');
      }}
    />
  );
};

const CloseBtn = () => {
  const navigate = useNavigate();
  return (
    <CloseBtnWrapper
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};

// 이것 역시 가져다 쓰는 곳에서 topnavigation->topbar->closebutton으로 접근 가능해
// import 구문이 필요 없다.
TopBar.PrevButton = PrevBtn;
TopBar.Logo = LogoIcon; // 로고는 좀 모양이 달라질 수 있음.
TopBar.SettingButton = <SettingBtn />;
TopBar.CloseButton = <CloseBtn />;

export default TopBar;
