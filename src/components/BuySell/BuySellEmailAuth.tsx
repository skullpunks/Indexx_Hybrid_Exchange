

import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import envelop from "../../assets/arts/envelop.svg";
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const BuySellEmailAuth = () => {
    const navigate = useNavigate();
    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto'>Get Started</h1>

            <div className="bs_container bs_form card">
                <img src={envelop} alt="envelop" width="100" height="69" className="margin-lr-auto margin-t-1_5x" />
                <h1 className="margin-lr-auto padding-t-2x">Verify your Email</h1>
                <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                    <div>A verification code has been sent to your email address.</div>
                    <div>The code is valid for 10 minutes.</div>
                </div>
                <br />
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
                <Button type="primary" className="ant-btn ant-btn-primary ant-btn-block atn-btn atn-btn-round margin-b-1x d-none" block onClick={() => navigate("/indexx-exchange/buy-sell/get-started/secure-steps")} >Verify</Button>
                <div className="margin-lr-auto padding-t-2x">Resend Email (9:50s)</div>
                {/* onClick={() => setScreenName("SecureSteps")} */}
                <div className="margin-lr-auto padding-tb-2x"><Link to="" className="text_link " onClick={() => navigate("email-auth")}>Didn’t receive an email?</Link></div>
            </div>
        </div>
    )
}
export default BuySellEmailAuth;