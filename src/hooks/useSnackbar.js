/**
 * NODE MODULES
 */

import { useContext } from 'react';

/**
 * CONTEXT
 */

import { SnackbarContext } from '../contexts/SnackbarCreateContext';

export const useSnackbar = () => useContext(SnackbarContext);
