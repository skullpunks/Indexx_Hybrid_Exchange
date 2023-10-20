import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import '../BSDepositWithdraw/BSWithdraw.css';
import './BSStakingHistory.css';
import BSStakingHistoryContent from './BSStakingHistoryContent';

export const BSStakingHistoryLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main'>
                <Routes>
                    <Route index element={<BSStakingHistoryContent />} />
                </Routes>
            </div>
            <Footer footerArt="flipWoman" />
        </>
    )

}

export default BSStakingHistoryLayout;