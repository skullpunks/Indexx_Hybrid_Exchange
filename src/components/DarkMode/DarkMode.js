import React, { useContext } from 'react';
import { ColorModeContext } from '../../utils/ThemeContextUpdated';
import { useTheme } from '@mui/material/styles';

import './DarkMode.css';

const DarkMode = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={colorMode.toggleColorMode}
        defaultChecked={theme.palette.mode === 'dark'}
      />
      <label className="dark_mode_label" for="darkmode-toggle"></label>
    </div>
  );
};

export default DarkMode;
