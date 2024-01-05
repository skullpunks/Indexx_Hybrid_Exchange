import './PaymentOptions.css';
import paypal from '../../../assets/arts/pay/paypal.svg';
import wire from '../../../assets/arts/pay/wire.svg';
import zelle from '../../../assets/arts/pay/zelle.svg';
import venmo from '../../../assets/arts/pay/venmo.svg';

import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

const PaymentOptions = ({ isVisible, onClose, onConfirm, onZelleAndWireConfirm, message }) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('wire');
  const [isLoading, setIsLoading] = useState(false);
  if (!isVisible) return null;
  const handleClick = async () => {
    setIsLoading(true);
    let orderId;
    if (selectedValue === 'zelle' || selectedValue === 'wire' || selectedValue === 'venmo') {
      // Use the special function for Zelle and Wire
      orderId = await onZelleAndWireConfirm(selectedValue);
      if (orderId) {
        navigate(`/indexx-exchange/payment-${selectedValue}?orderId=${orderId}`);
      }
    } else if (selectedValue === 'paypal') {
      onConfirm();
    }
    setIsLoading(false);
    onClose();
  };

  console.log("selected value", selectedValue)

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };


  return (
    <>
      <div class="main-pay-box">
        <div class="pay-box">
          <div className="close-button-pay" onClick={onClose}>
            &times; {/* This is the close button (X) */}
          </div>
          <div class="pay-text-box">Payment</div>
          <div class="pay-text-box" style={{ fontSize: '15px' }}>
            Choose a payment method
          </div>
          <FormControl className="pay-form">
            <FormLabel
              className="pay-label"
              id="demo-radio-buttons-group-label"
            ></FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedValue}
              onChange={handleRadioChange}
              name="radio-buttons-group"
              className="radio-group"
              sx={{ gap: 4 }}
            >
              <FormControlLabel
                value="wire"
                control={<Radio className="radio-button" />}
                labelPlacement="start"
                label={
                  <div className="label-content">
                    <img
                      src={wire}
                      alt="Other"
                      className={`pay-image ${selectedValue === 'wire' ? 'selected' : ''
                        }`}
                    />
                    <p className="pay-description">
                      Swift and secure direct electronic transfers, renowned for
                      their speed and security in domestic and international
                      transactions. (2-3 Business Days)
                    </p>
                  </div>
                }
              />

              {/* <FormControlLabel
                value="venmo"
                control={<Radio className="radio-button" />}
                labelPlacement="start"
                label={
                  <div className="label-content">
                    <img
                      src={venmo}
                      alt="venmo"
                      className={`pay-image ${selectedValue === 'venmo' ? 'selected' : ''
                        }`}
                    />
                    <p className="pay-description">
                      Widely-used mobile payment platform that simplifies financial transactions among friends, family, and businesses.
                    </p>
                  </div>
                }
              /> */}

              <FormControlLabel
                value="zelle"
                control={<Radio className="radio-button" />}
                labelPlacement="start"
                label={
                  <div className="label-content">
                    <img
                      src={zelle}
                      alt="Male"
                      className={`pay-image ${selectedValue === 'zelle' ? 'selected' : ''
                        }`}
                    />
                    <p className="pay-description">
                      Swift and secure money transfers, effortlessly sending and
                      receiving funds via mobile app or online banking. (2-3
                      Business Days)
                    </p>
                  </div>
                }
              />

              <FormControlLabel
                value="paypal"
                control={<Radio className="radio-button" />}
                labelPlacement="start"
                label={
                  <div className="label-content">
                    <img
                      alt="Female"
                      src={paypal}
                      className={`pay-image ${selectedValue === 'paypal' ? 'selected' : ''
                        }`}
                    />
                    <p className="pay-description">
                      {' '}
                      Secure online payment platform with instant wallet updates
                      for seamless transactions. (instant)
                    </p>
                  </div>
                }
              />
            </RadioGroup>
          </FormControl>
          <div class="pay-button-box mt-5">
            <button className="pay-button-btn" onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentOptions;
