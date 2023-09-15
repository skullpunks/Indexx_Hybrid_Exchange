import React, { useState } from 'react';
import Email from '../../assets/arts/Email.svg';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Space,
  Image,
} from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { signupAPI, baseDEXURL } from '../../services/api';
import hands from '../../assets/hands.png';

const BuySellGetStarted: React.FC = () => {
  //creating IP state
  const [loadings, setLoadings] = useState<boolean>(false);

  const navigate = useNavigate();
  const [referral] = useSearchParams();


  console.log(navigate);
  const onFinish = async (values: any) => {
    setLoadings(true);
    localStorage.setItem('tempAuthEmail', values.email);
    const res = await signupAPI(values.email, values.password, values.username, values.referral);
    console.log(res);
    if (res.status === 200) {
      setLoadings(false);
      openNotificationWithIcon('success', 'Successfully registered');
      navigate('email-auth');
    } else {
      setLoadings(false);
      openNotificationWithIcon('error', res.data);
    }
  };

  const [form] = Form.useForm();



  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const referral = params.get('referral');
  //   console.log("referral::", referral); // Check if referral is present in the URL
    
  //   localStorage.removeItem('tempAuthReferral');

  //   if (referral) {
  //     localStorage.setItem('tempAuthReferral', referral); // Store referral in localStorage
  //     setTimeout(() => {
  //       form.setFieldsValue({ referral }); // Set referral value in the form
  //     }, 0);
  //   }
  // }, [form]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    let Icon =
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

  return (
    <div className="d-inline-flex flex-direction-column  flex-align-center responsive_container">
      <div className="row">
        <div className="col-5">
          <div
            className="text-center justify-center"
            style={{ paddingLeft: 50 }}
          >
            <h1 className="top_heading">Get Started</h1>
            <Link to="/indexx-exchange/buy-sell/login" className="text_link">
              LOG IN
            </Link>
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
              rules={[
                { required: false, message: 'Referral Id Required' },
              ]}
              initialValue={String(referral.get("referral")) || ''}
            >
              <div className="control-input">
                <Input
                  name="referral"
                  className="input_height"
                  readOnly={!!form.getFieldValue('referral')}
                  value={String(referral.get("referral")) || ''}
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

        <div className="col">
          <div style={{ marginBottom: '25%', paddingLeft: 100 }}>
            <p
              className="text-center"
              style={{ fontWeight: 400, fontSize: 41, marginTop: 85 }}
            >
              Get upto 30% reward in <br /> Trade to Earn
            </p>
            <Image
              className="text-center"
              preview={false}
              src={hands}
              style={{ paddingLeft: 130, paddingTop: 60 }}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySellGetStarted;
