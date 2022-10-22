import React from 'react';
import Email from "../../assets/arts/Email.svg";
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from "../../assets/arts/qrCode.svg";
import { Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, decodeJWT } from '../../services/api'
import { CheckCircleFilled } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BuySellLoginContent: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log('Success:', values);
        let res = await loginAPI(values.email, values.password);
        console.log(res.status);
        console.log(res.data);
        if (res.status === 200) {
            openNotificationWithIcon('success', 'Login Successful');
            localStorage.setItem('user', values.email);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            let resObj = await decodeJWT(res.data.access_token);
            console.log(resObj);
            let redirectUrl = window.localStorage.getItem("redirect");
            window.localStorage.removeItem("redirect");

            (redirectUrl) ?
                navigate(redirectUrl)
                :
                navigate("/indexx-exchange/buy-sell")

        } else {
            console.log(res.data);
            openNotificationWithIcon('error', res.data);
        }
    };

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType, message: string) => {
        notification[type]({
            message: message,
            description: '',
            icon: <CheckCircleFilled className='text_link' />,
            style: {
                border: "1px solid #F66036",
                boxShadow: "none",
                borderRadius: 5,
                top: 100
            },

        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className=''>

            <div className='d-flex flex-direction-column'>
                <h1 className='text-center margin-lr-auto top_heading'>Log In</h1>
                <div className='text-center margin-lr-auto padding-tb-2x'>Please make sure you are visiting the correct URL</div>
                <Link to="" className='default-link border-default w-fit-content margin-lr-auto padding-b-2x margin-b-2x'>https://indexx.ai</Link>
                <div className="bs_container bs_form card">
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        autoComplete="off">

                        <div className="form_element email position-relative">
                            <Form.Item label="Email" name="email"
                                rules={[{ required: true, message: "Email Id Required" }, { type: "email", message: "Please Enter Valid Email Id" }]}
                            >
                                <div className="control-input">
                                    <Input placeholder='Email id' className='input_height' />
                                    <span className="input_icon"><img src={Email} alt="emailIcon" /></span>
                                </div>
                            </Form.Item>

                        </div>
                        <div className=" password ">
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <div className=""><Input.Password />
                                </div>
                            </Form.Item>

                        </div>
                        {/* setScreenName("TwoFactorAuth") */}
                        <Link to="forgot-password" className='default-link text-underline'>Forgot password</Link>
                        <br />
                        <br />

                        <Form.Item shouldUpdate>
                            <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" htmlType='submit' block>Log In</Button>
                        </Form.Item>
                    </Form>
                    <br />

                    <div className=' padding-b-2x border-b-1x text-center'>Don’t have an account? <Link to="/indexx-exchange/buy-sell/get-started" className="text_link">Get Started</Link></div>
                    <br />
                    <Link to="" className='default-link border-default text-center margin-t-1_5x disabled' style={{ cursor: "not-allowed", pointerEvents: "none", opacity: "0.6" }} ><img src={qrCode} alt='qr-code' /> Log In with QR code (coming soon)</Link>
                </div>
            </div>


        </div>


    )
}

export default BuySellLoginContent