import { type ComponentProps, type FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import InputWrapper, { type InputWrapperProps } from './InputWrapper';
import { css, ClassNames } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';

import 'react-datepicker/dist/react-datepicker.css';

const inputStyles = css`
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
  width: 100%;

  &:focus {
    border-color: var(--blue-1);
  }
`;

const calendarStyles = (
  css: (
    template: TemplateStringsArray,
    ...args: Array<CSSInterpolation>
  ) => string,
) => css`
  & .react-datepicker {
    background-color: var(--black-1);
    border: 1px solid var(--black-4);
    font-family: 'Inter', sans-serif;
  }

  & .react-datepicker__triangle {
    color: var(--black-1) !important;
    fill: var(--black-1) !important;
    stroke: var(--black-4) !important;
  }

  & .react-datepicker__header {
    background-color: var(--black-1);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom: 1px solid var(--black-4);
  }

  & .react-datepicker__day,
  & .react-datepicker__current-month {
    color: var(--text-color-1);
  }

  & .react-datepicker__day:hover {
    background-color: var(--black-5);
  }

  & .react-datepicker__navigation-icon::before {
    border-color: var(--text-color-1);
  }

  & .react-datepicker__day-name {
    color: var(--black-6);
  }

  & .react-datepicker__day--keyboard-selected,
  & .react-datepicker__day--selected {
    background-color: var(--blue-1);
  }

  & .react-datepicker__day--keyboard-selected:hover,
  & .react-datepicker__day--selected:hover {
    background-color: #1864ab;
  }
`;

export interface DatePickerInputProps
  extends Pick<InputWrapperProps, 'label'>,
    Pick<ComponentProps<'input'>, 'name'> {}

export const DatePickerInput: FC<DatePickerInputProps> = ({ label, name }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <InputWrapper {...{ label }} gap={0}>
      <ClassNames>
        {({ css }) => (
          <DatePicker
            isClearable
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            css={inputStyles}
            popperClassName={calendarStyles(css)}
            {...{ name }}
          />
        )}
      </ClassNames>
    </InputWrapper>
  );
};

export default DatePickerInput;
