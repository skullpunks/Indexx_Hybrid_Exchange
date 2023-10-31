import React, { useEffect, useState } from 'react';
import SubHeader from '../SubHeader/SubHeader';

import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Grid, Button } from '@mui/material';
import { getCaptainBeeStatics } from '../../../../services/api';
import HoneyBeeComingSoon from "../../../../components/ComingSoon/HoneyBeeComingSoon";
import NodeGraph from '../../graph';
import FlowDiagram2 from '../../graph';
import FlowDiagram from '../../reactFlow';
import man from "../../../../assets/hive-dashboard/man4 2.svg";
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'

const MyBees = () => {
  const [staticsData, setStaticsData] = useState();
  const [userType, setUserType] = useState("");

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    setUserType(userType);

    if (userType === "CaptainBee") {
      getCaptainBeeStatics(username).then((data) => {
        setStaticsData(data.data);
      });
    }
  }, [])

  // Define a function to render a single Honey Bee box.
  const renderHoneyBeeBox = (item) => (
    <Grid item xs={1} sm={6} md={3} >
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
              style={{ marginBottom: '7px' }}
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "baseline",
              backgroundColor: 'transparent',
              border: "1.5px solid #E1E1E1",
              height: '50px',
              marginLeft: '-35px',
              pl: 4,
              width: '211px',
              transition: "0.3s ease-in-out",
              '&:hover': {
                backgroundColor: '#FFB300',
                borderColor: '#FFB300',
              },
            }}
          >
            <div className="font_15x d-flex align-items-center">
              Honey Bee
            </div>
            <div className="font_15x d-flex align-items-center">
              {item.username}
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
              width: '120px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: "0.3s ease-in-out",
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
            href={`/indexx-exchange/dashboard/capt-mybees/${item.username}/1/HoneyBee`}
            disableTouchRipple
            // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              borderColor: '#FFB300',
              borderRadius: '2px',
              color: 'var(--body_color)',
              // color: '#282828',
              width: '120px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: "0.3s ease-in-out",
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
  const availableBeesCount = staticsData?.honeyBeesRegisteredData?.length || 0;
  const emptyBoxesCount = Math.max(6 - availableBeesCount, 0);

  // Define a function to render an empty Honey Bee box with the same styling as available users.
  const renderEmptyHoneyBeeBox = (index) => (
    <Grid item xs={1} sm={6} md={3}>
      <div className="d-flex flex-direction-column align-items-center">
        <div className="d-flex align-items-center">
          <img src={man} alt="man" style={{zIndex:1, width:"80px", height:"80px"}}/>

          <Box
            className=" d-flex justify-content-center"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "baseline",
              backgroundColor: 'transparent',
              border: "1.5px solid #E1E1E1",
              height: '50px',
              marginLeft: '-35px',
              pl: 4,
              width: '211px',
              transition: "0.3s ease-in-out",
            }}
          >
            <div className="font_15x d-flex align-items-center">
              Honey Bee
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
              borderColor: '#E1E1E1', // Grey border color
              borderRadius: '2px',
              color: '#E1E1E1', // Grey text color
              width: '120px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: "0.3s ease-in-out",
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
              // color: '#282828',
              width: '120px',
              height: '32px',
              textTransform: 'none',
              fontSize: '10px',
              boxShadow: 'none',
              transition: "0.3s ease-in-out",
              ml: 0.3,
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

  return (
    <>
      <SubHeader />
      {userType === "CaptainBee" ?
        (<div style={{ paddingTop: `${isMobile? "250px" : "220px"}` }}>
          <div className='font_20x  justify-content-center text-align-center d-flex mb-2' >
            <div style={{ width: `${isMobile? "95%" : "30%"}`, textAlign: "center" }}>
              These are the Honey Bees that are part of your honeycomb. Select one to guide them
            </div>
          </div>
          <div className="hive-container d-flex">
            <Box
              sx={{
                width: '73%',
                display: 'flex',
                flexDirection: `${isMobile? "column" : "row"}`,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Grid
                container
                columns={{ xs: 1, sm: 12, md: 12 }}
                spacing={{ xs: 12, md: 2 }}
                maxWidth={"1150px"}
                rowSpacing={12}
              >
                {staticsData?.honeyBeesRegisteredData?.map(renderHoneyBeeBox)}
                {/* Render empty gray boxes to fill the remaining slots first */}
                {Array.from({ length: emptyBoxesCount }, (_, index) => (
                  renderEmptyHoneyBeeBox(index)
                ))}
              </Grid>

            </Box>
          </div>
          {/* {---} */}

          <div>
            {/* <FlowDiagram /> */}
          </div>
        </div>) :
        <><HoneyBeeComingSoon />
        </>
      }
    </>
  );
};

export default MyBees;
