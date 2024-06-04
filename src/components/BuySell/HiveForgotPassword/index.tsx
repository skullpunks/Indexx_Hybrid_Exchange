import React from 'react';
import { Button, Input, Form, notification } from 'antd';
import './style.css';
const HiveForgotPassword = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '200px',
        border: 'none',
      }}
    >
      {' '}
      <div className="d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center">
        <h1 className="text-center top_heading">Forgot Password</h1>
        <div className="bs_container bs_form card card_s">
          <p className="text-center font_14x ">
            For security purposes, no withdrawals are permitted for 24 hours
            after modification of security methods.
          </p>

          <br />
          <Form layout="vertical" autoComplete="off">
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
                  <Input
                    placeholder="Enter Email id"
                    className="input_height"
                  />
                  <span className="input_icon">
                    {/* <img src={Email} alt="emailIcon" /> */}
                  </span>
                </div>
              </Form.Item>
            </div>
            <Button
              type="primary"
              className="margin-b-1x btn-hover-class"
              htmlType="submit"
              block
            >
              {' '}
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HiveForgotPassword;
