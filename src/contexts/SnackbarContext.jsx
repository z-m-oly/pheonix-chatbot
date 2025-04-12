/**
 * NODE MODULES
 */
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * COMPONENTS
 */

import Snackbar from '../components/Snackbar';
import { SnackbarContext } from './SnackbarCreateContext';

// const intialCtxValue = {
//   snackbar: {
//     open: false,
//     message: '',
//     type: 'info',
//   },
//   showSnackbar: ({ message, type = 'info', timeOut = 5000 }) => {},
//   hideSnackbar: () => {},
// };

// export const SnackbarContext = createContext(intialCtxValue);

export default function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
  });
  const timeOutRef = useRef();

  //show snackbar
  const showSnackbar = useCallback(
    ({ message, type = 'info', timeOut = 5000 }) => {
      // clear any existing timeout to prevent overlap
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
      setSnackbar({
        open: true,
        message,
        type,
      });

      // auto hise snackbar after message
      timeOutRef.current = setTimeout(() => {
        setSnackbar((prev) => {
          return { ...prev, open: false };
        });
      }, timeOut);
    },
    [],
  );

  //Hide Snackbar manually
  const hideSnackbar = useCallback(() => {
    // clear any existing timeout to prevent overlap
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    setSnackbar({ open: false, message: '', type: 'info' });
  }, []);

  // memorize context value
  const contextValue = useMemo(() => {
    return {
      showSnackbar,
      hideSnackbar,
    };
  }, [showSnackbar, hideSnackbar]);
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar snackbar={snackbar} />
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.any,
};
