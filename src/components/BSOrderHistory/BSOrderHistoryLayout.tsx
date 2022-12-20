import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import '../BSDepositWithdraw/BSWithdraw.css';
import './BSTransactionHistory.css';
import BSOrderHistoryContent from './BSOrderHistoryContent';

export const BSOrderHistoryLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BSOrderHistoryContent />} />
                </Routes>
            </div>
            <Footer footerArt="flipWoman" />
        </>
    )

}

export default BSOrderHistoryLayout;