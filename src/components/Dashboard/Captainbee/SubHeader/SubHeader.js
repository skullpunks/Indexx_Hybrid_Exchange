import React from 'react'
import bee from "../../../../assets/hive-dashboard/subheader/bee wings BnW 1.svg";
import hat from "../../../../assets/hive-dashboard/subheader/new_hat.svg";
import colony from "../../../../assets/hive-dashboard/subheader/colony icon 1.svg";
import honey from "../../../../assets/hive-dashboard/subheader/honeyc 1.svg";
import pen from "../../../../assets/hive-dashboard/subheader/pen, 1.svg";
import calendar from "../../../../assets/hive-dashboard/subheader/calendar 1.svg";
import waggle from "../../../../assets/hive-dashboard/subheader/wiggle icon 1.svg";

import './SubHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';


const SubHeader = () => {
  const location = useLocation();

  return (

    <div style={{position:"fixed", top:"90px", width:"100%", zIndex:999, background:"#FFB300", height:"90px"}}>

    <div className="container sub-page">

    <div className="row row-cols-1 row-cols-md-4 g-4 sub-logos"  style={{justifyContent:"center"}}>
    
        <div className="col">
        <Link to="/indexx-exchange/dashboard">
            <div className="card">
            <img src={waggle} className="card-img-top mt-sm-2 mb-sm-2" alt="..."/>
            <div className="card-body" style={{marginTop:"1.5px"}}>
                <h5 className="card-title">Waggle Dance</h5>
                <Typography
                component='p'
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
        <div className="col"  style={{marginLeft:"-17px"}}>
        <Link to="/indexx-exchange/dashboard/capt-mybees">
            <div className="card">
            <img src={bee} className="card-img-top" alt="..." style={{marginTop:"6.5px"}}/>
            <div className="card-body">
                <h5 className="card-title">My Honey Bees</h5>
            <Typography
                component='p'
                sx={
                  location.pathname.startsWith('/indexx-exchange/dashboard/capt-mybees')
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
        <div className="col">
        <Link to="/indexx-exchange/dashboard/capt-mycaptains">
            <div className="card">
            <img src={colony} className="card-img-top" alt="..." style={{marginBottom:"1.8px"}}/>
            <div className="card-body">
                <h5 className="card-title">Captain Bee's Colony</h5>
            <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-mycaptains'
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
        <div className="col">
        <Link to="/indexx-exchange/dashboard/capt-leader">
            <div className="card">
            <img src={hat} className="card-img-top" alt="..." style={{marginBottom:"1.8px"}}/>
            <div className="card-body">
                <h5 className="card-title">Leader Captain Bee</h5>
            <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-leader'
                    ? {
                      height: '0.07px',
                      width: '88px',
                      backgroundColor: '#000',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        <div className="col" style={{marginLeft:"-5px"}}>
        <a href="/indexx-exchange/dashboard/capt-profile">
            <div className="card">
            <img src={pen} className="card-img-top " alt="..." />
            <div className="card-body">
                <h5 className="card-title">Edit Profile</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-profile'
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


        <div className="col" style={{marginLeft:"-20px"}}>
        <a href="/indexx-exchange/dashboard/honeycomb">
            <div className="card">
            <img src={honey} className="card-img-top mt-1 mb-1" alt="..." style={{
                width:"auto"
            }}/>
            <div className="card-body">
                <h5 className="card-title">Honeycomb</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/honeycomb'
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
        <div className="col" style={{marginLeft:"-20px"}}>
        <a href="/indexx-exchange/dashboard/capt-resource-mkt">
            <div className="card">
            <img src={calendar} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Resources</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-mkt' ||
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-tech' ||
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-acc' ||
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-leg' ||
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-sales' ||
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-mgmt' 
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
  )
}

export default SubHeader