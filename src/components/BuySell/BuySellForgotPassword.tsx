import { Button, Input, Form, notification } from 'antd'
import Email from "../../assets/arts/Email.svg";
import { forgotPassword } from '../../services/api';
import { CheckCircleFilled } from '@ant-design/icons';

const BuySellForgotPassword = () => {
    const onFinish = (values: any) => {
        console.log(values);
        localStorage.setItem('tempEmail', values.email);
        forgotPassword(values.email).then((res) => {
            console.log(res);
            if (res.status === 200) {
                openNotificationWithIcon('success');
            } else {
                openNotificationWithIcon2('error');
            }
            //console.log(navigate("/indexx-exchange/buy-sell/login/email-auth"));
        });
    };

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
            message: 'Email sent for resetting the password',
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

    const openNotificationWithIcon2 = (type: NotificationType) => {
        notification[type]({
            message: 'Failed to send reset password. User email not registered',
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
    return (<div className='d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center'>
        <h1 className='text-center top_heading'>Forgot Password</h1>
        <div className="bs_container bs_form card card_s">


            <p className="text-center font_14x ">
                For security purposes, no withdrawals are permitted for 24 hours after modification of security methods.

            </p>

            <br />
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                autoComplete="off">
                <div className="form_element email position-relative">
                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, message: "Please input your Email!" }, { type: "email", message: "Please enter valid Email Id" }]}
                    >
                        <div className="control-input">
                            <Input placeholder='Enter Email id' className='input_height' />
                            <span className="input_icon"><img src={Email} alt="emailIcon" /></span></div>
                    </Form.Item>
                </div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" htmlType='submit' block

                > Submit</Button>
            </Form>
        </div>
    </div >
    )
}

export default BuySellForgotPassword