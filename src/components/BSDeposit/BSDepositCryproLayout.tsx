import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import BSDepositCryptoSelect from './BSDepositCryptoSelect';
import '../BSDepositWithdraw/BSWithdraw.css';
import BSDepositCryptoWallet from './BSDepositCryptoWallet';

export const BSDepositCryproLayout = () => {
  return (
    <>
    <div className='flex-align-stretch bs_main'>
        <Routes>
            <Route index element={<BSDepositCryptoSelect />} />
            <Route path="/deposit-wallet"  element={<BSDepositCryptoWallet/>} />
            {/* <Route path="email-auth" element={<BuySellEmailAuth />} />
            <Route path="secure-steps" element={<BuySellSecureSteps />} />
            <Route path="sms-auth" element={<BuySellMobiAuth />} />
            <Route path="sms-verify" element={<BuySellmobiVerfication />} /> */}
        </Routes>
    </div>
    <Footer footerArt="flipWoman" />
</>
)
  
}

export default BSDepositCryproLayout;