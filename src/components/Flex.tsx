import styled from '@emotion/styled';
import { type ComponentProps } from 'react';

export interface FlexProps extends ComponentProps<'div'> {
  direction?: 'row' | 'column';
  alignItems?: string;
  justifyContent?: string;
  gap?: number;
}

const FlexRoot = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.gap}px;
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
`;

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  gap = 0,
  ...props
}) => {
  return (
    <FlexRoot {...{ gap, direction }} {...props}>
      {children}
    </FlexRoot>
  );
};

export default Flex;
