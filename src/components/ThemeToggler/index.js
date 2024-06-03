import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ColorModeContext } from '../../utils/ThemeContextUpdated';
import './DarkMode.css';
function ThemeToggler() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     width: '100%',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     bgcolor: 'background.default',
    //     color: 'text.primary',
    //     borderRadius: 1,
    //     margin: '100px',
    //     p: 3,
    //   }}
    // >
    //   {theme.palette.mode} mode
    //   <IconButton
    //     sx={{ ml: 1 }}
    //     onClick={colorMode.toggleColorMode}
    //     color="inherit"
    //   >
    //     {theme.palette.mode === 'dark' ? 'dark' : 'light'}
    //   </IconButton>
    // </Box>
    <div className="dark_mode" style={{ marginTop: '50px' }}>
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onClick={colorMode.toggleColorMode}
      />

      <label className="dark_mode_label" for="darkmode-toggle">
        {/* <white />
                <black /> */}
        {/* <img src={white} alt="light" />
                <img src={black} alt="light" /> */}
      </label>
    </div>
  );
}

export default ThemeToggler;
