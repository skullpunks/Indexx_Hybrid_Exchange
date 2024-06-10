import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import headerBg from '../../../assets/updated/deposit/Group 35385.png';
import RightArrow from '../../../assets/updated/deposit/rightArrow';
const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    backgroundImage: `url("${headerBg}")`, // Replace with your background image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '30px 20px', // Adjust padding as needed
    marginTop: '20px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20 20px', // Add some horizontal padding for better alignment
    gap: '15px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  leftDiv: {
    fontSize: '62px',
    fontWeight: 600, // Semi-bold
    color: '#fff', // Adjust text color as needed
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
    },
  },
  rightDiv: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    gap: '20px', // Space between buttons
  },
  button: {
    width: 'fit-content',
    display: 'flex',
    gap: '5px',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.content}>
        <div className={classes.leftDiv}>Deposit Fiat</div>
        <div className={classes.rightDiv}>
          <Button className={classes.button} variant="outlined">
            Order History <RightArrow fill={'#11BE6A'} />
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            style={{ borderColor: '#E9E9E9', color: '#E9E9E9' }}
          >
            Deposit Crypto <RightArrow fill={'#E9E9E9'} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
