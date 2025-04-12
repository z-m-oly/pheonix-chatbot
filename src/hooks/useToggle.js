/**
 * NODE MODULES
 */

import { useCallback, useState } from 'react';
/**
 * i custom react hook for managing toggle state
 * @returns {[boolean, Function]} an array containing the
 * current toggle state (boolean) and a function to toggle state
 */

const useToggle = () => {
  const [isOpen, setToggle] = useState(false);

  const toggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return [isOpen, toggle];
};

export { useToggle };
