import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import gift1 from '../../../assets/redeem/gift1.svg';
import greeting1 from '../../../assets/redeem/greeting1.png';
import christman1 from '../../../assets/redeem/christmas1.png';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import CustomSelectBox from './CustomSelect';
import { giftArr, greetingArr, christmanArr } from './Data';
import defaultImage from '../../../assets/redeem/defaultImg.png';
import { decodeJWT, getUserWallets } from '../../../services/api';
import initialTokens from '../../../utils/Tokens.json';
import InputField from '../shared/TextField';
import Slider from 'react-slick';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '1100px',
      width: '100%',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '24px',
    textAlign: 'center',
    height: '80vh',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  overflowAuto: {
    width: '100%',
    height: '80vh',
    padding: '24px',
    overflow: 'auto',
    textAlign: 'left',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  redeemRoot: {
    display: 'flex',
    justifyContent: 'space-between',

    gap: '40px',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px',
    '& button': {
      maxWidth: '250px',
      width: '100%',
    },
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
  slickArrow: {
    position: 'absolute',
    top: '50%', // Center the arrows vertically
    transform: 'translateY(-50%)', // Adjust vertical alignment
    backgroundColor: 'none',
    height: '50px',
    width: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    opacity: 1,
    zIndex: 1,
    cursor: 'pointer',
  },
  slickPrev: {
    left: '-30px', // Position to the left of the slider
    [theme.breakpoints.down('md')]: {
      display: 'none',
      left: '0px',
    },
  },
  slickNext: {
    right: '-30px', // Position to the right of the slider
    [theme.breakpoints.down('md')]: {
      display: 'none',

      right: '0px',
    },
  },
  slickArrowHover: {
    '&:hover': {
      color:
        theme.palette.mode === 'dark' ? 'white !important' : 'white !important',
      opacity: 1,
    },
  },
  slickArrowIcon: {
    color: 'grey',
    fontSize: '30px',
    '&:hover': {
      color:
        theme.palette.mode === 'dark' ? 'white !important' : 'white !important',
      opacity: 1,
    },
  },
  btnWithNoBg: {
    width: 'fit-content',
    background: 'none !important',
    color: `${theme.palette.primary.main} !important`,
    padding: 0,
    height: 'fit-content',
    '&:hover': {
      background: 'none !important',
      color: `${theme.palette.primary.main} !important`,
      opacity: '.7',
    },
  },
}));

const EditCardDetailsPopup = ({ onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const [giftDetails, setGiftDetails] = useState([
    {
      id: 0,
      name: 'Crypto Gift Card',
    },
    {
      id: 1,
      name: 'Crypto Greeting Card',
    },
  ]);
  const [allWallets, setAllWallets] = useState([]);
  const [value, setValue] = useState('Crypto Gift Card');
  const [currency, setCurrency] = useState(initialTokens[0]?.title);
  const [amountInUsd, setAmountInUsd] = useState('');
  const [amount, setAmount] = useState();

  const [selectedImgUrl, setSelectedImgUrl] = useState(
    value === 'Crypto Gift Card' ? giftArr[0].img : greetingArr[0].img
  );
  const [singleWallet, setSingleWallet] = useState(null);
  const [selectedImg, setSelectedImg] = useState(selectedImgUrl);
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
      data: christmanArr,
    },
  ]);

  const [currentUserEmail, setCurrentUserEmail] = useState('');

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
          : christmanArr[0].imgUrl
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

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`${classes.slickArrow} ${classes.slickPrev} ${classes.slickArrowHover}`}
      >
        <span className={classes.slickArrowIcon}>
          {' '}
          <NavigateBeforeIcon
            width={28}
            height={28}
            style={{ width: '34px', height: '34px' }}
          />
        </span>
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`${classes.slickArrow} ${classes.slickNext} ${classes.slickArrowHover}`}
      >
        <span className={classes.slickArrowIcon}>
          {' '}
          <NavigateNextIcon
            width={28}
            height={28}
            style={{ width: '34px', height: '34px' }}
          />
        </span>
      </div>
    );
  };

  const sliderSettings = {
    dots: false, // Show dots (pagination)
    infinite: true, // Infinite scrolling

    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    arrows: true, // Show navigation arrows
    nextArrow: <SampleNextArrow />, // Use custom Next arrow
    prevArrow: <SamplePrevArrow />, // Use custom Previous arrow
  };

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '24px',
            }}
          >
            <div></div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                color={theme.palette.text.secondary}
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>
          <h3>Edit Details</h3>
          <p>
            Update or modify your information easily with the edit details
            option
          </p>
          <div className={classes.overflowAuto}>
            {giftDetails.map((el, i) => (
              <div className={classes.redeemRoot}>
                <div style={{ flex: '30%' }}>
                  <div style={{ maxWidth: '450px' }}>
                    <Slider {...sliderSettings}>
                      {value === 'Crypto Gift Card' &&
                        greetingArr.map((curr, i) => (
                          <div key={i}>
                            <img
                              src={curr.img}
                              alt={`Slide ${i}`}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </div>
                        ))}
                    </Slider>
                  </div>
                  {/* <img src={gift1} alt="" style={{ width: '100%' }} /> */}
                </div>
                <div className={classes.redeemLeft}>
                  <div className={classes.selectTypeContainer}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <label>Select Card Type</label>
                      {giftDetails.length > 1 && (
                        <GenericButton
                          text={'Remove'}
                          className={classes.btnWithNoBg}
                          onClick={() =>
                            setGiftDetails(
                              giftDetails.filter((cur) => cur.id !== el.id)
                            )
                          }
                        />
                      )}
                    </div>

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

                  <div className={classes.enterAmountContainer}>
                    <InputField
                      label={'Enter Amount in USD'}
                      type="number"
                      placeholder={'Min. Amount is 5 USD'}
                      value={amountInUsd}
                      onChange={(e) => setAmountInUsd(e.target.value)}
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
                  <p style={{ flex: '70%' }}>
                    Calculated {currency} Quantity:{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    }).format(amount)}{' '}
                    {}
                  </p>
                  {i === giftDetails.length - 1 && (
                    <div className={classes.btnContainer}>
                      <GenericButton
                        text={'+ Add More Card'}
                        styles={{ flex: 1 }}
                        onClick={() => {
                          setGiftDetails([
                            ...giftDetails,
                            {
                              id: giftDetails.length,
                              name: 'Crypto Greeting Card',
                            },
                          ]);
                        }}
                      />
                      <GenericButton
                        text={'Proceed'}
                        //   loading={loading}
                        styles={{ flex: 1 }}
                        //   onClick={() => setShowConfirmPopup(true)}
                        // disabled={
                        //   !isFormValid ||
                        //   balanceError ||
                        //   singleWallet?.coinBalance === undefined
                        // }
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCardDetailsPopup;
