import React, { useContext } from 'react';
// import white from "./white.png";
// import black from "./black.png";
import './DarkMode.css';
import { Theme } from '../../utils/themeContext';

const DarkMode = () => {
  const { setTheme } = useContext(Theme);
  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('selectedTheme', 'dark');
    setTheme('dark');
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'light');
    localStorage.setItem('selectedTheme', 'light');
    setTheme('light');
  };

  const selectedTheme = localStorage.getItem('selectedTheme');

  if (selectedTheme === 'dark') {
    setDarkMode();
  }
  const toggleTheme = (e) => {
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
        defaultChecked={selectedTheme === 'dark'}
      />
      <label className="dark_mode_label" for="darkmode-toggle">
        {/* <white />
                <black /> */}
        {/* <img src={white} alt="light" />
                <img src={black} alt="light" /> */}
      </label>
    </div>
  );
};

export default DarkMode;
