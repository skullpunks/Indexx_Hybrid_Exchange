import React, { useEffect, useState } from 'react';
import SubHeader from '../SubHeader/SubHeader';

import frame from '../../../../assets/hive-dashboard/silverframe.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Grid, Button } from '@mui/material';
import { getCaptainBeeStatics } from '../../../../services/api';
import HoneyBeeComingSoon from "../../../../components/ComingSoon/HoneyBeeComingSoon";


const MyBees = () => {
  const [staticsData, setStaticsData] = useState();
  const [userType, setUserType] = useState("");

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

  return (
    <>
      <SubHeader />
      {userType === "CaptainBee" ?
        (<div className="hive-container d-flex">
          <Box
            sx={{
              width: '73%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Grid
              container
              // columns={{ xs: 1, sm: 12, md: 12 }}
              spacing={{ xs: 1, md: 2 }}
              maxWidth={"1150px"}
              rowSpacing={12}
            >
              {staticsData?.honeyBeesRegisteredData?.length > 0 ?
                (staticsData?.honeyBeesRegisteredData?.map((item) => (
                  <Grid item xs={1} sm={6} md={3} >
                    <div className="d-flex flex-direction-column">
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
                            justifyContent: "center",
                            backgroundColor: 'transparent',
                            border: "1.5px solid #E1E1E1",
                            height: '50px',
                            marginLeft: '-35px',
                            width: '211px',
                            transition: "0.3s ease-in-out",
                            '&:hover': {
                              backgroundColor: '#FFB300',
                              borderColor: '#FFB300',
                            },
                          }}
                        >
                          <div className="font_15x d-flex align-items-center">
                            Honey Bee {item.username}
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
                          href={`/indexx-exchange/dashboard/capt-mybees/${item.username}/1`}
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
                ))) :
                <>
                  <div className="d-flex flex-direction-column">
                    <div className="d-flex align-items-center">
                      <h2> No Honey Bees Avalible to list </h2>
                    </div>
                  </div>
                </>}
            </Grid>
          </Box>
        </div>) :
        <><HoneyBeeComingSoon />
        </>
      }
    </>
  );
};

export default MyBees;
