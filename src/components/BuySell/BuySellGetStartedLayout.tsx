import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import BuySellGetStarted from './BuySellGetStarted';
import BuySellEmailAuth from './/BuySellEmailAuth';
import BuySellSecureSteps from './/BuySellSecureSteps';
import BuySellMobiAuth from './/BuySellMobiAuth';
import BuySellmobiVerfication from './/BuySellmobiVerfication';


const BuySellGetStartedLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BuySellGetStarted />} />
                    <Route path="email-auth" element={<BuySellEmailAuth />} />
                    <Route path="secure-steps" element={<BuySellSecureSteps />} />
                    <Route path="sms-auth" element={<BuySellMobiAuth />} />
                    <Route path="sms-verify" element={<BuySellmobiVerfication />} />
                </Routes>
            </div>
            <Footer footerArt="flipWoman" />
        </>
    )
}

export default BuySellGetStartedLayout;