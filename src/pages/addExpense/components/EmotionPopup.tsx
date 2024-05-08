import { addPageSubject, flexCenter, overflowWithoutScroll } from '@styles/CommonStyles';
import styled from 'styled-components';
import { EmotionKeys } from './../../../types/emotionType';
import { useState } from 'react';
import type { EmotionKey } from '../../../types/emotionType';

import Emotion from '@components/emotion';

type DefaultEmotionType = EmotionKey | ''; //빈값이거나, 선택된 EmotionKey를 받는다.

type EmotionPopupProps = {
  defaultEmotion: DefaultEmotionType; //
  selectEmotion: (emotion: EmotionKey) => void; // 상태 반영하며 닫기
  onClose: () => void; // 모달 그냥 닫기
};

const EmotionPopup = ({ defaultEmotion, selectEmotion, onClose }: EmotionPopupProps) => {
  // 모달 창에서의 선택 emotion 상태
  const [emotion, setEmotion] = useState<DefaultEmotionType>(defaultEmotion);

  // x 버튼을 누를 경우, 그냥 닫아야함.
  const handleClose = () => {
    onClose();
  };

  // 선택한 감정을 기억하고, 확인 버튼을 누를 경우에만 save
  const handleSelect = (emotion: DefaultEmotionType) => {
    if (!emotion) return; // 빈 값인 경우를 체크해준다. -> 디자인 나오면 button에 disable 색으로 변경 필요.
    selectEmotion(emotion);
  };

  return (
    <Container>
      <Subject>감정을 하나 골라주세요.</Subject>
      <div onClick={handleClose}>대충 x 버튼</div>{' '}
      <EmotionContainer>
        {EmotionKeys.map((x) => (
          <Emotion
            key={x}
            emotionKey={x}
            isSelect={x === emotion}
            onClick={() => {
              setEmotion(x);
            }}
          />
        ))}
      </EmotionContainer>
      <div
        style={{ backgroundColor: emotion ? 'red' : 'black' }}
        onClick={() => {
          handleSelect(emotion);
        }}>
        대충 적용 버튼
      </div>
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
