import type { ReactNode } from 'react';
import GridCol from './GridCol';
import styled from '@emotion/styled';

export interface GridProps {
  children: ReactNode;
  gap?: number;
}

const GridRoot = styled.div<Required<Pick<GridProps, 'gap'>>>`
  --grid-gap: ${(props) => `calc(${`${props.gap}px`} / 2)`};
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(var(--grid-gap) * -1);
`;

export function Grid({ children, gap = 0 }: GridProps): ReactNode {
  return <GridRoot {...{ gap }}>{children}</GridRoot>;
}

Grid.Col = GridCol;

export default Grid;
