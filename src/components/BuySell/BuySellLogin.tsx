
import { useState } from 'react';

import BuySellLoginContent from './BuySellLoginContent';
import BuySellLoginFail from './BuySellLoginFail';
import BuySellSuccess from './BuySellSuccess';
import BuySellTwoFactorAuth from './BuySellTwoFactorAuth';
import BuySellLoggedContent from './BuySellLoggedContent';
import BuySellLoggedTwoFactor from './BuySellLoggedTwoFactor';
import BuySellLoggedVerfication from './BuySellLoggedVerfication';
import BuySellLoginQR from './BuySellLoginQR';

const BuySellLogin = () => {
    const [screenName, setScreenName] = useState("");
    return (
        <div className='scan-container flex-align-stretch bs_main'>

            {screenName === "" && <BuySellLoginContent setScreenName={setScreenName} />}
            {screenName === "LoginFail" && <BuySellLoginFail setScreenName={setScreenName} />}
            {screenName === "LoginSuccess" && <BuySellSuccess setScreenName={setScreenName} />}
            {screenName === "TwoFactorAuth" && <BuySellTwoFactorAuth setScreenName={setScreenName} />}
            {screenName === "LoggedIn" && <BuySellLoggedContent setScreenName={setScreenName} />} 
            {screenName === "LoggedTwoFactor" && <BuySellLoggedTwoFactor setScreenName={setScreenName} />} 
            {screenName === "loggedVerfication" && <BuySellLoggedVerfication setScreenName={setScreenName} />} 
            {screenName === "LoginQR" && <BuySellLoginQR setScreenName={setScreenName} />}
        </div> 
    )
}

export default BuySellLogin