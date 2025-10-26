import type { JSX } from 'react';

export interface ProfileMenuItem {
  icon: JSX.Element;
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<any>;
  style?: React.CSSProperties;
}

export type ProfileMenuDataType = ProfileMenuItem[];

export interface MenuSubItem {
  label: string;
  href: string;
}

export interface MenuItemType {
  icon: JSX.Element;
  label: string;
  href?: string;
  items?: MenuSubItem[];
}

export type MenuDataType = MenuItemType[];
