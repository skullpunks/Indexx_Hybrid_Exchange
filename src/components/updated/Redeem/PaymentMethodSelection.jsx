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
  const { cardDetails } = useCardStore();

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
  };

  const handleSendGiftcard = async (index) => {
    try {
      // Send individual card
      const result = await sendGiftcard(
        cardDetails[index].selectedGiftCard,
        cardDetails[index].senderEmail,
        cardDetails[index].recipientEmail,
        cardDetails[index].message,
        cardDetails[index].senderName,
        cardDetails[index].selectedImgUrl
      );

      if (result.status === 200) {
        console.log(`Card ${index + 1} sent successfully`);
        return true;
      } else {
        console.error(`Failed to send card ${index + 1}:`, result);
        throw new Error(result.message || 'Failed to send gift card');
      }
    } catch (error) {
      console.error(`Error sending gift card ${index + 1}:`, error);
      throw error;
    }
  };

  const handlePayGiftCardWithBalance = async () => {
    setLoading(true);

    // Track successful transactions
    const successfulCards = [];
    const failedCards = [];

    try {
      // Process each card
      for (let index = 0; index < cardDetails.length; index++) {
        const card = cardDetails[index];

        try {
          // Step 1: Process payment
          const paymentResult = await PayGiftCardWithBalance(
            card.selectedGiftCard,
            card.senderEmail,
            currency
          );

          if (paymentResult.status !== 200) {
            throw new Error(
              paymentResult.message || 'Payment processing failed'
            );
          }

          // Step 2: Send gift card
          await handleSendGiftcard(index);

          // Track successful card
          successfulCards.push(index);
        } catch (error) {
          failedCards.push({
            index,
            error: error.message || 'Unknown error occurred',
          });
          console.error(`Failed to process card ${index + 1}:`, error);
        }
      }

      // Show appropriate feedback based on results
      if (successfulCards.length === cardDetails.length) {
        // All cards processed successfully
        navigate('/redeem/send-card-successful', {
          state: {
            selectedImg: cardDetails[0].selectedImgUrl,
            giftCardData: cardDetails[0],
            amountInUsd: cardDetails[0].amountInUsd,
            cardCount: cardDetails.length,
          },
        });
      } else if (successfulCards.length > 0) {
        navigate('/redeem/send-card-successful', {
          state: {
            selectedImg: cardDetails[successfulCards[0]].selectedImgUrl,
            giftCardData: cardDetails[successfulCards[0]],
            amountInUsd: cardDetails[successfulCards[0]].amountInUsd,
            cardCount: successfulCards.length,
          },
        });
      } else {
        const errorMessages = failedCards
          .map((card) => `Card ${card.index + 1}: ${card.error}`)
          .join('\n');

        console.log(
          `Failed to process gift cards. Please try again later.\n\nErrors:\n${errorMessages}`
        );
      }
    } catch (error) {
      console.error('Error in gift card payment process:', error);
      console.log(
        'An unexpected error occurred while processing your gift cards. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
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
        onClick={
          selectedValue === 'Pay with USD'
            ? handlePaymentMethodClick
            : handlePayGiftCardWithBalance
        }
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
          type={`${'Gift Card'}`}
          token={selectedValue === 'Pay with USD' ? 'inex' : currency}
          spendToken={selectedValue === 'Pay with USD' ? 'inex' : currency}
        />
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
