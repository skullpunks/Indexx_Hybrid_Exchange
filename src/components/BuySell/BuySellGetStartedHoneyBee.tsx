import React, { useEffect, useState } from 'react';
import Email from '../../assets/arts/Email.svg';
import './BuySellLoginContentHive.css';

import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Image,
  Select
} from 'antd';
import frame from '../../assets/hive-dashboard/frame.svg';
import avatar from '../../assets/hive-dashboard/Captain+Avatar.png';
import { signupAPI, baseDEXURL, baseHiveURL, getHiveUsersLite } from '../../services/api';
// import hands from '../../assets/arts/honeybee_signup.svg';
import hands from '../../assets/arts/hand 5 edited 3.svg';
import hive from '../../assets/arts/hive logo 2.svg';
import OpenNotification from '../OpenNotification/OpenNotification';
import { Box, Tooltip, Typography, tooltipClasses, useMediaQuery } from '@mui/material';
import loadingGif from '../../assets/beeloade.gif';

import { makeStyles, styled } from '@mui/styles';
const { Option } = Select;

const BuySellGetStartedHoneyBee: React.FC = () => {
  //creating IP state
  const [loadings, setLoadings] = useState<boolean>(false);
  const [usersLite, setUsersLite] = useState([]);
  const navigate = useNavigate();
  const [referral] = useSearchParams();
  const refcode = String(referral.get("referral"))
  const urlReferralCode = referral.get("referral");


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultParam1 = searchParams.get('referral') || "";
  const [defaultValues, setDefaultValues] = useState<string>(defaultParam1);
  const [selectedReferralCode, setSelectedReferralCode] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [initialLoadings, setinitialLoadings] = useState(false);

  const handleSelectChange = (value: string) => {
    // Handle the select change here
    setDefaultValues(value);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200, // Adjust the width as needed
    },
    select: {
      fontSize: 16, // Adjust the font size as needed
      height: 40,   // Adjust the height as needed
    },
    customTooltip: {

      backgroundColor: 'red', // Change this to your desired background color
      color: 'white', // Change this to the text color you prefer
    },
  }));

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#FFB300",
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }));

  // Use useEffect to read the query parameters and set the default values
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const defaultParam1 = searchParams.get('referral') || "";
  //   console.log(defaultParam1, "param");

  //   setDefaultValues(defaultParam1);
  // }, [location.search]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await getAllUsersLite();
  //     if (res && res.data) {
  //       // Filter out users without a referral code and map to required format
  //       const usersWithReferral = res.data.filter((user: any) => user.referralCode).map((user: any) => {
  //         return {
  //           actualEmail: user.email,
  //           email: user.email.split('@')[0], // Assuming email is always valid and contains '@'
  //           referralCode: user.referralCode,
  //           profilePic: user?.profilePic ? user?.profilePic : avatar
  //         };
  //       });
  //       setUsersLite(usersWithReferral);
  //       const initialReferralCode = defaultParam1 || usersWithReferral?.find((user: any) => user?.actualEmail === 'bz@azooca.com')?.referralCode || '';
  //       console.log(initialReferralCode)
  //       setSelectedReferralCode(initialReferralCode);
  //     }
  //   };
  //   fetchUsers();
  // }, [defaultParam1]);

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    setinitialLoadings(true);
    const fetchUsers = async () => {
      const res = await getHiveUsersLite();
      if (res && res.data) {
        // Process users and get referral codes
        const usersWithReferral = res.data.filter((user: any) => user.referralCode).map((user: any) => {
          return {
            actualEmail: user.email,
            email: user.email.split('@')[0],
            referralCode: user.referralCode,
            profilePic: user?.profilePic ? user?.profilePic : avatar,
            accname: user?.accname,
            username: user?.Username
          };
        });
        setUsersLite(usersWithReferral);

        // Determine initial referral code
        let initialReferralCode = usersWithReferral.find((user: any) => user?.actualEmail === 'bz@azooca.com')?.referralCode || '';
        if (urlReferralCode && usersWithReferral.some((user: any) => user.referralCode === urlReferralCode)) {
          initialReferralCode = urlReferralCode;
        }
        setSelectedReferralCode(initialReferralCode);
        setIsDataFetched(true);
        setinitialLoadings(false);

      }
    };
    fetchUsers();
  }, [urlReferralCode]);

  const onFinish = async (values: any) => {
    try {
      setLoadings(true);
      localStorage.setItem('tempAuthEmail', values.email);
      localStorage.setItem('userlogged', "honeyb");
      //let referralCode = refcode === "null" || refcode === "" || refcode === "undefined" || refcode === undefined ? "" : refcode
      console.log(values.email, values.password, values.username, selectedReferralCode)
      const url = new URL(window.location.href); // Adjust this if you are not in a browser environment
      const gcode = String(url.searchParams.get('gcode'));
      const res = await signupAPI(values.email, values.password, values.username, selectedReferralCode, gcode);

      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', 'Successfully registered');
        window.dispatchEvent(new Event('storage'))
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

  // const classes = useStyles();


  return (
    <>
      {initialLoadings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: "blur(8px)",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            Please wait while get started is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}
      <div className="d-inline-flex flex-direction-column  flex-align-center responsive_container">
        <div className="row" style={{ gap: "150px" }}>
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

            <div className="bs_container bs_form card text-center justify-center" style={{maxWidth: `${isMobile ? "440px" : "650px"}`}}>
              <div className="d-flex justify-center"></div>
              {isDataFetched && (
                <Form
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  autoComplete="off"
                  initialValues={{
                    //referral: localStorage.getItem('tempAuthReferral') || '', // Set initial value for referral
                    referralCode: selectedReferralCode
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
                  <div>
                    <Form.Item label="Referral Code" name="referralCode"
                      rules={[
                        { required: true, message: 'Referral Id Required' },
                      ]}
                    >

                      <Select onChange={handleSelectChange} placeholder="Select an item">
                        {usersLite.map((user: any) => {
                          const accname = user?.accname;
                          const avatar = user?.profilePic;

                          return (
                            <Option key={user.referralCode} value={user.referralCode}>
                              <LightTooltip title={<a href={`${baseHiveURL}/captainbee/${user.username}`} target='_blank' style={{ textTransform: "none", color: "var(--main_body)", fontSize: 15 }}>Click to view {accname}</a>} placement='right'>
                                <Box sx={{ display: "flex", flexDirection: "row", alignSelf: "center", minWidth: "100%" }}>
                                  <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundImage: `url(${frame})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center", position: "relative", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", }}>
                                    {avatar ?
                                      <Box className="drop-hexagon">
                                        <img alt='' src={avatar} width={"30px"} height={"31px"} />
                                      </Box>
                                      : null}
                                  </Box>
                                  <Box alignSelf={"center"} ml={2}>
                                    <Typography variant="subtitle2" fontSize={"15px"} fontWeight={400} textAlign={"center"}>{accname}</Typography>
                                  </Box>
                                  <Box alignSelf={"center"} ml={"auto"}>
                                    <Typography variant="subtitle2" fontSize={"15px"} fontWeight={400} textAlign={"center"}>Referral Code: {user.referralCode}</Typography>
                                  </Box>
                                </Box>
                              </LightTooltip>
                            </Option>
                          );
                        })}
                      </Select>

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
              )}

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
                  (test.dex.indexx.ai)
                </a>
                .
              </p>
            </Space> */}
            </div>
          </div>

          <div className="col log-img" style={{ width: "400px" }}>
            <div style={{ marginBottom: -100 }}>
              <br />  <br />  <br />
              <div className='d-flex flex-direction-column justify-content-center align-items-center'>
                <Image
                  className="text-center mb-5"
                  preview={false}
                  src={hands}
                  style={{ paddingLeft: 0, paddingTop: 110, width: "initial" }}
                ></Image>
                <div style={{ fontSize: "40px", textAlign: "center" }}>
                  New to crypto?
                </div>
                <a href={baseHiveURL} target='blank' className='blk_yl_link'>
                  <div style={{ fontSize: "20px", textAlign: "center" }}>

                    Take help from a
                    <br />
                    Captain Bee now!
                  </div>

                  <Image
                    className="text-center mt-5 hive-img"
                    preview={false}
                    src={hive}
                    style={{ width: "initial" }}
                  ></Image>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySellGetStartedHoneyBee;
