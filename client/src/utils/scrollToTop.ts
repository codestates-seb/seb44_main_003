import { useEffect } from 'react';

export const scrollToTop = () => {
  useEffect(() => {
    const scroll = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    scroll();

    return () => {
      scroll();
    };
  }, []);
};
