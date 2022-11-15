import React from 'react';
import { NavLink } from 'react-router-dom'

const NotificationLeftNav = () => {
  return (
    <div className="lef_nav_container d-md-block d-none">
            <div className="nav_Section">
                <ul>
                    <li><NavLink to="/indexx-exchange/notification" className="" end>
                       All
                    </NavLink></li>
                    <li><NavLink to="/indexx-exchange/notification/Activities">Activities</NavLink></li>
                    <li> <NavLink to="/indexx-exchange/notification/system">System messages</NavLink></li>
                </ul>
            </div>
          
        </div >
  )
}

export default NotificationLeftNav