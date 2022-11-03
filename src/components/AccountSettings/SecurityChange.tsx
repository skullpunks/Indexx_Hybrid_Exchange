import { InfoCircleFilled } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SecurityChange = () => {
  return (
    <div className="" style={{    marginTop: 142}}>
        <h1 className="text-center padding-b-2x">Change Password</h1>

       
 <div className="card margin-lr-auto bs_main padding-2x security_change">
 <div className="d-flex row">
        <div className="col-lg-1"><InfoCircleFilled className="text_link"/></div>
            <p className="col-lg-11 padding-0">To keep ypur account secure, withdrawals are not permitted for <b>24 hours</b> after changing your password.</p>
     </div>       
            <div className="security_form_element margin-t-2x ">
                
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{  message: 'Please input your password!' }]}>
                            <div className="control-input">
                                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                                <Input.Password />
                                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="password"
                            rules={[{  message: 'Please input your password!' }]}>
                            <div className="control-input">
                                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                                <Input.Password />
                                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="password"
                            rules={[{  message: 'Please input your password!' }]}>
                            <div className="control-input">
                                {/* <input type="password" name="password" id="password" autoComplete='off' onChange={() => handleChange} /> */}
                                <Input.Password />
                                {/* <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span> */}
                            </div>
                        </Form.Item>
                    </div>
            <Button type="primary" className="margin-t-auto font_!8x"><Link to="/indexx-exchange/account"> Confirm Changes</Link></Button>
        </div>
</div>

   
  )
}

export default SecurityChange;