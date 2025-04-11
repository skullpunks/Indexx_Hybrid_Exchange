import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import redeemImg from '../../../assets/redeem/redeemimg.svg';
import defaultImage from '../../../assets/redeem/defaultImg.png';
import gift1 from '../../../assets/redeem/gift1.png';

import useStyles from './CreateCardStyle';
import greeting1 from '../../../assets/redeem/greeting1.png';
import christman1 from '../../../assets/redeem/christmas1.png';
import Slider from 'react-slick';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
// import InsufficientBalancePopup from './InsufficientBalancePopup';
import { giftArr, greetingArr, christmanArr } from './Data';
import CustomizedSteppers from './CustomizedStepper';

const CreateCards = ({ onSendCard }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('Create');
  const location = useLocation();
  const { type, selectedImg: defaultImg } = location.state || {};
  const [balanceError, setBalanceError] = useState('');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

  const [value, setValue] = useState(type ?? 'Crypto Gift Card');
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
  const [giftDetails, setGiftDetails] = useState([
    {
      id: 0,
      name: 'Crypto Gift Card',
      value: 'Crypto Gift Card',
      currency: initialTokens[0]?.title,
      amountInUsd: '',
      amount: 0,
      selectedImg: null,
    },
  ]);
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
          : christmanArr
      );
      setNonSelectedCards(value !== 'Crypto Gift Card' ? giftArr : greetingArr);
    }
  }, [value]);

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
            width={38}
            height={38}
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
            width={38}
            height={38}
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

  // Update the slider to use the correct images based on card type
  const getImagesForCardType = (cardType) => {
    if (cardType === 'Crypto Gift Card') return giftArr;
    if (cardType === 'Crypto Birthday Card') return greetingArr;
    if (cardType === 'Seasonal Greeting Card') return christmanArr;
    return giftArr; // Default fallback
  };

  // Handle individual card type change
  const handleCardTypeChange = (id, newValue) => {
    setGiftDetails(
      giftDetails.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            value: newValue,
            selectedImg:
              newValue === 'Crypto Gift Card'
                ? gift1
                : newValue === 'Crypto Birthday Card'
                ? greeting1
                : christman1,
          };
        }
        return card;
      })
    );
  };

  // Handle individual currency change
  const handleCurrencyChange = (id, newCurrency) => {
    setGiftDetails(
      giftDetails.map((card) => {
        if (card.id === id) {
          return { ...card, currency: newCurrency };
        }
        return card;
      })
    );
  };

  // Handle individual amount change
  const handleAmountChange = (id, newAmount) => {
    setGiftDetails(
      giftDetails.map((card) => {
        if (card.id === id) {
          return { ...card, amountInUsd: newAmount };
        }
        return card;
      })
    );
  };

  // Calculate token amount based on USD for a specific card
  useEffect(() => {
    async function updateCardAmounts() {
      try {
        for (const card of giftDetails) {
          if (card.currency && card.amountInUsd) {
            const res = await getCoinPriceByName(String(card.currency));
            let priceData = res.data.results.data;

            setGiftDetails((prev) =>
              prev.map((c) => {
                if (c.id === card.id) {
                  return { ...c, amount: c.amountInUsd / priceData };
                }
                return c;
              })
            );
          }
        }
      } catch (err) {
        console.error('Error calculating token amounts:', err);
      }
    }
    updateCardAmounts();
  }, [
    giftDetails
      .map((card) => `${card.id}-${card.currency}-${card.amountInUsd}`)
      .join(','),
  ]);

  return (
    <div className={classes.root}>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <CustomizedSteppers step={1} />
      {/* Top Section */}
      <div className={classes.sendCryptoRoot}>
        <h3>
          Create Crypto Gift Card, Crypto Greeting Cards, Seasonal <br />{' '}
          Greeting Card
        </h3>
        <p>
          Struggling to find a unique gift? Our crypto gift cards are the
          perfect solution. Redeemable on our exchange, they are not just a
          present, but an investment for the future. The perfect gift for the
          modern age!
        </p>
      </div>
      {/* Redeem form */}
      {giftDetails.map((card, i) => (
        <div className={classes.redeemRoot} key={card.id}>
          <div>
            <div style={{ maxWidth: '432px' }}>
              <Slider
                {...sliderSettings}
                onChange={(value) => {
                  console.log('value', value);
                }}
                afterChange={(index) => {
                  const images = getImagesForCardType(card.value);
                  setGiftDetails(
                    giftDetails.map((c) => {
                      if (c.id === card.id) {
                        return {
                          ...c,
                          selectedImg: images[index].img,
                          selectedImgUrl:
                            images[index].img || images[index].imgUrl,
                        };
                      }
                      return c;
                    })
                  );
                }}
              >
                {getImagesForCardType(card.value).map((curr, i) => (
                  <div key={i}>
                    <img
                      src={curr.img}
                      alt={`Slide ${i}`}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
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
                        giftDetails.filter((cur) => cur.id !== card.id)
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
                value={card.value}
                onChange={(e) => handleCardTypeChange(card.id, e.target.value)}
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
                value={card.currency}
                onCurrencyChange={(value) =>
                  handleCurrencyChange(card.id, value)
                }
                onChange={(e) => handleCurrencyChange(card.id, e.target.value)}
                hasborder={true}
              />
            </div>

            <div className={classes.enterAmountContainer}>
              <InputField
                label={'Enter Amount in USD'}
                type="number"
                placeholder={'Min. Amount is 5 USD'}
                value={card.amountInUsd}
                onChange={(e) => handleAmountChange(card.id, e.target.value)}
              />
            </div>

            {allWallets.length > 0 && (
              <div className={classes.balanceDisplay}>
                <span>
                  {card.currency} Balance:{' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  }).format(
                    allWallets.find((w) => w.coinSymbol === card.currency)
                      ?.coinBalance || 0
                  )}{' '}
                  {card.currency}
                </span>
              </div>
            )}
            <br />
            <p style={{ flex: '70%' }}>
              Calculated {card.currency} Quantity:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              }).format(card.amount)}{' '}
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
                        name: 'Crypto Gift Card',
                        value: 'Crypto Gift Card',
                        currency: initialTokens[0]?.title,
                        amountInUsd: '',
                        amount: 0,
                        selectedImg: gift1,
                      },
                    ]);
                  }}
                />
                <GenericButton
                  text={'Create'}
                  loading={loading}
                  styles={{ flex: 1 }}
                  onClick={() => setShowConfirmPopup(true)}
                  disabled={giftDetails.some(
                    (card) =>
                      !card.currency ||
                      !card.amountInUsd ||
                      parseFloat(card.amountInUsd) < 5
                  )}
                />
              </div>
            )}

            {error && <div className={classes.errorMessage}>{error}</div>}
          </div>
        </div>
      ))}

      {showPopup && (
        <CardCreatedPopup
          onClose={closePopup}
          giftCardData={giftCardData}
          selectedImg={giftDetails[0].selectedImg || selectedImg}
          selectedImgUrl={selectedImgUrl}
          email={email}
          amountInUsd={giftDetails[0].amountInUsd}
        />
      )}

      {showConfirmPopup && (
        <CardCreatedConfirmPopup
          onClose={closeConfirmPopup}
          selectedImg={giftDetails[0].selectedImg || selectedImg}
          selectedImgUrl={selectedImgUrl}
          amount={giftDetails[0].amount}
          email={email}
          currency={giftDetails[0].currency}
          setGiftCardData={setGiftCardData}
          setShowConfirmPopup={setShowConfirmPopup}
          setShowPopup={setShowPopup}
          isLoading={isLoading}
          currentUserEmail={currentUserEmail}
          cardType={giftDetails[0].value}
          amountInUsd={giftDetails[0].amountInUsd}
          allCards={giftDetails}
        />
      )}
    </div>
  );
};

export default CreateCards;
