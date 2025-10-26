import React, { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ActionButton from './ActionButton';
import { useFullscreen } from '../hooks/use-fullscreen';
import { SidebarContext } from '../contexts/SidebarContext';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { css } from '@emotion/react';

import MoonImg from '@/src/assets/moon.svg?react';
import SunImg from '@/src/assets/sun.svg?react';
import MaximizeImg from '@/src/assets/maximize.svg?react';
import ArrowsMinimizeImg from '@/src/assets/arrows_minimize.svg?react';
import SearchImg from '@/src/assets/search.svg?react';
import SidebarCollapseImg from '@/src/assets/layout_sidebar_left_collapse.svg?react';
import SidebarExpandImg from '@/src/assets/layout_sidebar_left_expand.svg?react';

const MotionMoonImg = motion.create(MoonImg);
const MotionSunImg = motion.create(SunImg);

const ThemeLight: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const getAnimationProps = (x: number) => ({
    initial: { x, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x, opacity: 0 },
    transition: { duration: 0.1 },
  });

  return (
    <ActionButton onClick={() => setIsDark(!isDark)}>
      <AnimatePresence initial={false}>
        {isDark && <MotionMoonImg {...getAnimationProps(-10)} />}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {!isDark && <MotionSunImg {...getAnimationProps(10)} />}
      </AnimatePresence>
    </ActionButton>
  );
};

const Fullscreen: React.FC = () => {
  const { fullscreen, toggle } = useFullscreen();

  return (
    <ActionButton onClick={toggle}>
      {fullscreen ? <ArrowsMinimizeImg /> : <MaximizeImg />}
    </ActionButton>
  );
};

const ToggleSidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useContext(SidebarContext);

  return (
    <ActionButton onClick={() => setShowSidebar(!showSidebar)}>
      {showSidebar ? <SidebarCollapseImg /> : <SidebarExpandImg />}
    </ActionButton>
  );
};

const searchInputStyles = css`
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 300px;
  height: 36px;
  background-color: var(--black-1);
  border: 1px solid var(--black-4);
  border-radius: 8px;
  color: var(--text-color-1);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;

  & > svg {
    width: 18px;
    height: 18px;
  }

  & > input {
    background-color: transparent;
    border: none;
    color: var(--text-color-1);
    outline: none;
    height: 100%;
    font-size: 14px;
    font-weight: 400;
    line-height: 34px;
    flex-grow: 1;
  }
`;

const SearchInput: React.FC = () => {
  return (
    <div css={searchInputStyles}>
      <SearchImg />
      <input placeholder="Search..." />
    </div>
  );
};

const headerRootStyles = css`
  grid-area: header;
  position: relative;
  background-color: var(--black-1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid var(--black-3);
`;

const headerRightStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Header: React.FC = () => {
  return (
    <div css={headerRootStyles}>
      <ToggleSidebar />
      <SearchInput />
      <div css={headerRightStyles}>
        <Fullscreen />
        <ThemeLight />
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
