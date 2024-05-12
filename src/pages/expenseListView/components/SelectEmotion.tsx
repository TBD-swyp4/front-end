import styled from 'styled-components';

import { EmotionKey, EmotionKeys } from '@models/index';
import Emotion from '@components/emotion';
import { useFormContext } from 'react-hook-form';

const SelectEmotion = () => {
  const { setValue, watch, getValues } = useFormContext();
  const selectedOptions = watch('emotion'); // 감정 문자열 배열

  const handleCheckboxChange = (selectEmotion: EmotionKey) => {
    const value: EmotionKey = selectEmotion;

    const currentValues: EmotionKey[] = getValues('emotion');
    // 포함되어 있었다는 건, 체크 해제로 변경 / 포함되었다는건 체크로 변경한다는 뜻이라 ! 추가
    const checked: boolean = !currentValues.includes(value);

    if (checked) {
      // 체크되면 값을 배열에 추가
      setValue('emotion', [...currentValues, value]);
    } else {
      // 체크 해제되면 값을 배열에서 제거
      setValue(
        'emotion',
        currentValues.filter((item) => item !== value),
      );
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <span className="sub-title">감정 선택</span>
      </div>
      <EmotionContainer>
        {EmotionKeys.map((x) => (
          <div key={x} style={{ width: '56px', height: '70px' }}>
            <Emotion
              emotionKey={x}
              isSelect={selectedOptions.includes(x)}
              onClick={() => {
                handleCheckboxChange(x);
              }}
              iconSize={45}
              textSize={12}
              selectSize={24}
            />
          </div>
        ))}
      </EmotionContainer>
    </Container>
  );
};

export default SelectEmotion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  gap: 30px;
`;

const EmotionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
  width: 100%;

  gap: 30px;
`;
