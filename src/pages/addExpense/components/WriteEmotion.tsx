import {
  addPageContainer,
  addPageSubject,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import { useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import VoiceMultiText from '@components/input/VoiceMultiText';
import { addCommasToNumber } from '@utils/index';
import { useEffect, useState } from 'react';
import Modal from '@components/modal';
import EmotionPopup from './EmotionPopup';
import { getEmotionText, getEmotionColor } from '../../../types/emotionType';

// 사건, 생각, 감정
const WriteEmotion = () => {
  const { register, getValues, setValue } = useFormContext();

  const prevValue = getValues(['registerType', 'content', 'amount', 'date']);
  const summaryText = `${prevValue[3]} 에 '${prevValue[1]}'로 ${addCommasToNumber(prevValue[2])}원을 
  ${prevValue[0] == 'spend' ? '지출' : '절약'}했어요.`;

  const emotionKey = getValues('emotion');

  const [isSelectEmotion, setIsSelectEmotion] = useState<boolean>(false);
  const [emotionColor, setEmotionColor] = useState<string>('#4F4F4F');
  const [emotionText, setEmotionText] = useState<string>('없음');
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const selectEmotion = (emotion: string) => {
    setValue('emotion', emotion, { shouldValidate: true });
    updateEmotionState(emotion);
    toggleModal();
  };

  const updateEmotionState = (key: string) => {
    setIsSelectEmotion(true);
    setEmotionColor(getEmotionColor(key));
    setEmotionText(getEmotionText(key));
  };

  useEffect(() => {
    if (emotionKey) {
      updateEmotionState(emotionKey);
    }
  }, [emotionKey]);

  return (
    <>
      <Container>
        <Subject>그 때 사건과 생각을 말해주세요.</Subject>
        <Summary>{summaryText}</Summary>
        <EventContainer>
          <VoiceMultiText
            hookFormFieldName="event"
            title="사건"
            placeholder="예) 부장님이 소리 지름"
          />
        </EventContainer>
        <ThoughtContainer>
          <VoiceMultiText
            hookFormFieldName="thought"
            title="생각"
            placeholder="예) 별 일도 아닌데 왜저래?.."
          />
        </ThoughtContainer>
        <EmotionContainer>
          {/* 필수값 */}
          <Subject>
            어떤 감정을 느꼈나요?
            <span className="required">* 필수</span>
          </Subject>
          <HiddenInput {...register('emotion', { required: true })} />
          <Emotion>
            {!isSelectEmotion ? (
              <>
                <EmotionEditBtn onClick={toggleModal} />
                <span className="select">감정 선택</span>
              </>
            ) : (
              <>
                <EmotionEditBtn onClick={toggleModal} className="edit" />
                <EmotionColor color={emotionColor}></EmotionColor>
                <EmotionText>{emotionText}</EmotionText>
              </>
            )}
          </Emotion>
        </EmotionContainer>
      </Container>
      {showModal && (
        <Modal onClose={toggleModal}>
          <EmotionPopup selectEmotion={selectEmotion}></EmotionPopup>
        </Modal>
      )}
    </>
  );
};

export default WriteEmotion;

const Container = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  ${overflowWithoutScroll}
  ${addPageContainer}
`;
const Subject = styled.h1`
  ${addPageSubject}
  width: 100%;

  & span.required {
    margin-left: 5px;
    color: #f3905b;
    font-size: 12px;
    font-weight: 400;
  }
`;
const Summary = styled.div`
  ${mainSection}
  ${flexCenter}
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 14px;
  color: #575755;
`;

const EventContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const ThoughtContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;
const EmotionContainer = styled.div`
  ${flexColumnCenter}
  align-items: flex-start;
  width: 100%;
`;

const EmotionBorder = css`
  border-radius: 8px;
  border: 1px dashed #bcbcbc;
`;

const Emotion = styled.div`
  ${flexColumnCenter}
  ${EmotionBorder}
  position: relative;

  width: 120px;
  height: 120px;

  background-color: #fff;

  & span.select {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 300;
    color: #9f9f9f;
  }
`;

const EmotionEditBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dddddd;

  &:hover {
    background-color: #c9c5c5;
  }

  &.edit {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  transition: background-color 0.2s ease-out;

  // + 그리기
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #9f9f9f; // + 기호의 색상
    border-radius: 10px;

    // 중앙 정렬
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 10px; /* 가로 막대의 너비 */
    height: 2px; /* 가로 막대의 높이 */
  }

  &::after {
    width: 2px; /* 세로 막대의 너비 */
    height: 10px; /* 세로 막대의 높이 */
  }
`;

const EmotionColor = styled.div<{ color: string }>`
  ${EmotionBorder}
  width: 100%;
  height: 75%;
  background-color: ${(props) => props.color};
`;

const EmotionText = styled.div`
  ${flexCenter}
  width: 100%;
  height: 25%;
  font-size: 12px;
  font-weight: 500;
`;

const HiddenInput = styled.input.attrs({ type: 'text' })`
  opacity: 0;
  position: absolute;
`;
