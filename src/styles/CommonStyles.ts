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
