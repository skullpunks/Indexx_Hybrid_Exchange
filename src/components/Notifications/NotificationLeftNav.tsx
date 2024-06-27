import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
const NotificationLeftNav = () => {
  const theme = useTheme();
  return (
    <div className="lef_nav_container d-md-block d-none">
      <div className="nav_Section">
        <ul>
          <li>
            <NavLink
              to="/indexx-exchange/notification"
              className=""
              end
              style={{ color: theme.palette.text.primary }}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/indexx-exchange/notification/Activities"
              style={{ color: theme.palette.text.primary }}
            >
              Activities
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink
              to="/indexx-exchange/notification/system"
              style={{ color: theme.palette.text.primary }}
            >
              System messages
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationLeftNav;
