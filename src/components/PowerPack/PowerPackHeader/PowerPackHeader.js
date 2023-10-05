import React from 'react'
import power from '../../../assets/BSheader/power pack 1.svg';
import all from '../../../assets/BSheader/x icon- 1.svg';

import './PowerPackHeader.css'
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

const PowerPackHeader = () => {
  const location = useLocation();

  return (

    <div style={{position:"fixed", top:"90px", width:"100%", zIndex:99999, background:"var(--main-body)", height:"80px"}}>

    <div className="container power-page">

    <div className="row row-cols-1 row-cols-md-4 g-4 up-logos"  style={{justifyContent:"center"}}>
    
        <div className="col">
        <Link to="/indexx-exchange/buy-sell?type=buy">
            <div className="card">
            <img src={all} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">All</h5>
                <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/buy-sell'
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
        <Link to="/indexx-exchange/power-pack">
            <div className="card">
            <img src={power} className="card-img-top" alt="..." style={{width:"63px"}}/>
            <div className="card-body">
                <h5 className="card-title">Power Packs</h5>
            <Typography
                component='p'
                style={
                  location.pathname === '/indexx-exchange/power-pack'
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


    </div>
    </div>

    </div>
  )
}

export default PowerPackHeader