import React from 'react';

// import { Button } from 'antd';
import MobileIcon from "../../assets/arts/MobileIcon.svg";



interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellLoggedTwoFactor: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto'>Two-Factor Authentication</h1>
            <br />
            <div className="bs_container bs_form card">

                <img src={MobileIcon} alt="MobileIcon" width="58" height="87" className="margin-lr-auto margin-t-1_5x" />
                <h1 className="margin-lr-auto padding-t-2x">SMS Authentication</h1>
                <div className="text-center margin-lr-auto  font_20x padding-tb-2x ">
                    Enable mobile 2-Factor-Authentication</div>

                <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                    <div>A SMS with a 6-digit code was sent to your phone number 949****079</div>

                </div>

                <div className="otp_container">
                    <label className="padding-b-1x">Code</label>
                    <div className="d-flex justify-between">
                        <input type="number" />
                        <input type="number" />
                        <input type="number" />
                        <input type="number" />
                        <input type="number" />
                        <input type="number" />
                    </div>
                </div>



                <br />

                <div className="margin-lr-auto padding-t-2x"> <a className="text_link" href="" >Get Started</a></div>
                <br />
                <div className="send_code">
                    <button onClick={() => setScreenName("loggedVerfication")}>Resend SMS</button>
                </div>
            </div>
        </div>
    )
}

export default BuySellLoggedTwoFactor;

