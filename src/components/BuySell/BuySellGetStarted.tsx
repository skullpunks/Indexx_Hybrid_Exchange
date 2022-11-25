import React, { useState, useEffect } from 'react';
import Email from "../../assets/arts/Email.svg";
import lockedimage from "../../assets/arts/locked.png"
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
// import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Modal, notification ,Image} from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { signupAPI, geolocationData } from '../../services/api';

const BuySellGetStarted: React.FC = () => {
    //creating IP state
    const [ip, setIP] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(true);

    const handleTransferOk = () => {
        localStorage.setItem('userIp', ip);
        setIsTransferModalVisible(false);
    };

    const handleTransferCancel = () => {
        setIsTransferModalVisible(false);
    };

    const handleOk = () => {
        // setLoading(true);
    };

    const [loadings, setLoadings] = useState<boolean>(false);

    useEffect(() => {
        geolocationData().then((res: any) => {
       // axios.get('https://geolocation-db.com/json/').then((res: any) => {
            console.log(res.data);
            setIP(res.data.IPv4);
            setCountry(res.data.country_name);
            setCountryCode(res.data.country_code);
            if (res.data.country_code === 'US') {
                setIsTransferModalVisible(true);
            }
        })
    }, []);
    const navigate = useNavigate();
    console.log(navigate)
    const onFinish = async (values: any) => {
        setLoadings(true);
        localStorage.setItem("tempAuthEmail", values.email);
        const res = await signupAPI(values.email, values.password, values.referral);
        console.log(res)
        if (res.status === 200) {
            setLoadings(false);
            openNotificationWithIcon('success', 'Successfully registered');
            navigate("email-auth");
        } else {
            setLoadings(false);
            openNotificationWithIcon('error', res.data);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType, message: string) => {
        let Icon = (type === "error") ? <CloseCircleFilled /> : <CheckCircleFilled className='text_link' />;
        notification[type]({
            message: message,
            description: '',
            icon: Icon,
            style: {
                border: "1px solid #F66036",
                boxShadow: "none",
                borderRadius: 5,
                top: 100
            },

        });
    };

    return (
        <div className='d-flex flex-direction-column col-lg-5 col-md-12 flex-align-center responsive_container'>
            <h1 className='text-center margin-lr-auto top_heading' style={{marginTop:-15}}>Get Started</h1>
            <div style={{marginTop:-4}} className="bs_container bs_form card" >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    autoComplete="off">
                    <div className="form_element email position-relative">
                        {/* <label>Email</label> */}
                        <Form.Item label="Email" name="email"
                            rules={[{ required: true, message: "Please input your Email!" }, { type: "email", message: "Please enter valid Email Id" }]}
                        >
                            <div className="control-input">
                                <Input placeholder='Enter Email id' className='input_height' />
                                <span className="input_icon"><img src={Email} alt="emailIcon" /></span></div>
                        </Form.Item>
                    </div>
                    <div className="form_element password position-relative">
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be minimum 6 characters.' }]}>
                            <div className="control-input">
                                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                                <Input.Password />
                                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                            </div>
                        </Form.Item>
                    </div>
                    <div className="form_element referral">
                        <Form.Item label="Referral Code (Optional)" name="referral"
                            rules={[{ required: false, message: "Referral  Id Required" }]}
                        >
                            <div className="control-input">
                                <Input name='' className='input_height' />
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
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept terms and policy')),
                                },
                            ]}

                        >
                            <Checkbox>
                                <span className="terms_conditions">I am over 18 years old and I have read, understand and agree to the<Link to="" className="text_link"> indexx.ai Terms of Use, Privacy Policy, </Link>and <Link to="" className="text_link"> Biometric Data Policy.</Link> </span>
                            </Checkbox>
                        </Form.Item>
                    </div>
                    <Form.Item shouldUpdate>
                        <Button type="primary" style={{marginTop:-50}} className="atn-btn atn-btn-round " htmlType='submit' block
                            loading={loadings}
                        > Create Account</Button>
                    </Form.Item>
                </Form>
                <div style={{marginTop:-30}} className="d-flex justify-center padding-tb-2x" >Already have an account? &nbsp;
                    <Link to="/indexx-exchange/buy-sell/login" className="text_link"> Log in.</Link>
                </div>
            </div>
            {(country === "United States" || countryCode === "US") &&
                <Modal centered={true}  visible={isTransferModalVisible} onOk={handleTransferOk} onCancel={handleTransferCancel} width={670} maskClosable={false} 
                    footer={[

                        <Button
                            size='large'
                            href="https://dex.indexx.ai"
                            style={{marginBottom:20,width:"100%"}}
                            type="primary"
                            onClick={handleOk}>
                            
                            Go To Decentralized
                        </Button>,

                        <Button
                            className="center"
                            type="link"
                            onClick={handleTransferCancel}>
                            Cancel
                        </Button>,

                    ]}>
                         
                    <div className="align-center text-center">
                        <Image preview={false} src={lockedimage}></Image>
                        <p className="text-center" style={{fontSize:30,fontWeight:400,}}>Service Notice</p>
                        <p>Your IP address indicates that you’re attempting to access our services from the USA. As per our Terms and Use, we’re unable to provide services to users from the region. Instead, please register on our partner platform dedicated to American customers. </p>
                    </div>
                </Modal>
            }
        </div>

    )
}

export default BuySellGetStarted;