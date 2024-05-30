import { flexBetween, flexCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

import { useFormContext } from 'react-hook-form';
import { Register } from '@models/index';

const SelectRegister = () => {
  const { setValue, watch, getValues } = useFormContext();
  const selectedOptions = watch('registerType'); // 지출, 소비 문자열 배열

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const currentValues = getValues('registerType');
    if (checked) {
      // 체크되면 값을 배열에 추가
      setValue('registerType', [...currentValues, value]);
    } else {
      // 체크 해제되면 값을 배열에서 제거
      setValue(
        'registerType',
        currentValues.filter((item: Register) => item !== value),
      );
    }
  };

  return (
    <Container>
      <span className="sub-title">지출.절약</span>
      <CheckBoxContainer>
        <HiddenCheckbox
          id="filter-spend"
          value="SPEND"
          onChange={handleCheckboxChange}
          checked={selectedOptions.includes('SPEND')}
        />
        <Label htmlFor="filter-spend">지출했어요</Label>
        <HiddenCheckbox
          id="filter-save"
          value="SAVE"
          onChange={handleCheckboxChange}
          checked={selectedOptions.includes('SAVE')}
        />
        <Label htmlFor="filter-save">절약했어요</Label>
      </CheckBoxContainer>
    </Container>
  );
};

export default SelectRegister;

const Container = styled.div`
  ${flexBetween}
  width: 100%;
`;

const CheckBoxContainer = styled.span`
  ${flexCenter}
  gap: 5px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
`;

const Label = styled.label`
  ${flexCenter}
  height: 40px;
  width: 90px;
  border-radius: 6px;

  cursor: pointer;

  font-size: 14px;
  font-weight: 700;

  background-color: #dddddd;
  color: #9f9f9f;

  transition:
    color,
    background-color 0.2s ease-out;

  ${HiddenCheckbox}:checked + & {
    background-color: ${(props) => props.theme.colors.main};
    color: #ffffff;
  }
`;
