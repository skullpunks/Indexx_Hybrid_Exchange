import React, { useState } from 'react';
import Email from '../../assets/arts/Email.svg';
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from '../../assets/arts/qrCode.svg';
import { Button, Form, Input, notification, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAPI,
  decodeJWT,
  getUserDetails,
  baseURL,
} from '../../services/api';
import {
  CheckCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import hive from "../../assets/Welcometohive.svg";
import "./BuySellLoginContentHive.css"

// interface Props {
//   setScreenName: (value: string | ((prevVar: string) => string)) => void;
// }
const BuySellLoginContentHive: React.FC = () => {
  // console.log(setScreenName);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoadings(true);
    console.log('Success:', values);
    console.log('Success:', values);
    let res = await loginAPI(values.email, values.password);
    console.log(res.data);
    if (res.status === 200) {
      setLoadings(false);
      openNotificationWithIcon('success', 'Login Successful');
      localStorage.setItem('user', values.email);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      let resObj = await decodeJWT(res.data.access_token);
      console.log(resObj);
      let redirectUrl = window.localStorage.getItem('redirect');
      window.localStorage.removeItem('redirect');
      let userDetails = await getUserDetails(values.email);
      console.log(userDetails.data);
      redirectUrl
        ? navigate(redirectUrl)
        : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
    } else {
      console.log(res.data);
      setLoadings(false);
      openNotificationWithIcon('error', res.data);
    }
  };

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [loadings, setLoadings] = useState<boolean>(false);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    const Icon =
      type === 'error' ? (
        <CloseCircleFilled />
      ) : (
        <CheckCircleFilled className="text_link" />
      );
    notification[type]({
      message: message,
      description: '',
      icon: Icon,
      style: {
        border: '1px solid #11be6a',
        boxShadow: 'none',
        borderRadius: 5,
        top: 100,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="scan-container flex-align-stretch">
      <div className='d-flex flex-direction-column col-md-6 responsive_container align-items-end align-self-center'>
        <img alt='' src={hive} width={"70%"}/>
      </div>
      <div className="d-flex flex-direction-column col-md-6 responsive_container flex-align-center">
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
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Email Id Required' },
                  { type: 'email', message: 'Please Enter Valid Email Id' },
                ]}
              >
                <div className="control-input">
                  <Input placeholder="Email id" className="input_height" />
                  <span className="input_icon">
                    <img src={Email} alt="emailIcon" />
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
                className="atn-btn atn-btn-round margin-b-1x hive-btn"
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
              style={{ color: '#ffb300' }}
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
                className="atn-btn atn-btn-round margin-b-1x hive-btn"
                // style={{ width: 270 }}
              >
                Get Started
              </Button>
            </Link>{' '}
            <br />
            <br />
            <p style={{ color: '#ffb300', fontSize: 15 }}>
              {' '}
              Sign up to be an indexxer
            </p>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default BuySellLoginContentHive;