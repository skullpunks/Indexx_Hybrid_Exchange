import React, { useState } from 'react';
import Email from '../../assets/arts/Email.svg';
import './BuySellLoginContentHive.css';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Image,
} from 'antd';

import { signupAPI, baseDEXURL } from '../../services/api';
import hands from '../../assets/arts/honeybee_signup.svg';
import OpenNotification from '../OpenNotification/OpenNotification';

const BuySellGetStartedHoneyBee: React.FC = () => {
  //creating IP state
  const [loadings, setLoadings] = useState<boolean>(false);

  const navigate = useNavigate();
  const [referral] = useSearchParams();
  const refcode = String(referral.get("referral"))

  console.log(refcode === "null");



  const onFinish = async (values: any) => {
    try {
      setLoadings(true);
      localStorage.setItem('tempAuthEmail', values.email);
      localStorage.setItem('userlogged', "honeyb");
      let referralCode = refcode === "null" || refcode === "" || refcode === "undefined" || refcode === undefined ? "" : refcode
      console.log(values.email, values.password, values.username, referralCode)
      const url = new URL(window.location.href); // Adjust this if you are not in a browser environment
      const gcode = String(url.searchParams.get('gcode'));
      const res = await signupAPI(values.email, values.password, values.username, referralCode, gcode);

      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', 'Successfully registered');
        window.dispatchEvent( new Event('storage') ) 
        navigate('email-auth');
      } else {
        setLoadings(false);
        OpenNotification('error', res.data);
      }
    }
    catch (err) {
      setLoadings(false);
      OpenNotification('error', "Something went wrong. Please try again later.");
    }
  };

  const [form] = Form.useForm();



  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const referral = params.get('referral');
  //   

  //   localStorage.removeItem('tempAuthReferral');

  //   if (referral) {
  //     localStorage.setItem('tempAuthReferral', referral); // Store referral in localStorage
  //     setTimeout(() => {
  //       form.setFieldsValue({ referral }); // Set referral value in the form
  //     }, 0);
  //   }
  // }, [form]);

  const onFinishFailed = (errorInfo: any) => {

  };

  return (
    <div className="d-inline-flex flex-direction-column  flex-align-center responsive_container">
      <div className="row">
        <div className="col d-flex flex-direction-column text-center justify-center flex-align-center">
          <div
            className="text-center justify-center"
            // style={{ paddingLeft: 28 }}
          >
            <h3 className='mb-0'>Get Started as</h3>
            <h1 className="top_heading mb-2">HoneyBee</h1>
            {/* <Link to="/indexx-exchange/buy-sell/login-honeybee" className="hive_link">
              LOG IN
            </Link> */}
          </div>

          <div className="bs_container bs_form card text-center justify-center">
            <div className="d-flex justify-center"></div>
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              autoComplete="off"
              initialValues={{
                referral: localStorage.getItem('tempAuthReferral') || '', // Set initial value for referral
              }}
            >


              <div className="form_element email position-relative">
                {/* <label>Email</label> */}
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <div className="control-input">
                    <Input
                      placeholder="Enter username"
                      className="input_height"
                    />
                  </div>
                </Form.Item>
              </div>
              <div className="form_element email position-relative">
                {/* <label>Email</label> */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Please enter valid Email Id' },
                  ]}
                >
                  <div className="control-input">
                    <Input
                      placeholder="Enter Email id"
                      className="input_height"
                    />
                    <span className="input_icon">
                      <img src={Email} alt="emailIcon" />
                    </span>
                  </div>
                </Form.Item>
              </div>

              <div className="form_element password position-relative">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    {
                      min: 6,
                      message: 'Password must be minimum 6 characters.',
                    },
                    {
                      max: 15,
                      message: 'Password must be maximum 15 characters.',
                    },
                  ]}
                >
                  <div className="control-input">
                    {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                    <Input.Password />
                    {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                  </div>
                </Form.Item>
              </div>
              <div className="form_element referral">
                <Form.Item
                  label="Referral Code"
                  name="referral"
                  rules={[
                    { required: true, message: 'Referral Code Required' },
                  ]}
                  initialValue={(refcode === "null" || refcode === "undefiend") ? "" : refcode}
                >
                  <div className="control-input">
                    <Input
                      name="referral"
                      className="input_height"
                      placeholder="Enter Referal Code"
                      readOnly={refcode !== "null"}
                      defaultValue={(refcode === "null" || refcode === "undefiend") ? "" : refcode}
                    />
                  </div>
                </Form.Item>

              </div>
              <div className="form_element d-flex terms_conditions_container">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error('Should accept terms and policy')
                          ),
                    },
                  ]}
                >
                  <Checkbox>
                    <span className="terms_conditions">
                      I am over 18 years old and I have read, understand and
                      agree to the
                      <Link to="" className="hive_link">
                        {' '}
                        indexx.ai Terms of Use, Privacy Policy,{' '}
                      </Link>
                      and{' '}
                      <Link to="" className="hive_link">
                        {' '}
                        Biometric Data Policy.
                      </Link>{' '}
                    </span>
                  </Checkbox>
                </Form.Item>
              </div>
              <Form.Item shouldUpdate>
                <Button
                  type="primary"
                  style={{ marginTop: -50 }}
                  className="atn-btn atn-btn-round hive-btn"
                  htmlType="submit"
                  block
                  loading={loadings}
                >
                  {' '}
                  Create Account
                </Button>
              </Form.Item>
            </Form>
            <div
              style={{ marginTop: -30 }}
              className="d-flex justify-center padding-tb-2x"
            >
              Already have an account? &nbsp;
              <Link to="/indexx-exchange/buy-sell/login-honeybee" className="hive_link">
                {' '}
                Log in.
              </Link>
            </div>

            {/* <Space direction="vertical" style={{ width: '100%' }}>
              <p>
                {' '}
                As per our Terms and Use, we’re unable to provide services to
                the US residents. Instead, please register on our partner
                platform dedicated to the US residents{' '}
                <a className="text-link" href={baseDEXURL} rel="noreferrer">
                  (dex.indexx.ai)
                </a>
                .
              </p>
            </Space> */}
          </div>
        </div>

        <div className="col log-img">
          <div style={{ marginBottom: -100, paddingLeft: 100 }}>
            <br />  <br />  <br />
            <Image
              className="text-center"
              preview={false}
              src={hands}
              style={{ paddingLeft: 0, paddingTop: 70 }}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySellGetStartedHoneyBee;
