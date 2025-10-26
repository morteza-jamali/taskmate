import styled from '@emotion/styled';
import React from 'react';

export interface GridColProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const GridColRoot = styled.div<Required<Pick<GridColProps, 'span'>>>`
  flex-shrink: 0;
  flex-basis: ${(props) => `${(props.span * 100) / 12}%`};
  padding: var(--grid-gap);
`;

export const GridCol: React.FC<GridColProps> = ({ children, span = 12 }) => {
  return <GridColRoot {...{ span }}>{children}</GridColRoot>;
};

export default GridCol;
