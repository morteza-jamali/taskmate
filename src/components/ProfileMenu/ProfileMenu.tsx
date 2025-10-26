import { type ReactNode } from 'react';
import Image from '../Image';
import Popover from '../Popover';
import ButtonLink from '../ButtonLink';
import { css } from '@emotion/react';

import ChevronRightImg from '@/src/assets/chevron_right.svg?react';

import { ProfileMenuData } from './data';

interface ProfileMenuTargetProps {
  ref?: React.RefObject<any>;
  onClick?: React.MouseEventHandler<ReactNode>;
}

const profileMenuTargetStyles = css`
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 5px;

  & > img {
    object-fit: cover;
    height: 40px;
    border-radius: 50px;
  }

  & > svg {
    transform: rotate(90deg);
    color: #fff;
    width: 20px;
    height: 20px;
  }
`;

const ProfileMenuTarget: React.FC<ProfileMenuTargetProps> = ({
  onClick,
  ref,
}) => {
  return (
    <button ref={ref} onClick={onClick as any} css={profileMenuTargetStyles}>
      <Image src="/profile.jpg" width={40} alt="profile" />
      <ChevronRightImg />
    </button>
  );
};

const profileMenuButtonStyles = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const sharedProfileMenuItemStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color-1);
  padding: 7px 12px;
  width: 100%;
  line-height: 21.7px;
  user-select: none;
  -webkit-user-drag: none;

  & > svg {
    width: 14px;
    height: 14px;
  }

  & > span {
    font-size: 14px;
    font-weight: 400;
  }

  &:hover {
    background-color: var(--black-4);
  }
`;

export const ProfileMenu: React.FC = () => {
  return (
    <>
      <Popover place="right" target={<ProfileMenuTarget />}>
        {ProfileMenuData.map(({ icon, label, href, onClick, style }, index) => {
          const as = href ? 'a' : 'button';

          return (
            <ButtonLink
              css={[
                sharedProfileMenuItemStyles,
                ...[as === 'button' && profileMenuButtonStyles],
              ]}
              key={`profile-menu-item-${index}`}
              {...{ href, onClick, as, style }}
            >
              {icon}
              <span>{label}</span>
            </ButtonLink>
          );
        })}
      </Popover>
    </>
  );
};

export default ProfileMenu;
