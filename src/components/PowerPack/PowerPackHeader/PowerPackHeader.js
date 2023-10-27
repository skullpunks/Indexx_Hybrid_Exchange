import React, { useEffect, useState } from 'react'
import power from '../../../assets/BSheader/power pack 1.svg';
import all from '../../../assets/BSheader/x icon- 1.svg';
import stack from '../../../assets/BSheader/staking icon black.svg';
import power_white from '../../../assets/BSheader/power pack 1-white.svg';
import all_white from '../../../assets/BSheader/x icon- 1-white.svg';
import stack_white from '../../../assets/BSheader/satking icon white.svg';
import './PowerPackHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'

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
            <img src={all_white} className="card-img-top" alt="..."/>
            :
            <img src={all} className="card-img-top" alt="..."/>
            }
            <div className="card-body">
                <h5 className="card-title mt-1">Buy Crypto</h5>
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
        <Link to="/indexx-exchange/power-pack">
            <div className="card">
            {theme === "dark" ? 
            <img src={power_white} className="card-img-top" alt="..." style={{width:"63px"}}/>
            :
            <img src={power} className="card-img-top" alt="..." style={{width:"63px"}}/>
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
            <img src={stack_white} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            :
            <img src={stack} className="card-img-top" alt="..."
              style={{height:"34px"}}
            />
            }
            <div className="card-body">
                <h5 className="card-title mt-1">Staking</h5>
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

    </div>
    </div>

    </div>
  )
}

export default PowerPackHeader