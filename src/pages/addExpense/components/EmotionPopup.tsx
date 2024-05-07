import {
  addPageSubject,
  flexCenter,
  flexColumnCenter,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import styled from 'styled-components';
import { EmotionKeys, EmotionTexts, EmotionColors } from './../../../types/emotionType';

type EmotionPopupProps = {
  selectEmotion: (emotion: string, color: string) => void;
};

const EmotionPopup = ({ selectEmotion }: EmotionPopupProps) => {
  return (
    <Container>
      <Subject>감정을 하나 골라주세요.</Subject>
      <EmotionContainer>
        {EmotionKeys.map((x, i) => (
          <EmotionWrapper key={x}>
            <EmotionColor
              color={EmotionColors[i]}
              onClick={() => {
                selectEmotion(x, EmotionColors[i], EmotionTexts[i]);
              }}></EmotionColor>
            <EmotionText>{EmotionTexts[i]}</EmotionText>
          </EmotionWrapper>
        ))}
      </EmotionContainer>
    </Container>
  );
};

export default EmotionPopup;

const Container = styled.div`
  ${overflowWithoutScroll}

  width: 350px;
  height: 600px;

  padding: 20px;

  border-radius: 10px;
  box-shadow: ${(props) => props.theme.shadows.around};

  background-color: #fff;

  // 스크롤 시에도 하단에 여백 나타내기
  /* &::after {
    content: '';
    display: block;
    height: 50px;
  } */
`;

const Subject = styled.div`
  ${addPageSubject}
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const EmotionContainer = styled.div`
  ${flexCenter}
  flex-wrap: wrap;
  width: 100%;

  gap: 20px;
`;

const EmotionWrapper = styled.div`
  ${flexColumnCenter}
  margin-bottom: 10px;
`;

const EmotionColor = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 5px;
  cursor: pointer;
`;
const EmotionText = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-size: 12px;
  font-weight: 300;
`;
