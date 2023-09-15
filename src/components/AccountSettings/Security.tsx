import { Button } from 'antd';
import React from 'react';
import smsAuthenticator from "../../assets/arts/smsAuthenticator.svg";
import { Link, useNavigate } from 'react-router-dom';


const Security = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container border-1x security_container margin-t-3x margin-b-2x padding-0 ">
            <h1 className="font_25x padding-tb-1x padding-lr-2x border-b-1x">Security</h1>
            <div className="padding-2x border-b-1x">
                <h4>Login Password</h4>
                <h6 className="font_17x">To keep your account secure, withdrawls are not permitted for 24 hours after changing your password.</h6>
                <Button type="primary" className="w-auto font_15x btn-primary margin-t-3x border_radius_5x"><Link to="/indexx-exchange/change-password">Change Password</Link></Button>
            </div>

            <div className="row d-flex padding-2x">
                <div className="col-lg-8">
                    <h4 >2-Factor Authentication (2FA)</h4>
                    <p className="font_17x">
                        Increase your account security with 2-Factor Authentication (2FA). We
                        support authenticator apps like the Google Authenticator and SMS
                        authentication
                    </p>

                    <div className="border-1x padding-2x margin-l-1x row d-flex margin-t-3x authenticator_container">
                        <h6 className="font_18x col-lg-6">Google Athenticator</h6>
                        <div className="col-lg-6">
                            <div className="row d-flex flex-justify-between">
                                <Button className="w-auto height_28x col-lg-6 dis-btn">disabled</Button>
                                <Button type="primary" className="w-auto font_15x btn-primary  height_28x col-lg-6">enabled</Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-1x padding-2x margin-l-1x row d-flex margin-t-3x flex-align-center authenticator_container">
                        <h6 className="font_18x col-lg-6"><img src={smsAuthenticator} alt="smsAuthenticator" className="margin-r-1x" />SMS Athenticator</h6>
                        <div className="col-lg-6">
                            <div className="row d-flex flex-justify-between">

                                <Button type="primary" className="w-auto font_15x btn-primary  height_28x col-lg-6">enabled</Button>
                                <Button className="w-auto height_28x col-lg-6 dis-btn">disabled</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Security