import React, { useEffect, useState } from 'react';
import framecapt from '../../../../assets/hive-dashboard/frame.svg';
import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/pin.svg';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.svg';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/house.svg';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock 1 1.svg';

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
import TeamCaptainDashIndividual from '../TeamCaptainBees/TeamCaptainDashIndividual';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'

const BeeDash = () => {
  const { id, userType } = useParams();

  const [honeyBeeData, setHoneyBeeData] = useState();
  const [captainBeeData, setCaptainBeeData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
  const [staticsData, setStaticsData] = useState();

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {

    getHoneyBeeDataByUsername(id).then((data) => {
      console.log("Data.", data?.data);
      setHoneyBeeData(data.data);
      setHoneyBeeEmail(data?.data?.userFullData?.email);
      setCaptainBeeData(data?.data?.referredUserData?.data2);
    });
    getCaptainBeeStatics(id).then((data) => {
      setStaticsData(data.data);
    });
  }, [id])

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

  return (
    <>
      <SubHeader />
      {userType === "HoneyBee" ?
        (<div style={{ paddingTop: `${isMobile ? "250px" : '220px'}` }}>
          <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: `${isMobile ? "0" : "-422px"}` }}>
            {userType === "CaptainBee" ? "Captain Bee’s  Waggle Dance / Captain Bee’s  Dashboard" : "Honey Bee’s  Waggle Dance / Honey Bee’s  Dashboard"}
          </div>
          <div className="hive-container">
            <div
              className="d-flex justify-content-between"
            // style={{ width: '86%', maxWidth: '1140px' }}
            style={{ flexDirection:`${isMobile ? "column" : "row"}` }}
            >
              <div className="d-flex flex-direction-column align-items-center mt-1">
                <div className="d-flex  flex-direction-row align-items-center">
                  <div
                    style={{
                      width: '193px',
                      height: '193px',
                      backgroundImage: `url(${framecapt})`,
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
                      marginTop: "-15px"
                    }}
                  >


                    <div className="hexagon">
                      <img
                        alt=""
                        src={captainBeeData?.photoIdFileurl !== undefined ? captainBeeData?.photoIdFileurl : dummy}
                        width={'63px'}
                        height={'66px'}
                        ml={'-6px'}
                        border={'none'}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: '104px',
                      height: '107px',
                      backgroundImage: `url(${userType === "CaptainBee" ? framecapt : frame})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'end',
                      // border:"none",
                      marginBottom: "-4.5px"
                    }}
                  >
                    <div className="side-hexagon"
                      style={{ marginBottom: '8px' }}

                    >
                      <img
                        alt=""
                        src={honeyBeeData?.userFullData?.profilePic !== undefined ? honeyBeeData?.userFullData?.profilePic : (staticsData?.affiliateUserProfile?.photoIdFileurl !== undefined) ? staticsData?.affiliateUserProfile?.photoIdFileurl : dummy}
                        width={'63px'}
                        height={'66px'}
                        ml={'-6px'}
                        border={'none'}
                      />
                    </div>
                  </div>
                </div>

                <div className="align-items-start lh_32x">
                  <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                    {userType === "CaptainBee" ? "Captain Bee" : "Honey Bee"} {id}
                  </div>
                  <div className="font_10x mb-3 lh_32x align-items-start">
                    {userType === "CaptainBee" ? "Captain Bee of Captain" : "Honey Bee of Captain"} {honeyBeeData?.referredUserData?.data2?.Username} Team
                  </div>
                  <div className="font_13x d-flex align-items-center ">
                    {theme === "dark" ?
                      <img alt="man" src={man_dark} className="me-2" />
                      :
                      <img alt="man" src={man} className="me-2" />
                    }
                    @{id}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={pin_dark} className="me-2" />
                      :
                      <img alt="man" src={pin} className="me-2" />
                    }
                    {honeyBeeData?.userFullData?.country === undefined ? "NA" : honeyBeeData?.userFullData?.country}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={house_dark} className="me-2" />
                      :
                      <img alt="man" src={house} className="me-2" />
                    }
                    {honeyBeeData?.userFullData?.city === undefined ? "NA" : honeyBeeData?.userFullData?.city}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={clock_dark} className="me-2" />
                      :
                      <img alt="man" src={clock} className="me-2" />
                    }
                    {honeyBeeData?.formatedAccountCreationDate}
                  </div>
                </div>

              </div>
              <div className="honeybee-container" style={{marginTop:`${isMobile ? "65px": "0px"}`}}>
                <BeeTabs honeyBeeEmail={honeyBeeEmail} />
              </div>
            </div>
          </div>
        </div>)
        :
        <TeamCaptainDashIndividual />
      }
    </>
  );
};

export default BeeDash;
