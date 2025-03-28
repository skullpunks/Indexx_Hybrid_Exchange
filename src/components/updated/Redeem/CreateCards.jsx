import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import redeemImg from '../../../assets/redeem/redeemimg.svg';
import defaultImage from '../../../assets/redeem/defaultImg.png';
import gift1 from '../../../assets/redeem/gift1.png';
import gift2 from '../../../assets/redeem/gift2.png';
import gift3 from '../../../assets/redeem/gift3.png';
import gift4 from '../../../assets/redeem/gift4.png';
import gift5 from '../../../assets/redeem/gift5.png';
import gift6 from '../../../assets/redeem/gift6.png';
import gift7 from '../../../assets/redeem/gift7.png';
import gift8 from '../../../assets/redeem/gift8.png';

import greeting1 from '../../../assets/redeem/greeting1.png';
import newyear1 from '../../../assets/redeem/newyear1.png';
import newyear2 from '../../../assets/redeem/newyear2.png';
import newyear3 from '../../../assets/redeem/newyear3.png';
import newyear4 from '../../../assets/redeem/newyear4.png';
import newyear5 from '../../../assets/redeem/newyear5.png';
import newyear6 from '../../../assets/redeem/newyear6.png';
import newyear7 from '../../../assets/redeem/newyear7.png';
import newyear8 from '../../../assets/redeem/newyear8.png';
import newyear9 from '../../../assets/redeem/newyear9.png';
import newyear10 from '../../../assets/redeem/newyear10.png';
import christman1 from '../../../assets/redeem/christmas1.png';
import christman2 from '../../../assets/redeem/christmas2.png';
import christman3 from '../../../assets/redeem/christmas3.png';
import christman4 from '../../../assets/redeem/christmas4.png';
import christman5 from '../../../assets/redeem/christmas5.png';
import christman6 from '../../../assets/redeem/christmas6.png';
import christman7 from '../../../assets/redeem/christmas7.png';
import greeting2 from '../../../assets/redeem/greeting2.png';
import greeting3 from '../../../assets/redeem/greeting3.png';
import greeting4 from '../../../assets/redeem/greeting4.png';
import greeting5 from '../../../assets/redeem/greeting5.png';
import greeting6 from '../../../assets/redeem/greeting6.png';
import greeting7 from '../../../assets/redeem/greeting7.png';
import greeting8 from '../../../assets/redeem/greeting8.png';
import greeting9 from '../../../assets/redeem/greeting9.png';
import greeting10 from '../../../assets/redeem/greeting10.png';
import greeting11 from '../../../assets/redeem/greeting11.png';
import greeting12 from '../../../assets/redeem/greeting12.png';
import greeting13 from '../../../assets/redeem/greeting13.png';
import greeting14 from '../../../assets/redeem/greeting14.png';
import greeting15 from '../../../assets/redeem/greeting15.png';
import greeting16 from '../../../assets/redeem/greeting16.png';
import greeting17 from '../../../assets/redeem/greeting17.png';
import greeting18 from '../../../assets/redeem/greeting18.png';
import greeting19 from '../../../assets/redeem/greeting19.png';
import greeting20 from '../../../assets/redeem/greeting20.png';
import greeting21 from '../../../assets/redeem/greeting21.png';
import greeting22 from '../../../assets/redeem/greeting22.png';
import greeting23 from '../../../assets/redeem/greeting23.png';
import greeting24 from '../../../assets/redeem/greeting24.png';
import greeting25 from '../../../assets/redeem/greeting25.png';
import greeting26 from '../../../assets/redeem/greeting26.png';
import greeting27 from '../../../assets/redeem/greeting27.png';
import val1 from '../../../assets/redeem/val1.png';
import val2 from '../../../assets/redeem/val2.png';
import val3 from '../../../assets/redeem/val3.png';
import val4 from '../../../assets/redeem/val4.png';
import val5 from '../../../assets/redeem/val5.png';
import val6 from '../../../assets/redeem/val6.png';
import val7 from '../../../assets/redeem/val7.png';
import val8 from '../../../assets/redeem/val8.png';
import val9 from '../../../assets/redeem/val9.png';
import val10 from '../../../assets/redeem/val10.png';

