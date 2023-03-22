import React from 'react';
import Email from '../../assets/arts/Email.svg';
import PasswordEye from '../../assets/arts/PasswordEye.svg';
import qrCode from '../../assets/arts/qrCode.svg';
import completedCheck from '../../assets/arts/completedCheck.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellSuccess: React.FC<Props> = ({ setScreenName }) => {
  console.log(setScreenName);
  return (
    <div className="">
      <Link
        to=""
        className="default-link border-default font_20x d-flex w-fit-content margin-lr-auto padding-b-2x margin-b-1x sms_verfication"
      >
        <img
          src={completedCheck}
          alt="Success"
          className="padding-r-2x
"
        />
        <div
          style={{
            paddingLeft: '20px',
            paddingTop: '5px',
          }}
        >
          Send SMS success.
        </div>
      </Link>
      <div className="d-flex flex-direction-column">
        <h1 className="text-center margin-lr-auto">Log In</h1>
        <div className="text-center margin-lr-auto padding-tb-2x">
          Please make sure you are visiting the correct URL
        </div>
        <Link
          to=""
          className="default-link border-default w-fit-content margin-lr-auto padding-b-2x margin-b-2x"
        >
          http://accounts.indexx.ai
        </Link>
        <div className="bs_container bs_form card">
          <div className="form_element email position-relative">
            <label>Email</label>
            <div className="control-input">
              <input type="email" name="email" value="willie@sample.com" />
              <span className="input_icon">
                <img src={Email} alt="emailIcon" />
              </span>
            </div>
          </div>
          <div className="form_element password position-relative padding-tb-2x">
            <label>Password</label>
            <div className="control-input">
              <input
                type="password"
                name="password"
                autoComplete="off"
                value="8777887"
              />
              <span className="input_icon">
                <img src={PasswordEye} alt="PasswordEye" />
              </span>
            </div>
          </div>
          <Link
            to=""
            className="default-link text-underline"
            onClick={() => setScreenName('TwoFactorAuth')}
          >
            Forgot password
          </Link>
          <br />
          <br />
          <Button
            type="primary"
            className="atn-btn atn-btn-round margin-b-1x"
            style={{
              height: 55,
              borderColor: '#11be6a',
              backgroundColor: '#11be6a',
              color: '#fff',
              fontSize: 20,
              borderRadius: 5,
            }}
            block
          >
            Log In
          </Button>
          <br />

          <div className=" padding-b-2x border-b-1x text-center">
            Don’t have an account?{' '}
            <Link to="" className="text_link">
              Get Started
            </Link>
          </div>
          <br />

          <Link
            to=""
            className="default-link border-default text-center margin-t-1_5x "
          >
            <img src={qrCode} alt="qr-code" /> Log In with QR code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuySellSuccess;
