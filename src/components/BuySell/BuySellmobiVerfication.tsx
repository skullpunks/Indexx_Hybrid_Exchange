//import { useNavigate } from "react-router-dom";
import MobileIcon from "../../assets/arts/MobileIcon.svg";
//import { verifyPhoneCode } from "../../services/api";
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const BuySellmobiVerfication = () => {
    // setToggleChart(false);
    //const navigate = useNavigate('/indexx-exchange/buy-sell/get-started/identity-verification');
    const verifyCode = async () => {

        //      let res = await verifyPhoneCode("123456");
        //    console.log(res);
    }

    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto top_heading'>Confirm Verification</h1>

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
                    <button onClick={() => verifyCode()}>Verify Code</button>
                </div>
                <div className="margin-lr-auto padding-t-2x">Resend Code (9:50s)</div>
            </div>
        </div>
    )
}
export default BuySellmobiVerfication;