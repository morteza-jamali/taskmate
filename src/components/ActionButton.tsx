import { css } from '@emotion/react';
import { type MouseEventHandler, type ReactNode } from 'react';

export interface ActionButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<any>;
}

const actionButtonStyles = css`
  background-color: var(--black-1);
  color: #fff;
  border: 1px solid var(--black-4);
  border-radius: 8px;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--black-5);
  }

  & > svg {
    width: 22px;
    height: 22px;
  }
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button css={actionButtonStyles} {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
