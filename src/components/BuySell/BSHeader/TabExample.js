import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import stock from '../../../assets/BSheader/Stock token bnw.svg';
import power from '../../../assets/BSheader/power pack 1.svg';
import token from '../../../assets/BSheader/tokens icon 1.svg';
import all from '../../../assets/BSheader/EX-010.png';
import hive_all from '../../../assets/BSheader/hive exchange black 1.svg';
import stack from '../../../assets/BSheader/staking icon black.svg';
import power_white from '../../../assets/BSheader/power pack 1-white.svg';
import all_white from '../../../assets/BSheader/EX-011.png';
import hive_all_white from '../../../assets/BSheader/hive exchange white 1.svg';
import token_white from '../../../assets/BSheader/tokens icon  white (1).svg';
import stock_white from '../../../assets/BSheader/Stock token bnw 3.svg';
import stack_white from '../../../assets/BSheader/satking icon white.svg';
import waggle from '../../../assets/hive-dashboard/waggle dance icon.svg';
import waggle_white from '../../../assets/hive-dashboard/waggle icon white.svg';

import './TabExample.css';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'
import { getCaptainBeeStatics } from '../../../services/api';


const TabExample = ({ selectedTab, handleTabChange }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );
  const [userType, setUserType] = useState("");
  const [isCaptain, setisCaptain] = useState(false);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
      if(window.location.pathname.includes("for-honeybee")){
        setTheme("light")
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
      if(window.location.pathname.includes("for-honeybee")){
        setTheme("light")
      }
    },[]);

  console.log(selectedTab);

  const [staticsData, setStaticsData] = useState();
  const [haspowerpack, setHaspowerpack] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;

    setUserType(userType);
    if (userType === "CaptainBee") {
      setisCaptain(true);
      getCaptainBeeStatics(username).then((data) => {
        setStaticsData(data.data);
        if(data?.data?.powerPackData !== undefined || data?.data?.powerPackData !== null || data?.data?.powerPackData !== "" ){
          setHaspowerpack(true);
        }
      });
    }
  }, [])

  return (
    <div
      style={{
        top: `${isMobile ? '60px' : '90px'}`,        
      }}
      className={window.location.pathname.includes("for-honeybee") === true ? "other-tabs" :"ext-tabs"}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        aria-label="icon label tabs example"
        style={{marginTop:"6px"}}
        className='tabs-tab'
        // variant='scrollable'
      >
      {localStorage.getItem("userlogged") === 'normal' ?
      <Tab
          label="Exchange"
          icon=
            {theme === "dark" ? 
              <img
                src={all_white}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 10 }}
              />
            :
              <img
                src={all}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 10 }}
              />
            }
          
            className='tab-format'
            disableTouchRipple
        />
          :
          <Tab
          label="Hive Exchange"
          icon=
            {theme === "dark" ? 
              <img
                src={hive_all_white}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 10 }}
              />
            :
              <img
                src={hive_all}
                alt="Home"
                width={'40px'}
                style={{ marginBottom: 10 }}
              />
            }
          
            className='tab-format'
            disableTouchRipple
        />
        }
        
        <Tab
          label="Tokens"
          icon={
            theme === "dark" ? 
            <img
              src={token_white}
              alt="Home"
              width={'42px'}
              style={{ marginBottom: 10 }}
            />
            :
            <img
              src={token}
              alt="Home"
              width={'42px'}
              style={{ marginBottom: 10 }}
            />
          }
          className='tab-format'
          disableTouchRipple
        />

        <Tab
          label="Stock Tokens"
          icon={
            theme === "dark" ? 
            <img src={stock_white} alt="Home" width={'50px'} 
          style={{ marginBottom: 13, marginTop:6}}
          />
          :
          <img src={stock} alt="Home" width={'50px'} 
          style={{ marginBottom: 13, marginTop:6}}
          />}
          className='tab-format'
          disableTouchRipple
        />
        <Tab
          label="Power Packs"
          icon={
            theme === "dark" ? 
              <img
                src={power_white}
                alt="Home"
                width={'63px'}
                style={{ marginBottom: "11px" }}
              />
            :
            <img
              src={power}
              alt="Home"
              width={'63px'}
              style={{ marginBottom: "11px" }}
            />
          }
          component={Link}
          to='/indexx-exchange/power-pack'
          className='tab-format'
          disableTouchRipple
        />
        <Tab
          label="Staking"
          icon={
            theme === "dark" ? 
              <img
                src={stack_white}
                alt="Home"
                width={'45px'}
                style={{ marginBottom: "10px" }}
              />
            :
            <img
              src={stack}
              alt="Home"
              width={'45px'}
              style={{ marginBottom: "10px" }}
            />
          }
          component={Link}
          to='/indexx-exchange/buy-sell/staking'
          className='tab-format'
          disableTouchRipple
        />
      {(localStorage.getItem("userlogged") === 'captain' || localStorage.getItem("userlogged") === 'honeyb') && ((isCaptain === true && haspowerpack === true) || isCaptain === false) ?
        <Tab
          label="Waggle Dance"
          icon={
            theme === "dark" ? 
              <img
                src={waggle_white}
                alt="Home"
                width={'55px'}
                style={{ marginBottom: "15px" }}
              />
            :
            <img
              src={waggle}
              alt="Home"
              width={'55px'}
              style={{ marginBottom: "15px" }}
            />
          }
          component={Link}
          to='/indexx-exchange/dashboard'
          className='tab-format'
          disableTouchRipple
        />
      :null}
      </Tabs>
      {/* <div style={{color:"#11BE6A", fontSize:"10px", fontStyle:"italic", display:'flex',
      justifyContent:"center", paddingTop:"10px", paddingBottom:"30px"}}>
      Buy, Sell and Convert all types of tokens
      </div> */}
    </div>
  );
};

export default TabExample;
