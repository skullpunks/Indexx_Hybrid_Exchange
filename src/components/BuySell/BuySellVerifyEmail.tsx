

import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import envelop from "../../assets/arts/envelop.svg";
import React, { ClipboardEvent } from 'react';

// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

import Timer from "../../utils/Timer";

import { useState, useEffect } from 'react';
import OpenNotification from '../OpenNotification/OpenNotification';
import { decodeJWT, resendEmailCode, validateEmail } from "../../services/api";

const BuySellVerifyEmail = () => {
    const [isTimerDone, setIsTimerDone] = useState<boolean>(false);
    const [timerKey, setTimerKey] = useState<number>(0);
    const [email, setEmail] = useState('');
    const [loadings, setLoadings] = useState(false);
    const otpCode = new Array(6);

    useEffect(() => {
        let access_token = String(localStorage.getItem("access_token"));
        let decoded: any = decodeJWT(access_token);

        setEmail(decoded.email)
    }, [email]);
    const navigate = useNavigate();


    const resendEmail = async () => {
        try {
            setLoadings(true);
            let res = await resendEmailCode(email);
            if (res.status === 200) {
                OpenNotification('success', res.data);
                setIsTimerDone(false);
                setTimerKey(prevKey => prevKey + 3); // Increment key to re-render Timer
                setLoadings(false);
            } else {
                console.log("res,data", res)
                setLoadings(false);
                OpenNotification('error', res.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const moveToNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { maxLength, value } = e.currentTarget;
        if (value.length > maxLength)
            e.currentTarget.value = value.slice(0, maxLength);

        if (value.length === maxLength) {
            let next = e.currentTarget.nextElementSibling;
            // let prev = e.currentTarget.previousElementSibling;
            debugger;
            if (next === null) {
                document.getElementById('verify_btn')?.focus();
            } else if (e.key === 'Tab' && e.shiftKey === true) {
                e.preventDefault();
                return;
            } else {
                (next as HTMLElement).focus();
            }
        }
    };

    function isNumeric(value: any) {
        return /^-?\d+$/.test(value);
    }

    const pastePassowrd = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text').slice(0, 6); // Get only the first 6 characters

        if (isNumeric(pastedData)) {
            const inputFields: any = document.querySelectorAll('.otp_container input');
            pastedData.split('').forEach((char: any, index: any) => {
                if (inputFields[index]) {
                    inputFields[index].value = char;
                    otpCode[index] = char;
                }
            });

            // Automatically focus the verify button if all digits are pasted
            if (pastedData.length === 6 && document.getElementById('verify_btn')) {
                document.getElementById('verify_btn')?.focus();
            }
        }
    };

    const handleInput1 = (e: any) => {
        let val = e.currentTarget.value;

        otpCode[0] = val[0];
    };

    const handleInput2 = (e: any) => {
        let val = e.currentTarget.value;
        otpCode[1] = val[0];
    };

    const handleInput3 = (e: any) => {
        let val = e.currentTarget.value;
        otpCode[2] = val[0];
    };

    const handleInput4 = (e: any) => {
        let val = e.currentTarget.value;
        otpCode[3] = val[0];
    };

    const handleInput5 = (e: any) => {
        let val = e.currentTarget.value;
        otpCode[4] = val[0];
    };

    const handleInput6 = (e: any) => {
        let val = e.currentTarget.value;
        otpCode[5] = val[0];
    };

    const clearOtpInputs = () => {
        console.log("I am here");
        document.querySelectorAll<HTMLInputElement>('.otp_container input').forEach(input => {
          input.value = '';
        });
        otpCode.fill(''); // Clear the otpCode array
      };

    const verifyCode = async () => {
        setLoadings(true);
        console.log("I am here", email)

        const res = await validateEmail(email, otpCode.join('').toString());
        if (res.status === 200) {
            OpenNotification('success', res.data);
            navigate('/indexx-exchange/account');
            setLoadings(false);
        } else {
            OpenNotification('error', res.data);
            clearOtpInputs();
            setLoadings(false);
        }
    };

    useEffect(() => {
        console.log('Timer Done:', isTimerDone);
    }, [isTimerDone]);

    return (
        <div className='scan-container flex-align-stretch bs_main'>

            <div className='d-flex flex-direction-column col-lg-5 col-md-12 responsive_container flex-align-center'
                style={{ paddingTop: "20px" }}>
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
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput1}
                            />
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput2}
                            />
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput3}
                            />
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput4}
                            />
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput5}
                            />
                            <input
                                type="number"
                                maxLength={1}
                                max={1}
                                onKeyUp={moveToNext}
                                onPaste={pastePassowrd}
                                onChange={handleInput6}
                            />
                        </div>
                    </div>
                    <br />
                    {/* <Button type="primary" className="ant-btn ant-btn-primary ant-btn-block atn-btn atn-btn-round margin-b-1x d-none" block onClick={() => navigate("/indexx-exchange/buy-sell/login/reset-password")} >Verify</Button> */}
                    {/* <Button id="verify_btn" type="primary" onClick={() => navigate("/indexx-exchange/account")} >Verify</Button> */}
                    <Button
                        id="verify_btn"
                        type="primary"
                        onClick={() => verifyCode()}
                        loading={loadings}
                    >
                        Verify
                    </Button>
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
        </div>
    )
}
export default BuySellVerifyEmail;