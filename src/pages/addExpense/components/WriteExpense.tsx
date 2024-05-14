import VoiceMultiText from '@components/input/VoiceMultiText';
import {
  addPageContainer,
  addPageSubject,
  borderCheck,
  flexCenter,
  mainSection,
  overflowWithoutScroll,
  textArea,
  textAreaWrapper,
} from '@styles/CommonStyles';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

// 지출 타입, 내용, 금액, 날짜
const WriteExpense = () => {
  const { register, watch } = useFormContext();
  const [activeLabel, setActiveLabel] = useState('');

  const selectedRegisterType = watch('registerType');
  // 현재 선택된 값에 따라 상태 업데이트
  useEffect(() => {
    setActiveLabel(selectedRegisterType);
  }, [selectedRegisterType]);

  return (
    <Container>
      <Subject>기록하고 싶은 지출/절약을 작성해 주세요.</Subject>
      <RegisterTypeContainer>
        <CustomCheckboxContainer>
          <Label className={activeLabel === 'SPEND' ? 'selected' : ''} htmlFor="spend">
            지출했나요?
          </Label>
          <HiddenRadio id="spend" value="SPEND" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
        <CustomCheckboxContainer>
          <Label className={activeLabel === 'SAVE' ? 'selected' : ''} htmlFor="save">
            절약했나요?
          </Label>
          <HiddenRadio id="save" value="SAVE" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
      </RegisterTypeContainer>

      <ContentContainer>
        <VoiceMultiText
          hookFormFieldName="content"
          title="내용"
          placeholder="예) 엽기떡볶이"
          isRequired={true}
        />
      </ContentContainer>

      <AmountContainer>
        <InputWrapper>
          <span className="title">금액</span>
          <AmountInput placeholder="0" {...register('amount', { required: true })} />
        </InputWrapper>
        <AmountText>원</AmountText>
      </AmountContainer>
      <DateContainer>
        <label htmlFor="date">날짜</label>
        <DatetimeInput id="date" {...register('spendDate', { required: true })}></DatetimeInput>
      </DateContainer>
    </Container>
  );
};

export default WriteExpense;

const Container = styled.div`
  ${overflowWithoutScroll}
  ${addPageContainer}
  display:flex;
  flex-direction: column;
  gap: 10px;
`;
const Subject = styled.h1`
  ${addPageSubject}
`;

const RegisterTypeContainer = styled.div`
  display: flex;
`;
const ContentContainer = styled.div``;
const AmountContainer = styled.div`
  ${flexCenter}
  align-items: flex-end;
  width: 100%;
  gap: 10px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;
const Label = styled.label`
  color: #333331;
  font-size: 14px;
  cursor: pointer;
  font-weight: 300;

  &.selected {
    font-weight: 700;
  }
`;
const CustomCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  margin-right: 15px; // 요소들 사이에 간격 추가
`;

const StyledCheckmark = styled.span`
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 6px;
  margin-left: 10px;
  position: relative;
  transition: background-color 0.2s;
  box-shadow: ${(props) => props.theme.shadows.around};

  ${CustomCheckboxContainer}:hover & {
    background-color: #eee;
  }

  ${HiddenRadio}:checked + & {
    background-color: #767676;
  }

  &:after {
    ${borderCheck}
    border-color: #bbb; // 회색 체크 마크
  }

  ${HiddenRadio}:checked + &::after {
    border-color: white; // 선택된 상태에서는 흰색 체크 마크
  }
`;

const InputWrapper = styled.div`
  ${textAreaWrapper}
  height: 70px;
`;

const AmountInput = styled.input.attrs({ type: 'number' })`
  ${textArea}

  // 화살표 숨기기
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
`;

const AmountText = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  color: #767676;
  font-size: 14px;
  font-weight: 400;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  color: #9f9f9f;
  font-size: 12px;
  font-weight: 300;
  gap: 1px;
  margin-top: 20px;
`;

const DatetimeInput = styled.input.attrs({ type: 'datetime-local' })`
  ${mainSection}
  display: flex;
  justify-content: flex-start;
  outline: none;
  border: none;
  width: 220px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
`;
