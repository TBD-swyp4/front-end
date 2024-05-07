import {
  addPageContainer,
  addPageSubject,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import VoiceMultiText from '@components/input/VoiceMultiText';
import { addCommasToNumber } from '@utils/index';
// 사건, 생각, 감정
const WriteEmotion = () => {
  const {
    // register,
    getValues,
    // formState: { errors },
    // watch,
  } = useFormContext();

  const prevValue = getValues(['registerType', 'content', 'amount', 'date']);
  const summaryText = `${prevValue[3]} 에 '${prevValue[1]}'로 ${addCommasToNumber(prevValue[2])}원을 
  ${prevValue[0] == 'spend' ? '지출' : '절약'}했어요.`;

  return (
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
      </EmotionContainer>
    </Container>
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
  justify-content: flex-start;
  width: 100%;
`;
