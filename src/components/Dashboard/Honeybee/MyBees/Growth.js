import React, {useEffect, useState} from 'react'

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';

import comingsoon from '../../../../assets/hive-dashboard/comingsoon.svg';

import { LineChart } from '@mui/x-charts/LineChart';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { getCaptainBeeStatics, getHoneyUserDetails } from '../../../../services/api';

const Growth = () => {
    const [platform, setPlatform] = useState('Exchange');
    const [Order, setOrder] = useState('buysell');
    const [selectedDate, setSelectedDate] = useState('aug-sept');
    const [userType, setUserType] = useState("");
    const [staticsData, setStaticsData] = useState();
    const [userData, setUserData] = useState();
    const [loadings, setLoadings] = useState(false);
    const [email, setEmail] = useState('');
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
      'Page A',
      'Page B',
      'Page C',
      'Page D',
      'Page E',
      'Page F',
      'Page G',
    ];

    useEffect(() => {
      const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
      const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
      const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;
      
      if (userType === "CaptainBee") {
        getCaptainBeeStatics(username).then((data) => {
          
          setStaticsData(data.data);
        });
      } else {
        
        getHoneyUserDetails(user).then((data) => {
          
          setUserData(data.data?._doc);
          setEmail(data.data?._doc?.email);
        })
      }
    }, [])

  return (
    <div style={{paddingTop:"10px"}}>
        <Typography
              variant="text"
              component="p"
              fontSize={'15px'}
              fontWeight={700}
              textAlign={'left'}
              mb={2}
            >
              Sales Dashboard
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '50%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      width: '31%',
                      background: 'white',
                      pl: 1,
                      pt: 0.4,
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                    >
                      Platforms
                    </Typography>
                    <Select
                      value={platform}
                      onChange={(e) => {
                        setPlatform(e.target.value);
                      }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: '100%',
                        borderRadius: 0,
                        background: 'white',
                        border: 'none',
                        outline: 'none',
                        padding: 0,
                        fontSize: '12px',
                      }}
                      size="small"
                      disableUnderline
                    >
                      {/* <MenuItem value="">Select Platform</MenuItem> */}
                      <MenuItem key="Exchange" value="Exchange">
                        Indexx Exchange
                      </MenuItem>
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      width: '29%',
                      background: 'white',
                      pl: 1,
                      pt: 0.4,
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                    >
                      Type of Order
                    </Typography>
                    <Select
                      value={Order}
                      onChange={(e) => {
                        setOrder(e.target.value);
                      }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: '100%',
                        borderRadius: 0,
                        background: 'white',
                        border: 'none',
                        outline: 'none',
                        padding: 0,
                        fontSize: '12px',
                      }}
                      size="small"
                      disableUnderline
                    >
                      <MenuItem key="buysell" value="buysell">
                        Buy & Sell
                      </MenuItem>
                      <MenuItem key="Convert" value="Convert">
                        Convert
                      </MenuItem>
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      width: '40%',
                      background: 'white',
                      pl: 1,
                      pt: 0.4,
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                    >
                      Date Range
                    </Typography>

                    <Select
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                      }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: '100%',
                        borderRadius: 0,
                        background: 'white',
                        border: 'none',
                        outline: 'none',
                        padding: 0,
                        fontSize: '12px',
                      }}
                      size="small"
                      disableUnderline
                    >
                      <MenuItem key="aug-sept" value="aug-sept">
                        August-September
                      </MenuItem>
                    </Select>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={['year', 'month']}
                        label="Month/Year"
                        value={selectedDate}
                        onChange={handleDateChange}
                        inputFormat="MM/yy"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </LocalizationProvider> */}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: '50%',
                      background: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 1,
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                      pr={5}
                    >
                      Total Honey Bees/Users
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'77px'}
                      fontWeight={600}
                      textAlign={'left'}
                    >
                      30
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'22px'}
                      fontWeight={400}
                      textAlign={'left'}
                      color={'#FFB300'}
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        verticalAlign: 'bottom',
                        gap: 1,
                      }}
                    >
                      <img alt="up" src={arrow} /> 30%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '50%',
                      background: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 1,
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                      pr={12}
                    >
                      Total Orders
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'77px'}
                      fontWeight={600}
                      textAlign={'left'}
                    >
                      50
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'22px'}
                      fontWeight={400}
                      textAlign={'left'}
                      color={'#FFB300'}
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        verticalAlign: 'bottom',
                        gap: 1,
                      }}
                    >
                      <img alt="up" src={arrow} /> 20%
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    background: 'white',
                  }}
                >
                  <LineChart
                    width={400}
                    height={300}
                    series={[
                      { data: pData, label: 'pv' },
                      { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                  />
                </Box>
              </Box>

              <Box
                component="img"
                alt="comingsoon"
                src={comingsoon}
                width={'50%'}
              />
            </Box>
    </div>
  )
}

export default Growth