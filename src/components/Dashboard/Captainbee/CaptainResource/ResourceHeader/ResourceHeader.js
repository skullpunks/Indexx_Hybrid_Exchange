import React from 'react'
// import acc from "../../../../../assets/hive-dashboard/resource-header/acc 1.svg";
// import affiliate from "../../../../../assets/hive-dashboard/resource-header/affiliate icon 2.svg";
import hammer from "../../../../../assets/hive-dashboard/resource-header/hfhfhf 1.svg";
import sales from "../../../../../assets/hive-dashboard/resource-header/megaphone 1.svg";
// import setting from "../../../../../assets/hive-dashboard/resource-header/technicalb 1.svg";

import './ResourceHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';


const ResourceHeader = () => {
  const location = useLocation();

  return (

    <div style={{position:"fixed", top:"180px", width:"100%", zIndex:999, background:"#fff", height:"90px"}} className='resc'>

    <div className="container cover-page">

    <div className="row row-cols-1 row-cols-md-4 g-4 up-logos"  style={{justifyContent:"center"}}>
    
        <div className="col">
        <Link to="/indexx-exchange/dashboard/capt-resource-mkt">
            <div className="card">
            <img src={sales} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Marketing</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-mkt'
                    ? {
                      height: '0.3px',
                      width: '58px',
                      backgroundColor: '#FFB300',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        {/* <div className="col">
        <Link to="/indexx-exchange/dashboard/capt-resource-tech">
            <div className="card">
            <img src={setting} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Technical</h5>
            <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-tech'
                    ? {
                      height: '0.3px',
                      width: '58px',
                      backgroundColor: '#FFB300',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </Link>
        </div>
        
        <div className="col">
        <a href="/indexx-exchange/dashboard/capt-resource-acc">
            <div className="card">
            <img src={acc} className="card-img-top " alt="..." />
            <div className="card-body">
                <h5 className="card-title">Accounting</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-acc'
                    ? {
                      height: '0.3px',
                      width: '58px',
                      backgroundColor: '#FFB300',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </a>
        </div>

        <div className="col">
        <a href="/indexx-exchange/dashboard/capt-resource-mgmt">
            <div className="card">
            <img src={affiliate} className="card-img-top " alt="..." style={{
                width:"auto"
            }}/>
            <div className="card-body">
                <h5 className="card-title">Management</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-mgmt'
                    ? {
                      height: '0.3px',
                      width: '58px',
                      backgroundColor: '#FFB300',
                    }
                    : null
                }
              ></Typography>
            </div>
            </div>
        </a>
        </div> */}

        <div className="col">
        <a href="/indexx-exchange/dashboard/capt-resource-leg">
            <div className="card">
            <img src={hammer} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Legal</h5>
                <Typography
                component='p'
                sx={
                  location.pathname === '/indexx-exchange/dashboard/capt-resource-leg'
                    ? {
                      height: '0.3px',
                      width: '58px',
                      backgroundColor: '#FFB300',
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

export default ResourceHeader