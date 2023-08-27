import { useState, useEffect } from 'react';

function useDebounce(value: string, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
