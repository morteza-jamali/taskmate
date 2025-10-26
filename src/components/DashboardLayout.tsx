import { useState } from 'react';
import { motion } from 'motion/react';
import Sidebar from './Sidebar';
import { SidebarContext } from '../contexts/SidebarContext';
import Header from './Header';
import { Outlet } from 'react-router';
import { css } from '@emotion/react';

const sidebarWidth = 300;
const sidebarTransitionDuration = 0.3;

const MotionSidebar = motion.create(Sidebar);

const gridContainerRootStyles = css`
  display: grid;
  position: fixed;
  inset: 0;
  grid-template-rows: 71px 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar main';
`;

const mainRootStyles = css`
  grid-area: main;
  padding: 24px;
  overflow-y: auto;
`;

export const DashboardLayout: React.FC = () => {
  const showSidebarState = useState(true);
  const [showSidebar] = showSidebarState;

  return (
    <motion.div
      css={gridContainerRootStyles}
      initial={{
        gridTemplateColumns: `${showSidebar ? sidebarWidth : 0}px 1fr`,
      }}
      animate={{
        gridTemplateColumns: `${showSidebar ? sidebarWidth : 0}px 1fr`,
      }}
      transition={{ duration: sidebarTransitionDuration }}
    >
      <MotionSidebar
        initial={{ x: 0 }}
        animate={{ x: showSidebar ? 0 : -sidebarWidth }}
        transition={{ duration: sidebarTransitionDuration }}
      />
      <SidebarContext value={showSidebarState}>
        <Header />
      </SidebarContext>
      <div css={mainRootStyles}>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
