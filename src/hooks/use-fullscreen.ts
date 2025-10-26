import { useCallback, useState } from 'react';

function getFullscreenElement(): HTMLElement | null {
  const _document = window.document as any;

  const fullscreenElement =
    _document.fullscreenElement ||
    _document.webkitFullscreenElement ||
    _document.mozFullScreenElement ||
    _document.msFullscreenElement;

  return fullscreenElement;
}

function exitFullscreen() {
  const _document = window.document as any;

  if (typeof _document.exitFullscreen === 'function') {
    return _document.exitFullscreen();
  }
  if (typeof _document.msExitFullscreen === 'function') {
    return _document.msExitFullscreen();
  }
  if (typeof _document.webkitExitFullscreen === 'function') {
    return _document.webkitExitFullscreen();
  }
  if (typeof _document.mozCancelFullScreen === 'function') {
    return _document.mozCancelFullScreen();
  }

  return null;
}

function enterFullScreen() {
  const _element = window.document.documentElement as any;

  return (
    _element.requestFullscreen?.() ||
    _element.msRequestFullscreen?.() ||
    _element.webkitEnterFullscreen?.() ||
    _element.webkitRequestFullscreen?.() ||
    _element.mozRequestFullscreen?.()
  );
}

export interface UseFullscreenReturnValue {
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

export function useFullscreen(): UseFullscreenReturnValue {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const toggle = useCallback(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen();
      setFullscreen(true);
    } else {
      await exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  return { toggle, fullscreen } as const;
}
