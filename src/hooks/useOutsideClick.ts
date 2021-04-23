import React, { useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, callback: () => void) => {
  const handleClick = (e: AnyEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
