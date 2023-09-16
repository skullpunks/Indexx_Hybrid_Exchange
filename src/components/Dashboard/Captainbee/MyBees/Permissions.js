import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCaptainBeeStatics, getHoneyBeeDataByUsername } from '../../../../services/api';

const Permissions = () => {

  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [permissionData, setPermissionData] = useState();
  useEffect(() => {
    

    getHoneyBeeDataByUsername(id).then((data) => {
      setUserData(data.data);
      
      let currentUserEmail = data.data.userFullData.email;
      let captainbeePermissions = data.data.referredUserData?.data.relationships;
      
      
      let c = captainbeePermissions.find(x => x.honeybeeEmail === currentUserEmail);
      
      setPermissionData(c)
    });
  }, [id])

  return (
    <div className="pt-5">
      <div className="font_15x fw-bold">
        Permissions given by honeybee {id} to captainbee {userData?.referredUserData?.data2?.Username}
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
                width: "217px",
                px: 8,
                textTransform: 'none',
                fontSize: '15px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              {permissionData?.permissions?.buy ? "Approved" : "Declined"}
            </Button>

            {permissionData?.permissions?.buy === false ?

              <Button
                variant="contained"
                disableTouchRipple
                disabled={permissionData?.permissions?.buy}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: "217px",
                  ml:2,
                  px: 8,
                  textTransform: 'none',
                  fontSize: '15px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFB300',
                    boxShadow: 'none',
                  },
                }}
              >
              Request
              </Button>
            :null}
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
                width: "217px",
                px: 8,
                textTransform: 'none',
                fontSize: '15px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              {permissionData?.permissions?.sell ? "Approved" : "Declined"}
            </Button>
            {permissionData?.permissions?.sell === false ?

            <Button
              variant="contained"
              disableTouchRipple
              disabled={permissionData?.permissions?.sell}
              sx={{
                backgroundColor: '#FFB300',
                borderRadius: '2px',
                color: '#282828',
                height: '40px',
                width: "217px",
                ml:2,
                px: 8,
                textTransform: 'none',
                fontSize: '15px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
            Request
            </Button>
            :null}
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
                width: "217px",
                px: 8,
                textTransform: 'none',
                fontSize: '15px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              {permissionData?.permissions?.convert ? "Approved" : "Declined"}
            </Button>

            {permissionData?.permissions?.convert === false ?

              <Button
                variant="contained"
                disableTouchRipple
                disabled={permissionData?.permissions?.convert}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: "217px",
                  ml:2,
                  px: 8,
                  textTransform: 'none',
                  fontSize: '15px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FFB300',
                    boxShadow: 'none',
                  },
                }}
              >
              Request
              </Button>
            :null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