import Slider from 'react-slick';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import CustomSelectBox from './CustomSelect';
import GenericButton from '../shared/Button';
import CardCreatedPopup from './CardCreatedPopup';
import IconicHeader from '../shared/RedeemIconicHeader';
import {
  createGiftcard,
  decodeJWT,
  getUserWallets,
  getCoinPriceByName,
} from '../../../services/api';
import initialTokens from '../../../utils/Tokens.json';
import CardCreatedConfirmPopup from './CardCreatedConfirmPopup';
import InsufficientBalancePopup from './InsufficientBalancePopup';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1380px',
    margin: 'auto',
  },
  sendCryptoRoot: {
    maxWidth: '840px',
    width: '100%',
    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '32px',
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
    borderRadius: '4px',
    flex: '50%',
    marginTop: '-5px',
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
  // activeImg: {
  //   border: `5px solid ${theme.palette.primary.main}`,
  // },
  hoverCardEffect: {
    padding: '0px 20px',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
  currencyDisplay: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    '& img': {
      width: '24px',
      height: '24px',
      marginRight: '10px',
    },
  },
  balanceDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  cardGrid: {
    marginTop: '20px',
    gap: '10px',
    '& .slick-list': {
      height: '570px',
    },
  },
}));

const CreateCards = ({ onSendCard }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('Create');
  const location = useLocation();
  const { type, selectedImg: defaultImg } = location.state || {};
  const [balanceError, setBalanceError] = useState('');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const giftArr = [
    {
      id: 1,
      img: gift1,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc1.png',
    },
    {
      id: 2,
      img: gift2,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc2.png',
    },
    {
      id: 3,
      img: gift3,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc3.png',
    },
    {
      id: 4,
      img: gift4,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc4.png',
    },
    {
      id: 5,
      img: gift5,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc5.png',
    },
    {
      id: 6,
      img: gift6,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc5.png',
    },
    {
      type: 'Crypto Gift Card',
      id: 7,
      img: gift7,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc7.png',
    },
    {
      id: 8,
      img: gift8,
      type: 'Crypto Gift Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/-gc8.png',
    },
  ];
  const greetingArr = [
    {
      id: 1,
      img: greeting1,
      type: 'Crypto Birthday Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting1.png',
    },
    {
      id: 2,
      img: greeting2,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting2.png',
    },
    {
      id: 3,
      img: greeting3,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting3.png',
    },
    {
      id: 4,
      img: greeting4,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting4.png',
    },
    {
      id: 5,
      img: greeting5,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting5.png',
    },
    {
      id: 6,
      img: greeting6,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting6.png',
    },
    {
      id: 7,
      img: greeting7,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting7.png',
    },
    {
      id: 8,
      img: greeting8,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting8.png',
    },

    {
      id: 9,
      img: greeting9,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting9.png',
    },
    {
      id: 10,
      img: greeting10,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting10.png',
    },
    {
      id: 11,
      img: greeting11,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting11.png',
    },
    {
      id: 12,
      img: greeting12,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting12.png',
    },
    {
      id: 13,
      img: greeting13,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting13.png',
    },

    {
      id: 14,
      img: greeting14,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting14.png',
    },
    {
      id: 15,
      img: greeting15,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting15.png',
    },
    {
      id: 16,
      img: greeting16,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting16.png',
    },
    {
      id: 17,
      img: greeting17,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting17.png',
    },
    {
      id: 18,
      img: greeting18,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting18.png',
    },

    {
      id: 19,
      img: greeting19,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting19.png',
    },
    {
      id: 20,
      img: greeting20,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting20.png',
    },
    {
      id: 21,
      img: greeting21,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting21.png',
    },
    {
      id: 22,
      img: greeting22,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting22.png',
    },
    {
      id: 23,
      img: greeting23,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting23.png',
    },

    {
      id: 24,
      img: greeting24,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting24.png',
    },
    {
      id: 25,
      img: greeting25,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting25.png',
    },
    {
      id: 26,
      img: greeting26,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting26.png',
    },
    {
      id: 27,
      img: greeting27,
      type: 'Crypto Birthday Card',

      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/greeting27.png',
    },
  ];

  const seasonalArr = [
    {
      id: 1,
      img: christman1,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas1.png',
    },
    {
      id: 2,
      img: christman2,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas2.png',
    },
    {
      id: 3,
      img: christman3,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas3.png',
    },
    {
      id: 4,
      img: christman4,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas4.png',
    },
    {
      id: 5,
      img: christman5,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas5.png',
    },
    {
      id: 6,
      img: christman6,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas6.png',
    },
    {
      id: 7,
      img: christman7,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/christmas7.png',
    },
    {
      id: 8,
      img: newyear1,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear1.png',
    },
    {
      id: 9,
      img: newyear2,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear2.png',
    },
    {
      id: 10,
      img: newyear3,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear3.png',
    },
    {
      id: 11,
      img: newyear4,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear4.png',
    },
    {
      id: 12,
      img: newyear5,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear5.png',
    },
    {
      id: 13,
      img: newyear6,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear6.png',
    },
    {
      id: 14,
      img: newyear7,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear7.png',
    },
    {
      id: 15,
      img: newyear8,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear8.png',
    },
    {
      id: 16,
      img: newyear9,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear9.png',
    },
    {
      id: 17,
      img: newyear10,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/newyear10.png',
    },
    // Valentine's Day Cards
    {
      id: 18,
      img: val1,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val1.png',
    },
    {
      id: 19,
      img: val2,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val2.png',
    },
    {
      id: 20,
      img: val3,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val3.png',
    },
    {
      id: 21,
      img: val4,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val4.png',
    },
    {
      id: 22,
      img: val5,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val5.png',
    },
    {
      id: 23,
      img: val6,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val6.png',
    },
    {
      id: 24,
      img: val7,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val7.png',
    },
    {
      id: 25,
      img: val8,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val8.png',
    },
    {
      id: 26,
      img: val9,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val9.png',
    },
    {
      id: 27,
      img: val10,
      type: 'Seasonal Greeting Card',
      imgUrl:
        'https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/New+GC/New+GC/val10.png',
    },
  ];

  const [contentArr, setContentArr] = useState([
    {
      id: 0,
      name: 'Select any crypto gift card design from below:',
      data: giftArr,
    },
    {
      id: 1,
      name: 'Select any crypto birthday card design from below:',
      data: greetingArr,
    },
    {
      id: 2,
      name: 'Select a seasonal greeting card design from the options below:',
      data: seasonalArr,
    },
  ]);

  const [value, setValue] = useState(type ?? 'Crypto Gift Card');
  const [subvalue, setSubValue] = useState('Christmas' ?? 'Crypto Gift Card');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCard, setSelectedCards] = useState(
    value === 'Crypto Gift Card' ? giftArr : greetingArr
  );
  const [nonSelectedCard, setNonSelectedCards] = useState(
    value !== 'Crypto Gift Card' ? giftArr : greetingArr
  );
  const [selectedImgUrl, setSelectedImgUrl] = useState(
    value === 'Crypto Gift Card' ? giftArr[0].img : greetingArr[0].img
  );
  const [selectedImg, setSelectedImg] = useState(defaultImg ?? selectedImgUrl);
  const handleChange = (event) => {
    if (
      event.target.value === 'Crypto Gift Card' ||
      event.target.value === 'Crypto Birthday Card' ||
      event.target.value === 'Seasonal Greeting Card'
    ) {
      setValue(event.target.value);
      setSelectedImg(
        event.target.value === 'Crypto Gift Card'
          ? gift1
          : event.target.value === 'Crypto Birthday Card'
          ? greeting1
          : christman1
      );
      setSelectedImgUrl(
        event.target.value === 'Crypto Gift Card'
          ? giftArr[0].imgUrl
          : event.target.value === 'Crypto Birthday Card'
          ? greetingArr[0].imgUrl
          : seasonalArr[0].imgUrl
      );

      if (event.target.value === 'Crypto Gift Card') {
        const reorderedArray = [
          ...contentArr.filter((item) => item.id === 0),
          ...contentArr.filter((item) => item.id !== 0),
        ];
        setContentArr(reorderedArray);
      } else if (event.target.value === 'Crypto Birthday Card') {
        const reorderedArray = [
          ...contentArr.filter((item) => item.id === 1),
          ...contentArr.filter((item) => item.id !== 1),
        ];
        setContentArr(reorderedArray);
      } else if (event.target.value === 'Seasonal Greeting Card') {
        const reorderedArray = [
          ...contentArr.filter((item) => item.id === 2),
          ...contentArr.filter((item) => item.id !== 2),
        ];
        setContentArr(reorderedArray);
      }
    } else {
      console.log('event', event.target.value);
      const userWallet = allWallets.find(
        (wallet) => wallet.coinSymbol === event.target.value
      );
      console.log('userWallet', userWallet);
      setSingleWallet(userWallet);
    }
  };

  const handleChangeSubType = (event) => {
    if (
      event.target.value === 'Christmas' ||
      event.target.value === 'New Year'  ||
      event.target.value === "Valentine's Day"
    ) {
      setSubValue(event.target.value);
      setSelectedImg(
        event.target.value === 'Christmas' ? christman1 : event.target.value === "Valentine's Day" ? val1 : newyear1
      );
      console.log('event', event.target.value);
      // Filter the array based on the selected subtype
      // const sortedArr = seasonalArr.filter((item) => {
      //   if (event.target.value === 'Christmas') {
      //     return item.imgUrl.includes('christmas');
      //   } else if (event.target.value === 'New Year') {
      //     return item.imgUrl.includes('newyear');
      //   } else if (event.target.value === "Valentine's Day") {
      //     return item.imgUrl.includes('val');
      //   }
      //   return false;
      // });

      const sortedArr = seasonalArr.filter((item) => {
        if (event.target.value === 'Christmas' && item.imgUrl.includes('christmas')) {
          return true;
        } else if (event.target.value === 'New Year' && item.imgUrl.includes('newyear')) {
          return true;
        } else if (event.target.value === "Valentine's Day" && item.imgUrl.includes('val')) {
          return true;
        }
        return false;
      });
      
      console.log("sortedArr", sortedArr);
      setSelectedCards(sortedArr);

      // Log or update the state with the sorted array
      console.log(sortedArr);
      setSelectedImgUrl(
        event.target.value === 'Christmas'
          ? sortedArr[0].imgUrl
          : sortedArr[0].imgUrl
      );
    } else {
      console.log('event', event.target.value);
      const userWallet = allWallets.find(
        (wallet) => wallet.coinSymbol === event.target.value
      );
      console.log('userWallet', userWallet);
      setSingleWallet(userWallet);
    }
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const [amount, setAmount] = useState();

  const [email, setEmail] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [giftCardData, setGiftCardData] = useState(null);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState('');
  const [amountInUsd, setAmountInUsd] = useState('');
  const [currency, setCurrency] = useState(initialTokens[0]?.title);
  const [singleWallet, setSingleWallet] = useState(null);
  const [allWallets, setAllWallets] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [openInsufficientPopup, setOpenInsufficientPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [selectedValue, setSelectedValue] = useState('Pay with Token');
  const closePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (value) {
      setSelectedCards(
        value === 'Crypto Gift Card'
          ? giftArr
          : value === 'Crypto Greeting Card'
          ? greetingArr
          : seasonalArr
      );
      setNonSelectedCards(value !== 'Crypto Gift Card' ? giftArr : greetingArr);
    }

    if (subvalue && value === 'Seasonal Greeting Card') {
      // Filter the array based on the selected subtype
      // const sortedArr = seasonalArr.filter((item) => {
      //   if (subvalue === 'Christmas') {
      //     return item.imgUrl.includes('christmas');
      //   } else if (subvalue === 'New Year') {
      //     return item.imgUrl.includes('newyear');
      //   } else if (subvalue === "Valentine's Day") {
      //     return item.imgUrl.includes('val');
      //   }
      //   return false;
      // });

      const sortedArr = seasonalArr.filter((item) => {
        if (subvalue === 'Christmas' && item.imgUrl.includes('christmas')) {
          return true;
        } else if (subvalue === 'New Year' && item.imgUrl.includes('newyear')) {
          return true;
        } else if (subvalue === "Valentine's Day" && item.imgUrl.includes('val')) {
          return true;
        }
        return false;
      });
      
      console.log("sortedArr", sortedArr);
      console.log("subvalue", subvalue);
      setSelectedCards(sortedArr);
      setContentArr((prevContentArr) =>
        prevContentArr.map((item) =>
          item.id === 2
            ? { ...item, data: sortedArr }
            : item
        )
      );
      setNonSelectedCards(value !== 'Crypto Gift Card' ? giftArr : greetingArr);
    }
  }, [value, subvalue]);

  useEffect(() => {
    async function fetchPrice() {
      if (amount && singleWallet) {
        if (parseFloat(amount) > parseFloat(singleWallet.coinBalance)) {
          setBalanceError('Insufficient balance');
          setOpenInsufficientPopup(true);
        } else {
          setBalanceError('');
          setOpenInsufficientPopup(false);
        }
      }

      // setAmountInUsd(priceData * Number(amount));
    }
    fetchPrice();
  }, [amount, singleWallet]);

  const handleImgClick = (data) => {
    setSelectedImg(data.img);
    setValue(data.type);
    setSelectedImgUrl(data.imgUrl);
    document.getElementById('topRoot').scrollIntoView();
  };

  // Fetch all wallets once and store them in state
  useEffect(() => {
    async function fetchWallet() {
      try {
        const token = localStorage.getItem('access_token');
        const decodedToken = decodeJWT(String(token));
        setCurrentUserEmail(decodedToken?.email);
        console.log('decodedToken', decodedToken);
        let res = await getUserWallets(decodedToken?.email);
        console.log('Res', res);
        setAllWallets(res.data);
      } catch (err) {
        console.log('err', err);
      }
    }
    fetchWallet();
  }, []);

  // Update singleWallet when currency changes, using the allWallets stored in state
  useEffect(() => {
    async function fetchPrice() {
      console.log('allWallets', allWallets);
      const userWallet = allWallets.find(
        (wallet) => wallet.coinSymbol === currency
      );
      console.log('userWallet', userWallet);
      setSingleWallet(userWallet);
      const res = await getCoinPriceByName(String(currency));
      let priceData = res.data.results.data;
      // setAmountInUsd(priceData * Number(amount));
    }
    fetchPrice();
  }, [currency, allWallets]);

  const isFormValid = amount && currency;

  const redirect = async () => {
    navigate('/redeem');
  };

  const closeConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  useEffect(() => {
    try {
      async function fetchPrice() {
        const res = await getCoinPriceByName(String(currency));
        let priceData = res.data.results.data;
        setAmount(amountInUsd / priceData);
      }
      fetchPrice();
    } catch (err) {}
  }, [amountInUsd]);

  const handlePaymentChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('Selected Payment Method:', event.target.value);
  };
  const sliderSettings = {
    dots: false, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 4 items at a time
    slidesToScroll: 1, // Scroll one item at a time
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Smaller mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="topRoot" className={classes.root}>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      {/* Top Section */}
      <div className={classes.sendCryptoRoot}>
        <h3>
          Create Crypto Gift Card,
          <br /> Crypto Greeting Cards, Seasonal Greeting Card
        </h3>
        <p>
          Struggling to find a unique gift? Our crypto gift cards are the
          perfect solution. Redeemable on our exchange, they are not just a
          present, but an investment for the future. The perfect gift for the
          modern age!
        </p>
      </div>
      {/* Redeem form */}
      <div className={classes.redeemRoot}>
        <div style={{ flex: '30%' }}>
          <img src={selectedImg} alt="" style={{ width: '100%' }} />
        </div>
        <div className={classes.redeemLeft}>
          <div className={classes.selectTypeContainer}>
            <label>Select Card Type</label>
            <CustomSelectBox
              items={[
                { name: 'Crypto Gift Card', value: 'Crypto Gift Card' },
                {
                  name: 'Crypto Birthday Card',
                  value: 'Crypto Birthday Card',
                },

                {
                  name: 'Seasonal Crypto Greeting Card',
                  value: 'Seasonal Greeting Card',
                },
              ]}
              value={value}
              onChange={handleChange}
              hasborder
            />
          </div>
          {value === 'Seasonal Greeting Card' && (
            <div className={classes.selectTypeContainer}>
              <label>Select Season</label>
              <CustomSelectBox
                items={[
                  { name: 'Christmas', value: 'Christmas' },
                  {
                    name: 'New Year',
                    value: 'New Year',
                  },
                  {
                    name: "Valentine's Day",
                    value: "Valentine's Day",
                  },
                ]}
                value={subvalue}
                onChange={handleChangeSubType}
                hasborder
              />
            </div>
          )}
          <div className={classes.selectTypeContainer}>
            <label>Select Payment Type:</label>
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Pay with USD"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handlePaymentChange}
                >
                  {/* <FormControlLabel
                    value="Pay with USD"
                    control={<Radio />}
                    label="Pay with USD"
                  /> */}
                  <FormControlLabel
                    value="Pay with Token"
                    control={<Radio />}
                    label="Pay with Token"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {selectedValue === 'Pay with USD' ? (
            <div className={classes.selectTypeContainer}>
              <label>Select Payment Method</label>
              <CustomSelectBox
                items={[
                  { name: 'Credit Card', value: 'Credit Card' },
                  { name: 'Paypal', value: 'Paypal' },
                  { name: 'ACH', value: 'ACH' },
                  { name: 'Wire transfer', value: 'Wire transfer' },
                  { name: 'Zelle', value: 'Zelle' },
                  { name: 'TygaPay', value: 'TygaPay' },
                ]}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                hasborder
              />
            </div>
          ) : (
            <div className={classes.selectTypeContainer}>
              <label>Select Token for Gift</label>
              <CustomSelectBox
                items={initialTokens.map((token) => ({
                  name: token.title,
                  value: token.title,
                  image: token.image,
                }))}
                type={'Coin'}
                value={currency}
                onCurrencyChange={(value) => setCurrency(value)}
                onChange={handleChange}
                hasborder={true}
              />
            </div>
          )}

          <div className={classes.enterAmountContainer}>
            <InputField
              label={'Enter Amount in USD'}
              type="number"
              placeholder={'Min. Amount is 5 USD'}
              value={amountInUsd}
              onChange={(e) => setAmountInUsd(e.target.value)}
              startAdornment={
                <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                  $
                </InputAdornment>
              }
            />
          </div>
          {singleWallet && (
            <div className={classes.balanceDisplay}>
              <span>
                {currency} Balance:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                }).format(singleWallet.coinBalance)}{' '}
                {currency}
              </span>
            </div>
          )}
          <br />

          <div className={classes.btnContainer}>
            <p style={{ flex: '70%' }}>
              Calculated {currency} Quantity:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              }).format(amount)}{' '}
              {}
            </p>
            <GenericButton
              text={'Create'}
              loading={loading}
              styles={{ flex: 1 }}
              onClick={() => setShowConfirmPopup(true)}
              disabled={
                !isFormValid ||
                balanceError ||
                singleWallet?.coinBalance === undefined ||
                amountInUsd < 5
              }
            />
          </div>
          {error && <div className={classes.errorMessage}>{error}</div>}
        </div>
      </div>
      {/* Gift card listing */}
      <div>
        {contentArr.map((el) => (
          <div
            className={classes.cardListingRoot}
            style={{ marginBottom: '100px' }}
          >
            <div className={classes.cardListHeader}>
              <div className={classes.cardHeaderLeft}>
                <h3>{el.name}</h3>
              </div>
            </div>

            <div className={classes.cardGrid}>
              <Slider {...sliderSettings}>
                {el.data.map((curr, i) => (
                  <div
                    key={i} // Unique key for each slide
                    onClick={() => handleImgClick(curr)}
                    className={`${classes.hoverCardEffect} ${
                      curr.img === selectedImg ? classes.activeImg : ''
                    }`}
                  >
                    <img
                      src={curr.img}
                      alt="img"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <CardCreatedPopup
          onClose={closePopup}
          giftCardData={giftCardData}
          selectedImg={selectedImg}
          selectedImgUrl={selectedImgUrl}
          email={email}
          amountInUsd={amountInUsd}
        />
      )}
      {showConfirmPopup && (
        <CardCreatedConfirmPopup
          onClose={closeConfirmPopup}
          giftCardData={giftCardData}
          selectedImg={selectedImg}
          selectedImgUrl={selectedImgUrl}
          amount={amount}
          email={email}
          currency={currency}
          setGiftCardData={setGiftCardData}
          setShowConfirmPopup={setShowConfirmPopup}
          setShowPopup={setShowPopup}
          isLoading={isLoading}
          currentUserEmail={currentUserEmail}
          cardType={value}
          cardSubType={subvalue}
          amountInUsd={amountInUsd}
        />
      )}
      {openInsufficientPopup && (
        <InsufficientBalancePopup
          currency={currency}
          onClose={() => setOpenInsufficientPopup(false)}
        />
      )}
    </div>
  );
};

export default CreateCards;
