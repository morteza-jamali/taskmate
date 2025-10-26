import { type FC, type ReactNode } from 'react';
import Flex, { type FlexProps } from './Flex';
import { css } from '@emotion/react';

export interface InputWrapperProps extends Pick<FlexProps, 'gap'> {
  label?: string;
  children?: ReactNode;
}

const labelStyles = css`
  color: var(--text-color-1);
  display: block;
  cursor: default;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.7px;
`;

export const InputWrapper: FC<InputWrapperProps> = ({
  label,
  children,
  gap = 5,
}) => {
  return (
    <Flex direction="column" {...{ gap }}>
      {label && <label css={labelStyles}>{label}</label>}
      {children}
    </Flex>
  );
};

export default InputWrapper;
