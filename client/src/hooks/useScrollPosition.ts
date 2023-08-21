import { useEffect, useState } from 'react';

const useScrollPosition = (threshold: number) => {
  const [position, setPosition] = useState(window.scrollY);
  const [pastThreshold, setPastThreshold] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [throttle, setThrottle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (throttle) return;
      if (!throttle) {
        setThrottle(true);
        setTimeout(async () => {
          const moving = window.scrollY;
          setPosition(moving);
          setPastThreshold(position > threshold);
          setScrollDown(position > moving);
          setScrollUp(position < moving);
          setThrottle(false);
        }, 200);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position, threshold]);

  return { position, pastThreshold, scrollDown, scrollUp };
};

export default useScrollPosition;
