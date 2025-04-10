import React, { useState } from 'react';
import IconicHeader from '../shared/RedeemIconicHeader';
import { makeStyles } from '@mui/styles';
import CustomizedSteppers from './CustomizedStepper';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import CustomSelectBox from './CustomSelect';
import initialTokens from '../../../utils/Tokens.json';
import GenericButton from '../shared/Button';
import SelectPaymentMethod from './SelectPaymentMethod';
import Popup from './PaymentPopup';
import { useCardStore } from './CardContext';
import { sendGiftcard } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { PayGiftCardWithBalance } from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1380px',
    margin: 'auto',
    marginTop: '100px',
  },
  selectTypeContainer: {
    marginBottom: '20px',
    maxWidth: '500px',
    width: '100%',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },

    '& h2': {
      fontSize: '32px',
      marginBottom: '10px',
    },
    '& p': {
      fontSize: '14px',
      marginBottom: '30px',
    },
  },

  button: {
    maxWidth: '500px',
    width: '100%',
    marginTop: '50px',
  },
}));

const PaymentMethodSelection = () => {
  const [selectedTab, setSelectedTab] = useState('Send');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [selectedValue, setSelectedValue] = useState('Pay with USD');
  const [currency, setCurrency] = useState(initialTokens[0]?.title);
  const [paymentMethodError, setPaymentMethodError] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    cardDetails,
    selectedImgUrl,
    selectedImg,
    amountInUsd: storeAmountInUsd,
  } = useCardStore();

  console.log(cardDetails);

  const handlePaymentChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('Selected Payment Method:', event.target.value);
  };
  const classes = useStyles();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePaymentMethodClick = async () => {
    setPopupOpen(true);
  };

  const handleNewPopupClose = () => {
    setPopupOpen(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
    handleNewPopupClose();
  };

  const handleSendGiftcard = async () => {
    setLoading(true);

    console.log(cardDetails);

    try {
      // Send all cards
      const results = await Promise.all(
        cardDetails.map(async (card) => {
          return await sendGiftcard(
            card.selectedGiftCard,
            card.senderEmail,
            card.recipientEmail,
            card.message,
            card.senderName,
            card.selectedImgUrl
          );
        })
      );

      // Check if all cards were sent successfully
      const allSuccessful = results.every((result) => result.status === 200);

      if (allSuccessful) {
        navigate('/redeem/send-card-successful', {
          state: {
            selectedImg: cardDetails[0].selectedImgUrl,
            giftCardData: cardDetails[0],
            amountInUsd: storeAmountInUsd,
            cardCount: cardDetails.length,
          },
        });
      } else {
        console.error('Failed to send gift/greeting cards:', results);
        alert('Failed to send one or more gift/greeting cards.');
      }
    } catch (error) {
      console.error('Error sending gift cards:', error);
      alert('An error occurred while sending gift cards.');
    }

    setLoading(false);
  };

  const handlePayGiftCardWithBalance = async () => {
    setLoading(true);

    try {
      const results = await PayGiftCardWithBalance(
        cardDetails[0].selectedGiftCard,
        cardDetails[0].senderEmail,
        currency
      );

      if (results.status === 200) {
        handleSendGiftcard();
      } else {
        console.error('Failed to pay gift card with balance:', results);
        alert('Failed to pay gift card with balance.');
      }
    } catch (error) {
      console.error('Error paying gift card with balance:', error);
      alert('An error occurred while paying gift card with balance.');
    }

    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <CustomizedSteppers step={3} />

      <div className={classes.selectTypeContainer}>
        <h2>Select Payment Method</h2>
        <p>
          Choose your preferred method of payment quickly and securely from the
          available options.
        </p>
        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Pay with USD"
              name="radio-buttons-group"
              value={selectedValue}
              onChange={handlePaymentChange}
            >
              <FormControlLabel
                value="Pay with USD"
                control={<Radio />}
                label="Pay with USD"
              />
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
          {/* <label>Select payment method</label>
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
          /> */}
          <div style={{ width: '100%' }}>
            <SelectPaymentMethod
              onClick={handlePaymentMethodClick}
              errorMsg={paymentMethodError}
              buttonText={selectedPaymentMethod || 'Select Transaction Method'}
              type={`${'Buy'}`}
            />
          </div>
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
            hasborder={true}
          />
        </div>
      )}
      <div style={{ marginTop: '40px' }}></div>
      <GenericButton
        onClick={handlePayGiftCardWithBalance}
        className={classes.button}
        text={'Proceed'}
        loading={loading}
      />

      <div>
        <Popup
          open={popupOpen}
          onClose={handleNewPopupClose}
          amount={''}
          onSelectPaymentMethod={handlePaymentMethodSelect}
          type={`${'Buy'}`}
          token={'inex'}
          spendToken={'wibs'}
        />
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
