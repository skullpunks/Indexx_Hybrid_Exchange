
// import { Button } from 'antd';
// import lock from "../../assets/arts/lock.svg";
import { Link } from "react-router-dom";
import arrowAdressLeft from "../../assets/arts/arrowAdressLeft.svg";
import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellLoginQR: React.FC<(Props)> = ({ setScreenName }) => {

    console.log(setScreenName);

    return (

        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto top_heading'>Log In</h1>
            <div className='text-center margin-lr-auto padding-tb-2x'>Please make sure you are visiting the correct URL</div>
            <Link to="" className='default-link border-default w-fit-content margin-lr-auto padding-b-2x margin-b-2x'>http://accounts.indexx.ai</Link>
            <div className="bs_container bs_form card ">
                <div className=" d-flex  border-b-1x padding-b-1x">
                    <img src={arrowAdressLeft} alt="adressLeft" className="left_arrow" onClick={() => setScreenName("")} />
                    <h1>Log In </h1>
                </div>
                <div className='className=" d-flex  border-b-1x padding-b-2x'>
                    <img src={QRCodeIcon} alt="QRCodeIcon" className="margin-lr-auto padding-t-2x margin-t-1_5x" width="160px" height="160px" />

                </div>
                <div className="padding-2x font_15x">
                    <div>Scan this code with the <Link to="" className="text_link">indexx.ai</Link> mobile app to log in instantly.</div><br />
                    <div>1.Make sure you are logged into the app</div>
                    <div>2.Navigate to your  ‘Accounts’ tab</div>
                    <div>3.Tab the  QR code scan icon in the upper right corner</div>
                    <div>4.Scan this QR directly with your phone</div>
                </div>
            </div>
        </div>
    );
}

export default BuySellLoginQR;