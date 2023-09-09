import React from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';

import twitter from '../../../../assets/hive-dashboard/sidebar/twitter logo- 1.svg';
import insta from '../../../../assets/hive-dashboard/sidebar/insta icon 2.svg';
import linkedin from '../../../../assets/hive-dashboard/sidebar/in icon.svg';
import discord from '../../../../assets/hive-dashboard/sidebar/discord.svg';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import MyCaptainTabs from './MyCaptainTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import { Rating } from '@mui/material';


const MyCaptain = () => {


  return (
    <>
      <BeeHeader />
      <div className="hive-container">
        <div
          className="d-flex justify-content-between"
          style={{ width: '76%', maxWidth: '1140px' }}
        >
        <div className="d-flex flex-direction-column mt-1">
              <div className="d-flex  flex-direction-column align-items-center">
                <div
                  style={{
                    width: '193px',
                    height: '193px',
                    backgroundImage: `url(${frame})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // border:"none"
                  }}
                >
                  <div className="hexagon">
                    <img
                      alt=""
                      src={dummy}
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
              </div>
                <div className="font_20x align-items-start fw-bold mt-4 mb-3 lh_32x">
                  Captain Bee Willie A
                </div>
              <div className="align-items-start lh_32x">
                <div className="font_13x d-flex align-items-center ">
                  <img alt="man" src={man} className="me-2" />
                  @willie
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={pin} className="me-2" />
                  United States of America
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={house} className="me-2" />
                  New York
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={clock} className="me-2" />
                  August 10, 2023
                </div>
            </div>

              <div className="align-items-start lh_32x mt-4">
                <a href="/" >
                  <img alt="Discord" src={discord} className="me-3" />
                </a>
                <a href="/" >
                  <img alt="Instagram" src={insta} className="me-3" />
                </a>
                <a href="/" >
                  <img alt="LinkedIn" src={linkedin} className="me-3" />
                </a>
                <a href="/" >
                  <img alt="Twitter" src={twitter} />
                </a>

              </div>
              <div className="d-flex  flex-direction-column align-items-start mt-5">
                <div className="font_13x ">
                  Your Rating
                </div>
                <div className='mt-4'>
                  <Rating name="read-only" value={4} readOnly size='large' />
                </div>
                <div className="font_40x mt-3">
                  95%
                </div>
              </div>
            </div>
          <div className="side-container">
            <MyCaptainTabs/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCaptain;
