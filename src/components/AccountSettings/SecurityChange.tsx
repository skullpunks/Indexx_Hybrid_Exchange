import { InfoCircleFilled } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeJWT, changePassword, getCaptainBeeByEmail, loginWithToken } from '../../services/api';
import OpenNotification from '../OpenNotification/OpenNotification';

const SecurityChange = () => {
  const [loadings, setLoadings] = useState<boolean>(false);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');
    if (defaultSignInToken && !redirectFlag) {
      checkLogin(defaultSignInToken);
    }
  }, []);

  const checkLogin = async (signInToken: string) => {
    try {
      const res = await loginWithToken(signInToken);
      if (res.status === 200) {
        const resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true');

        if (resObj?.userType === 'CaptainBee') {
          const resObj2 = await getCaptainBeeByEmail(String(resObj?.email));
          const username = resObj2?.data.Username;
          localStorage.setItem('username', username);
        }
        window.location.reload();
      } else {
        console.error('Login failed:', res.data);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  const onFinish = async (values: any) => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = decodeJWT(access_token);
    await changePassword(
      String(decoded.email),
      values.newpassword,
      values.oldpassword
    ).then((res) => {
      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', res.data);
        navigate('/indexx-exchange/account');
      } else {
        setLoadings(false);
        OpenNotification('error', res.data);
      }
    });
  };


  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <div className="" style={{ marginTop: 142 }}>
      <h1 className="text-center padding-b-2x">Change Password</h1>

      <div className="card margin-lr-auto bs_main padding-2x security_change">
        <div className="d-flex row">
          <div className="col-lg-1">
            <InfoCircleFilled className="text_link" />
          </div>
          <p className="col-lg-11 padding-0">
            To keep your account secure, withdrawals are not permitted for{' '}
            <b>24 hours</b> after changing your password.
          </p>
        </div>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <div className="security_form_element margin-t-2x ">
            <Form.Item
              label="Old Password"
              name="oldpassword"
              rules={[{ message: 'Please input your password!' }]}
            >
              <div className="control-input">
                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                <Input.Password />
                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
              </div>
            </Form.Item>
            <Form.Item
              name="newpassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldpassword') !== value) {
                      setError(false);
                      return Promise.resolve();
                    }
                    setError(true);
                    return Promise.reject(
                      new Error(
                        'Old password and new passowrd should be be different!'
                      )
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmpassword"
              label="Confirm Password"
              dependencies={['newpassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newpassword') === value) {
                      setError(false);
                      return Promise.resolve();
                    }
                    setError(true);
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
          </div>
          {/* <Button type="primary" className="margin-t-auto font_!8x"><Link to="/indexx-exchange/account"> Confirm Changes</Link></Button> */}
          {/* <Button type="primary" className="margin-t-auto font_!8x"><Link to="/indexx-exchange/account"> Confirm Changes</Link></Button>
                    <Button type="primary" className="margin-t-auto font_!8x"><Link to="/indexx-exchange/account"> Confirm Changes</Link></Button> */}
          <Button
            type="primary"
            className={
              isError ? 'disable_icon' : 'atn-btn atn-btn-round margin-b-1x'
            }
            loading={loadings}
            htmlType="submit"
            block
          >
            {' '}
            Confirm Changes
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SecurityChange;
