import { createContext } from 'react';

const initialCtxValue = {
  snackbar: {
    open: false,
    message: '',
    type: 'info',
  },
  showSnackbar: ({ message, type = 'info', timeOut = 5000 }) => {},
  hideSnackbar: () => {},
};

export const SnackbarContext = createContext(initialCtxValue);
