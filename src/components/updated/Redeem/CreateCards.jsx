import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import redeemImg from '../../../assets/redeem/redeemimg.svg';

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
import CustomSelectBox from './CustomSelect';
import GenericButton from '../shared/Button';
import CardCreatedPopup from './CardCreatedPopup';
import IconicHeader from '../shared/IconicHeader';

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
    marginTop: '50px',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  redeemLeft: {
    padding: '20px',
    borderRadius: '4px',
    flex: '50%',
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
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectTypeContainer: {
    marginBottom: '20px',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },
  },
  enterAmountContainer: {
    marginBottom: '20px',
  },
  quantityContainer: {
    marginBottom: '20px',
  },
  activeImg: {
    border: `5px solid ${theme.palette.primary.main}`,
  },
}));

const CreateCards = () => {
  const classes = useStyles();
  const giftArr = [
    { id: 1, img: gift1 },
    { id: 2, img: gift2 },
    { id: 3, img: gift3 },
    { id: 4, img: gift4 },
    { id: 5, img: gift5 },
    { id: 6, img: gift6 },
    { id: 7, img: gift7 },
    { id: 8, img: gift8 },
  ];
  const greetingArr = [
    { id: 1, img: greeting1 },
    { id: 2, img: greeting2 },
    { id: 3, img: greeting3 },
    { id: 4, img: greeting4 },
    { id: 5, img: greeting5 },
    { id: 6, img: greeting6 },
    { id: 7, img: greeting7 },
    { id: 8, img: greeting8 },
  ];
  const [value, setValue] = useState('gift');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCard, setSelectedCards] = useState(
    value === 'gift' ? giftArr : greetingArr
  );
  const [selectedImg, setSelectedImg] = useState(
    value === 'gift' ? gift1 : greeting1
  );
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (value) {
      setSelectedCards(value === 'gift' ? giftArr : greetingArr);
    }
  }, [value]);

  const handleImgClick = (data) => {
    setSelectedImg(data.img);
  };
  console.log(selectedImg, 'selectedImg');
  return (
    <div className={classes.root}>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader />
      {/* Top Section */}
      <div className={classes.sendCryptoRoot}>
        <h3>Create</h3>
        <p>Send Crypto Gift Card and Greeting Cards to anyone in the world</p>
        <Button>Redeem to Crypto</Button>
      </div>
      {/* Redeem form */}
      <div className={classes.redeemRoot}>
        <div style={{ flex: '30%' }}>
          <img src={selectedImg} alt="" style={{ width: '100%' }} />
        </div>
        <div className={classes.redeemLeft}>
          <div className={classes.selectTypeContainer}>
            <label>Select Type</label>
            <CustomSelectBox
              items={[
                { name: 'Gift Card', value: 'gift' },
                { name: 'Greeting Card', value: 'greeting' },
              ]}
              value={value}
              onChange={handleChange}
              hasborder
            />
          </div>
          <div className={classes.enterAmountContainer}>
            <InputField
              label={'Enter Amount'}
              type="number"
              endAdornment={
                <div style={{ transform: 'translateX(10px)' }}>
                  {' '}
                  <CustomSelectBox
                    items={[
                      { name: 'Crypto', value: 'crypto' },
                      { name: 'Stock Tokens', value: 'stocktokens' },
                      { name: 'ETF', value: 'etf' },
                    ]}
                    type={'Type'}
                  />
                </div>
              }
            />
          </div>
          <div className={classes.quantityContainer}>
            {' '}
            <InputField label={'Quantity'} type="number" />
          </div>

          <div className={classes.btnContainer}>
            <p style={{ flex: '70%' }}>Total Amount: 50.00 INEX</p>
            <GenericButton
              text={'Create'}
              styles={{ flex: 1 }}
              onClick={() => setOpenPopup(true)}
            />
          </div>
        </div>
      </div>
      {/* Gift card listing */}
      <div>
        <div className={classes.cardListingRoot}>
          <div className={classes.cardListHeader}>
            <div className={classes.cardHeaderLeft}>
              <h3>{value === 'gift' ? 'Gift Cards' : 'Greeting Cards'} </h3>
              <p>
                {' '}
                {value === 'gift'
                  ? 'Send a crypto gift card for any occasion'
                  : 'Send a crypto greeting card for any occasion'}
              </p>
            </div>
            {/* <div className={classes.cardHeaderRight}>View more Gift Cards</div> */}
          </div>

          <div className={classes.cardGrid}>
            {selectedCard.map((curr, i) => (
              <div
                onClick={() => handleImgClick(curr)}
                className={curr.img === selectedImg && classes.activeImg}
              >
                <img src={curr.img} alt="img" style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {openPopup && <CardCreatedPopup selectedImg={selectedImg} />}
    </div>
  );
};

export default CreateCards;
