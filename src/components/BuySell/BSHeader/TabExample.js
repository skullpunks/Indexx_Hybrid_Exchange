import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import stock from '../../../assets/BSheader/graphd 1.svg';
import power from '../../../assets/BSheader/power pack 1.svg';
import token from '../../../assets/BSheader/tokens icon 1.svg';
import all from '../../../assets/BSheader/x icon- 1.svg';
import stack from '../../../assets/BSheader/staking icon black.svg';
import power_white from '../../../assets/BSheader/power pack 1-white.svg';
import all_white from '../../../assets/BSheader/x icon- 1-white.svg';
import token_white from '../../../assets/BSheader/tokens icon  white (1).svg';
import stock_white from '../../../assets/BSheader/tokens icon  white (2).svg';
import stack_white from '../../../assets/BSheader/satking icon white.svg';

import './TabExample.css';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'


const TabExample = ({ selectedTab, handleTabChange }) => {
  // const [selectedTab, setSelectedTab] = useState(0);

  // const handleTabChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log(selectedTab);

  return (
    <div
      style={{
        position: 'fixed',
        top: `${isMobile ? '60px' : '90px'}`,
        width: '100%',
        zIndex: 999,
        background: 'var(--body_background)',
        height: '90px',
      }}
      className="ext-tabs"
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        aria-label="icon label tabs example"
        style={{marginTop:"6px"}}
      >
        <Tab
          label="All"
          icon=
            {theme === "dark" ? 
              <img
                src={all_white}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 0 }}
              />
            :
              <img
                src={all}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 0 }}
              />
            }
          
            className='tab-format'
        />
        <Tab
          label="Tokens"
          icon={
            theme === "dark" ? 
            <img
              src={token_white}
              alt="Home"
              width={'42px'}
              style={{ marginBottom: 0 }}
            />
            :
            <img
              src={token}
              alt="Home"
              width={'42px'}
              style={{ marginBottom: 0 }}
            />
          }
          className='tab-format'
        />

        <Tab
          label="Stock Tokens"
          icon={
            theme === "dark" ? 
            <img src={stock_white} alt="Home" width={'45px'} 
          style={{ marginBottom: 6, marginTop:6}}
          />
          :
          <img src={stock} alt="Home" width={'45px'} 
          style={{ marginBottom: 6, marginTop:6}}
          />}
          className='tab-format'
        />
        <Tab
          label="Power Packs"
          icon={
            theme === "dark" ? 
              <img
                src={power_white}
                alt="Home"
                width={'63px'}
                style={{ marginBottom: "1.2px" }}
              />
            :
            <img
              src={power}
              alt="Home"
              width={'63px'}
              style={{ marginBottom: "1.2px" }}
            />
          }
          component={Link}
          to='/indexx-exchange/power-pack'
          className='tab-format'
        />
        <Tab
          label="Staking"
          icon={
            theme === "dark" ? 
              <img
                src={stack_white}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: "4px" }}
              />
            :
            <img
              src={stack}
              alt="Home"
              width={'40px'}
              style={{ marginBottom: "4px" }}
            />
          }
          component={Link}
          to='/indexx-exchange/buy-sell/staking'
          className='tab-format'
        />
      </Tabs>
      {/* <div style={{color:"#11BE6A", fontSize:"10px", fontStyle:"italic", display:'flex',
      justifyContent:"center", paddingTop:"10px", paddingBottom:"30px"}}>
      Buy, Sell and Convert all types of tokens
      </div> */}
    </div>
  );
};

export default TabExample;
