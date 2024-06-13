import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import greyman from '../../../../assets/hive-dashboard/empty_man_frame.png';
import { Rating } from '@mui/material';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import { Box, Grid, Button } from '@mui/material';
import HoneyBeeComingSoon from '../../../../components/ComingSoon/HoneyBeeComingSoon';
import {
  baseCEXURL,
  baseHiveURL,
  getCaptainBeeStatics,
  getHoneyUserDetails,
  getReferredUserDetails,
} from '../../../../services/api';
import SubHeader from '../SubHeader/SubHeader';
import TeamCaptainTabs from './TeamCaptainTabs';
import { PackData } from '../../../PowerPack/PackData';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const TeamCaptainDash = () => {
  const [userType, setUserType] = useState('');
  const [staticsData, setStaticsData] = useState();
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    const username =
      localStorage.getItem('username') !== undefined
        ? String(localStorage.getItem('username'))
        : undefined;
    const user =
      localStorage.getItem('user') !== undefined
        ? String(localStorage.getItem('user'))
        : undefined;

    setUserType(userType);
    if (userType === 'CaptainBee') {
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          setStaticsData(data.data);
          if (data?.data?.powerPackData) {
            const getPowerPack = PackData.find(
              (x) => x.name === data?.data?.powerPackData?.type
            );
            setPowerPackPhoto(getPowerPack?.photo);
          } else {
            setPowerPackPhoto(undefined);
          }
        });
      }
    } else {
      getHoneyUserDetails(user).then((data) => {
        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
      });

      getReferredUserDetails(user).then((data) => {
        setRefferedUserData(data.data);
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);
      });
    }
  }, []);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    OpenNotification('success', 'Copied Successfully!');
  };

  // Define a function to render a single Honey Bee box.
  const renderHoneyBeeBox = (item) => (
    <Grid item xs={1} sm={6} md={3}>
      <div className="d-flex flex-direction-column align-items-center">
        <div className="d-flex align-items-center">
          <div
            style={{
              width: '80px',
              height: '80px',
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
            <div
              className="bee-hexagon"
              // style={{ marginBottom: '7px' }}
            >
              <img
                alt=""
                src={item?.profilePic === undefined ? dummy : item?.profilePic}
                width={'63px'}
                height={'66px'}
                ml={'-6px'}
                border={'none'}
              />
            </div>
          </div>

          <Box
            className=" d-flex justify-content-center"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'baseline',
              backgroundColor: 'transparent',
              border: '1.5px solid #E1E1E1',
              height: '50px',
              marginLeft: '-35px',
              pl: 4,
              width: '311px',
              transition: '0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#FFB300',
                borderColor: '#FFB300',
              },
            }}
          >
            <div className="font_15x d-flex align-items-center">CaptainBee</div>
            <div className="font_15x d-flex align-items-center">
              {item.username} ({item?.firstName + ' ' + item?.lastName})
            </div>
          </Box>
        </div>
        <div
          className="d-flex align-items-center justify-content-start mt-1"
          style={{ marginLeft: '14px' }}
        >
          <Button
            variant="outlined"
            href={`/indexx-exchange/buy-sell/for-honeybee/${item.username}`}
            // onClick={handleSubmit}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              borderColor: '#FFB300',
              borderRadius: '2px',
              color: 'var(--body_color)',
              width: '170px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#FFB300',
                borderColor: '#FFB300',
                boxShadow: 'none',
                color: 'var(--body_color)',
                // color: '#282828',
              },
            }}
          >
            Exchange
          </Button>
          <Button
            variant="outlined"
            // onClick={handleSubmit}
            href={`/indexx-exchange/dashboard/capt-mybees/${item.username}/1/CaptainBee`}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              borderColor: '#FFB300',
              borderRadius: '2px',
              color: 'var(--body_color)',
              // color: '#282828',
              width: '170px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',
              ml: 0.3,
              '&:hover': {
                backgroundColor: '#FFB300',
                borderColor: '#FFB300',
                // color: '#282828',
                color: 'var(--body_color)',
                boxShadow: 'none',
              },
            }}
          >
            DashBoard
          </Button>
        </div>
      </div>
    </Grid>
  );

  // Calculate the number of empty boxes to render.
  const availableBeesCount =
    staticsData?.captainBeeRegisteredRequiredData?.length || 0;
  const emptyBoxesCount = Math.max(6 - availableBeesCount, 0);

  // Define a function to render an empty Honey Bee box with the same styling as available users.
  const renderEmptyHoneyBeeBox = (index) => (
    <Grid item xs={1} sm={6} md={3}>
      <div className="d-flex flex-direction-column align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={greyman}
            alt="man"
            style={{ zIndex: 1, width: '80px', height: '80px' }}
          />

          <Box
            className=" d-flex justify-content-center"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'baseline',
              backgroundColor: 'transparent',
              border: '1.5px solid #E1E1E1',
              height: '50px',
              marginLeft: '-35px',
              pl: 4,
              width: '311px',
              transition: '0.3s ease-in-out',
              '&:hover': {},
            }}
          >
            <div className="font_15x d-flex align-items-center">
              Captain Bee
            </div>
            <div className="font_15x d-flex align-items-center">
              {/* You can add any placeholder text here */}
            </div>
          </Box>
        </div>
        <div
          className="d-flex align-items-center justify-content-start mt-1"
          style={{ marginLeft: '14px' }}
        >
          <Button
            variant="outlined"
            // onClick={handleSubmit}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              // borderColor: '#FFB300',
              // borderRadius: '2px',
              // color: 'var(--body_color)',
              borderColor: '#E1E1E1', // Grey border color
              borderRadius: '2px',
              color: '#E1E1E1', // Grey text color
              width: '170px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',
              '&:hover': {
                borderColor: '#E1E1E1', // Grey border color
              },
            }}
          >
            Exchange
          </Button>
          <Button
            variant="outlined"
            // onClick={handleSubmit}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              borderColor: '#E1E1E1', // Grey border color
              borderRadius: '2px',
              color: '#E1E1E1', // Grey text color
              // color: '#282828',
              width: '170px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',
              ml: 0.3,
              '&:hover': {
                borderColor: '#E1E1E1', // Grey border color
              },
            }}
          >
            DashBoard
          </Button>
        </div>
      </div>
    </Grid>
  );

  return (
    <>
      <SubHeader />
      {userType === 'CaptainBee' ? (
        <div style={{ paddingTop: `${isMobile ? '250px' : '220px'}` }}>
          {/* {---} */}
          <div className="font_20x  justify-content-center text-align-center d-flex mb-2">
            <div
              style={{
                width: `${isMobile ? '95%' : '30%'}`,
                textAlign: 'center',
              }}
            >
              {availableBeesCount === 0 ? (
                <>
                  Please invite the Captain Bees using this{' '}
                  <a
                    href={`${
                      baseHiveURL +
                      '/sign-up?referral=' +
                      staticsData?.userFullData?.referralCode
                    }`}
                    className="hive_link"
                  >
                    referral link
                  </a>{' '}
                  to guide them.
                </>
              ) : (
                <>
                  These are the Captain Bees that are part of your Hex Colony.
                  Select one to guide them
                </>
              )}
            </div>
          </div>
          <div className="hive-container d-flex">
            <Box
              sx={{
                width: '73%',
                display: 'flex',
                flexDirection: `${isMobile ? 'column' : 'row'}`,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Grid
                container
                columns={{ xs: 1, sm: 12, md: 9 }}
                spacing={{ xs: 12, md: 2 }}
                maxWidth={'1150px'}
                rowSpacing={12}
              >
                {staticsData?.captainBeeRegisteredRequiredData?.map(
                  renderHoneyBeeBox
                )}
                {/* Render empty gray boxes to fill the remaining slots first */}
                {Array.from({ length: emptyBoxesCount }, (_, index) =>
                  renderEmptyHoneyBeeBox(index)
                )}
              </Grid>
            </Box>
          </div>
          <div>{/* <FlowDiagram /> */}</div>
        </div>
      ) : (
        <>
          <HoneyBeeComingSoon />
        </>
      )}
      {/* <div style={{ paddingTop: "220px" }}>
        <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: "-630px" }}>
 
          Team Captain Bee {staticsData?.affiliateUserProfile?.accname} Dashboard
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
          >
            <div className="d-flex flex-direction-column align-items-center mt-1">
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
                    src={(staticsData?.affiliateUserProfile?.photoIdFileurl !== undefined) ? staticsData?.affiliateUserProfile?.photoIdFileurl : dummy}
                    width={'63px'}
                    height={'66px'}
                    ml={'-6px'}
                    border={'none'}
                  />
                </div>
              </div>
              <div className="align-items-start lh_32x">
                <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                  Team Captain Bee {staticsData?.affiliateUserProfile?.Username}

                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                  Captain Bee of Captain {captainBeeData?.refferedUserAffilateData?.Username} Team
                </div>
                {(powerPackPhoto !== undefined && powerPackPhoto !== "") ?
                  (<div className="justify-content-center d-flex">
                    <img src={powerPackPhoto} alt='pack' width={"80%"} />
                  </div>) : (
                    <div>
                      Please purchase the powerpack from the below URL: <br />
                      <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                        Power Pack Purchase
                      </a>
                    </div>
                  )
                }
                <div className="align-items-start lh_32x">
                  <div className="font_13x d-flex align-items-center mt-4">
                    {theme === "dark" ?
                      <img alt="man" src={man_dark} className="me-1" />
                      :
                      <img alt="man" src={man} className="me-1" />
                    }
                    {staticsData?.affiliateUserProfile?.Username ? `@${staticsData?.affiliateUserProfile?.Username}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={pin_dark} className="me-2" />
                      :
                      <img alt="man" src={pin} className="me-2" />
                    }
                    {staticsData?.affiliateUserProfile?.country? staticsData?.affiliateUserProfile?.country :" NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={house_dark} className="me-1" />
                      :
                      <img alt="man" src={house} className="me-1" />
                    }
                    {staticsData?.affiliateUserProfile?.city ? `@${staticsData?.affiliateUserProfile?.city}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={clock_dark} className="me-1" />
                      :
                      <img alt="man" src={clock} className="me-1" />
                    }
                    {staticsData?.formatedAccountCreationDate}
                  </div>
                  {staticsData?.affiliateUserProfile?.isPhonePublic &&
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={phone_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={phone} className="me-2" />
                      )}
                      {staticsData?.affiliateUserProfile?.Phone}
                    </div>
                  }
                  {staticsData?.affiliateUserProfile?.isEmailPublic &&
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={email_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={email} className="me-2" />
                      )}
                      {staticsData?.affiliateUserProfile?.Email}
                    </div>
                  }
                </div>

                <div className="align-items-start lh_32x mt-4">
                  <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? staticsData?.affiliateUserProfile?.socialMediaLink?.discord : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? "_blank" : "_self"} rel="noopener noreferrer">
                    {theme === "dark" ?
                      <img alt="man" src={discord_dark} className="me-3" />
                      :
                      <img alt="Discord" src={discord} className="me-3" />
                    }
                  </a>
                  <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? staticsData?.affiliateUserProfile?.socialMediaLink?.instagram : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? "_blank" : "_self"} rel="noopener noreferrer">
                    {theme === "dark" ?
                      <img alt="man" src={insta_dark} className="me-3" />
                      :
                      <img alt="Instagram" src={insta} className="me-3" />
                    }
                  </a>
                  <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
                    {theme === "dark" ?
                      <img alt="man" src={linkedin_dark} className="me-3" />
                      :
                      <img alt="LinkedIn" src={linkedin} className="me-3" />
                    }
                  </a>
                  <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? staticsData?.affiliateUserProfile?.socialMediaLink?.twitter : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? "_blank" : "_self"} rel="noopener noreferrer">
                    {theme === "dark" ?
                      <img alt="man" src={twitter_dark} />
                      :
                      <img alt="Twitter" src={twitter} />
                    }
                  </a>

                </div>

                <div className="d-flex flex-direction-column align-items-start lh_32x mt-5">
                  <div>
                    Invite Honey Bee : {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                    />
                  </div>
                  <div>
                    Invite Captain Bee : {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                    />
                  </div>
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
            </div>
            <div className="side-container">
              <TeamCaptainTabs />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default TeamCaptainDash;
