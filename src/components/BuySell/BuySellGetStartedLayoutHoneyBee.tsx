import { Route, Routes } from 'react-router-dom';
// import Footer from '../Footer/Footer';
import BuySellEmailAuth from './/BuySellEmailAuth';
//import BuySellSecureSteps from './/BuySellSecureSteps';
import BuySellMobiAuth from './/BuySellMobiAuth';
import BuySellmobiVerfication from './/BuySellmobiVerfication';
import Blockpass from '../Blockpass/Blockpass';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BuySellGetStartedHoneyBee from './BuySellGetStartedHoneyBee';

const BuySellGetStartedLayoutHoneyBee = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        const userId = localStorage.getItem("user");
        if (userId !== null && userId !== undefined) {
            navigate('/indexx-exchange/buy-sell/');
        }
    })


    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BuySellGetStartedHoneyBee />} />
                    <Route path="email-auth" element={<BuySellEmailAuth />} />
                    {/* <Route path="secure-steps" element={<BuySellSecureSteps />} /> */}
                    <Route path="secure-steps" element={<Blockpass />} />
                    <Route path="sms-auth" element={<BuySellMobiAuth />} />
                    <Route path="sms-verify" element={<BuySellmobiVerfication />} />
                </Routes>
            </div>
            {/* <Footer footerArt="flipWoman" /> */}
        </>
    )
}

export default BuySellGetStartedLayoutHoneyBee;