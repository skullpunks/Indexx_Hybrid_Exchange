
import { Button } from 'antd';
import lock from "../../assets/arts/lock.svg";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellLoggedContent: React.FC<(Props)> = ({ setScreenName }) => {

    console.log(setScreenName);

    return (
        <div className="bs_container bs_form card card_s">
            <img src={lock} alt="lock" width="40" height="60" className="margin-lr-auto margin-t-1_5x" />
            <h1 className='text-center'>Account Locked</h1>

            <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                <div>Sorry, you failed to input the correct verification code too many times. </div>
                <div>Please log in again.</div>
            </div>
            <br />
            <br />
            <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" onClick={() => setScreenName("LoggedTwoFactor")} style={{ height: 55, borderColor: "#F66036", backgroundColor: "#F66036", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Understood</Button>
        </div>
    );
}

export default BuySellLoggedContent;