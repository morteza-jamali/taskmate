import React, {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type JSX,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { css } from '@emotion/react';

interface ClassNamesType {
  content?: string;
}

export interface PopoverProps {
  children: ReactNode;
  target: JSX.Element;
  place?: 'right' | 'left' | 'center';
  classNames?: ClassNamesType;
}

const getPopoverContentStyles = (place: PopoverProps['place']) => css`
  position: absolute;
  background-color: var(--black-1);
  border-radius: 4px;
  padding: 4px;
  border: 1px solid var(--black-4);
  min-width: 200px;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  top: 100%;
  margin-top: 10px;
  z-index: 1000;
  transform-origin: top ${place};
  ${place === 'left'
    ? 'left: 0;'
    : place === 'right'
      ? 'right: 0;'
      : 'left: 50%;transform: translateX(-50%);'}
`;

const popoverRootStyles = css`
  position: relative;
  display: inline-block;
`;

export const Popover: React.FC<PopoverProps> = ({
  children,
  target,
  place = 'center',
  classNames,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverContentStyles = getPopoverContentStyles(place);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div css={popoverRootStyles}>
      {React.cloneElement(target, {
        ref: triggerRef,
        onClick: toggleVisibility,
      })}
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
            ref={popoverRef}
            css={popoverContentStyles}
            className={classNames?.content}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;
