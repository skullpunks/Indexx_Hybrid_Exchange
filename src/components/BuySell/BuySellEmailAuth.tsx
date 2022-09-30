

import envelop from "../../assets/arts/envelop.svg";
interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
    setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
} 

const BuySellEmailAuth: React.FC<(Props)> = ({ setScreenName,setToggleChart }) =>{
    setToggleChart(false);
    return(
        <div className="bs_container bs_form card">
            <img src={envelop} alt="envelop" width="100" height="69" className="margin-lr-auto margin-t-1_5x"/>
            <h1 className="margin-lr-auto padding-t-2x">Verify your Email</h1>
            <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                <div>A verification code has been sent to your email address.</div>
                <div>The code is valid for 10 minutes.</div>
            </div>
            <br/>
            <br/>
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
            <br/>
            <div className="margin-lr-auto padding-t-2x">Resend Email (9:50s)</div>
            <div className="margin-lr-auto padding-tb-2x"><a className="text_link " onClick={() => setScreenName("SecureSteps")}>Didn’t receive an email?</a></div>
        </div>
    )
}
export default BuySellEmailAuth;