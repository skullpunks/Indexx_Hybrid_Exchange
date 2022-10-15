import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import BSDepositCryptoSelect from './BSDepositCryptoSelect';
import '../BSDepositWithdraw/BSWithdraw.css';

export const BSDepositFiatLayout = () => {
    return (
        <div className='scan-container bs_main wd_container'>
            <div className='flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BSDepositCryptoSelect />} />
                </Routes>
            </div>
            <Footer footerArt="flipWoman" />
        </div>
    )

}

export default BSDepositFiatLayout;