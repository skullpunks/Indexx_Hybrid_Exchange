import React from 'react';
// import bee from "../../../../assets/hive-dashboard/subheader/bee wings BnW 1.svg";
import hat from '../../../../assets/hive-dashboard/subheader/captain bee.png';
// import honey from "../../../../assets/hive-dashboard/subheader/honeyc 1.svg";
import pen from '../../../../assets/hive-dashboard/subheader/Edit.png';
import waggle from '../../../../assets/hive-dashboard/subheader/waggle dance.png';
import exch from '../../../../assets/BSheader/hive exchange black 1.svg';

import './BeeHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

const BeeHeader = () => {
  const location = useLocation();

  return (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        width: '100%',
        zIndex: 999,
        background: '#FFB300',
        height: '90px',
      }}
    >
      <div className="container cover-page">
        <div
          className="row row-cols-1 row-cols-md-4 g-4 up-logos"
          style={{ justifyContent: 'center' }}
        >
          <div className="col">
            <Link to="/indexx-exchange/dashboard">
              <div className="card">
                <img
                  src={waggle}
                  className="card-img-top mt-sm-2 mb-sm-2"
                  alt="..."
                  style={{ marginTop: '6.5px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Hive Dashboard</h5>
                  <Typography
                    component="p"
                    style={
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
          <div className="col">
            <Link to="/indexx-exchange/bee-dashboard/bee-captain">
              <div className="card">
                <img src={hat} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">My Hive Captain</h5>
                  <Typography
                    component="p"
                    style={
                      location.pathname ===
                      '/indexx-exchange/bee-dashboard/bee-captain'
                        ? {
                            height: '0.07px',
                            width: '75px',
                            backgroundColor: '#000',
                          }
                        : null
                    }
                  ></Typography>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <a href="/indexx-exchange/bee-dashboard/bee-profile">
              <div className="card">
                <img src={pen} className="card-img-top " alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Edit Profile</h5>
                  <Typography
                    component="p"
                    style={
                      location.pathname ===
                      '/indexx-exchange/bee-dashboard/bee-profile'
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
          <div className="col">
            <a href="/indexx-exchange/buy-sell">
              <div className="card">
                <img
                  src={exch}
                  className="card-img-top"
                  alt="..."
                  style={{ marginBottom: '3px' }}
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

          {/* <div className="col">
        <a href="/indexx-exchange/bee-dashboard/honeycomb">
            <div className="card">
            <img src={honey} className="card-img-top mt-1 mb-1" alt="..." style={{
                width:"auto"
            }}/>
            <div className="card-body">
                <h5 className="card-title">Honeycomb</h5>
                <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/bee-dashboard/honeycomb'
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
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default BeeHeader;
