import { flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';
import type { EmotionKey } from '../../types/emotionType';
import { getEmotionColor, getEmotionText } from '../../types/emotionType';

type EmotionProps = {
  emotionKey: EmotionKey; // key에 맞는 감정의 아이콘(색), 텍스트 표시
  isSelect: boolean; // true일 경우 우측 상단에 초록색 체크 표시
  onClick: () => void; // 클릭 이벤트 실행 (부모 컴포넌트는 setState 함수를 실행시키는 함수를 보내야함)
  iconSize?: number;
  textSize?: number;
};
const Emotion = ({ emotionKey, isSelect, onClick, iconSize = 80, textSize = 12 }: EmotionProps) => {
  return (
    <EmotionWrapper>
      <EmotionIcon
        onClick={onClick}
        size={`${iconSize}px`}
        color={getEmotionColor(emotionKey)}></EmotionIcon>
      <EmotionText size={`${textSize}px`}>{getEmotionText(emotionKey)}</EmotionText>
      {isSelect && '얘 팝업에서 선택'}
    </EmotionWrapper>
  );
};

export default Emotion;

const EmotionWrapper = styled.div`
  ${flexColumnCenter}
  margin-bottom: 10px;
`;

const EmotionIcon = styled.div<{ color: string; size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 5px;
  cursor: pointer;
`;

const EmotionText = styled.div<{ size: string }>`
  color: ${(props) => props.theme.colors.font};
  font-size: ${(props) => props.size};
  font-weight: 300;
`;
