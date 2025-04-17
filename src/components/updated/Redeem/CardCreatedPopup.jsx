import React from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../updated/shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      width: '500px',
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
    '& .slick-slider': {
        width: '100%',
        marginTop: '15px',
    },
    '& .slick-dots li button:before': {
        color: theme.palette.text.secondary,
        opacity: 0.75,
    },
    '& .slick-dots li.slick-active button:before': {
        color: theme.palette.primary.main,
        opacity: 1,
    },
    '& .slick-prev:before, & .slick-next:before': {
        color: theme.palette.text.primary,
    }
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
  cardSlide: {
    textAlign: 'left',
    width: '100%',
    padding: '15px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    '& img': {
        width: '100%',
        borderRadius: '4px',
        marginBottom: '10px',
        display: 'block',
    }
  },
}));

const CardCreatedPopup = ({
  onClose,
  selectedImg,
  giftCardData,
  selectedImgUrl,
  email,
  amountInUsd,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  
  // Check if giftCardData is an array (multiple cards) or a single object
  const isMultipleCards = Array.isArray(giftCardData);
  
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: giftCardData?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: giftCardData?.length > 1,
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
              justifyContent: 'flex-end',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                  fontSize: '24px'
                }}
              />
            </div>
          </div>
          <img src={greenCheck} height="100px" alt="Success Checkmark"/>
          <h3>Created Successfully</h3>
          
          {isMultipleCards ? (
            <>
              <h4>{giftCardData.length} Gift Cards Created</h4>
              <Slider {...sliderSettings}>
                {giftCardData.map((card, index) => (
                  <div key={index}>
                    <div
                      className={classes.cardSlide}
                    >
                      {selectedImg && <img src={selectedImg} alt="Gift Card Preview"/>}
                      <p style={{ fontWeight: 'bold' }}>Card {index + 1} of {giftCardData.length}</p>
                      <p>
                        Token Amount:{' '}
                        {new Intl.NumberFormat('en-US', {
                          style: 'decimal',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        }).format(card.amount)}{' '} {card.type}
                      </p>
                      <p>Gift Card Number: {card.voucher}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <>
              {selectedImg && <img src={selectedImg} width={'100%'} alt="Gift Card Preview"/>}
              <div
                style={{
                  textAlign: 'left',
                  marginTop: '15px',
                  width: '100%',
                }}
              >
                <p>
                  Token Amount:{' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  }).format(giftCardData?.amount)}{' '} {giftCardData?.type}
                </p>
                {amountInUsd !== undefined && amountInUsd !== null && (
                    <p>
                    Amount in USD: $
                    {new Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                    }).format(amountInUsd)}
                    </p>
                )}
                <p>Gift Card Number: {giftCardData?.voucher}</p>
              </div>
            </>
          )}

          <div className={classes.btnContainer}>
            <GenericButton
              text="Send Now"
              onClick={() =>
                navigate('/redeem/send-card-new', {
                  state: {
                    selectedImg,
                    giftCardData,
                    selectedImgUrl,
                    email,
                    amountInUsd,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCreatedPopup;
