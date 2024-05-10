// styles/CommonStyles.js
import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumnCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumnBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const buttonReset = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

export const mainSection = css`
  background-color: ${(props) => props.theme.colors.contentBox};
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.under};
  display: flex;
  padding: 15px;
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const overflowWithoutScroll = css`
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const addPageContainer = css`
  ${overflowWithoutScroll}
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
`;
export const addPageSubject = css`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.font};
  height: 40px;
`;

export const borderCheck = css`
  content: '';
  position: absolute;
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid;
  border-width: 0 3px 3px 0;
  border-radius: 2px;
  transform: rotate(45deg);
  border-color: #bbb; // 회색 체크 마크
`;
