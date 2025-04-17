import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../updated/shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import { createGiftcard } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import { Avatar } from 'antd';
import { useCardStore } from './CardContext';
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
      maxWidth: '90vw',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '550px',
      marginTop: '60px',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
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
  slickArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-95%)',
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
    left: '-40px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
      left: '0px',
    },
  },
  slickNext: {
    right: '-40px',
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
  sliderContainer: {
    width: '450px',
    margin: '0 auto',
  },
  cardSlide: {
    padding: '10px',
  },
  cardImage: {
    width: '100%',
    objectFit: 'contain',
    height: '200px',
    marginBottom: '10px',
  },
  cardDetails: {
    textAlign: 'left',
    marginTop: '15px',
    width: '100%',
    padding: '10px',
    border: props => `1px solid ${props.theme.palette.divider}`,
    borderRadius: '8px',
  },
  cardTokenInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '16px',
  }
}));

const CardCreatedConfirmPopup = ({
  onClose,
  selectedImg,
  selectedImgUrl,
  email,
  amount,
  currency,
  setGiftCardData,
  setShowPopup,
  setShowConfirmPopup,
  isLoading,
  currentUserEmail,
  cardType,
  cardSubType,
  amountInUsd,
  allCards,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles({ theme });
  const [error, setError] = useState('');
  const { setCardDetails } = useCardStore();

  const handleCreateGiftcard = async () => {
    setShowConfirmPopup(false);
    isLoading(true);

    try {
      // Format the cards data for the API
      const giftcardsPayload = allCards.map((card) => ({
        amount: Number(card.amount),
        email: currentUserEmail,
        currency: card.currency,
        giftCardUrl: card.selectedImgUrl || selectedImgUrl,
        cardType:
          card.value === 'Seasonal Greeting Card'
            ? `${card.value} - ${cardSubType || ''}`
            : card.value,
        recevierEmail: email || '',
      }));

      // Call the API with the array of gift cards
      const result = await createGiftcard(giftcardsPayload);

      if (result && result.status === 200) {
        // Store all created cards data
        setGiftCardData(result.data.giftCardDetails);
        setCardDetails(result.data.giftCardDetails);
        setShowPopup(true);
      } else {
        console.error('Failed to create gift cards', result);
        setError('Failed to create gift cards');
      }
    } catch (error) {
      console.error('Error creating gift cards:', error);
      setError('An error occurred while creating gift cards');
    }

    isLoading(false);
  };

  const getImage = (image) => {
    try {
      return require(`../../../assets/token-icons/${image}.png`).default;
    } catch (error) {
      return Inex; // Fallback image if specific token icon is not found
    }
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`${classes.slickArrow} ${classes.slickPrev} ${classes.slickArrowHover}`}
      >
        <span className={classes.slickArrowIcon}>
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal} ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
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
          <img src={greenCheck} height="100px" alt="Green Check" />
          <h3>Confirm Details</h3>
          <h4>
            You are about to create {allCards.length} gift card
            {allCards.length > 1 ? 's' : ''}
          </h4>
          
          {/* Slider Container */}
          <div className={classes.sliderContainer}>
            <Slider {...sliderSettings}>
              {allCards.map((card, index) => (
                <div key={index} className={classes.cardSlide}>
                  {/* Card Image */}
                  <img 
                    src={card.selectedImg || selectedImg} 
                    className={classes.cardImage}
                    alt={`Gift Card ${index + 1}`} 
                  />
                  
                  {/* Card Details */}
                  <div className={classes.cardDetails}>
                    <p className={classes.cardTitle}>
                      Card {index + 1}: {card.value}
                      {card.value === 'Seasonal Greeting Card' && cardSubType ? ` - ${cardSubType}` : ''}
                    </p>
                    
                    <div className={classes.cardTokenInfo}>
                      <Avatar
                        alt={`${card.currency}`}
                        src={getImage(card.currency)}
                        style={{ marginRight: '8px' }}
                      />
                      <p>
                        Token Amount:{' '}
                        {new Intl.NumberFormat('en-US', {
                          style: 'decimal',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        }).format(card.amount)}{' '}
                        {card.currency}
                      </p>
                    </div>
                    
                    <p>
                      Amount in USD: $
                      {new Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      }).format(card.amountInUsd)}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              text="Create"
              onClick={() => handleCreateGiftcard()}
            />
            <GenericButton 
              text="Cancel" 
              onClick={onClose} 
              className={classes.cancelButton}
            />
          </div>
          
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardCreatedConfirmPopup;