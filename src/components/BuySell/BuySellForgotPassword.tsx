import { Button, Input, Form, notification } from 'antd';
import Email from '../../assets/arts/Email.svg';
import { forgotPassword } from '../../services/api';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import OpenNotification from '../OpenNotification/OpenNotification';

const BuySellForgotPassword = () => {
  const onFinish = (values: any) => {
    localStorage.setItem('tempEmail', values.email);
    forgotPassword(values.email).then((res) => {
      if (res.status === 200) {
        OpenNotification('success', 'Email sent for resetting the password');
      } else {
        OpenNotification(
          'error',
          'Failed to send reset password. User email not registered'
        );
      }
      //
    });
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div className="d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center">
      <h1 className="text-center top_heading">Forgot Password</h1>
      <div className="bs_container bs_form card card_s">
        <p className="text-center font_14x ">
          For security purposes, no withdrawals are permitted for 24 hours after
          modification of security methodssss.
        </p>

        <br />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <div className="form_element email position-relative">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter valid Email Id' },
              ]}
            >
              <div className="control-input">
                <Input placeholder="Enter Email id" className="input_height" />
                <span className="input_icon">
                  <img src={Email} alt="emailIcon" />
                </span>
              </div>
            </Form.Item>
          </div>
          <Button
            type="primary"
            className="atn-btn atn-btn-round margin-b-1x"
            htmlType="submit"
            block
          >
            {' '}
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BuySellForgotPassword;
