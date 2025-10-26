import { type ComponentProps } from 'react';
import InputWrapper, { type InputWrapperProps } from './InputWrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface TextareaProps {
  resizable?: boolean;
}

export interface TextInputProps
  extends Pick<
      ComponentProps<'input'>,
      'name' | 'defaultValue' | 'placeholder'
    >,
    Pick<InputWrapperProps, 'label'> {
  textarea?: boolean | TextareaProps;
}

const textareaInputStyles = css`
  background-color: var(--black-1);
  color: var(--text-color-1);
  outline: none;
  border-radius: 8px;
  border: 1px solid var(--black-4);
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  line-height: 34px;
  padding: 0 12px;
  margin: 5px 0;

  &:focus {
    border-color: var(--blue-1);
  }
`;

const Textarea = styled.textarea<Pick<TextInputProps, 'textarea'>>`
  min-height: 57px;
  min-width: 225px;
  ${(props) =>
    typeof props.textarea === 'object' &&
    props.textarea.resizable === false &&
    'resize: none;'}
`;

export const TextInput: React.FC<TextInputProps> = ({
  label,
  textarea,
  ...props
}) => {
  return (
    <InputWrapper {...{ label }} gap={0}>
      {textarea ? (
        <Textarea css={textareaInputStyles} {...{ textarea }} {...props} />
      ) : (
        <input css={textareaInputStyles} type="text" {...props} />
      )}
    </InputWrapper>
  );
};

export default TextInput;
