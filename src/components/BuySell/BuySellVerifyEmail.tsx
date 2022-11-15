

import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import envelop from "../../assets/arts/envelop.svg";
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

import Timer from "../../utils/Timer";


const BuySellVerifyEmail = () => {
    const navigate = useNavigate();
    return (
        <div className='d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center'>
            <h1 className='text-center margin-lr-auto top_heading'>Verify your Email</h1>

            <div className="bs_container bs_form card">
                <img src={envelop} alt="envelop" width="100" height="69" className="margin-lr-auto margin-t-1_5x" />
                <h1 className="margin-lr-auto padding-t-2x">Email Verification</h1>
                <div className="text-center margin-lr-auto verfication_text email_verification padding-tb-2x ">
                    <div>A verification code has been sent to your email address.</div>
                    <div>The code is valid for 10 minutes.</div>
                </div>
                <br />
              
                <div className="otp_container">
                    <label className="padding-b-1x">Code</label>
                    <div className="d-flex justify-between">
                        <input type="number" min="1" max="1" />
                        <input type="number" min="1" max="1" />
                        <input type="number" min="1" max="1" />
                        <input type="number" min="1" max="1" />
                        <input type="number" min="1" max="1" />
                        <input type="number" min="1" max="1" />
                    </div>
                </div>
                <br />
                {/* <Button type="primary" className="ant-btn ant-btn-primary ant-btn-block atn-btn atn-btn-round margin-b-1x d-none" block onClick={() => navigate("/indexx-exchange/buy-sell/login/reset-password")} >Verify</Button> */}
                <Button id="verify_btn" type="primary" onClick={() => navigate("/indexx-exchange/buy-sell/login/reset-password")} >Verify</Button>
                <div className="margin-lr-auto padding-t-2x disable_icon">Resend Email (<Timer initMins={10} initSecs={0} />)</div>
                {/* onClick={() => setScreenName("SecureSteps")} */}
                <div className="margin-lr-auto padding-tb-2x"><Link to="" className="text_link " onClick={() => navigate("email-auth")}>Didn’t receive an email?</Link></div>
            </div>
        </div>
    )
}
export default BuySellVerifyEmail;