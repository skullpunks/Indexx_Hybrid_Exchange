import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { amber, deepOrange, grey } from '@mui/material/colors';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ThemeContextUpdated({ children }) {
  const selectedTheme = localStorage?.getItem('selectedTheme') || 'dark';
  const [mode, setMode] = React.useState(selectedTheme ?? 'dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                  main: '#11BE6A',
                },
                divider: '#EAECEF',
                border: '#EAECEF',
                background: {
                  default: '#FCFCFC',
                },
                text: {
                  primary: '#1E2329',
                  secondary: '#474D57',
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: '#11BE6A',
                },
                divider: '#2B3139',
                border: '#474D57',
                background: {
                  default: '#181A21',
                },
                text: {
                  primary: '#EAECEF',
                  secondary: '#B7BDC6',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}