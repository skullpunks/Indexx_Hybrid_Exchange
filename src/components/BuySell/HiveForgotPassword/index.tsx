import React from 'react';
import { Button, Input, Form, notification, Divider } from 'antd';
import { makeStyles } from '@mui/styles';
import './style.css';
import GenericButton from '../../updated/shared/Button';
import hiveLogo from '../../../assets/updated/hiveAuth/hive logo HD.png';
import InputField from '../../updated/shared/TextField';

const useStyles = makeStyles((theme: any) => ({
  forgetRoot: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
  },
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
  },
  socialButton: {
    background: 'none !important',
    border: `1px solid ${theme.palette.divider} !important`,
    margin: '10px 0px !important',
    color: `${theme.palette.text.primary} !important`,
  },
  loginText: {
    fontSize: '32px',
    fontWeight: 600,
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
  },
  logoText: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  createLink: {
    color: `${theme.palette.primary.main} !important`,
    background: `${theme.palette.background.default} !important`,
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
  loginButton: {
    background: '#FFB300 !important',
    '&:hover': {
      opacity: '.8',
    },
  },
}));

const HiveForgotPassword = () => {
  const classes = useStyles();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    notification.success({
      message: 'Email Sent',
      description: 'A password reset link has been sent to your email.',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Error',
      description: 'Please check the input fields.',
    });
  };

  return (
    <div className={classes.forgetRoot}>
      <div className={classes.Container}>
        <div className={classes.logoContainer}>
          <img src={hiveLogo} alt="" width={'40px'} />
          <h2 className={classes.logoText}>Hive</h2>
        </div>

        <h3 className={classes.loginText}>Forgot Password</h3>
        <p>
          For security purposes, no withdrawals are permitted for 24 hours after
          modification of security methods.
        </p>
        <div style={{ margin: '15px auto' }}>
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid Email Id' },
              ]}
            >
              <div className="control-input">
                <InputField
                  placeholder="Enter Email id"
                  className={undefined}
                  type={undefined}
                  label={undefined}
                  defaultValue={undefined}
                  id={undefined}
                  startAdornment={undefined}
                  endAdornment={undefined}
                  style={{ margin: '10px 0px' }}
                  helperText={undefined}
                  error={undefined}
                  secondaryLabel={undefined}
                  rows={undefined}
                  yellowBorders={true}
                />
              </div>
            </Form.Item>
            <GenericButton
              text={'Submit'}
              IconComponent={undefined}
              onClick={undefined}
              styles={undefined}
              disabled={undefined}
              loading={undefined}
              className={classes.loginButton}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HiveForgotPassword;
