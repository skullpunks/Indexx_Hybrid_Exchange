import React from 'react';
import Email from "../../assets/arts/Email.svg";
import PasswordEye from "../../assets/arts/PasswordEye.svg";
import qrCode from "../../assets/arts/qrCode.svg";
import completedCheck from "../../assets/arts/completedCheck.svg";
import { Button } from 'antd';


interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellSuccess: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    return(
        <div className=''>

<a className='default-link border-default font_20x d-flex w-fit-content margin-lr-auto padding-b-2x margin-b-2x sms_verfication'><img src={completedCheck} alt="Success" className='padding-r-2x
'/><div style={{paddingLeft:"20px",
paddingTop: "5px"}}>Send SMS success.</div></a>
            <div className='d-flex flex-direction-column'>
                <h1 className='text-center margin-lr-auto'>Log In</h1>
                <div className='text-center margin-lr-auto padding-tb-2x'>Please make sure you are visiting the correct URL</div>
                <a className='default-link border-default w-fit-content margin-lr-auto padding-b-2x margin-b-2x'>http://accounts.indexx.ai</a>
                <div className="bs_container bs_form card">
                    <div className="form_element email position-relative">
                        <label>Email</label>
                        <div className="control-input"><input type="email" name="email" value="willie@sample.com"/>
                            <span className="input_icon"><img src={Email} alt="emailIcon" /></span></div>
                    </div>
                    <div className="form_element password position-relative padding-tb-2x">
                        <label>Password</label>
                        <div className="control-input"><input type="password" name="password" autoComplete='off'value="8777887" />
                            <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span>
                        </div>
                    </div>
                    <a className='default-link'  onClick={() => setScreenName("TwoFactorAuth")}>Forgot password</a>
                    <br />
                    <br />
                    <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" style={{ height: 55, borderColor: "#F66036", backgroundColor: "#F66036", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Log In</Button>
                    <br />

                    <div className=' padding-b-2x border-b-1x text-center'>Don’t have an account? <a className="text_link">Get Started</a></div>
                    <br />

                    <a className='default-link border-default text-center margin-t-1_5x '><img src={qrCode} alt='qr-code' /> Log In with QR code</a>
                </div>
            </div>


        </div>
    )
}

export default BuySellSuccess;

