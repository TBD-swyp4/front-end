import { textArea, textAreaWrapper } from '@styles/CommonStyles';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

type MultiTextProps = {
  hookFormFieldName: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
};

const MultiText = ({
  hookFormFieldName,
  title = '내용',
  placeholder = '',
  isRequired = false,
}: MultiTextProps) => {
  const { register, watch } = useFormContext();

  const textValue = watch(hookFormFieldName); // 'message' 필드의 현재 값을 실시간으로 관찰
  const maxLength = 150;

  return (
    <TextAreaWrapper>
      <span className="title">{title}</span>
      <TextArea
        maxLength={maxLength}
        placeholder={placeholder}
        {...register(hookFormFieldName, { required: isRequired })}
      />
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
`;
