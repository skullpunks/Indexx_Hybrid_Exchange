import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Input, Form, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
// import Email from "../../assets/arts/Email.svg";

const BuySellResetPassword = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log(values);
        openNotificationWithIcon('success');
        setTimeout(() => {
            console.log(navigate("/indexx-exchange/buy-sell/login"));
        }, 1000);
    };

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
            message: 'Successfully reset password',
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
    return (<div className='d-flex flex-direction-column'>
        <h1 className='text-center top_heading'>Reset Password</h1>
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
                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" htmlType='submit' block

                > Submit</Button>
            </Form>
        </div>
    </div >
    )
}

export default BuySellResetPassword