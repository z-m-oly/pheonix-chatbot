import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

/**
 * custom modules
 */

import router from './routers/routes.jsx';

/**
 * custom components
 */

import SnackbarProvider from './contexts/SnackbarContext.jsx';

/**
 * css
 */
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
);
