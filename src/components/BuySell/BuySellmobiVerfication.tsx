

import MobileIcon from "../../assets/arts/MobileIcon.svg";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
    setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const BuySellmobiVerfication: React.FC<(Props)> = ({ setScreenName, setToggleChart }) => {
    setToggleChart(false);
    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto'>Get Started</h1>

            <div className="bs_container bs_form card">
                <br />
                <img src={MobileIcon} alt="MobileIcon" width="58" height="87" className="margin-lr-auto margin-t-1_5x" />
                <h1 className="margin-lr-auto padding-t-2x">Confirm verification code</h1>
                <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                    <div>A verification code has been sent to your mobile phone +1********9</div>

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
                <br />
                <div className="send_code">
                    <button onClick={() => setScreenName("mobiVerfication")}>Send Code</button>
                </div>
                <div className="margin-lr-auto padding-t-2x">Resend Code (9:50s)</div>
            </div>
        </div>
    )
}
export default BuySellmobiVerfication;