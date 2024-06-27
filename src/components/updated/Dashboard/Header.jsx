import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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

  return (
    <Box className={classes.container}>
      <Box className={classes.leftDiv}>
        <Avatar className={classes.avatar} />
        <Typography className={classes.username}>Username</Typography>
      </Box>
      <Box className={classes.rightDiv}>
        {[
          { heading: 'User ID', text: '1234567890' },
          { heading: 'VIP Level', text: 'Regular User' },
          { heading: 'User Type', text: 'Personal' },
          { heading: 'Following', text: '0' },
          { heading: 'Followers', text: '0' },
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
