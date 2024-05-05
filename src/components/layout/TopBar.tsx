import styled from 'styled-components';

import { CloseBtn, PrevBtn, SettingBtn, LogoBtn } from '@components/button';

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

// 이것 역시 가져다 쓰는 곳에서 topnavigation->topbar->closebutton으로 접근 가능해 import 구문이 필요 없다.
TopBar.PrevButton = PrevBtn;
TopBar.SettingButton = SettingBtn;
TopBar.CloseButton = CloseBtn;
TopBar.LogoButton = LogoBtn;

export default TopBar;
