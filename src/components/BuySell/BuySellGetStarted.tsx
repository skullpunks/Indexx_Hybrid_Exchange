import React, { useState } from 'react';
import Email from '../../assets/arts/Email.svg';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Image,
} from 'antd';

import { signupAPI, baseDEXURL, baseHiveURL } from '../../services/api';
// import normal_login from '../../assets/arts/normal_login.svg';
import hands from '../../assets/arts/hand 5 edited 3.svg';
import hive from '../../assets/arts/hive logo 2.svg';
import OpenNotification from '../OpenNotification/OpenNotification';

const BuySellGetStarted: React.FC = () => {
  //creating IP state
  const [loadings, setLoadings] = useState<boolean>(false);

  const navigate = useNavigate();
  const [referral] = useSearchParams();
  const refcode = String(referral.get("referral")) 
  
console.log(refcode === "null");


  
  const onFinish = async (values: any) => {
    setLoadings(true);
    localStorage.setItem('tempAuthEmail', values.email);
    localStorage.setItem('userlogged', "normal");
    const res = await signupAPI(values.email, values.password, values.username, values.referral);
    
    if (res.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Successfully registered');
      window.dispatchEvent( new Event('storage') ) 
      navigate('email-auth');
    } else {
      setLoadings(false);
      OpenNotification('error', res.data);
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
      <div className="row" style={{gap:"200px"}}>
        <div className="col">
          <div
            className="text-center justify-center"
            // style={{ paddingLeft: 26 }}
          >
            <h3 className='mb-0'>Get Started for</h3>
            <h1 className="top_heading mb-2">Indexx Exchange</h1>
            {/* <Link to="/indexx-exchange/buy-sell/login" className="text_link">
              LOG IN
            </Link> */}
          </div>

          <div className="bs_container bs_form card">
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
              label="Referral Code (Optional)"
              name="referral"
              // rules={[
              //   { required: false, message: 'Referral Id Required' },
              // ]}
              initialValue={(refcode === "null" || refcode === "undefiend") ? "" : refcode }
            >
              <div className="control-input">
                <Input
                  name="referral"
                  className="input_height"
                  placeholder="Enter Referal Code"
                  readOnly={refcode !== "null"}
                  defaultValue={(refcode === "null" || refcode === "undefiend") ? "" : refcode }
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
                      <Link to="" className="text_link">
                        {' '}
                        indexx.ai Terms of Use, Privacy Policy,{' '}
                      </Link>
                      and{' '}
                      <Link to="" className="text_link">
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
                  className="atn-btn atn-btn-round "
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
              <Link to="/indexx-exchange/buy-sell/login" className="text_link">
                {' '}
                Log in.
              </Link>
            </div>

            <Space direction="vertical" style={{ width: '100%' }}>
              <p>
                {' '}
                As per our Terms and Use, we’re unable to provide services to
                the US residents. Instead, please register on our partner
                platform dedicated to the US residents{' '}
                <a className="text-link" href={baseDEXURL} rel="noreferrer">
                  (test.dex.indexx.ai)
                </a>
                .
              </p>
            </Space>
          </div>
        </div>

        <div className="col log-img" style={{width:"400px"}}>
          <div style={{  marginBottom:-100 }}>
                    <br/>  <br/>  <br/>
            <div className='d-flex flex-direction-column justify-content-center align-items-center'>
            <Image
              className="text-center mb-5"
              preview={false}
              src={hands}
              style={{ paddingLeft: 0, paddingTop: 110, width:"initial" }}
            ></Image>
            <div style={{fontSize:"32px", textAlign:"center"}}>
            New to crypto?
            <br />
            Take help from a 
            <br />
            Captain Bee now!
            </div>
            <a href={baseHiveURL} target='blank'>

            <Image
              className="text-center mt-5 hive-img"
              preview={false}
              src={hive}
              style={{  width:"initial" }}
              ></Image>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySellGetStarted;
