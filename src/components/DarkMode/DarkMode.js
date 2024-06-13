import React, { useContext } from 'react';
import { ColorModeContext } from '../../utils/ThemeContextUpdated';
import { useTheme } from '@mui/material/styles';

import './DarkMode.css';

const DarkMode = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('selectedTheme', 'dark');
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'light');
    localStorage.setItem('selectedTheme', 'light');
  };

  const selectedTheme = localStorage.getItem('selectedTheme') || 'dark';

  if (selectedTheme === 'dark') {
    setDarkMode();
  }
  const toggleTheme = (e) => {
    colorMode.toggleColorMode();
    if (e.target.checked) setDarkMode();
    else setLightMode();
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={theme.palette.mode === 'dark'}
      />
      <label className="dark_mode_label" for="darkmode-toggle"></label>
    </div>
  );
};

export default DarkMode;
