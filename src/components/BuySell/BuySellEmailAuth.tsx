import { Button, Popover, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import envelop from '../../assets/arts/envelop.svg';
import Timer from '../../utils/Timer';
import { CheckCircleFilled } from '@ant-design/icons';
import { resendEmailCode, validateEmail } from '../../services/api';
import { useEffect, useState } from 'react';
import React, { ClipboardEvent } from 'react';
import OpenNotification from '../OpenNotification/OpenNotification';

const BuySellEmailAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loadings, setLoadings] = useState<boolean>(false);
  const [isTimerDone, setIsTimerDone] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);

  const otpCode = new Array(6);
  useEffect(() => {
    setEmail(String(localStorage.getItem('tempAuthEmail')));
  }, [email]);

  const moveToNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { maxLength, value } = e.currentTarget;
    if (value.length > maxLength)
      e.currentTarget.value = value.slice(0, maxLength);

    if (value.length === maxLength) {
      let next = e.currentTarget.nextElementSibling;
      // let prev = e.currentTarget.previousElementSibling;
      
      if (next === null) {
        document.getElementById('verify_btn')?.focus();
      } else if (e.key === 'Tab' && e.shiftKey === true) {
        e.preventDefault();
        return;
      } else {
        (next as HTMLElement).focus();
      }
    }
  };

  function isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }

  const resendEmail = async () => {
    try {
      setLoadings(true);
      let res = await resendEmailCode(email);
      if (res.status === 200) {
        OpenNotification('success', res.data);
        setIsTimerDone(false);
        setTimerKey(prevKey => prevKey + 3); // Increment key to re-render Timer
        setLoadings(false);
      } else {
        setLoadings(false);
        OpenNotification('error', res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('Timer Done:', isTimerDone);
  }, [isTimerDone]);
  const pastePassowrd0 = (e: ClipboardEvent<HTMLInputElement>) => {
    let clipboardData, pastedData;
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData;
    pastedData = clipboardData.getData('Text');
    if (isNumeric(pastedData)) {
      let arr: any = document.querySelectorAll('.otp_container input');
      let pastedArr = pastedData.split('');
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].value = pastedArr[i];
        }

        if (document.getElementById('verify_btn'))
          document.getElementById('verify_btn')?.focus();
      }
    }
  };

  const pastePassowrd = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text').slice(0, 6); // Get only the first 6 characters

    if (isNumeric(pastedData)) {
      const inputFields: any = document.querySelectorAll('.otp_container input');
      pastedData.split('').forEach((char: any, index: any) => {
        if (inputFields[index]) {
          inputFields[index].value = char;
          otpCode[index] = char;
        }
      });

      // Automatically focus the verify button if all digits are pasted
      if (pastedData.length === 6 && document.getElementById('verify_btn')) {
        document.getElementById('verify_btn')?.focus();
      }
    }
  };
  const clearOtpInputs = () => {
    console.log("I am here");
    document.querySelectorAll<HTMLInputElement>('.otp_container input').forEach(input => {
      input.value = '';
    });
    otpCode.fill(''); // Clear the otpCode array
  };

  const verifyCode = async () => {
    setLoadings(true);
    const res = await validateEmail(email, otpCode.join('').toString());
    if (res.status === 200) {
      OpenNotification('success', "Email successfully verified");
      navigate('/indexx-exchange/buy-sell/login-honeybee/');
      setLoadings(false);
    } else {
      OpenNotification('error', res.data);
      clearOtpInputs();
      setLoadings(false);
    }
  };

  // const resendEmail = async () => {
  //     let res = await resendEmailCode(email);
  //     
  //     if (res.status === 200) {
  //         OpenNotification('success', res.data);
  //     } else {
  //         OpenNotification('error', res.data);
  //     }
  // }

  const handleInput1 = (e: any) => {
    let val = e.currentTarget.value;

    otpCode[0] = val[0];
  };

  const handleInput2 = (e: any) => {
    let val = e.currentTarget.value;
    otpCode[1] = val[0];
  };

  const handleInput3 = (e: any) => {
    let val = e.currentTarget.value;
    otpCode[2] = val[0];
  };

  const handleInput4 = (e: any) => {
    let val = e.currentTarget.value;
    otpCode[3] = val[0];
  };

  const handleInput5 = (e: any) => {
    let val = e.currentTarget.value;
    otpCode[4] = val[0];
  };

  const handleInput6 = (e: any) => {
    let val = e.currentTarget.value;
    otpCode[5] = val[0];
  };

  const content = (
    <div className="popover_container" style={{ width: 366 }}>
      <img
        src={envelop}
        alt="envelop"
        className="text-center width-100"
        width="100"
        height="69"
      />
      <div className="font_30x text-center brand_color padding-t-2x">
        Didn’d receive email?
      </div>
      <div className="text-center margin-tb-2x"></div>
      <ul className="brand_color disc_ul">
        <li>Make sure the email address {email} is correct.</li>
        <li>
          This email might be delayed for a few minutues. Try again after 20
          minutes.
        </li>
        <li>Check your Spam or Junk mail folders.</li>
        <li>Add indexx.ai to your email address whitelist.</li>
      </ul>
    </div>
  );

  return (
    <div className="d-flex flex-direction-column col-lg-5 col-md-12 flex-align-center responsive_container">
      <h1 className="text-center margin-lr-auto top_heading">
        Verify your Email{' '}
      </h1>

      <div className="bs_container bs_form card">
        <img
          src={envelop}
          alt="envelop"
          width="100"
          height="69"
          className="margin-lr-auto margin-t-1_5x"
        />
        <h1 className="margin-lr-auto padding-t-2x">Email Verification</h1>
        <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
          <div>A verification code has been sent to your email address.</div>
          <div>The code is valid for 10 minutes.</div>
        </div>
        <br />
        <br />
        <div className="otp_container">
          <label className="padding-b-1x">Code</label>
          <div className="d-flex justify-between">
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput1}
            />
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput2}
            />
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput3}
            />
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput4}
            />
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput5}
            />
            <input
              type="number"
              maxLength={1}
              max={1}
              onKeyUp={moveToNext}
              onPaste={pastePassowrd}
              onChange={handleInput6}
            />
          </div>
        </div>
        <br />
        {/* <Button type="primary" className="ant-btn ant-btn-primary atn-btn atn-btn-round margin-b-1x d-none" onClick={() => navigate("/indexx-exchange/buy-sell/get-started/secure-steps")} >Verify</Button> */}
        {/* <Button id="verify_btn" type="primary" onClick={() => navigate("/indexx-exchange/kyc")}>Verify</Button> */}
        <Button
          id="verify_btn"
          type="primary"
          onClick={() => verifyCode()}
          loading={loadings}
        >
          Verify
        </Button>
        {isTimerDone ? (
          <div className="margin-lr-auto padding-t-2x">
            <Button
              loading={loadings}
              type="primary" style={{ height: "45px" }} onClick={resendEmail}>Resend Email</Button>
          </div>
        ) : (
          <div className="margin-lr-auto padding-t-2x disable_icon" style={{ color: "var(--body_color)" }}>
            Resend Email (
            <Timer
              key={timerKey}
              initMins={3}
              initSecs={0}
              onFinish={() => {
                console.log('Timer finished');
                setIsTimerDone(true);
              }}
            />)
          </div>
        )}

        <div
          className="margin-lr-auto padding-tb-2x"
          style={{ cursor: 'pointer' }}
        >
          <Popover content={content} trigger="click" className="text_link">
            Didn’t receive an email?
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default BuySellEmailAuth;
