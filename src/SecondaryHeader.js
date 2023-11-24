import React from 'react'
import { useLocation } from 'react-router-dom'
import PowerPackHeader from './components/PowerPack/PowerPackHeader/PowerPackHeader';

const SecondaryHeader = () => {
    let location = useLocation();
    console.log(location, "path");
  return (
    <div>
        { (!location.pathname.includes("login") && !location.pathname.includes("elite-learn") && !location.pathname.includes("dashboard") &&
          !location.pathname.includes("get-started") && !((localStorage.getItem("access_token") === undefined || localStorage.getItem("access_token") === null) && location.pathname === "/")) ? 
          <PowerPackHeader/>
          :null
        }
    </div>
  )
}

export default SecondaryHeader