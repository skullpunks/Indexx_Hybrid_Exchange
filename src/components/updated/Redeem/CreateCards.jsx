import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import redeemImg from '../../../assets/redeem/redeemimg.svg';

import gift1 from '../../../assets/redeem/gift1.png';
import gift2 from '../../../assets/redeem/gift2.png';
import gift3 from '../../../assets/redeem/gift3.png';
import gift4 from '../../../assets/redeem/gift4.png';
import gift5 from '../../../assets/redeem/gift5.png';
import gift6 from '../../../assets/redeem/gift6.png';
import gift7 from '../../../assets/redeem/gift7.png';
import gift8 from '../../../assets/redeem/gift8.png';

import greeting1 from '../../../assets/redeem/greeting1.png';
import greeting2 from '../../../assets/redeem/greeting2.png';
import greeting3 from '../../../assets/redeem/greeting3.png';
import greeting4 from '../../../assets/redeem/greeting4.png';
import greeting5 from '../../../assets/redeem/greeting5.png';
import greeting6 from '../../../assets/redeem/greeting6.png';
import greeting7 from '../../../assets/redeem/greeting7.png';
import greeting8 from '../../../assets/redeem/greeting8.png';
import { useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1280px',
    margin: 'auto',
    marginTop: '180px',
  },
  sendCryptoRoot: {
    maxWidth: '500px',
    width: '100%',

    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '44px',
      fontWeight: '500',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '15px',
      marginBottom: '20px',
    },
    '& button': {
      background: theme.palette.divider,
      width: 'fit-content',
      color: theme.palette.text.secondary,
      fontSize: '13px',
      height: '40px',
      padding: '16px',
      textTransform: 'capitalize !important',
    },
  },
  redeemRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '80px',
    marginTop: '50px',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  redeemLeft: {
    padding: '20px',
    borderRadius: '4px',

    flex: '50%',
    border: '1px solid red',
  },
  redeemBtnContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  greenBtn: {
    background: `${theme.palette.primary.main} !important`,
    color: '#000 !important',
    width: 'fit-content',
    padding: '32px',
    height: '34px',
    textTransform: 'capitalize !important',
  },
  transparentBtn: {
    background: `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
    width: 'fit-content',
    padding: '16px',
    height: '34px',
    textTransform: 'capitalize !important',
  },
  inputFieldRoot: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '20px',
    gap: '20px',
    '& .textfieldInner': {
      flex: 1,
    },
  },
  greyButton: {
    width: 'fit-content',
    background: '#EAECEF !important',
    color: '#000 !important',
    height: '44px',
    textTransform: 'capitalize !important',
    padding: '16px !important',
  },
  paragraph: {
    color: theme.palette.text.secondary,
    fontSize: '12px',
  },
  cardListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '50px auto',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '20px',
    },
  },
  cardHeaderLeft: {
    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '44px',
      fontWeight: '500',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '15px',
    },
  },
  cardHeaderRight: {
    color: theme.palette.text.secondary,
    fontSize: '13px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  },
  button: {
    width: 'fit-content',
    display: 'flex',
    gap: '5px',
  },
}));

const CreateCards = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const giftArr = [gift1, gift2, gift3, gift4, gift5, gift6, gift7, gift8];
  const greetingArr = [
    greeting1,
    greeting2,
    greeting3,
    greeting4,
    greeting5,
    greeting6,
    greeting7,
    greeting8,
  ];
  return (
    <div className={classes.root}>
      {/* Top Section */}
      <div className={classes.sendCryptoRoot}>
        <h3>Create</h3>
        <p>Send Crypto Gift Card and Greeting Cards to anyone in the world</p>
        <Button>Redeem to Crypto</Button>
      </div>
      {/* Redeem form */}
      <div className={classes.redeemRoot}>
        <div style={{ flex: '50%' }}>
          <img src={gift1} alt="" style={{ width: '100%' }} />
        </div>
        <div className={classes.redeemLeft}></div>
      </div>
      {/* Gift card listing */}
      <div>
        <div className={classes.cardListingRoot}>
          <div className={classes.cardListHeader}>
            <div className={classes.cardHeaderLeft}>
              <h3>Gift Cards</h3>
              <p>Send a crypto gift card for any occasion</p>
            </div>
            <div className={classes.cardHeaderRight}>View more Gift Cards</div>
          </div>

          <div className={classes.cardGrid}>
            {giftArr.map((curr, i) => (
              <div>
                <img src={curr} alt="img" style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCards;
