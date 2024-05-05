import styled from 'styled-components';
import BackgroundPortal from '@utils/ui/BackgroundPortal';

type BackgroundProps = {
  height: string;
  color: string;
};

const Background = ({ height = '100%', color = 'pink' }: BackgroundProps) => {
  return (
    <BackgroundPortal>
      <Overlay height={height} color={color} />
    </BackgroundPortal>
  );
};

export default Background;

const Overlay = styled.div<{ height: string; color: string }>`
  position: absolute;
  width: 100%;
  height: ${(props) => props.height};
  top: 0;
  left: 0;
  background: ${(props) => props.color};
  z-index: -1;
`;
