import type { MenuDataType } from './types';

import DashboardImg from '@/src/assets/dashboard.svg?react';
import TasksImg from '@/src/assets/list_check.svg?react';
import InfoCircleImg from '@/src/assets/info_circle.svg?react';

export const MenuData: MenuDataType = [
  {
    icon: <DashboardImg />,
    label: 'Dashboard',
    href: 'home',
  },
  {
    icon: <TasksImg />,
    label: 'Tasks',
    items: [
      {
        label: 'List Tasks',
        href: 'tasks/list',
      },
      {
        label: 'Add New Task',
        href: 'tasks/new',
      },
    ],
  },
  {
    icon: <InfoCircleImg />,
    label: 'About',
    href: 'about',
  },
];

export default MenuData;
