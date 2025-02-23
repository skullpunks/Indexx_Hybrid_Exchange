import React from 'react';
import bee from '../../../../assets/hive-dashboard/subheader/Honeybee.png';
import hat from '../../../../assets/hive-dashboard/subheader/captain bee.png';
import colony from '../../../../assets/hive-dashboard/subheader/colony.png';
import honey from '../../../../assets/hive-dashboard/subheader/honeycomb.png';
import pen from '../../../../assets/hive-dashboard/subheader/Edit.png';
import calendar from '../../../../assets/hive-dashboard/subheader/resources.png';
import greetcard from '../../../../assets/hive-dashboard/subheader/Greeting card icon 1.png';
import waggle from '../../../../assets/hive-dashboard/subheader/waggle dance.png';
import exch from '../../../../assets/BSheader/hive exchange black 1.svg';

import './SubHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const SubHeader = () => {
  const location = useLocation();
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <div
      style={{
        position: 'fixed',
        // top:"90px",
        top: `${isMobile ? '56px' : '70px'}`,
        width: '100%',
        zIndex: 999,
        background: '#FFB300',
        // height:"90px"}}>
        marginBottom: '50px',
        maxWidth: '100vw',
      }}
    >
      <div className="container sub-page" style={{ paddingBottom: '10px' }}>
        <div
          className="sub-logos"
          style={{
            display: 'flex',
            background: '#FFB300',
            overflowX: 'auto',
            gap: '5px',
            justifyContent: 'flex-start',
            paddingTop: `${isMobile ? '25px' : '0'}`,
          }}
        >
          <div className="col card-container">
            <Link to="/indexx-exchange/dashboard">
              <div className="card">
                <img
                  src={waggle}
                  className="card-img-top mt-2 mb-sm-2"
                  alt="..."
                />
                <div
                  className="card-body"
                  style={{ marginTop: `${isMobile ? '-1px' : '1.5px'}` }}
                >
                  <h5 className="card-title">Hive Dashboard</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname === '/indexx-exchange/dashboard'
                        ? {
                            height: '0.07px',
                            width: '66px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </Link>
          </div>

          <div className="col card-container">
            <Link to="/indexx-exchange/dashboard/capt-mycaptains">
              <div className="card">
                <img
                  src={colony}
                  className="card-img-top"
                  alt="..."
                  style={{
                    marginBottom: '0.8px',
                    marginTop: `${isMobile ? '5px' : 0}`,
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">My Colony</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-mycaptains' ||
                      (location.pathname.startsWith(
                        '/indexx-exchange/dashboard/capt-mybees'
                      ) &&
                        location.pathname.endsWith('CaptainBee'))
                        ? {
                            height: '0.07px',
                            width: '95px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </Link>
          </div>
          <div className="col card-container">
            <Link to="/indexx-exchange/dashboard/capt-leader">
              <div className="card">
                <img
                  src={hat}
                  className="card-img-top"
                  alt="..."
                  style={{
                    marginBottom: '1.8px',
                    marginTop: `${isMobile ? '5px' : 0}`,
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">My Hive Captain</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                      '/indexx-exchange/dashboard/capt-leader'
                        ? {
                            height: '0.07px',
                            width: '100%',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </Link>
          </div>
          <div className="col card-container">
            <Link to="/indexx-exchange/dashboard/capt-mybees">
              <div className="card">
                <img
                  src={bee}
                  className="card-img-top"
                  alt="..."
                  style={{ marginTop: '6.5px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">My Hive Members</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-mybees' ||
                      (location.pathname.startsWith(
                        '/indexx-exchange/dashboard/capt-mybees'
                      ) &&
                        location.pathname.endsWith('HoneyBee'))
                        ? {
                            height: '0.07px',
                            width: '72px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </Link>
          </div>
          <div className="col card-container">
            <a href="/indexx-exchange/dashboard/capt-profile">
              <div className="card">
                <img src={pen} className="card-img-top " alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Edit Profile</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                      '/indexx-exchange/dashboard/capt-profile'
                        ? {
                            height: '0.07px',
                            width: '58px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </a>
          </div>

          <div className="col card-container">
            <a href="/indexx-exchange/dashboard/honeycomb">
              <div className="card">
                <img
                  src={honey}
                  className="card-img-top mt-sm-1 mb-sm-1"
                  alt="..."
                  style={{
                    width: 'auto',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Honeycomb</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                      '/indexx-exchange/dashboard/honeycomb'
                        ? {
                            height: '0.07px',
                            width: '58px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </a>
          </div>

          <div className="col card-container">
            <a href="/indexx-exchange/dashboard/capt-greet">
              <div className="card">
                <img
                  src={greetcard}
                  className="card-img-top mt-sm-2"
                  alt="..."
                  style={{
                    width: 'auto',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Greeting Cards</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                      '/indexx-exchange/dashboard/capt-greet'
                        ? {
                            height: '0.07px',
                            width: '68px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </a>
          </div>

          <div className="col card-container">
            <a href="/indexx-exchange/dashboard/capt-resource-mkt">
              <div className="card">
                <img
                  src={calendar}
                  className="card-img-top"
                  alt="..."
                  style={{ marginBottom: '1.5px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Resources</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-mkt' ||
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-tech' ||
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-acc' ||
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-leg' ||
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-sales' ||
                      location.pathname ===
                        '/indexx-exchange/dashboard/capt-resource-mgmt'
                        ? {
                            height: '0.07px',
                            width: '58px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </a>
          </div>
          <div className="col card-container">
            <a href="/indexx-exchange/buy-sell">
              <div className="card">
                <img
                  src={exch}
                  className="card-img-top"
                  alt="..."
                  style={{ marginBottom: `${isMobile ? 0 : '3px'}` }}
                />
                <div className="card-body">
                  <h5 className="card-title">Hive Exchange</h5>
                  <Typography
                    component="p"
                    sx={
                      location.pathname === '/'
                        ? {
                            height: '0.07px',
                            width: '58px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
