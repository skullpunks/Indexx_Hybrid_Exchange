import React, { useState } from 'react';
import SubHeader from './SubHeader/SubHeader';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import { Box, Typography, TextField, Button } from '@mui/material';

const CaptainProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [accname, setAccname] = useState('');

  const [discord, setDiscord] = useState("");
  const [insta, setInsta] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const handlePhotoChange = (event) => {
    console.log('clicked');
    const file = event.target.files[0];
    // setPhoto(file);
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <>
      <SubHeader />
      <div className="hive-container">
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
            <div className="profile-hexagon">
              <img
                alt=""
                src={photo === null ? dummy : photo}
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
                  mb: 2,
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
                <TextField
                  //   label="Email"
                  placeholder="you@yourdomain.com"
                  type="email"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{ mb: 2, width: '64%' }}
                  size="small" // Make the input box smaller
                  value={Email}
                  //  error={emailError !== ''}
                  // helperText={emailError}
                  // onBlur={validateEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  fontSize={'18px'}
                  fontWeight={400}
                  width={'35%'}
                  textAlign={'left'}
                >
                  Username
                </Typography>
                <TextField
                  //   label="Username"
                  variant="outlined"
                  placeholder="Username"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '64%' }}
                  size="small" // Make the input box smaller
                  value={Username}
                  onChange={(e) => {
                    setUsername(e.target.value);
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
                  fontSize={'18px'}
                  fontWeight={400}
                  width={'35%'}
                  textAlign={'left'}
                >
                  Phone Number
                </Typography>
                {/* <Select
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            sx={{ mb: 2, width: '15%' }}
            size="small"
          >
            <MenuItem value="">Select Country Code</MenuItem>
            {countryCodes.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.country} ({item.code})
              </MenuItem>
            ))}
          </Select> */}
                <TextField
                  //   label="Phone Number"
                  variant="outlined"
                  placeholder="Phone Number"
                  type="tel"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '64%' }}
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
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '58%',
                mt: 7,
                maxWidth: '1520px',
              }}
            >
              <Typography
                variant="text"
                fontSize={'30px'}
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
                  fontSize={'18px'}
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
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '58%',
                mt: 7,
                maxWidth: '1520px',
              }}
            >
              <Typography
                variant="text"
                fontSize={'30px'}
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
                  fontSize={'18px'}
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
                  fontSize={'18px'}
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
                  fontSize={'18px'}
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
                  fontSize={'18px'}
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
                    backgroundColor: '#FFB300',
                    boxShadow: 'none',
                  },
                }}
              >
                Cancel
              </Button>
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
                  py: 1,
                  textTransform: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: 'none',
                  //   mt:3,
                  '&:hover': {
                    backgroundColor: '#FFB300',
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

export default CaptainProfile;
