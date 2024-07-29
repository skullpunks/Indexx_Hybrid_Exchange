import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import redeemImg from '../../../assets/redeem/redeemimg.png';

import gift1 from '../../../assets/redeem/gift1.svg';
import gift2 from '../../../assets/redeem/gift2.svg';
import gift3 from '../../../assets/redeem/gift3.svg';
import gift4 from '../../../assets/redeem/gift4.svg';
import gift5 from '../../../assets/redeem/gift5.svg';
import gift6 from '../../../assets/redeem/gift6.svg';
import gift7 from '../../../assets/redeem/gift7.svg';
import gift8 from '../../../assets/redeem/gift8.svg';

import greeting1 from '../../../assets/redeem/greeting1.svg';
import greeting2 from '../../../assets/redeem/greeting2.svg';
import greeting3 from '../../../assets/redeem/greeting3.svg';
import greeting4 from '../../../assets/redeem/greeting4.svg';
import greeting5 from '../../../assets/redeem/greeting5.svg';
import greeting6 from '../../../assets/redeem/greeting6.svg';
import greeting7 from '../../../assets/redeem/greeting7.svg';
import greeting8 from '../../../assets/redeem/greeting8.svg';
import { useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1280px',
    margin: 'auto',
    marginTop: '50px',
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
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  redeemLeft: {
    flex: '50%',
    background: theme.palette.divider,
    padding: '20px',
    borderRadius: '4px',
    marginTop: '50px',
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

const FirstScreen = () => {
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
        <h3>
          Send Crypto <br /> with indexx Gift Cards
        </h3>
        <p>
          Gift crypto with your referral code and choose from our amazing
          designs
        </p>
        <Button>Send a Crypto gift card</Button>
      </div>
      {/* Redeem form */}
      <div className={classes.redeemRoot}>
        <div className={classes.redeemLeft}>
          <div className={classes.redeemBtnContainer}>
            <Button className={classes.greenBtn}>Redeem to Crypto</Button>
            <Button className={classes.transparentBtn}>Check Card</Button>
          </div>
          <div className={classes.inputFieldRoot}>
            <div className="textfieldInner">
              <InputField
                type={'text'}
                label={'Redeem Code'}
                placeholder="Enter the Redeem Code"
                style={{
                  background:
                    theme.palette.mode === 'light' ? '#fff' : '#2B3139',
                }}
              />
            </div>
            <Button className={classes.greyButton}>Redeem</Button>
          </div>
          <div className={classes.paragraph}>
            The code is a 16-character sequence combining digits and letters.
            Example: A1BC23D4EFG78H56 <br />
            <br />
            Indexx is not responsible for, and assumes no liability to you for,
            any unlawful conduct or fraud by any third party associated with any
            Gift Card.
          </div>
        </div>
        <div style={{ flex: '50%' }}>
          <img src={redeemImg} alt="" style={{ width: '100%' }} />
        </div>
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

          <div style={{ marginTop: '100px' }}>
            <div className={classes.cardListHeader}>
              <div className={classes.cardHeaderLeft}>
                <h3>Greeting Cards</h3>
                <p>Send a crypto greeting card for any occasion</p>
              </div>
              <div className={classes.cardHeaderRight}>
                View more Greeting Cards
              </div>
            </div>

            <div className={classes.cardGrid}>
              {greetingArr.map((curr, i) => (
                <div>
                  <img src={curr} alt="img" style={{ width: '100%' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;
