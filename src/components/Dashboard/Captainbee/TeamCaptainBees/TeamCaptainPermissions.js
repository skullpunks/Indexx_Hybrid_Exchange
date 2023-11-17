import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { getCaptainBeeStatics, getHoneyUserDetails, getReferredUserDetails } from '../../../../services/api';
import { useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'

const TeamCaptainPermissions = ({ email }) => {

  const [userType1, setUserType] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [permissionData, setPermissionData] = useState();
  const { id, userType } = useParams();
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));
  useEffect(() => {
    const userTypel = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;

    setUserType(userTypel);
    // if (id && userType) {
    //   getCaptainBeeStatics(id).then((data) => {
    //     setStaticsData(data.data);
    //     console.log("in else if in persmssopn",data?.data)
    //   });
    // }
    // else 
    if (userTypel === "CaptainBee") {
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          setStaticsData(data.data);
          console.log("in else if in persmssopn", data?.data)
          let captainbeePermissions = data?.data?.captainBeeRegisteredRequiredData;

          let c = captainbeePermissions.find(x => x.username === id);
          console.log("captainbeePermissions", captainbeePermissions, c)

          setPermissionData(c)
        });
      }
    } else {

      getHoneyUserDetails(user).then((data) => {

        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
      })

      getReferredUserDetails(user).then((data) => {

        setRefferedUserData(data.data)

        let captainbeePermissions = data.data.referredUserData?.relationships;


        let c = captainbeePermissions.find(x => x.honeybeeEmail === user);

        setPermissionData(c)
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);
      })
    }
  }, [])

  return (
    <div >
      <div className='pt-2' style={{ background: "#FFB300" }}></div>
      <div className="pt-4 pb-5" style={{ background: "white", paddingInline: `${isMobile ? '20px' : '45px'}` }}>

        <div className="font_15x fw-bold">
          Permissions given by TEAM CaptainBee {permissionData?.username} to  LEADER captainbee {staticsData?.affiliateUserProfile?.Username}
        </div>
        <div
          className="d-flex justify-content-center flex-direction-column align-items-center  mt-5"
          style={{ gap: '50px' }}
        >
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ gap: `${isMobile ? '20px' : '100px'}` }}
          >
            <div>
              <Typography variant="text" component="p" fontSize={'15px'}>
                Permission to BUY
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                disableTouchRipple
                disabled={!permissionData?.permissions?.buy}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  px: 8,
                  textTransform: 'none',
                  fontSize: '15px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFD000',
                    boxShadow: 'none',
                  },
                }}
              >
                {permissionData?.permissions?.buy ? "Approved" : "Declined"}
              </Button>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center "
            style={{ gap: `${isMobile ? '19px' : '98px'}` }}
          >
            <div>
              <Typography variant="text" component="p" fontSize={'15px'}>
                Permission to SELL
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                disableTouchRipple
                disabled={!permissionData?.permissions?.sell}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  px: 8,
                  textTransform: 'none',
                  fontSize: '15px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFD000',
                    boxShadow: 'none',
                  },
                }}
              >
                {permissionData?.permissions?.sell ? "Approved" : "Declined"}
              </Button>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center "
            style={{ gap: `${isMobile ? '15px' : '60px'}` }}
          >
            <div>
              <Typography variant="text" component="p" fontSize={'15px'}>
                Permission to CONVERT
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                disableTouchRipple
                disabled={!permissionData?.permissions?.convert}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  px: 8,
                  textTransform: 'none',
                  fontSize: '15px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFD000',
                    boxShadow: 'none',
                  },
                }}
              >
                {permissionData?.permissions?.convert ? "Approved" : "Declined"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCaptainPermissions;
