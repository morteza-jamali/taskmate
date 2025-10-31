import { type FC, type ReactNode } from 'react';
import Flex, { type FlexProps } from './Flex';
import { css } from '@emotion/react';

export interface InputWrapperProps extends Pick<FlexProps, 'gap'> {
  label?: string;
  children?: ReactNode;
  className?: string;
  error?: string | null;
}

const labelStyles = css`
  color: var(--text-color-1);
  display: block;
  cursor: default;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.7px;
`;

const errorStyles = css`
  color: var(--red-1);
  font-size: 12px;
  line-height: 14.4px;
`;

export const InputWrapper: FC<InputWrapperProps> = ({
  label,
  error,
  children,
  gap = 5,
  ...props
}) => {
  return (
    <Flex direction="column" {...{ gap }} {...props}>
      {label && <label css={labelStyles}>{label}</label>}
      {children}
      {error && <p css={errorStyles}>{error}</p>}
    </Flex>
  );
};

export default InputWrapper;
