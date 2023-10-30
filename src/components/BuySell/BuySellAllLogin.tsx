
import { useState } from 'react';

import BuySellLoginFail from './BuySellLoginFail';
import BuySellLoggedContent from './BuySellLoggedContent';
import BuySellLoggedTwoFactor from './BuySellLoggedTwoFactor';
import BuySellLoggedVerfication from './BuySellLoggedVerfication';
import Footer from '../Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import BuySellForgotPassword from './BuySellForgotPassword';
import BuySellVerifyEmail from './BuySellVerifyEmail';
import BuySellResetPassword from './BuySellResetPassword';
import BuySellAllLoginContent from './BuySellAllLoginContent';

const BuySellAllLogin = () => {
    const [screenName, setScreenName] = useState("");
    
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>

                <Routes>
                    <Route index element={<BuySellAllLoginContent setScreenName={setScreenName} />} />
                    <Route path="forgot-password" element={<BuySellForgotPassword />} />
                    <Route path="reset-password" element={<BuySellResetPassword />} />
                    <Route path="fail" element={<BuySellLoginFail setScreenName={setScreenName} />} />
                    <Route path="email-auth" element={<BuySellVerifyEmail />} />
                    <Route path="locked" element={<BuySellLoggedContent setScreenName={setScreenName} />} />
                    <Route path="mob-auth" element={<BuySellLoggedTwoFactor setScreenName={setScreenName} />} />
                    <Route path="ssn-auth" element={<BuySellLoggedVerfication setScreenName={setScreenName} />} />
                </Routes>

            </div>
            <Footer footerArt="flipWoman" />
        </>
    )
}

export default BuySellAllLogin