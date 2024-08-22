import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { RiSettings4Fill } from 'react-icons/ri';

import { commonButtonStyle } from '@styles/CommonStyles';

export const XIcon = styled(IoClose)`
  ${commonButtonStyle}
`;

export const SettingIcon = styled(RiSettings4Fill)`
  ${commonButtonStyle}
`;
