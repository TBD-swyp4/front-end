import styled from 'styled-components';

import { useFormContext } from 'react-hook-form';
import { textArea, textAreaWrapper } from '@styles/CommonStyles';

import { CloseBtn } from '@components/button';

type MultiTextProps = {
  hookFormFieldName: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisable?: boolean;
};

const MultiText = ({
  hookFormFieldName,
  title = '내용',
  placeholder = '',
  isRequired = false,
  isDisable = false,
}: MultiTextProps) => {
  const { register, watch, setValue } = useFormContext();

  const textValue = watch(hookFormFieldName); // 'message' 필드의 현재 값을 실시간으로 관찰
  const maxLength = 150; // #20240508.syjang, DB 용량 문제로 150자 제한으로 변경

  // 입력값 전체삭제
  const handleDeleteAll = () => {
    setValue(hookFormFieldName, '', { shouldValidate: true }); // 값 삭제와 유효성 검사 트리거
  };

  return (
    <TextAreaWrapper>
      <span className="title">{title}</span>
      <span style={{ display: 'flex', width: '100%', height: '100%' }}>
        <TextArea
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={isDisable}
          {...register(hookFormFieldName, { required: isRequired })}
        />
        {!isDisable && <DeleteAllButton onClick={handleDeleteAll} />}
      </span>
      <span className="count">{`${textValue?.length || 0}/${maxLength}`}</span>
    </TextAreaWrapper>
  );
};

export default MultiText;

const TextAreaWrapper = styled.div`
  ${textAreaWrapper}
`;

const TextArea = styled.textarea`
  ${textArea}
  &:hover + svg,
  &:focus + svg {
    opacity: 1; // 호버되거나 포커스될 때 보이기
  }
`;

const DeleteAllButton = styled(CloseBtn)`
  opacity: 0; // 기본적으로 숨김
  transition: opacity 0.2s ease-in-out; // 페이드 인/아웃 효과
  background-color: #bcbcbc;
  border-radius: 50%;
  color: #ffffff;
  width: 15px;
  height: 15px;
  padding: 3px;
`;
