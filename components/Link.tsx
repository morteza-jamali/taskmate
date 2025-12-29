import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';
import { NextLink, type NextLinkProps } from './NextLink';

export interface LinkProps
  extends Omit<NextLinkProps, 'passHref'>, Omit<MuiLinkProps, 'href'> {}

export const Link = ({ href, children, ...restProps }: LinkProps) => (
  <NextLink {...{ href }} {...restProps} passHref>
    <MuiLink component="button" {...restProps}>
      {children}
    </MuiLink>
  </NextLink>
);
