import React, { useEffect, useState } from 'react';
import SubHeader from '../SubHeader/SubHeader';

import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Grid, Button } from '@mui/material';
import { getCaptainBeeStatics, baseCEXURL } from '../../../../services/api';
import HoneyBeeComingSoon from '../../../../components/ComingSoon/HoneyBeeComingSoon';
import NodeGraph from '../../graph';
import FlowDiagram2 from '../../graph';
import FlowDiagram from '../../reactFlow';
import man from '../../../../assets/hive-dashboard/empty_man_frame.png';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import HiveDashboardIconicHeader from '../SubHeader/HiveDashboardIconicHeader';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  exchangeBtn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #FFB300',
    borderRadius: '2px',
    color: 'var(--body_color)',
    height: '32px',
    textTransform: 'none',
    fontSize: '12px',
    boxShadow: 'none',
    transition: '0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#FFB300',
      borderColor: '#FFB300',
      boxShadow: 'none',
      color: 'var(--body_color)',
      // color: '#282828',
    },
  },
}));

const MyBees = () => {
  const [staticsData, setStaticsData] = useState();
  const [userType, setUserType] = useState('');
  const classes = useStyles();
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
    setUserType(userType);

    if (userType === 'CaptainBee') {
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          setStaticsData(data.data);
        });
      }
    }
  }, []);

  // Define a function to render a single Hive Member box.
  const renderHoneyBeeBox = (item) => (
    <Grid item sx={{ flex: 1 }}>
      <div className="d-flex flex-direction-column align-items-center">
        <div
          className="d-flex align-items-center"
          style={{ justifyContent: 'flex-start', gap: '10px', width: '100%' }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              // backgroundImage: `url(${frame})`,
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
              style={{
                width: '80px',
                height: '80px',
                position: 'absolute',
                zIndex: '1',
              }}
            >
              <img src={frame} style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="bee-hexagon" style={{ marginBottom: '7px' }}>
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
              transition: '0.3s ease-in-out',
            }}
          >
            <div className="font_15x d-flex align-items-center">
              Hive Member
            </div>
            <div className="font_15x d-flex align-items-center">
              {item.username}
              {/* ({ item?.firstName + " " + item?.lastName}) */}
            </div>
          </Box>
        </div>
        <div
          className="d-flex align-items-center justify-content-start mt-1"
          style={{ flex: 1, width: '100%', gap: '10px' }}
        >
          <Link
            variant="outlined"
            to={`/update/home/?buyToken=INEX&user=${item.username}`}
            className={classes.exchangeBtn}
          >
            Exchange
          </Link>
          <Link
            to={`/indexx-exchange/dashboard/capt-mybees/${item.username}/1/HoneyBee`}
            className={classes.exchangeBtn}
          >
            DashBoard
          </Link>
        </div>
      </div>
    </Grid>
  );

  // Calculate the number of empty boxes to render.
  const availableBeesCount = staticsData?.honeyBeesRegisteredData?.length || 0;
  const emptyBoxesCount = Math.max(6 - availableBeesCount, 0);

  // Define a function to render an empty Hive Member box with the same styling as available users.
  const renderEmptyHoneyBeeBox = (index) => (
    <Grid item sx={{ flex: 1 }}>
      <div className="d-flex flex-direction-column align-items-center">
        <div
          className="d-flex"
          style={{ justifyContent: 'flex-start', gap: '10px', width: '100%' }}
        >
          <img
            src={man}
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
              height: '50px',
              transition: '0.3s ease-in-out',
            }}
          >
            <div className="font_15x d-flex align-items-center">
              Hive Member
            </div>
            <div className="font_15x d-flex align-items-center">
              {/* You can add any placeholder text here */}
            </div>
          </Box>
        </div>
        <div
          className="d-flex align-items-center justify-content-start mt-1"
          style={{ width: '100%', gap: '10px' }}
        >
          <Button
            variant="outlined"
            // onClick={handleSubmit}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              borderColor: '#E1E1E1', // Grey border color
              borderRadius: '2px',
              color: '#E1E1E1', // Grey text color
              flex: 1,
              height: '32px',
              textTransform: 'none',
              fontSize: '12px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',
              '&:hover': {
                borderColor: '#E1E1E1', // Grey border color
                boxShadow: 'none',
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
              flex: 1,
              height: '32px',
              textTransform: 'none',
              fontSize: '12px',
              boxShadow: 'none',
              transition: '0.3s ease-in-out',

              '&:hover': {
                borderColor: '#E1E1E1', // Grey border color
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

  const [selectedTab, setSelectedTab] = useState('My Hive Members');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      {/* <SubHeader /> */}
      <HiveDashboardIconicHeader
        selectedTab={selectedTab}
        onChange={handleTabChange}
      />

      {userType === 'CaptainBee' ? (
        <div style={{}}>
          <div className="font_20x  justify-content-center text-align-center d-flex mb-2">
            <div
              style={{
                textAlign: 'center',
                marginTop: '100px',
                maxWidth: '500px',
                width: '100%',
                padding: '20px',
              }}
            >
              {availableBeesCount === 0 ? (
                <>
                  Please invite the Hive Members using this{' '}
                  <a
                    href={`${
                      baseCEXURL +
                      '/indexx-exchange/buy-sell/get-started-honeybee?referral=' +
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
                  These are the Hive Members that are part of your Colony.
                  Select one to guide them
                </>
              )}
            </div>
          </div>
          <div className="hive-container d-flex">
            <Box
              sx={{
                maxWidth: '1140px',
                width: '100%',
                margin: 'auto',
                padding: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '40px',
                  flexDirection: isMobile ? 'column' : 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {staticsData?.honeyBeesRegisteredData?.map(renderHoneyBeeBox)}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '40px',
                  flexDirection: isMobile ? 'column' : 'row',
                  flexWrap: 'wrap',
                  marginTop: '100px',
                  justifyContent: 'center',
                }}
              >
                {/* Render empty gray boxes to fill the remaining slots first */}
                {Array.from({ length: emptyBoxesCount }, (_, index) =>
                  renderEmptyHoneyBeeBox(index)
                )}
              </div>
            </Box>
          </div>
          {/* {---} */}

          <div>{/* <FlowDiagram /> */}</div>
        </div>
      ) : (
        <>
          <HoneyBeeComingSoon />
        </>
      )}
    </>
  );
};

export default MyBees;
