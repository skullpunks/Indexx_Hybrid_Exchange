import {
  Box,
  Button,
  Grid,
  Typography,
  Collapse,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { createPowerPackOrder, getDiscountCode } from '../../services/api';
import hive from '../../assets/powerpack/HiveLogo.png';
import honeBeeHive from '../../assets/powerpack/honeBeeHive.svg';
import captainBeeHive from '../../assets/powerpack/cardImage.svg';
import './PowerCard.css';
import PaymentOptions from '../BuySell/Notification/PaymentOptions';
import hive_logo from '../../assets/power-packs/hive_logo.png';
import { NavLink } from 'react-router-dom';

const PowerCard = ({ card, type, subType, setPopup, setPopupData }) => {
  const [flip, setFlip] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const parsedId = parseInt(card.id) * 100;
  const [message, setMessage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0); // the discount amount
  const [finalAmount, setFinalAmount] = useState(
    stringPriceToNumber(card?.price)
  );
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [powerPackSelected, setPowerPackSelected] = useState();

  function stringPriceToNumber(price) {
    return parseFloat(price.replace(/,/g, ''));
  }
  // Convert string price to number and calculate exchange fee
  const originalPrice = parseFloat(card.price.replace(/,/g, ''));
  //const exchangeFee = originalPrice * 0.03;
  const finalPrice = originalPrice;
  const currentINEXRate = 2;
  useEffect(() => {
    if (!discountCode) {
      setErrorMessage('');
      setDiscountAmount(0); // Clear the discount amount
      const originalPrice = parseFloat(card.price.replace(/,/g, ''));
      //const exchangeFee = originalPrice * 0.03;
      const finalPrice = originalPrice;
      //setFinalAmount(parseFloat((card?.price || '0').replace(/,/g, '')));  // Reset the final amount to the original price
      setFinalAmount(finalPrice);
    }
  }, [discountCode]);

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrder = async () => {
    let userEmail = localStorage.getItem('user');
    console.log('userEmail', userEmail);
    if (userEmail !== null && userEmail !== '') {
      console.log('I AM HERE');
      console.log('purchasedCard', powerPackSelected);
      setLoadings(true);
      let purchasedProduct = powerPackSelected.name;
      let paymentMethodUsed = 'Paypal';
      let powerPackAmountInNumber = stringPriceToNumber(
        powerPackSelected?.price
      );
      let powerPackAmount = powerPackSelected?.price;
      console.log(
        paymentMethodUsed,
        purchasedProduct,
        powerPackAmountInNumber,
        powerPackAmount,
        discountCode
      );
      debugger;
      let res = await createPowerPackOrder(
        purchasedProduct,
        paymentMethodUsed,
        purchasedProduct,
        powerPackAmountInNumber,
        powerPackAmount,
        discountCode
      );
      if (res.status === 200) {
        setLoadings(false);
        //--Below code is to enable paypal Order---

        for (let i = 0; i < res.data.links.length; i++) {
          if (res.data.links[i].rel.includes('approve')) {
            window.location.href = res.data.links[i].href;
          }
        }
        //getStripePaymentIntent(res.data.orderId, res.data.user.email);
      } else {
        setLoadings(false);
        setIsModalOpen(true);
        setMessage(res.data);
        setErrorMessage(res.data);
      }
    } else {
      console.log('Email not found ask user to login');
      // Save the current route
      localStorage.setItem('redirectRoute', window.location.pathname);

      // Redirect to the login page
      window.location.href = '/indexx-exchange/buy-sell/hive-login';
      //("save the current route history")
      //(go to login route, /indexx-exchange/buy-sell/hive-login)
      //("come back to this route after login")
    }
  };

  const applyDiscount = async () => {
    let validateDiscountCode = await getDiscountCode(discountCode, card.name);
    if (validateDiscountCode.status === 200) {
      const originalPrice = parseFloat((card?.price || '0').replace(/,/g, ''));
      const discount =
        originalPrice * validateDiscountCode.data.discountPercentage;
      const discountedPrice = originalPrice - discount;
      //const exchangeFee = originalPrice * 0.03;
      const finalPriceWithExchangeFee = discountedPrice;

      setDiscountAmount(discount);
      setFinalAmount(finalPriceWithExchangeFee);
      console.log(finalPriceWithExchangeFee);
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setErrorMessage(validateDiscountCode?.data); // Set the error message when the code is invalid
      const originalPrice = parseFloat((card?.price || '0').replace(/,/g, ''));
      //const exchangeFee = originalPrice * 0.03;
      const finalPriceWithExchangeFee = originalPrice;

      setDiscountAmount(0);
      setFinalAmount(finalPriceWithExchangeFee);
    }
  };

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    let purchasedProduct = powerPackSelected.name;
    let paymentMethodUsed = paymentMethod;
    //let powerPackAmountInNumber = stringPriceToNumber(finalAmount);
    //let powerPackAmount = finalAmount;
    let powerPackAmountInNumber = stringPriceToNumber(powerPackSelected?.price);
    let powerPackAmount = powerPackSelected?.price;
    let res;
    console.log('paymentMethod', paymentMethod);
    res = await createPowerPackOrder(
      purchasedProduct,
      paymentMethodUsed,
      purchasedProduct,
      powerPackAmountInNumber,
      powerPackAmount,
      discountCode
    );
    if (res.status === 200) {
      // Return the order ID for Zelle and Wire
      return res.data.orderId;
    } else {
      setLoadings(false);
      // OpenNotification('error', res.data);
      setIsModalOpen(true);
      setMessage(res.data);
      return null;
    }
  };

  const CardHeader = ({ card_type }) => {
    if (subType === 'crypto' || subType === 'token') {
      return (
        <div
          style={{
            background: subType === 'crypto' ? '#FA8D01' : '#2A7F13',
            color: 'white',
            fontSize: '32px',
            padding: '10px 20px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {card_type}
        </div>
      );
    }

    return (
      <div
        style={{
          color: 'black',
          padding: '20px 20px',
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={hive_logo} height={'30px'} />
        <h3 style={{ fontWeight: 'bold', fontSize: '32px' }}>{card_type}</h3>
      </div>
    );
  };

  return (
    <>
      <Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mt={2}
          mb={15}
        >
          <Box
            style={{
              borderRadius: 0,
              maxWidth: '260px',
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              //
              backgroundColor: type === 'captainBee' ? '#FFB300' : '#8EDF78',
            }}
            // className={
            //   card.level === 'Captain Bee'
            //     ? 'highlighted-captain-bee-card'
            //     : ''
            // }
          >
            <CardHeader card_type={card.type} />
            {subType === 'action' || subType === 'power' ? (
              <Typography
                variant="text"
                component="p"
                fontSize={'20px'}
                fontWeight={500}
                lineHeight={1.3}
                style={{
                  color: 'inherit',
                }}
              >
                {card.name}
              </Typography>
            ) : (
              ''
            )}
            <img
              alt=""
              src={card.photo}
              width={'180px'}
              style={{
                marginBottom:
                  subType === 'action' || subType === 'power' ? '40px' : '15px',
              }}
            />
            {subType === 'crypto' || subType === 'token' ? (
              <Typography
                variant="text"
                component="p"
                fontSize={'20px'}
                fontWeight={500}
                lineHeight={1.3}
                mb={5}
                style={{
                  color: 'inherit',
                }}
              >
                {card.name}
              </Typography>
            ) : (
              ''
            )}

            <Typography
              variant="text"
              component="p"
              fontSize={'20px'}
              fontWeight={400}
            >
              Total Return:
            </Typography>

            <Typography
              variant="text"
              component="p"
              fontSize={'25px'}
              fontWeight={500}
              style={{ color: '#343434' }}
            >
              {card.percentage}
            </Typography>

            <Typography
              variant="text"
              component="p"
              fontSize={'17px'}
              fontWeight={400}
              style={{ color: '#343434' }}
            >
              {card.amount}
            </Typography>
            <Typography
              variant="text"
              component="p"
              fontSize={'11px'}
              fontWeight={400}
              // mb={5}
              mt={6}
            >
              Invest
            </Typography>

            <Typography
              variant="text"
              component="p"
              fontSize={'18px'}
              fontWeight={400}
              mb={2}
              //   mt={1}
            >
              {card.price}
            </Typography>
            {/*  */}

            <Button
              onClick={() => {
                setPopupData(card);
                setPopup(true);
              }}
              disableTouchRipple
              sx={{
                fontSize: '13px',
                //   color: '#FFB300',
                color: '#343434',
                textTransform: 'none',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                mt: 2,
                width: 'fit-content',
                height: 'fit-content',
                '&:hover': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  color: '#343434',
                },
              }}
            >
              <b>See more...</b>
            </Button>
          </Box>

          <Collapse
            in={isApplyClicked}
            sx={{ width: '260px' }}
            className="power-input"
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter discount code"
              sx={{
                width: '260px',
                textAlign: 'center',
                borderRadius: '0px',
              }}
              InputProps={{
                style: {
                  borderRadius: 0,
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={applyDiscount}
              disabled={!discountCode}
              sx={{
                backgroundColor: 'transparent',
                color: '#5f5f5f',
                border: '1px solid #A1A1A1',
                borderRadius: '0',
                px: 4,
                mt: 2,
                width: '260px',
                height: '36px',
                fontSize: '13px',
                fontWeight: '100',
                boxShadow: 'none',
                textTransform: 'none',
                zIndex: '5',
                '&:hover': {
                  boxShadow: 'none',
                  background: '#FFB300',
                  borderColor: '#FFB300',
                },
              }}
            >
              Apply
            </Button>
            {/* Display discount and final amount */}
            <div>
              <Box style={{ marginTop: '10px', textAlign: 'center' }}>
                <Typography variant="body2" fontSize={'15px'} fontWeight={800}>
                  Discount Applied: ${Math.floor(discountAmount * 100) / 100}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={'15px'}
                  fontWeight={800}
                  style={{ fontWeight: 'bold' }}
                >
                  Final Amount: ${Math.floor(finalAmount * 100) / 100}
                </Typography>
              </Box>
              {errorMessage && (
                <Box
                  style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    color: 'red',
                  }}
                >
                  {errorMessage}
                </Box>
              )}
            </div>
          </Collapse>
          <NavLink href="/indexx-exchange/affiliate">
            <Button
              onClick={() => {
                setIsModalOpen2(true);
                setPowerPackSelected(card);
                //createNewBuyOrder(card);
              }}
              loading={loadings}
              sx={{
                // background: '#FFB300',
                backgroundColor: type === 'captainBee' ? '#FFB300' : '#8EDF78',
                color: 'var(--body_color)',
                // border: '1px solid #FFB300',
                border:
                  type === 'captainBee'
                    ? '1px solid #FFB300'
                    : '1px solid #8EDF78',
                borderRadius: '0',
                px: 4,
                mt: 3,
                width: '260px',

                fontSize: '15px',
                fontWeight: '400',
                textTransform: 'none',
                zIndex: '5',
                '&:hover': {
                  background: type === 'captainBee' ? '#FFD000' : '#8EDF78',
                  borderColor: type === 'captainBee' ? '#FFD000' : '#8EDF78',
                },
              }}
            >
              Invest
            </Button>
          </NavLink>
        </Box>
      </Grid>
      <div>
        <PaymentOptions
          isVisible={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          onConfirm={createNewBuyOrder}
          onZelleAndWireConfirm={(paymentMethod) =>
            createBuyOrderForZelleAndWire(paymentMethod)
          } // For Zelle and Wire
          message={message}
        />
      </div>
    </>
  );
};

export default PowerCard;
