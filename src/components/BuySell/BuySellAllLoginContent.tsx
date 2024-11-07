import React, { useEffect, useState } from 'react';
import Email from '../../assets/arts/Email.svg';
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from '../../assets/arts/qrCode.svg';
import { Button, Form, Input, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import normaluser from '../../assets/arts/normal user 1.svg';
import hat from '../../assets/arts/hat2.png';
import bee from '../../assets/arts/bee color 1.svg';
import {
  loginAPI,
  decodeJWT,
  getUserDetails,
  baseURL,
} from '../../services/api';
import { InfoCircleFilled } from '@ant-design/icons';
import OpenNotification from '../OpenNotification/OpenNotification';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BuySellAllLoginContent: React.FC<Props> = ({ setScreenName }) => {
  const navigate = useNavigate();
  OpenNotification('success', 'Login Successful');
  const onFinish = async (values: any) => {
    setLoadings(true);

    let res = await loginAPI(values.email_or_username, values.password);
    console.log(res);
    if (res.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Login Successful');
      let resObj = await decodeJWT(res.data.access_token);

      localStorage.setItem('user', resObj?.email);
      const userKey = cryptr.encrypt(values.password);
      localStorage.setItem('userkey', userKey);
      localStorage.setItem('userpass', values.password);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('userType', resObj?.userType);
      localStorage.setItem('userlogged', 'normal');
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

  useEffect(() => {
    async function loginUser() {
      // Get the URL search parameters
      const urlSearchParams = new URLSearchParams(window.location.search);
      // Get the values of useremail and userkey
      const userEmail = urlSearchParams.get('useremail');
      const userKey = urlSearchParams.get('userkey');
      const userType = urlSearchParams.get('usertype');

      if (
        userEmail &&
        userKey &&
        userEmail !== undefined &&
        userType !== undefined
      ) {
        let userPassword = String(userKey);
        // You can now use userEmail and userKey as needed in your component
        let res = await loginAPI(userEmail, userPassword);

        if (res.status === 200) {
          setLoadings(false);
          OpenNotification('success', 'Login Successful');
          let resObj = await decodeJWT(res.data.access_token);
          localStorage.setItem('userpass', userPassword);
          localStorage.setItem('user', resObj?.email);
          const userKey = cryptr.encrypt(userPassword);
          localStorage.setItem('userkey', userKey);
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('userType', resObj?.userType);
          let redirectUrl = window.localStorage.getItem('redirect');
          window.localStorage.removeItem('redirect');
          let userDetails = await getUserDetails(resObj?.email);

          redirectUrl
            ? navigate(redirectUrl)
            : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
        } else {
          setLoadings(false);
          OpenNotification('error', res.data);
        }
      }
    }
    loginUser();
  }, []);

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [loadings, setLoadings] = useState<boolean>(false);
  // localStorage.setItem('userlogged', "normal");

  const onFinishFailed = (errorInfo: any) => {};

  const handleClick = () => {
    window.location.href = 'https://hive.indexx.ai/sign-up';
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ gap: 2, width: '85%' }}
    >
      <div className="d-flex flex-direction-column col-md-4 responsive_container flex-align-center">
        <h3 className="text-center margin-lr-auto">
          <img src={hat} alt="noramluser" />
        </h3>
        <h1 className="text-center margin-lr-auto font_30x">
          Login as Hive Captain
        </h1>
        <div className="text-center margin-lr-auto padding-tb-2x">
          Please make sure you are visiting the correct URL
        </div>
        <p className="w-fit-content py-1 p-2 index_link_info">
          <InfoCircleFilled className="pe-2" style={{ color: '#5F5F5F' }} />
          <span>{baseURL}</span>
        </p>
        <div className="bs_container bs_form card" style={{ minWidth: 'auto' }}>
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
                  <Input
                    placeholder="Email id or Username"
                    className="input_height"
                  />
                  <span className="email-icon">
                    <img src={Email} alt="emailIcon" />{' '}
                    {/* You might want to consider using a more generic icon now */}
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
            <Link
              to="forgot-password"
              className="default-link text-underline-forgot"
            >
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
              // to="https://hive.indexx.ai/sign-up"
              to=""
              style={{ color: '#ffb300' }}
              onClick={handleClick}
              className="hive_link"
            >
              Get Started
            </Link>
            <Divider></Divider>
            <br />
            <Link
              to=""
              className="default-link border-default text-center disabled w-100 d-inline-block"
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
              // to="https://hive.indexx.ai/sign-up"
              to=""
              className="text_link"
              onClick={handleClick}
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
            <Link
              // to="https://hive.indexx.ai/sign-up"
              to=""
              style={{ color: '#ffb300' }}
              onClick={handleClick}
            >
              <p style={{ color: '#ffb300', fontSize: 15 }}>
                {' '}
                Sign up for Hive Captain
              </p>
            </Link>
          </div>
          <br />
        </div>
      </div>
      <div className="d-flex flex-direction-column col-md-4 responsive_container flex-align-center">
        <h3 className="text-center margin-lr-auto">
          <img src={bee} alt="noramluser" style={{ width: '81px' }} />
        </h3>
        <h1
          className="text-center margin-lr-auto font_30x"
          style={{ marginTop: '-8px' }}
        >
          Login as Honey Bee
        </h1>
        <div className="text-center margin-lr-auto padding-tb-2x">
          Please make sure you are visiting the correct URL
        </div>
        <p className="w-fit-content py-1 p-2 index_link_info">
          <InfoCircleFilled className="pe-2" style={{ color: '#5F5F5F' }} />
          <span>{baseURL}</span>
        </p>
        <div className="bs_container bs_form card" style={{ minWidth: 'auto' }}>
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
                  <Input
                    placeholder="Email id or Username"
                    className="input_height"
                  />
                  <span className="input_icon">
                    <img src={Email} alt="emailIcon" />{' '}
                    {/* You might want to consider using a more generic icon now */}
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
            <Link
              to="forgot-password"
              className="default-link text-underline-forgot"
            >
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
              to="/indexx-exchange/buy-sell/get-started-honeybee"
              // style={{ color: '#11be6a' }}
              className="hive_link"
            >
              Get Started
            </Link>
            <Divider></Divider>
            <br />
            <Link
              to=""
              className="default-link border-default text-center disabled w-100 d-inline-block"
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
              to="/indexx-exchange/buy-sell/get-started-honeybee"
              className="hive_link"
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
            <Link
              to="/indexx-exchange/buy-sell/get-started-honeybee"
              className="hive_link"
            >
              <p style={{ fontSize: 15 }} className="hive_link">
                {' '}
                Sign up for Honey Bee
              </p>
            </Link>
          </div>
          <br />
        </div>
      </div>
      <div className="d-flex flex-direction-column col-md-4 responsive_container flex-align-center">
        <h3 className="text-center margin-lr-auto">
          <img src={normaluser} alt="noramluser" />
        </h3>
        <h1 className="text-center margin-lr-auto font_30x">
          Login as Indexx User
        </h1>
        <div className="text-center margin-lr-auto padding-tb-2x">
          Please make sure you are visiting the correct URL
        </div>
        <p className="w-fit-content py-1 p-2 index_link_info">
          <InfoCircleFilled className="pe-2" style={{ color: '#5F5F5F' }} />
          <span>{baseURL}</span>
        </p>
        <div className="bs_container bs_form card" style={{ minWidth: 'auto' }}>
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
                  <Input
                    placeholder="Email id or Username"
                    className="input_height"
                  />
                  <span className="input_icon">
                    <img src={Email} alt="emailIcon" />{' '}
                    {/* You might want to consider using a more generic icon now */}
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
              className="default-link border-default text-center disabled w-100 d-inline-block"
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
                // style={{ width: 270 }}
              >
                Get Started
              </Button>
            </Link>{' '}
            <br />
            <br />
            <Link
              to="/indexx-exchange/buy-sell/get-started"
              className="text_link"
            >
              <p style={{ color: 'var(--primary-color)', fontSize: 15 }}>
                {' '}
                Sign up to be an indexxer
              </p>
            </Link>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default BuySellAllLoginContent;
