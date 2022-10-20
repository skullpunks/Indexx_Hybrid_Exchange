
import { useState } from 'react';

import BuySellLoginContent from './BuySellLoginContent';
import BuySellLoginFail from './BuySellLoginFail';
// import BuySellSuccess from './BuySellSuccess';
// import BuySellTwoFactorAuth from './BuySellTwoFactorAuth';
import BuySellLoggedContent from './BuySellLoggedContent';
import BuySellLoggedTwoFactor from './BuySellLoggedTwoFactor';
import BuySellLoggedVerfication from './BuySellLoggedVerfication';
// import BuySellLoginQR from './BuySellLoginQR';
import Footer from '../Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import BuySellForgotPassword from './BuySellForgotPassword';
import BuySellVerifyEmail from './BuySellVerifyEmail';
import BuySellResetPassword from './BuySellResetPassword';
// import BuySellEmailAuth from './BuySellEmailAuth';

const BuySellLogin = () => {
    const [screenName, setScreenName] = useState("");
    console.log(screenName);
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>

                {/* {screenName === "" && <BuySellLoginContent setScreenName={setScreenName} />}
                {screenName === "LoginFail" && <BuySellLoginFail setScreenName={setScreenName} />}
                {screenName === "LoginSuccess" && <BuySellSuccess setScreenName={setScreenName} />}
                {screenName === "TwoFactorAuth" && <BuySellTwoFactorAuth setScreenName={setScreenName} />}
                {screenName === "LoggedIn" && <BuySellLoggedContent setScreenName={setScreenName} />}
                {screenName === "LoggedTwoFactor" && <BuySellLoggedTwoFactor setScreenName={setScreenName} />}
                {screenName === "loggedVerfication" && <BuySellLoggedVerfication setScreenName={setScreenName} />}
                {screenName === "LoginQR" && <BuySellLoginQR setScreenName={setScreenName} />} */}

                <Routes>
                    <Route index element={<BuySellLoginContent setScreenName={setScreenName} />} />
                    <Route path="forgot-password" element={<BuySellForgotPassword />} />
                    <Route path="reset-password" element={<BuySellResetPassword />} />
                    <Route path="fail" element={<BuySellLoginFail setScreenName={setScreenName} />} />
                    {/* <Route path="success" element={<BuySellSuccess setScreenName={setScreenName} />} /> */}
                    <Route path="email-auth" element={<BuySellVerifyEmail />} />
                    <Route path="locked" element={<BuySellLoggedContent setScreenName={setScreenName} />} />
                    <Route path="mob-auth" element={<BuySellLoggedTwoFactor setScreenName={setScreenName} />} />
                    <Route path="ssn-auth" element={<BuySellLoggedVerfication setScreenName={setScreenName} />} />
                    {/* <Route path="qr" element={<BuySellLoginQR setScreenName={setScreenName} />} /> */}
                </Routes>

            </div>
            <Footer footerArt="flipWoman" />
        </>
    )
}

export default BuySellLogin