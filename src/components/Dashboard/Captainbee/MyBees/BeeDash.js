import React, { useEffect, useState } from 'react';
import frame from '../../../../assets/hive-dashboard/silverframe.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';


// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import SubHeader from '../SubHeader/SubHeader';
import '../CaptainDash.css';
import BeeTabs from './BeeTabs';
import { getCaptainBeeStatics, getHoneyBeeDataByUsername } from '../../../../services/api';
import { useParams } from 'react-router-dom';
const BeeDash = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState("");

  useEffect(() => {

    

    getHoneyBeeDataByUsername(id).then((data) => {
      setUserData(data.data);
      setHoneyBeeEmail(data?.data?.userFullData?.email);
    });
  }, [id])
  return (
    <>
      <SubHeader />
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
                <div className="hexagon"
                  style={{ marginBottom: '16px' }}

                >
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
            <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
              Honey Bee {id}
            </div>
            <div className="font_10x mb-3 lh_32x align-items-start">
              Honey Bee of Captain {userData?.referredUserData?.data2?.Username} Team
            </div>
            <div className="align-items-start lh_32x">
              <div className="font_13x d-flex align-items-center ">
                <img alt="man" src={man} className="me-2" />
                @{id}
              </div>
              <div className="font_13x d-flex align-items-center">
                <img alt="man" src={pin} className="me-2" />
                {userData?.userFullData?.country === undefined ? "NA" : userData?.userFullData?.country}
              </div>
              <div className="font_13x d-flex align-items-center">
                <img alt="man" src={house} className="me-2" />
                {userData?.userFullData?.city === undefined ? "NA" : userData?.userFullData?.city}
              </div>
              <div className="font_13x d-flex align-items-center">
                <img alt="man" src={clock} className="me-2" />
                {userData?.formatedAccountCreationDate}
              </div>
            </div>

          </div>
          <div className="honeybee-container">
            <BeeTabs honeyBeeEmail={honeyBeeEmail}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeeDash;
