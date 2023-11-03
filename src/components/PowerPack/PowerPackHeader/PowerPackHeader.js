import React, { useEffect, useState } from 'react'
import power from '../../../assets/BSheader/power pack 1.svg';
import all from '../../../assets/BSheader/EX-010.png';
import hive_all from '../../../assets/BSheader/hive exchange black 1.svg';
import stack from '../../../assets/BSheader/staking icon black.svg';
import nectar from '../../../assets/BSheader/nectar black.svg';
import power_white from '../../../assets/BSheader/power pack 1-white.svg';
import all_white from '../../../assets/BSheader/EX-011.png';
import hive_all_white from '../../../assets/BSheader/hive exchange white 1.svg';
import stack_white from '../../../assets/BSheader/satking icon white.svg';
import nectar_white from '../../../assets/BSheader/nectar white 1.svg';
import waggle from '../../../assets/hive-dashboard/waggle dance icon.svg';
import waggle_white from '../../../assets/hive-dashboard/waggle icon white.svg';
import etf from '../../../assets/BSheader/etf logo 3.svg';
import etf_white from '../../../assets/BSheader/etf white.svg';
import './PowerPackHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'
import { getCaptainBeeStatics } from '../../../services/api';

const PowerPackHeader = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );

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

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  const [staticsData, setStaticsData] = useState();
  const [haspowerpack, setHaspowerpack] = useState(false);
  const [userType, setUserType] = useState("");
  const [isCaptain, setisCaptain] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;

    setUserType(userType);
    if (userType === "CaptainBee") {
      setisCaptain(true);
      getCaptainBeeStatics(username).then((data) => {
        setStaticsData(data.data);
        if(data?.data?.powerPackData !== undefined && data?.data?.powerPackData !== null && data?.data?.powerPackData !== "" ){
          setHaspowerpack(true);
        }
      });
    }
  }, [])
  return (

    <div style={{position:"fixed", 
        top: `${isMobile ? '60px' : '90px'}`,
    width:"100%", zIndex:999, background:"var(--main-body)", 
    height:"95px",
    paddingTop:"15px"
    
    }}>

    <div className="container power-page">

    <div className="row row-cols-1 row-cols-md-4 g-4 up-logos"  style={{justifyContent:"center"}}>
    
        <div className="col">
        <Link to="/indexx-exchange/buy-sell?type=buy">
            <div className="card">
            {theme === "dark" ? 
            <img src={localStorage.getItem("userlogged") === 'normal' ? all_white : hive_all_white} className="card-img-top" alt="..."/>
            :
            <img src={localStorage.getItem("userlogged") === 'normal' ? all : hive_all} className="card-img-top" alt="..."/>
            }
            <div className="card-body">
                <h5 className="card-title mt-1">
                {localStorage.getItem("userlogged") === 'normal' ? "Exchange" : "Hive Exchange"}
                </h5>
                <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/buy-sell'
                    ? {
                      height: '0.07px',
                      width: '66px',
                      backgroundColor: 'var(--body_color)',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        <div className="col">
        <Link to="/indexx-exchange/coming-soon-etf">
            <div className="card">
            {theme === "dark" ? 
            <img src={etf_white} className="card-img-top" alt="..." style={{width:"51.5px"}}/>
            :
            <img src={etf} className="card-img-top" alt="..." style={{width:"51.5px"}}/>
            }
            <div className="card-body">
                <h5 className="card-title mt-1">ETF</h5>
            <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/coming-soon-etf'
                    ? {
                      height: '0.07px',
                      width: '59px',
                      backgroundColor: 'var(--body_color)',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        <div className="col">
        <Link to="/indexx-exchange/power-pack">
            <div className="card">
            {theme === "dark" ? 
            <img src={power_white} className="card-img-top" alt="..." style={{width:"60px"}}/>
            :
            <img src={power} className="card-img-top" alt="..." style={{width:"60px"}}/>
            }
            <div className="card-body">
                <h5 className="card-title mt-1">Power Packs</h5>
            <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/power-pack'
                    ? {
                      height: '0.07px',
                      width: '59px',
                      backgroundColor: 'var(--body_color)',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        <div className="col">
        <Link to="/indexx-exchange/buy-sell/staking">
            <div className="card">
            {theme === "dark" ? 
            <img src={localStorage.getItem("userlogged") === 'normal' ? stack_white : nectar_white} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            :
            <img src={localStorage.getItem("userlogged") === 'normal' ? stack : nectar} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            }
            <div className="card-body">
                <h5 className="card-title mt-1">
                
                {localStorage.getItem("userlogged") === 'normal' ? "Staking" : "Nectar"}
                </h5>
                <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/buy-sell/staking'
                    ? {
                      height: '0.07px',
                      width: '36px',
                      backgroundColor: 'var(--body_color)',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
      {(localStorage.getItem("userlogged") === 'captain' || localStorage.getItem("userlogged") === 'honeyb') && ((isCaptain === true && haspowerpack === true) || isCaptain === false) ?
        <div className="col">
        <Link to="/indexx-exchange/dashboard">
            <div className="card">
            {theme === "dark" ? 
            <img src={waggle_white} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            :
            <img src={waggle} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            }
            <div className="card-body">
                <h5 className="card-title mt-1">Waggle Dance</h5>
                <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/dashboard'
                    ? {
                      height: '0.07px',
                      width: '66px',
                      backgroundColor: 'var(--body_color)',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
      :null}
    </div>
    </div>

    </div>
  )
}

export default PowerPackHeader