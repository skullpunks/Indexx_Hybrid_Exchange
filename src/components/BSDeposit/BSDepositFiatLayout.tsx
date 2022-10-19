import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
// import BSDepositCryptoSelect from './BSDepositCryptoSelect';
import '../BSDepositWithdraw/BSWithdraw.css';
import './BSDeposit.css';
import BSDepositFiatSelect from './BSDepositFiatSelect';
import BSDepositFiatAmount from './BSDepositFiatAmount';
import BSDepositFiatInfo from './BSDepositFiatInfo';

export const BSDepositFiatLayout = () => {
    return (
        <div className=''>
            <div className='flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BSDepositFiatSelect />} />
                    <Route path="/deposit-fiat-amount" element={<BSDepositFiatAmount />} />
                    <Route path="/deposit-fiat-info" element={<BSDepositFiatInfo />} />
                </Routes>
            </div>
            <Footer footerArt="flipWoman" />
        </div>
    )

}

export default BSDepositFiatLayout;