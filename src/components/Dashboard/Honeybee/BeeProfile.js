import React, { useState, useEffect } from 'react';
import frame from '../../../assets/hive-dashboard/beeframe-2.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Typography, TextField, Button } from '@mui/material';
import BeeHeader from './BeeHeader/BeeHeader';
import loadingGif from '../../../assets/beeloade.gif';
import { getCaptainBeeStatics, getHoneyUserDetails, updateHoneyBeeProfile } from '../../../services/api';
import AWS from 'aws-sdk';
import { notification } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import OpenNotification from '../../OpenNotification/OpenNotification';
const S3_BUCKET = 'indexx-exchange';
const REGION = 'ap-northeast-1';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: REGION,
});
var s3 = new AWS.S3();

const BeeProfile = () => {
  const [profilePic, setPhoto] = useState(dummy);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [userData, setUserData] = useState();
  const [loadings, setLoadings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePhotoChange = (event) => {

    const file = event.target.files[0];
    uploadToS3(file, 'photoId');
  };

  const uploadToS3 = async (file, fileType) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type
    };

    try {
      await s3.putObject(params).promise();
      // Construct and set the file URL
      const url = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${params.Key}`;

      setPhoto(url);
    } catch (error) {
      console.log("Error here", error)
      alert('Error uploading file:', error);
    }
  };

  const handleSubmit = async () => {
    setLoadings(true);

    let updateData = {
      profilePic, lastname, firstname, email
    }
    updateHoneyBeeProfile(email, updateData).then((data) => {

      if (data.status === 200) {

        setLoadings(false);
        OpenNotification('success', 'Profile data updated Successfully');
      } else {
        setLoadings(false);
        OpenNotification('error', 'Failed to updated. Please try again.');
      }
    }
    )
  }

  useEffect(() => {
    const loadData = async () => {
      const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
      const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
      const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;

      setUserType(userType);

      if (userType === "CaptainBee") {
        if (username) {
          try {
            const data = await getCaptainBeeStatics(username);
            setStaticsData(data.data);
          } catch (error) {
            console.error("Error loading CaptainBee statics:", error);
          }
        }
      } else {
        try {
          const data = await getHoneyUserDetails(user);
          setUserData(data.data?._doc);
          setEmail(data.data?._doc?.email);
          setFirstname(data.data?._doc?.firstName);
          setLastname(data.data?._doc?.lastName);
          setPhoto(data.data?._doc?.profilePic);
        } catch (error) {
          console.error("Error loading Honey User details:", error);
        }
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <BeeHeader />
      {isLoading &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter:"blur(8px)",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            Please wait while your profile is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      }
      <div className="hive-container" style={{ paddingTop: "280px" }}>
        <div
          className="d-flex flex-direction-column justify-content-center"
          style={{ width: '74%', maxWidth: '1140px' }}
        >
          <div
            style={{
              width: '238px',
              height: '238px',
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
            <div className="profile-hexagon" style={{ marginBottom: "16.5px" }}>
              <img
                alt=""
                src={(profilePic !== undefined) ? profilePic : dummy}
                width={'63px'}
                height={'66px'}
                ml={'-6px'}
                border={'none'}
              />
            </div>
          </div>

          <div
            className="d-flex flex-direction-column justify-content-center align-items-center mt-4"
            style={{ width: '100%' }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="profilephoto"
              onChange={handlePhotoChange}
            ></input>
            <label htmlFor="profilephoto">
              <div className="border px-4 py-2">Change Profile Photo</div>
            </label>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '58%',
                maxWidth: '1520px',
                mt: 7,
              }}
            >
              <Typography variant="text" fontSize={'30px'} fontWeight={600}>
                Honey Bee Information
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: '100%',
                  my: 2,
                }}
              >
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  fontWeight={400}
                  width={'35%'}
                  textAlign={'left'}
                >
                  Name
                </Typography>
                <TextField
                  //   label="First Name"
                  placeholder="First Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '31.2%' }}
                  size="small" // Make the input box smaller
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
                <TextField
                  //   label="Last Name"
                  placeholder="Last Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '31.2%' }}
                  size="small" // Make the input box smaller
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: '100%',
                  mb: 7,
                }}
              >
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  fontWeight={400}
                  width={'35%'}
                  textAlign={'left'}
                >
                  Email
                </Typography>
                {/* <TextField
                  //   label="Email"
                  placeholder="you@yourdomain.com"
                  type="email"
                  InputLabelProps={{ shrink: true, readOnly: true, }}
                  variant="outlined"
                  sx={{ mb: 2, width: '64%' }}
                  size="small" // Make the input box smaller
                  value={email}
                  //  error={emailError !== ''}
                  // helperText={emailError}
                  // onBlur={validateEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                /> */}
                <Box
                      sx={{ mb: 2, px:2, width: '64%', fontSize: "15px", }}>
                      {email}
                    </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                width: '58%',
                my: 2,
              }}
            >
              <Button
                variant="contained"
                // onClick={handleSubmit}
                disableTouchRipple
                // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  width: '49%',
                  px: 10,
                  //   py: 1,
                  textTransform: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  //   mt:3,
                  '&:hover': {
                    backgroundColor: '#FFD000',
                    boxShadow: 'none',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disableTouchRipple
                sx={{
                  backgroundColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  width: '49%',
                  px: 10,
                  py: 1,
                  textTransform: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  //   mt:3,
                  '&:hover': {
                    backgroundColor: '#FFD000',
                    boxShadow: 'none',
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </div>
        </div>
      </div>

    </>
  );
};

export default BeeProfile;
