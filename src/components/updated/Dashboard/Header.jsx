import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  getCaptainBeeByEmail,
  getHoneyUserDetails,
} from '../../../services/api';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    width: '100%',
  },
  leftDiv: {
    flex: '35%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      flex: '100%',
      borderRight: 'none',
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
  username: {
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.text.primary,
  },
  rightDiv: {
    flex: '65%',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flex: '100%',
      flexWrap: 'wrap',
    },
  },
  componentBox: {
    textAlign: 'center',
    minWidth: '120px',
  },
  heading: {
    fontSize: theme.typography.subtitle2.fontSize,
    color: theme.palette.text.secondary,
  },
  text: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [userDetails, setUserDetails] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      let userType =
        localStorage.getItem('userType') !== undefined
          ? String(localStorage.getItem('userType'))
          : undefined;
      const email =
        localStorage.getItem('email') !== undefined
          ? String(localStorage.getItem('email'))
          : undefined;

      if (userType === 'CaptainBee') {
        let resObj = await getCaptainBeeByEmail(email);
        setUserDetails(resObj.data);
        setUserType('CaptainBee');
      } else {
        let resObj = await getHoneyUserDetails(email);
        setUserDetails(resObj.data._doc);
        setUserType('HoneyUser');
      }
    }
    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const username = userDetails.Username || userDetails.email;
  const profilePic =
    userType === 'CaptainBee'
      ? userDetails.photoIdFileurl
      : userDetails.profilePic;
  const userId = userType === 'CaptainBee' ? userDetails._id : userDetails._id;
  const vipLevel =
    userType === 'HoneyUser' ? userDetails.vipLevel : userDetails?.rank;
  const userTypeText =
    userType === 'HoneyUser' ? userDetails.userType : 'Hive Captain';

  return (
    <Box className={classes.container}>
      <Box className={classes.leftDiv}>
        <Avatar className={classes.avatar} src={profilePic} />
        <Typography className={classes.username}>{username}</Typography>
      </Box>
      <Box className={classes.rightDiv}>
        {[
          { heading: 'User ID', text: userId },
          { heading: 'VIP Level', text: vipLevel },
          { heading: 'User Type', text: userTypeText },
        ].map((component, index) => (
          <Box key={index} className={classes.componentBox}>
            <Typography className={classes.heading}>
              {component.heading}
            </Typography>
            <Typography className={classes.text}>{component.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
