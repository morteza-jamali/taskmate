import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import CheckImg from '@/src/assets/check.svg?react';

export interface CheckboxProps
  extends Omit<
    React.ComponentProps<'input'>,
    'type' | 'children' | 'onChange'
  > {
  onChange?: (checked: boolean) => void;
}

const checkboxRootStyles = css`
  width: 20px;
  height: 20px;
  position: relative;

  & > svg {
    position: absolute;
    inset: 0;
    width: 18px;
    height: 18px;
    margin: auto;
    display: none;
  }

  & > input:checked {
    background-color: #228be6;
    border-color: #228be6;

    & + svg {
      display: block;
    }
  }

  & > input {
    border: 1px solid #ced4da;
    background-color: transparent;
    border-radius: 4px;
    appearance: none;
    width: 20px;
    height: 20px;
    padding: 0;
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange = () => {},
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      onClick={() => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
      }}
      css={checkboxRootStyles}
    >
      <input checked={isChecked} readOnly type="checkbox" {...props} />
      <CheckImg />
    </div>
  );
};

export default Checkbox;
