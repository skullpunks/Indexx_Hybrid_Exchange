import React, { useEffect, useState } from 'react';
import power from '../../../assets/BSheader/power pack.png';
import all from '../../../assets/BSheader/EX-010.png';
import hive_all from '../../../assets/BSheader/hive exchange black 1.svg';
import stack from '../../../assets/BSheader/staking icon black.svg';
import nectar from '../../../assets/BSheader/nectar black.svg';
import power_white from '../../../assets/BSheader/power pack_white.png';
import all_white from '../../../assets/BSheader/EX-011.png';
import hive_all_white from '../../../assets/BSheader/hive exchange white 1.svg';
import stack_white from '../../../assets/BSheader/satking icon white.svg';
import nectar_white from '../../../assets/BSheader/nectar white 1.svg';
import waggle from '../../../assets/hive-dashboard/Waggle_LM.png';
import waggle_white from '../../../assets/hive-dashboard/waggle_DM.png';
// import etf from '../../../assets/BSheader/etf logo 3.svg';
// import etf_white from '../../../assets/BSheader/etf white.svg';
import wallet from '../../../assets/BSheader/funding wallet icon_black.svg';
import wallet_white from '../../../assets/BSheader/funding wallet icon_White.svg';
import elite from '../../../assets/BSheader/elite icon blk.svg';
import elite_white from '../../../assets/BSheader/elite icon wht.svg';
// import wallstreet from '../../../assets/BSheader/wall street icon 3 2.svg';
// import wallstreet_white from '../../../assets/BSheader/wall 4 1.svg';
// import stock from '../../../assets/BSheader/Stock token icon_black.svg';
// import stock_white from '../../../assets/BSheader/Stock token bnw 3.svg';

import './PowerPackHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { getCaptainBeeStatics } from '../../../services/api';

