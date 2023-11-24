

import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import envelop from "../../assets/arts/envelop.svg";
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

import Timer from "../../utils/Timer";

import { useState, useEffect } from 'react';
import OpenNotification from '../OpenNotification/OpenNotification';
import { resendEmailCode } from "../../services/api";

const BuySellVerifyEmail = () => {
    const [isTimerDone, setIsTimerDone] = useState<boolean>(false);
    const [timerKey, setTimerKey] = useState<number>(0);
    const [email, setEmail] = useState('');
    const [loadings, setLoadings] = useState(false);

    useEffect(() => {
        setEmail(String(localStorage.getItem('tempAuthEmail')));
    }, [email]);
    const navigate = useNavigate();


    const resendEmail = async () => {
        setLoadings(true);
        let res = await resendEmailCode(email);
        if (res.status === 200) {
            OpenNotification('success', res.data);
            setIsTimerDone(false);
            setTimerKey(prevKey => prevKey + 3); // Increment key to re-render Timer
            setLoadings(false);
        } else {
            setLoadings(false);
            OpenNotification('error', res.data);
        }
    };

    useEffect(() => {
        console.log('Timer Done:', isTimerDone);
    }, [isTimerDone]);

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
                    <label className="padding-b-1x" style={{ color: "var(--body_color)" }}>Code</label>
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
                {isTimerDone ? (
                    <div className="margin-lr-auto padding-t-2x">
                        <Button
                            loading={loadings}
                            type="primary" style={{ height: "45px" }} onClick={resendEmail}>Resend Email</Button>
                    </div>
                ) : (
                    <div className="margin-lr-auto padding-t-2x disable_icon" style={{ color: "var(--body_color)" }}>
                        Resend Email (
                        <Timer
                            key={timerKey}
                            initMins={3}
                            initSecs={0}
                            onFinish={() => {
                                console.log('Timer finished');
                                setIsTimerDone(true);
                            }}
                        />)
                    </div>
                )}
                {/* onClick={() => setScreenName("SecureSteps")} */}
                <div className="margin-lr-auto padding-tb-2x"><Link to="" className="text_link " onClick={() => navigate("email-auth")}>Didn’t receive an email?</Link></div>
            </div>
        </div>
    )
}
export default BuySellVerifyEmail;