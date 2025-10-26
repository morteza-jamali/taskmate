import type { Interpolation, Theme } from '@emotion/react';
import { type CSSProperties, type ReactNode } from 'react';
import { NavLink } from 'react-router';

export interface ButtonLinkProps {
  as: 'button' | 'a';
  children: ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<any>;
  className?: string;
  style?: CSSProperties;
  css?: Interpolation<Theme>;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  as,
  children,
  href,
  onClick,
  className,
  style,
  css,
}) =>
  as === 'a' ? (
    <NavLink to={href ?? ''} {...{ className, style, css }}>
      {children}
    </NavLink>
  ) : (
    <button onClick={onClick} {...{ className, style, css }}>
      {children}
    </button>
  );

export default ButtonLink;