const PowerPackHeader = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );

  useEffect(() => {
    console.log('location__', location.pathname);
  }, [location]);

  // const [isActive, setIsActive] = useState(false);

  // const handleActive = () =>{
  //   setIsActive(!isActive);
  // }

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
  const isTablet = useMediaQuery(themes.breakpoints.down('lg'));

  const [staticsData, setStaticsData] = useState();
  const [haspowerpack, setHaspowerpack] = useState(false);
  const [userType, setUserType] = useState('');
  const [isCaptain, setisCaptain] = useState(false);

  useEffect(() => {
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    const username =
      localStorage.getItem('username') !== undefined
        ? String(localStorage.getItem('username'))
        : undefined;

    setUserType(userType);
    if (userType === 'CaptainBee') {
      setisCaptain(true);
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          setStaticsData(data.data);
          if (
            data?.data?.powerPackData !== undefined &&
            data?.data?.powerPackData !== null &&
            data?.data?.powerPackData !== ''
          ) {
            setHaspowerpack(true);
          } else {
            setHaspowerpack(false);
          }
        });
      }
    }
  }, []);
  return (
    <div
      className="power-header"
      style={{
        position: 'fixed',
        top: `${isMobile ? '56px' : '90px'}`,
        width: '100%',
        zIndex: 999,
        background: 'var(--main-body)',
        height: '95px',
        paddingTop: '15px',
        overflowX: 'auto',
      }}
    >
      <div className="container power-page">
        {/* <div className={isMobile ? 'scrollable-head' : "row row-cols-1 row-cols-md-4 g-4 up-logos justify-content-center"}> */}
        <div
          className={
            isMobile
              ? 'scrollable-head'
              : 'row row-cols-1 row-cols-md-4 g-4 up-logos justify-content-center'
          }
        >
          <div className="col">
            <Link to="/indexx-exchange/buy-sell?type=buy">
              <div className="card">
                {theme === 'dark' ? (
                  <img
                    src={
                      localStorage.getItem('userlogged') === 'normal'
                        ? all_white
                        : hive_all_white
                    }
                    className="card-img-top"
                    alt="..."
                    height={'34px'}
                  />
                ) : (
                  <img
                    src={
                      localStorage.getItem('userlogged') === 'normal'
                        ? all
                        : hive_all
                    }
                    className="card-img-top"
                    alt="..."
                    height={'34px'}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mt-1">
                    {localStorage.getItem('userlogged') === 'normal'
                      ? 'Exchange'
                      : 'Hive Exchange'}
                  </h5>
                  <Typography
                    component="p"
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

          {/* <div className="col" onClick={handleActive}>
            <div className="card">
            {theme === "dark" ? 
            <img src={wallstreet_white} className="card-img-top mt-2 mb-1" alt="..." style={{width:"75px", borderRadius:0}}/>
            :
            <img src={wallstreet} className="card-img-top mt-2 mb-1" alt="..." style={{width:"75px", borderRadius:0}}/>
            }
            <div className="card-body">
                <h5 className="card-title mt-1">Wallstreet</h5>
                { isActive &&              
                  <Typography
                      component='p'
                      style={{
                            height: '0.07px',
                            width: '59px',
                            backgroundColor: 'var(--body_color)',
                          }}
                    ></Typography>
                }
            </div>
            </div>
        </div>
        {isActive && 
          <>
            <div className="col" style={{opacity:0.6}}>
            <Link to="/indexx-exchange/buy-sell">
                <div className="card">
                {theme === "dark" ? 
                <img src={stock_white} className="card-img-top mt-1 mb-1" alt="..." style={{width:"51.5px", borderRadius:0}}/>
                :
                <img src={stock} className="card-img-top mt-1 mb-1" alt="..." style={{width:"51.5px", borderRadius:0}}/>
                }
                <div className="card-body">
                    <h5 className="card-title mt-1">Stock Tokens</h5>
                <Typography
                    component='p'
                    style={
                      location.pathname === '/indexx-exchange/buy-sell'
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

            <div className="col" style={{opacity:0.6}}>
            <Link to="/indexx-exchange/buy-sell">
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
                      location.pathname === '/indexx-exchange/buy-sell'
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
          </>
        } */}
          <div className="col">
            <Link to="/indexx-exchange/power-pack">
              <div className="card">
                {theme === 'dark' ? (
                  <img
                    src={power_white}
                    className="card-img-top"
                    alt="..."
                    style={{ width: '60px' }}
                  />
                ) : (
                  <img
                    src={power}
                    className="card-img-top"
                    alt="..."
                    style={{ width: '60px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mt-1">Power Packs</h5>
                  <Typography
                    component="p"
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
            <Link to="/indexx-exchange/elite-club">
              <div className="card">
                {theme === 'dark' ? (
                  <img
                    src={elite_white}
                    className="card-img-top"
                    alt="..."
                    style={{ width: '34px' }}
                  />
                ) : (
                  <img
                    src={elite}
                    className="card-img-top"
                    alt="..."
                    style={{ width: '34px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mt-1">Elite Club</h5>
                  <Typography
                    component="p"
                    style={
                      location.pathname === '/indexx-exchange/elite-club'
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
                {theme === 'dark' ? (
                  <img
                    src={
                      localStorage.getItem('userlogged') === 'normal'
                        ? stack_white
                        : nectar_white
                    }
                    className="card-img-top"
                    alt="..."
                    style={{ height: '34px' }}
                  />
                ) : (
                  <img
                    src={
                      localStorage.getItem('userlogged') === 'normal'
                        ? stack
                        : nectar
                    }
                    className="card-img-top"
                    alt="..."
                    style={{ height: '34px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mt-1">
                    {localStorage.getItem('userlogged') === 'normal'
                      ? 'Staking'
                      : 'Nectar/Staking'}
                  </h5>
                  <Typography
                    component="p"
                    style={
                      location.pathname === '/indexx-exchange/buy-sell/staking'
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
          {(localStorage.getItem('userlogged') === 'captain' ||
            localStorage.getItem('userlogged') === 'honeyb') &&
          ((isCaptain === true && haspowerpack === true) ||
            isCaptain === false) ? (
            <div className="col">
              <Link to="/indexx-exchange/dashboard">
                <div className="card">
                  {theme === 'dark' ? (
                    <img
                      src={waggle_white}
                      className="card-img-top"
                      alt="..."
                      style={{ marginBlock: '6px' }}
                    />
                  ) : (
                    <img
                      src={waggle}
                      className="card-img-top"
                      alt="..."
                      style={{ marginBlock: '6px' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title mt-1">Waggle Dance</h5>
                    <Typography
                      component="p"
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
          ) : null}
          <div className="col">
            <Link to="/indexx-exchange/buy-sell/wallet">
              <div className="card">
                {theme === 'dark' ? (
                  <img
                    src={wallet_white}
                    className="card-img-top"
                    alt="..."
                    style={{ height: '34px' }}
                  />
                ) : (
                  <img
                    src={wallet}
                    className="card-img-top"
                    alt="..."
                    style={{ height: '34px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mt-1">Funding Wallet</h5>
                  <Typography
                    component="p"
                    style={
                      location.pathname === '/indexx-exchange/buy-sell/wallet'
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
        </div>
      </div>
    </div>
  );
};

export default PowerPackHeader;
