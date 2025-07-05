'use client';

import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';

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

// ✅ Props validation
NotistackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
