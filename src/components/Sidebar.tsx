import { useState, useEffect } from 'react';
import { motion, stagger, type Variants } from 'motion/react';
import { ButtonLink, type ButtonLinkProps } from './ButtonLink';
import Image from './Image';
import { css } from '@emotion/react';
import type { MenuItemType } from '../types';
import MenuData from '../routes';
import { NavLink, useHref, useLocation } from 'react-router';

import ChevronRightImg from '@/src/assets/chevron_right.svg?react';

const logoRootStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid var(--black-4);

  & > span {
    font-size: 28px;
    font-weight: 700;
  }

  & > img {
    width: 50px;
    height: auto;
  }
`;

const Logo: React.FC = () => {
  return (
    <div css={logoRootStyles}>
      <Image src="/logo.png" alt="logo" />
      <span>MyTodo</span>
    </div>
  );
};

const getButtonLinkStyles = (isActive: boolean, as: ButtonLinkProps['as']) =>
  as === 'button'
    ? css`
        display: flex;
        background-color: ${isActive ? 'var(--black-2)' : 'transparent'};
        border: none;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 10px 16px;

        &:hover {
          background-color: var(--black-2);
        }
      `
    : css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        background-color: transparent;

        &.active {
          background-color: var(--black-2);
        }

        &:hover {
          background-color: var(--black-2);
        }
      `;

const MotionChevronRightImg = motion.create(ChevronRightImg);

const menuItemChevronStyles = css`
  width: 16px;
  height: 16px;
  color: var(--text-color-1);
`;

const menuItemSubmenuItemStyles = css`
  display: block;
  color: var(--text-color-1);
  font-weight: 500;
  font-size: 14px;
  border-left: 1px solid var(--black-4);
  margin-left: 32px;
  padding: 10px 16px;
  line-height: 21.7px;
  background-color: transparent;

  &.active {
    background-color: var(--black-2);
  }

  &:hover {
    background-color: var(--black-2);
  }
`;

const menuItemVariants: Variants = {
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hide: { opacity: 0, y: 50 },
};

const menuItemIconLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > span {
    color: var(--text-color-1);
    font-weight: 500;
    font-size: 14px;
  }
`;

const menuItemIcon = css`
  border-radius: 4px;
  background-color: #228be626;
  color: #74c0fc;
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

const MenuItem: React.FC<MenuItemType> = ({ icon, label, items, href }) => {
  const itemsPathName = items ? items.map((item) => useHref(item.href)) : null;
  const { pathname } = useLocation();
  const absHref = href ? useHref(href) : null;
  const [isActive, setIsActive] = useState<boolean>(
    absHref ? pathname === absHref : false,
  );
  const [open, toggleOpen] = useState<boolean>(isActive);
  const as = items ? 'button' : 'a';
  const buttonLinkStyles = getButtonLinkStyles(isActive, as);

  useEffect(() => {
    setIsActive(
      absHref ? pathname === absHref : itemsPathName!.includes(pathname),
    );
  }, [pathname]);

  useEffect(() => {
    toggleOpen(isActive);
  }, [isActive]);

  return (
    <motion.div variants={menuItemVariants}>
      <ButtonLink
        css={buttonLinkStyles}
        onClick={() => toggleOpen(!open)}
        {...{ href, as }}
      >
        <div css={menuItemIconLabelStyles}>
          <div css={menuItemIcon}>{icon}</div>
          <span>{label}</span>
        </div>
        {items && (
          <MotionChevronRightImg
            initial={{ rotate: open ? 90 : 0 }}
            animate={{
              rotate: open ? -90 : 0,
              transition: {
                duration: 0.3,
              },
            }}
            css={menuItemChevronStyles}
          />
        )}
      </ButtonLink>
      {items && (
        <motion.div
          initial={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
            display: open ? 'block' : 'none',
          }}
          animate={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
            display: open ? 'block' : 'none',
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {items.map((item, itemKey) => (
            <NavLink
              to={item.href}
              css={menuItemSubmenuItemStyles}
              key={`item-${itemKey}`}
            >
              {item.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const menuRootStyles = css`
  padding: 32px 0;
`;

const menuVariants: Variants = {
  show: {
    transition: { delayChildren: stagger(0.1) },
  },
  hide: {},
};

const Menu: React.FC = () => {
  return (
    <motion.div
      css={menuRootStyles}
      initial="hide"
      animate="show"
      variants={menuVariants}
    >
      {MenuData.map((data, key) => (
        <MenuItem key={`menu-${key}`} {...data} />
      ))}
    </motion.div>
  );
};

export interface SidebarProps {
  ref?: React.Ref<HTMLDivElement>;
}

const sidebarRootStyles = css`
  grid-area: sidebar;
  background-color: var(--black-1);
  border-right: 1px solid var(--black-3);
`;

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div css={sidebarRootStyles} {...props}>
      <Logo />
      <Menu />
    </div>
  );
};

export default Sidebar;
