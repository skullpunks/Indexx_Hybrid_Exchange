import React, { useState } from 'react';
import Email from '../../assets/arts/Email.svg';
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from '../../assets/arts/qrCode.svg';
import { Button, Form, Input, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAPI,
  decodeJWT,
  getUserDetails,
  baseURL,
} from '../../services/api';
import {
  InfoCircleFilled,
} from '@ant-design/icons';
import OpenNotification from '../OpenNotification/OpenNotification';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BuySellLoginContent: React.FC<Props> = ({ setScreenName }) => {
  
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoadings(true);
    
    
    let res = await loginAPI(values.email_or_username, values.password);
    console.log(res);
    if (res.status === 200) {
      
      setLoadings(false);
      OpenNotification('success', 'Login Successful');
      let resObj = await decodeJWT(res.data.access_token);
      
      localStorage.setItem('user', resObj?.email);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('userType', resObj?.userType);
      localStorage.setItem('userlogged', "normal");
      let redirectUrl = window.localStorage.getItem('redirect');
      window.localStorage.removeItem('redirect');
      let userDetails = await getUserDetails(resObj?.email);
      
      redirectUrl
        ? navigate(redirectUrl)
        : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
    } else {
      console.log(res.data);
      setLoadings(false);
      OpenNotification('error', res?.data);
    }
  };

  const [loadings, setLoadings] = useState<boolean>(false);
  localStorage.setItem('userlogged', "normal");


  const onFinishFailed = (errorInfo: any) => {
    
  };
  return (
    // <div className="">
      <div className="d-flex flex-direction-column col-md-12 responsive_container flex-align-center">
      <h3 className="text-center margin-lr-auto">Indexx Exchange</h3>
        <h1 className="text-center margin-lr-auto top_heading">Log In</h1>
        <div className="text-center margin-lr-auto padding-tb-2x">
          Please make sure you are visiting the correct URL
        </div>
        <p className="w-fit-content py-1 p-2 index_link_info">
          <InfoCircleFilled className="pe-2" style={{ color: '#5F5F5F' }} />
          <span>{baseURL}</span>
        </p>
        <div className="bs_container bs_form card">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <div className="form_element email position-relative">
              <Form.Item
                label="Email / Username"
                name="email_or_username"
                rules={[
                  { required: true, message: 'Email or Username is required' },
                ]}
              >
                <div className="control-input">
                  <Input placeholder="Email id or Username" className="input_height" />
                  <span className="input_icon">
                    <img src={Email} alt="emailIcon" /> {/* You might want to consider using a more generic icon now */}
                  </span>
                </div>
              </Form.Item>
            </div>

            <div className=" password ">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <div className="">
                  <Input.Password />
                </div>
              </Form.Item>
            </div>
            {/* setScreenName("TwoFactorAuth") */}
            <Link to="forgot-password" className="default-link text-underline">
              Forgot password
            </Link>
            <br />
            <br />

            <Form.Item shouldUpdate>
              <Button
                type="primary"
                className="atn-btn atn-btn-round margin-b-1x"
                loading={loadings}
                htmlType="submit"
                block
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <br />

          <div className=" padding-b-2x text-center">
            Don’t have an account?{' '}
            <Link
              to="/indexx-exchange/buy-sell/get-started"
              style={{ color: 'var(--primary-color)' }}
            >
              Get Started
            </Link>
            <Divider></Divider>
            <br />
            <Link
              to=""
              className="default-link border-default text-center margin-t-1_5x disabled"
              style={{
                cursor: 'not-allowed',
                pointerEvents: 'none',
                opacity: '0.6',
              }}
            >
              <img src={qrCode} alt="qr-code" /> Log In with QR code (coming
              soon)
            </Link>
            <br />
            <br />
            <Link
              to="/indexx-exchange/buy-sell/get-started"
              className="text_link"
            >
              <Button
                type="primary"
                className="atn-btn atn-btn-round margin-b-1x"
                style={{ width: 270 }}
              >
                Get Started
              </Button>
            </Link>{' '}
            <br />
            <br />
            <p style={{ color: 'var(--primary-color)', fontSize: 15 }}>
              {' '}
              Sign up to be an indexxer
            </p>
          </div>
          <br />
        </div>
      </div>
    // </div>
  );
};

export default BuySellLoginContent;
