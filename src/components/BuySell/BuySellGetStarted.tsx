import React from 'react';
import Email from "../../assets/arts/Email.svg";
// import PasswordEye from "../../assets/arts/PasswordEye.svg";
// import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';


const BuySellGetStarted: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log(values);
        // console.log(navigate("/indexx-exchange/buy-sell"));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto'>Get Started</h1>
            <div className="bs_container bs_form card" >
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
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <div className="control-input">
                                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                                <Input.Password />
                                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                            </div>
                        </Form.Item>
                    </div>
                    <div className="form_element referral">
                        <Form.Item label="Referral Code (Optional)" name="Referral"
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
                        <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" htmlType='submit' block

                        > Create Account</Button>
                    </Form.Item>
                </Form>
                <div className="d-flex justify-center padding-tb-2x" >Already have an account? &nbsp;
                    <Link to="/indexx-exchange/buy-sell/login" className="text_link"> Log in.</Link>
                </div>
            </div>
        </div>

    )
}

export default BuySellGetStarted;