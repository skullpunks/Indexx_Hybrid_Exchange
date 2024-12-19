import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../updated/shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import gift1 from '../../../assets/redeem/gift1.svg';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import { createGiftcard } from '../../../services/api';

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
      maxWidth: '80vw',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '360px',
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
  amountInUsd,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const classes = useStyles();
  const [error, setError] = useState('');

  const handleCreateGiftcard = async () => {
    setShowConfirmPopup(false);
    isLoading(true);
    if (!amount || !currency) {
      setError('All fields are required.');
      return;
    }
    setError(''); // Clear any previous error messages
    const result = await createGiftcard(
      Number(amount),
      currentUserEmail,
      currency,
      selectedImgUrl,
      cardType,
      email
    );
    console.log(result);
    if (result && result.status === 200) {
      setGiftCardData(result.data.giftCardDetails); // Store the API response data
      setShowPopup(true);
    } else {
      console.error('Failed to create gift card', result);
      setError('Failed to create gift card');
    }
    isLoading(false);
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
          <img src={greenCheck} height="100px" />
          <h3>Confirm Details</h3>
          <img src={selectedImg} width={'100%'} />
          <div
            style={{
              textAlign: 'left',
              marginTop: '15px',
              width: '100%',
            }}
          >
            {/* <p>Quantity: {1}</p> */}
            <p>
              Token Amount: {amount} {currency}
            </p>
            <p>
              Amount in USD: $
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }).format(amountInUsd)}
            </p>
            {/* <p>Gift Card Number: {giftCardData.voucher}</p> */}
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              text="Create"
              onClick={() => handleCreateGiftcard()}
            />
            <GenericButton text="Cancel" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCreatedConfirmPopup;
