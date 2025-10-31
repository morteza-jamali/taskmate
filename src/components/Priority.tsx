import {
  type ComponentProps,
  useEffect,
  useState,
  type CSSProperties,
} from 'react';
import Checkbox, { type CheckboxProps } from './Checkbox';
import Flex from './Flex';
import InputWrapper, { type InputWrapperProps } from './InputWrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface PriorityItemProps extends Pick<CheckboxProps, 'onChange'> {
  label: string;
  dotColor?: CSSProperties['color'];
  checked?: boolean;
}

const labelStyles = css`
  color: var(--text-color-1);
  cursor: default;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.7px;
`;

const Dot = styled.div<Pick<PriorityItemProps, 'dotColor'>>`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: ${(props) => props.dotColor};
`;

const PriorityItem: React.FC<PriorityItemProps> = ({
  label,
  checked = false,
  dotColor = 'blue',
  onChange,
}) => {
  return (
    <Flex alignItems="center" gap={10}>
      <Flex alignItems="center" gap={5}>
        <Dot {...{ dotColor }} />
        <label css={labelStyles}>{label}</label>
      </Flex>
      <Checkbox {...{ checked, onChange }} />
    </Flex>
  );
};

type PriorityTypes = 'extreme' | 'moderate' | 'low';

export interface PriorityProps
  extends Pick<ComponentProps<'input'>, 'name'>,
    Pick<InputWrapperProps, 'label' | 'error'> {
  defaultValue?: PriorityTypes;
  onChange?: (priority: PriorityTypes | null) => void;
}

export const Priority: React.FC<PriorityProps> = ({
  defaultValue,
  onChange = () => {},
  name,
  error,
  label,
}) => {
  const [priority, setPriority] = useState<PriorityTypes | null>(
    defaultValue ?? null,
  );

  const onChangeHandler = (checked: boolean, type: PriorityTypes) => {
    checked && setPriority(type);
    !checked && setPriority(null);
  };

  useEffect(() => {
    onChange(priority);
  }, [priority]);

  return (
    <InputWrapper {...{ label, error }} gap={5}>
      <Flex alignItems="center" gap={30}>
        <input
          type="hidden"
          defaultValue={priority ?? undefined}
          {...{ name }}
        />
        <PriorityItem
          label="Extreme"
          dotColor="var(--red-1)"
          checked={priority === 'extreme'}
          onChange={(checked) => onChangeHandler(checked, 'extreme')}
        />
        <PriorityItem
          label="Moderate"
          dotColor="#15aabf"
          checked={priority === 'moderate'}
          onChange={(checked) => onChangeHandler(checked, 'moderate')}
        />
        <PriorityItem
          label="Low"
          dotColor="#40c057"
          checked={priority === 'low'}
          onChange={(checked) => onChangeHandler(checked, 'low')}
        />
      </Flex>
    </InputWrapper>
  );
};

export default Priority;
