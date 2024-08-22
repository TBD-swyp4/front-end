import { PagePath } from '@models/navigation';
import { RiSettings4Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type GoSettingButtonProps = {
  isWhite?: boolean;
};

const GoSettingButton = ({ isWhite = false }: GoSettingButtonProps) => {
  const navigate = useNavigate();

  return (
    <Setting
      $isWhite={isWhite}
      onClick={() => {
        navigate(PagePath.Setting);
      }}
    />
  );
};

export default GoSettingButton;

const Setting = styled(RiSettings4Fill)<{ $isWhite: boolean }>`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1); // 10% 크기 증가
  }
  color: ${(props) =>
    props.$isWhite ? props.theme.topNavigation.iconWhite : props.theme.topNavigation.iconGray};
`;
