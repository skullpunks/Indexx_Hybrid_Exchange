import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHoneyBeeDataByUsername, requestPermissionsByEmail } from '../../../../services/api';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { useTheme } from '@emotion/react';
import { useMediaQuery} from '@mui/material'

const Permissions = () => {

  const { id, userType } = useParams();
  const [userData, setUserData] = useState();
  const [permissionData, setPermissionData] = useState();
  const [captainBeeEmail, setCaptainBeeEmail] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState();
  const [loadings, setLoadings] = useState(false);
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {


    getHoneyBeeDataByUsername(id).then((data) => {
      console.log(data?.data);
      setUserData(data.data);
      let currentUserEmail = data.data.userFullData.email;
      setHoneyBeeEmail(currentUserEmail);
      if (userType === "CaptainBee") {
        let captainbeePermissions = data.data.referredUserData?.data?.captainBeeRelationShips;
        console.log(captainbeePermissions);
        setCaptainBeeEmail(data?.data?.referredUserData?.data?.email)
        let c = captainbeePermissions.find(x => x.captainBeeEmail === currentUserEmail);

        setPermissionData(c)
      } else if (userType === "HoneyBee") {
        let honeybeePermissions = data.data.referredUserData?.data?.relationships;
        console.log(honeybeePermissions);
        setCaptainBeeEmail(data?.data?.referredUserData?.data?.email)
        let c = honeybeePermissions.find(x => x.honeybeeEmail === currentUserEmail);

        setPermissionData(c)
      }
    });
  }, [id])

  const requestPermissionByEmail = async (type) => {
    try {
      setLoadings(true);
      let res = await requestPermissionsByEmail(captainBeeEmail, honeyBeeEmail, type);
      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', res.message);
      } else {
        setLoadings(false);
        OpenNotification('error', res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="pt-5">
      <div className="font_15x fw-bold" style={{ color: "#393939" }}>
        Permissions given by {userType === "CaptainBee" ?  "captainbee" : "honeybee"} {id} to captainbee {userData?.referredUserData?.data2?.Username}
      </div>
      <div
        className="d-flex justify-content-center flex-direction-column align-items-center  mt-5"
        style={{ gap: '50px' }}
      >
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: `${isMobile ? '80px' : '100px'}` }}
        >
          <div>
            <Typography variant="text" component="p" fontSize={'15px'} style={{ color: "#393939" }}>
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

            {permissionData?.permissions?.buy === false ?

              <Button
                loading={loadings}
                variant="contained"
                onClick={() => requestPermissionByEmail("Buy")}
                disableTouchRipple
                disabled={permissionData?.permissions?.buy}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  ml: isMobile ? 0 : 2,
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
                Request
              </Button>
              : null}
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ gap: `${isMobile ? '80px' : '98px'}` }}
        >
          <div> 
          {/* // className="d-flex align-items-center justify-content-center" style={{width:`${isMobile ? '80%' : 'auto'}`,}}> */}
            <Typography variant="text" component="p" fontSize={'15px'} style={{ color: "#393939" }}>
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
            {permissionData?.permissions?.sell === false ?

              <Button
                loading={loadings}
                variant="contained"
                disableTouchRipple
                disabled={permissionData?.permissions?.sell}
                onClick={() => requestPermissionByEmail("Sell")}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  ml: isMobile ? 0 : 2,
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
                Request
              </Button>
              : null}
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '60px' }}
        >
          <div>
            <Typography variant="text" component="p" fontSize={'15px'} style={{ color: "#393939" }}>
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

            {permissionData?.permissions?.convert === false ?

              <Button
                loading={loadings}
                variant="contained"
                disableTouchRipple
                disabled={permissionData?.permissions?.convert}
                onClick={() => requestPermissionByEmail("Convert")}
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: `${isMobile ? '100%' : '217px'}`,
                  ml: isMobile ? 0 : 2,
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
                Request
              </Button>
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
