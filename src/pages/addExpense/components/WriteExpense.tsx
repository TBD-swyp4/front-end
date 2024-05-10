import {
  addPageContainer,
  addPageSubject,
  borderCheck,
  overflowWithoutScroll,
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
          <Label className={activeLabel === 'spend' ? 'selected' : ''} htmlFor="spend">
            지출했나요?
          </Label>
          <HiddenRadio id="spend" value="SPEND" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
        <CustomCheckboxContainer>
          <Label className={activeLabel === 'save' ? 'selected' : ''} htmlFor="save">
            절약했나요?
          </Label>
          <HiddenRadio id="save" value="SAVE" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
      </RegisterTypeContainer>

      <ContentContainer>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요."
          {...register('content', { required: true })}
        />
      </ContentContainer>

      <AmountContainer>
        <label htmlFor="amount">금액</label>
        <input id="amount" type="number" {...register('amount', { required: true })}></input>
      </AmountContainer>
      <DateContainer>
        <label htmlFor="date">날짜</label>
        <input id="date" type="datetime-local" {...register('date', { required: true })}></input>
      </DateContainer>
    </Container>
  );
};

export default WriteExpense;

const Container = styled.div`
  ${overflowWithoutScroll}
  ${addPageContainer}
`;
const Subject = styled.h1`
  ${addPageSubject}
`;

const RegisterTypeContainer = styled.div`
  display: flex;
`;
const ContentContainer = styled.div``;
const AmountContainer = styled.div``;
const DateContainer = styled.div``;

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
    background-color: #47cfb0;
  }

  &:after {
    ${borderCheck}
    border-color: #bbb; // 회색 체크 마크
  }

  ${HiddenRadio}:checked + &::after {
    border-color: white; // 선택된 상태에서는 흰색 체크 마크
  }
`;
