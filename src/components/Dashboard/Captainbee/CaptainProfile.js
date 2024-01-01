import React, { useEffect, useState } from 'react';
import SubHeader from './SubHeader/SubHeader';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import loadingGif from '../../../assets/beeloade.gif';
import { Box, Typography, TextField, Button } from '@mui/material';
import { getCaptainBeeStatics, updateCaptainBeeProfile } from '../../../services/api';
import AWS from 'aws-sdk';
import HoneyBeeComingSoon from "../../../components/ComingSoon/HoneyBeeComingSoon";
import { IOSSwitch } from '../../IOSSwitch/IOSSwitch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import OpenNotification from '../../OpenNotification/OpenNotification';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'

const S3_BUCKET = 'indexx-exchange';
const REGION = 'ap-northeast-1';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: REGION,
});

var s3 = new AWS.S3();


const CaptainProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [useEmail, setUseEmail] = useState(true);
  const [Phone, setPhone] = useState('');
  const [usePhone, setUsePhone] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [referralCodeCapt, setReferralCodeCapt] = useState('');
  const [accname, setAccname] = useState('');
  const [discord, setDiscord] = useState("");
  const [insta, setInsta] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [userType, setUserType] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;

    setUserType(userType);

    if (userType === "CaptainBee") {
      if (username) {
        const data = await getCaptainBeeStatics(username, "yes");

          setStaticsData(data.data);
          const profile = data.data.affiliateUserProfile || {};
          const socialMediaLink = profile.socialMediaLink || {};
          const fullUserData = data.data.userFullData || {};
          setFirstname(profile.firstname || '');
          setLastname(profile.lastname || '');
          setPhoto(profile.photoIdFileurl || '');
          setPhone(profile.Phone || '');
          setReferralCode(fullUserData.referralCode || '');
          setAccname(profile.accname || '');
          setDiscord(socialMediaLink.discord || '');
          setInsta(socialMediaLink.instagram || '');
          setLinkedin(socialMediaLink.linkedin || '');
          setTwitter(socialMediaLink.twitter || '');
          setEmail(profile.Email || '');
          setUsername(profile.Username || '');
          setUseEmail(profile.isEmailPublic || false);
          setUsePhone(profile.isPhonePublic || false);
          setBio(profile.PublicBio || '');
      }
    }
    setIsLoading(false); 
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); 
          }
          finally {
            setIsLoading(false);
          }
    };

    fetchData();
  }, [])

  const handleSubmit = async () => {
    setLoadings(true);

    let updateData = {
      twitter, discord, linkedin, insta, photo, accname, lastname, firstname, Phone, referralCode,
      isPhonePublic: usePhone,
      isEmailPublic: useEmail,
      PublicBio: bio
    }
    updateCaptainBeeProfile(Email, Username, updateData).then((data) => {

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
      alert('Error uploading file:', error);
    }
  };

  return (
    <>
      <SubHeader />
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
      {userType === "CaptainBee" ?
        (<div className="hive-container" style={{ paddingTop: "280px" }}>
          <div
            className="d-flex flex-direction-column justify-content-center"
            style={{ width: `${isMobile ? '90%' : '74%'}`, maxWidth: '1140px' }}
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
              <div className="profile-hexagon">
                <img
                  alt=""
                  src={(photo !== undefined) ? photo : dummy}
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
                  // width: '58%',
                  width: `${isMobile ? '90%' : '58%'}`,
                  maxWidth: '1520px',
                  mt: 7,
                }}
              >
                <Typography variant="text" fontSize={isMobile ? '20px' : '30px'} fontWeight={600}>
                  Captain Bee Information
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
                    fontSize={isMobile ? '14px' : '18px'}
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
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '100%',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={isMobile ? '14px' : '18px'}
                      fontWeight={400}
                      width={'35%'}
                      textAlign={'left'}
                    >
                      Email
                    </Typography>
                    {/* <TextField
                      placeholder="you@yourdomain.com"
                      type="email"
                      InputLabelProps={{ shrink: true, readOnly: true, }}
                      variant="outlined"
                      sx={{ width: '64%' }}
                      size="small" // Make the input box smaller
                      value={staticsData?.affiliateUserProfile.Email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    /> */}
                     <Box
                      sx={{ mb: 2, width: '64%', fontSize: "15px", }}>
                      {staticsData?.affiliateUserProfile.Email}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      // alignItems: 'baseline',
                      width: '100%',
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={isMobile ? '12px' : '15px'}
                      fontWeight={400}
                      width={isMobile ? '47%' : '55.8%'}
                      textAlign={'left'}
                      mt={'7px'}
                    >
                      Display Email address publically
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} checked={useEmail} />}
                        value={useEmail}
                        onChange={(e) => {

                          if (!useEmail && e.target.checked === true) {
                            setUseEmail(true)
                          } else {
                            setUseEmail(false)
                          }
                        }}
                        style={{ marginLeft: 0, marginRight: "-8px" }}
                      />
                    </FormGroup>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '100%',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Username
                  </Typography>
                  {/* <TextField
                    //   label="Username"
                    variant="outlined"
                    // color='var(--body_color)'
                    placeholder="Username"
                    InputLabelProps={{ shrink: true, readOnly: true, }}
                    sx={{
                      mb: 2, width: '64%',
                      color: "var(--body_color)",
                      borderColor: "var(--body_color)"
                    }}
                    size="small" // Make the input box smaller
                    value={staticsData?.affiliateUserProfile.Username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  /> */}
                  <Box
                      sx={{ mb: 2, width: '64%', fontSize: "15px", }}>
                      {staticsData?.affiliateUserProfile.Username}
                    </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '100%',
                    mb: 2,
                  }}
                >

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={isMobile ? '14px' : '18px'}
                      fontWeight={400}
                      width={'35%'}
                      textAlign={'left'}
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      //   label="Phone Number"
                      variant="outlined"
                      placeholder="Phone Number"
                      type="tel"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '64%' }}
                      size="small" // Make the input box smaller
                      value={Phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      inputProps={{
                        maxLength: 10, // Limit input to 10 characters
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      // alignItems: 'baseline',
                      width: '100%',
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={isMobile ? '12px' : '15px'}
                      fontWeight={400}
                      width={isMobile ? '47%' : '55.8%'}
                      textAlign={'left'}
                      mt={'7px'}
                    >
                      Display phone number publically
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} checked={usePhone} />}
                        value={usePhone}
                        onChange={(e) => {

                          if (!usePhone && e.target.checked === true) {
                            setUsePhone(true)
                          } else {
                            setUsePhone(false)
                          }
                        }}
                        style={{ marginLeft: 0, marginRight: "-8px" }}
                      />
                    </FormGroup>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '100%',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                    alignSelf={isMobile ? 'normal' : 'baseline'}
                  >
                    Honey Bee Referral Code
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="referralcode"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={referralCode}
                    onChange={(e) => {
                      setReferralCode(e.target.value);
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
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                    alignSelf={isMobile ? 'normal' : 'baseline'}
                  >
                    Captain Bee Referral Code
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="referralcode"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={referralCode}
                    onChange={(e) => {
                      setReferralCode(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '58%',
                  width: `${isMobile ? '90%' : '58%'}`,
                  mt: 7,
                  maxWidth: '1520px',
                }}
              >
                <Typography
                  variant="text"
                  fontSize={isMobile ? '20px' : '30px'}
                  fontWeight={600}
                  mb={2}
                >
                  HoneyComb/Franchise Information
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
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Account Display Name
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="Brian’s HoneyComb"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={accname}
                    onChange={(e) => {
                      setAccname(e.target.value);
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
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Public Bio
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="Add Bio Here"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '58%',
                  width: `${isMobile ? '90%' : '58%'}`,
                  mt: 7,
                  maxWidth: '1520px',
                }}
              >
                <Typography
                  variant="text"
                  fontSize={isMobile ? '20px' : '30px'}
                  fontWeight={600}
                  mb={2}
                >
                  Social Media Links
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
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Discord
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="Discord URL"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={discord}
                    onChange={(e) => {
                      setDiscord(e.target.value);
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
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Instagram
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="Instagram URL"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={insta}
                    onChange={(e) => {
                      setInsta(e.target.value);
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
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    LinkedIn
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="LinkedIn URL"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
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
                    mb: 8,
                  }}
                >
                  <Typography
                    variant="text"
                    fontSize={isMobile ? '14px' : '18px'}
                    fontWeight={400}
                    width={'35%'}
                    textAlign={'left'}
                  >
                    Twitter
                  </Typography>
                  <TextField
                    //   label="Account Name"
                    variant="outlined"
                    placeholder="Twitter URL"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '64%' }}
                    size="small" // Make the input box smaller
                    value={twitter}
                    onChange={(e) => {
                      setTwitter(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  // width: '58%',
                  width: `${isMobile ? '90%' : '58%'}`,
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
                    px: isMobile ? 0 : 10,
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
                  loading={loadings}
                  variant="contained"
                  onClick={handleSubmit}
                  disableTouchRipple
                  // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
                  sx={{
                    backgroundColor: '#FFB300',
                    borderRadius: '2px',
                    color: '#282828',
                    width: '49%',
                    px: isMobile ? 0 : 10,
                    // py: 1,
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
        </div>) :
        <><HoneyBeeComingSoon />
        </>
      }
    </>
  );
};

export default CaptainProfile;
