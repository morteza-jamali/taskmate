import { useState, type ComponentProps } from 'react';
import InputWrapper, { type InputWrapperProps } from './InputWrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface TextareaProps {
  resizable?: boolean | 'vertical' | 'horizontal';
}

export interface TextInputProps
  extends ComponentProps<'input'>,
    Pick<InputWrapperProps, 'label' | 'error'> {
  textarea?: boolean | TextareaProps;
  onValueChange?: (value: string) => void;
}

const textareaInputStyles = css`
  background-color: var(--black-1);
  color: var(--text-color-1);
  outline: none;
  border-radius: 8px;
  min-height: 36px;
  font-weight: 400;
  font-size: 14px;
  line-height: 34px;
  padding: 0 12px;
  margin: 5px 0;
`;

const Textarea1 = styled.textarea<Pick<TextInputProps, 'textarea'>>`
  min-height: 57px;
  min-width: 225px;
  ${(props) => {
    if (typeof props.textarea === 'object') {
      if (
        typeof props.textarea.resizable === 'boolean' &&
        props.textarea.resizable === false
      ) {
        return 'resize: none;';
      }

      if (typeof props.textarea.resizable === 'string') {
        return `resize:${props.textarea.resizable};`;
      }
    }
  }}
`;

const InputWithError = (children: any) => styled(children)<
  Pick<TextInputProps, 'error'>
>`
  ${(props) =>
    `border: 1px solid ${props.error ? 'var(--red-1)' : 'var(--black-4)'};`}
  ${(props) =>
    !props.error &&
    `&:focus {
    border-color: var(--blue-1);
  }`}
`;

const Input = InputWithError('input');
const Textarea = InputWithError(Textarea1);

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  textarea,
  className,
  onChange,
  onValueChange,
  defaultValue,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(
    (defaultValue as string | undefined) ?? '',
  );
  const newOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onValueChange && onValueChange(event.target.value);
    onChange && onChange(event);
  };

  return (
    <InputWrapper {...{ label, className, error }} gap={0}>
      {textarea ? (
        <Textarea
          css={textareaInputStyles}
          onChange={newOnChange}
          value={value ?? inputValue}
          {...{ textarea, error, defaultValue }}
          {...props}
        />
      ) : (
        <Input
          css={textareaInputStyles}
          onChange={newOnChange}
          value={value ?? inputValue}
          type="text"
          {...{ error, defaultValue }}
          {...props}
        />
      )}
    </InputWrapper>
  );
};

export default TextInput;
