

import { Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import envelop from "../../assets/arts/envelop.svg";
import Timer from "../../utils/Timer";
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const BuySellEmailAuth = () => {
    const navigate = useNavigate();

    const content = (
        <div className='popover_container' style={{ width: 366 }}>
            <img src={envelop} alt="envelop" className="text-center width-100" width="100" height="69" />
            <div className='font_30x text-center brand_color padding-t-2x'>Didn’d receive email?</div>
            <div className='text-center margin-tb-2x'></div>
            <ul className='brand_color disc_ul'>
                <li>Make sure the email address ‘sample@azooca.com’ is correct.</li>
                <li>This email might be delayed for a few minutues. Try again after 20 minutes.</li>
                <li>Check your Spam or Junk mail folders.</li>
                <li>Add indexx.ai to your email address whitelist.</li>
            </ul>
        </div>
    )

    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto top_heading'>Verify your Email </h1>

            <div className="bs_container bs_form card">
                <img src={envelop} alt="envelop" width="100" height="69" className="margin-lr-auto margin-t-1_5x" />
                <h1 className="margin-lr-auto padding-t-2x">Email Verification</h1>
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
                <Button type="primary" className="ant-btn ant-btn-primary atn-btn atn-btn-round margin-b-1x d-none" onClick={() => navigate("/indexx-exchange/buy-sell/get-started/secure-steps")} >Verify</Button>
                <Button type="primary" onClick={() => navigate("/indexx-exchange/buy-sell/get-started/secure-steps")}>Verify</Button>
                <div className="margin-lr-auto padding-t-2x">Resend Email (<Timer initMins={10} initSecs={0} />)</div>

                <div className="margin-lr-auto padding-tb-2x" style={{ cursor: "pointer" }}><Popover content={content} trigger="click" className="text_link" >Didn’t receive an email?</Popover></div>
            </div>
        </div>
    )
}
export default BuySellEmailAuth;