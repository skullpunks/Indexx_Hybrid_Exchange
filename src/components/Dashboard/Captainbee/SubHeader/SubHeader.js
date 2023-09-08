import React from 'react'
import bee from "../../../../assets/hive-dashboard/subheader/bee wings BnW 1.svg";
import hat from "../../../../assets/hive-dashboard/subheader/hat BW 1.svg";
import honey from "../../../../assets/hive-dashboard/subheader/honeyc 1.svg";
import pen from "../../../../assets/hive-dashboard/subheader/pen, 1.svg";
import calendar from "../../../../assets/hive-dashboard/subheader/calendar 1.svg";

import './SubHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

const SubHeader = () => {
  const location = useLocation();

  return (

    <div style={{position:"fixed", top:"90px", width:"100%", zIndex:999, background:"#FFB300", height:"90px"}}>

    <div className="container cover-page">

    <div className="row row-cols-1 row-cols-md-4 g-4 up-logos"  style={{justifyContent:"center"}}>
    
        <div className="col">
        <Link to="/indexx-exchange/dashboard">
            <div className="card">
            <img src={hat} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Dashboard</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard'
                    ? {
                      height: '2px',
                      width: '58px',
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
        <Link to="/indexx-exchange/dashboard/capt-mybees">
            <div className="card">
            <img src={bee} className="card-img-top" alt="..." style={{marginTop:"6.5px"}}/>
            <div className="card-body">
                <h5 className="card-title">Honey Bees</h5>
            <Typography
                component='p'
                sx={
                  location.pathname === '/'
                    ? {
                      height: '2px',
                      width: '58px',
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
        <a href="/indexx-exchange/dashboard/capt-profile">
            <div className="card">
            <img src={pen} className="card-img-top " alt="..." />
            <div className="card-body">
                <h5 className="card-title">Edit Profile</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/'
                    ? {
                      height: '2px',
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
        <a href="/">
            <div className="card">
            <img src={honey} className="card-img-top mt-1 mb-1" alt="..." style={{
                width:"auto"
            }}/>
            <div className="card-body">
                <h5 className="card-title">Honeycomb</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/sign-up'
                    ? {
                      height: '2px',
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
        <a href="/">
            <div className="card">
            <img src={calendar} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Resources</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/'
                    ? {
                      height: '2px',
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
  )
}

export default SubHeader