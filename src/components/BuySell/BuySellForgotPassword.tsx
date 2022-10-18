import { Button, Input, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import Email from "../../assets/arts/Email.svg";

const BuySellForgotPassword = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log(values);
        console.log(navigate("/indexx-exchange/buy-sell/login/reset-password"));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (<div className='d-flex flex-direction-column'>
        <h1 className='text-center'>Forgot Password</h1>
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