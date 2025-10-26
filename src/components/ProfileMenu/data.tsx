import type { ProfileMenuDataType } from '@/src/types';

import SettingImg from '@/src/assets/settings.svg?react';
import ThemeImg from '@/src/assets/brush.svg?react';
import LogoutImg from '@/src/assets/logout.svg?react';

export const ProfileMenuData: ProfileMenuDataType = [
  {
    icon: <ThemeImg />,
    label: 'Theme',
    href: '#',
  },
  {
    icon: <SettingImg />,
    label: 'Settings',
    href: '#',
  },
  {
    icon: <LogoutImg />,
    label: 'Logout',
    onClick: () => alert('logout'),
    style: { color: 'red' },
  },
];

export default ProfileMenuData;
