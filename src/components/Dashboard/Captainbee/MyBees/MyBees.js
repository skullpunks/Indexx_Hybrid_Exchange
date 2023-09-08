import React, { useState } from 'react';
import SubHeader from '../SubHeader/SubHeader';

import frame from '../../../../assets/hive-dashboard/silverframe.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Grid, Button } from '@mui/material';

const imgData = [
  {
    id: '1',
    image: dummy,
    name: 'Willie',
    dashboard: '',
    exchange: '',
  },
  {
    id: '2',
    image: dummy,
    name: 'Rekha',
    dashboard: '',
    exchange: '',
  },
  {
    id: '3',
    image: dummy,
    name: 'Kelly',
    dashboard: '',
    exchange: '',
  },
  {
    id: '4',
    image: dummy,
    name: 'Arjun',
    dashboard: '',
    exchange: '',
  },
  {
    id: '5',
    image: frame,
    name: 'Willie',
    dashboard: '',
    exchange: '',
  },
  {
    id: '6',
    image: frame,
    name: 'Willie',
    dashboard: '',
    exchange: '',
  },
  {
    id: '7',
    image: frame,
    name: 'Willie',
    dashboard: '',
    exchange: '',
  },
  {
    id: '8',
    image: frame,
    name: 'Willie',
    dashboard: '',
    exchange: '',
  },
];

const MyBees = () => {
  const [honeybees, setHoneybees] = useState(imgData);

  return (
    <>
      <SubHeader />
      <div className="hive-container d-flex">
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
            {honeybees?.map((item) => (
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
                          src={dummy}
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
                        display:"flex",
                        justifyContent:"center",
                        backgroundColor: 'transparent',
                        border:"1.5px solid #E1E1E1",
                        height: '50px',
                        marginLeft: '-35px',
                        width: '211px',
                        transition:"0.3s ease-in-out",
                        '&:hover': {
                          backgroundColor: '#FFB300',
                          borderColor: '#FFB300',
                        },
                      }}
                    >
                      <div className="font_15x d-flex align-items-center">
                        Honey Bee Willie
                      </div>
                    </Box>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-start mt-1"
                    style={{ marginLeft: '14px' }}
                  >
                    <Button
                      variant="outlined"
                      href='/'
                      // onClick={handleSubmit}
                      disableTouchRipple
                      // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
                      sx={{
                        borderColor: '#FFB300',
                        borderRadius: '2px',
                        color: '#282828',
                        width: '120px',
                        height: '32px',
                        textTransform: 'none',
                        fontSize: '10px',
                        boxShadow: 'none',
                        transition:"0.3s ease-in-out",
                        '&:hover': {
                          backgroundColor: '#FFB300',
                          borderColor: '#FFB300',
                          boxShadow: 'none',
                          color: '#282828',
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
                        borderColor: '#FFB300',
                        borderRadius: '2px',
                        color: '#282828',
                        width: '120px',
                        height: '32px',
                        textTransform: 'none',
                        fontSize: '10px',
                        boxShadow: 'none',
                        transition:"0.3s ease-in-out",
                        ml: 0.3,
                        '&:hover': {
                          backgroundColor: '#FFB300',
                          borderColor: '#FFB300',
                          color: '#282828',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      DashBoard
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MyBees;
