import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import {
  getCaptainBeeStatics,
  getHoneyUserDetails,
  getReferredUserDetails,
} from '../../../../services/api';

const Permissions = () => {
  const [userType, setUserType] = useState('');
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [permissionData, setPermissionData] = useState();

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
        });
      }
    } else {
      getHoneyUserDetails(user).then((data) => {
        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
      });

      getReferredUserDetails(user).then((data) => {
        setRefferedUserData(data.data);

        let captainbeePermissions = data.data.referredUserData?.relationships;

        let c = captainbeePermissions.find((x) => x.honeybeeEmail === user);

        setPermissionData(c);
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);
      });
    }
  }, []);

  return (
    <div className="pt-5">
      <div className="font_15x fw-bold">
        Permissions given by Hive Member {honeyBeeData?.username} to Hive
        Captain {captainBeeData?.refferedUserAffilateData?.Username}
      </div>
      <div
        className="d-flex justify-content-center flex-direction-column align-items-center  mt-5"
        style={{ gap: '50px' }}
      >
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '100px' }}
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
                width: '217px',
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
              {permissionData?.permissions?.buy ? 'Approved' : 'Declined'}
            </Button>
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '98px' }}
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
                width: '217px',
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
              {permissionData?.permissions?.sell ? 'Approved' : 'Declined'}
            </Button>
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '60px' }}
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
                width: '217px',
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
              {permissionData?.permissions?.convert ? 'Approved' : 'Declined'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
