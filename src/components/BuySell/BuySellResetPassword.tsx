import { Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import OpenNotification from '../OpenNotification/OpenNotification';
// import Email from "../../assets/arts/Email.svg";

const BuySellResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onFinish = async (values: any) => {
    
    const email = searchParams.get('email');
    
    await resetPassword(String(email), values.password).then((res) => {
      
      if (res.status === 200) {
        OpenNotification('success', 'Successfully reset password');
        navigate('/indexx-exchange/buy-sell/login');
      } else {
        OpenNotification('error', 'Failed to reset the password');
      }
    });
  };


  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <div className="d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center">
      <h1 className="text-center top_heading">Reset Password</h1>
      <div className="bs_container bs_form card card_s">
        <p className="text-center font_14x ">
          For security purposes, no withdrawals are permitted for 24 hours after
          modification of security methods.
        </p>

        <br />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message:
                  'Your password must be at least 6 characters long. Please try another.',
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
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
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

export default BuySellResetPassword;
