'use client';

import { SnackbarProvider } from 'notistack';

export const NotistackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
};
