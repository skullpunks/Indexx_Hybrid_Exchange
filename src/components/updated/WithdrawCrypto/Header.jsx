import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import headerBg from '../../../assets/updated/deposit/Group 35385.png';
import RightArrow from '../../../assets/updated/deposit/rightArrow';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleOrderHistoryClick = () => {
    navigate('/indexx-exchange/buy-sell/transaction-history');
  };

  const handleWithdrawFiatClick = () => {
    navigate('/withdraw-add-information');
  };
  
  return (
    <div className={classes.header}>
      <div className={classes.content}>
        <div className={classes.leftDiv}>Withdraw Crypto</div>
        <div className={classes.rightDiv}>
          <Button className={classes.button} variant="outlined" onClick={handleOrderHistoryClick}>
            Transaction History <RightArrow fill={'#11BE6A'} />
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            style={{ borderColor: '#E9E9E9', color: '#E9E9E9' }}
            onClick={handleWithdrawFiatClick}
          >
            Withdraw Fiat <RightArrow fill={'#E9E9E9'} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
