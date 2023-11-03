import React from 'react';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellLoginFail: React.FC<Props> = ({ setScreenName }) => {
  
  const navigate = useNavigate();
  return (
    <div className="bs_container bs_form card card_s col-md-12 flex-align-center responsive_container">
      <h1 className="text-center">Log In Failed</h1>

      <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
        <div>Your email or password is incorrect.</div>
        <div>Please try again</div>
      </div>
      <br />
      <br />
      <Button
        type="primary"
        className="atn-btn atn-btn-round margin-b-1x"
        onClick={() => navigate('/indexx-exchange/buy-sell/login')}
        style={{
          height: 55,
          borderColor: 'var(--primary-color)',
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          fontSize: 20,
          borderRadius: 5,
        }}
        block
      >
        Ok
      </Button>
    </div>
  );
};

export default BuySellLoginFail;
