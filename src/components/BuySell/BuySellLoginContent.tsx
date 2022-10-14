import React from 'react';
import Email from "../../assets/arts/Email.svg";
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from "../../assets/arts/qrCode.svg";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BuySellLoginContent: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        localStorage.setItem('user', values.email);
        navigate("/indexx-exchange/buy-sell");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className=''>

            <div className='d-flex flex-direction-column'>
                <h1 className='text-center margin-lr-auto'>Log In</h1>
                <div className='text-center margin-lr-auto padding-tb-2x'>Please make sure you are visiting the correct URL</div>
                <Link to="" className='default-link border-default w-fit-content margin-lr-auto padding-b-2x margin-b-2x'>http://inex.indexx.ai</Link>
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
                                    <Input placeholder='Email id' />
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
                        <Link to="" className='default-link text-underline' onClick={() => setScreenName("TwoFactorAuth")}>Forgot password</Link>
                        <br />
                        <br />

                        <Form.Item shouldUpdate>
                            <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" htmlType='submit' block>Log In</Button>
                        </Form.Item>
                    </Form>
                    <br />

                    <div className=' padding-b-2x border-b-1x text-center'>Don’t have an account? <Link to="/indexx-exchange/buy-sell/get-started" className="text_link">Get Started</Link></div>
                    <br />
                    <Link to="" className='default-link border-default text-center margin-t-1_5x ' onClick={() => setScreenName("LoginQR")}><img src={qrCode} alt='qr-code' /> Log In with QR code</Link>
                </div>
            </div>


        </div>


    )
}

export default BuySellLoginContent