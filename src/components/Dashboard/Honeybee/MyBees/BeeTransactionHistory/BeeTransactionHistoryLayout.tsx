import React from 'react'
import { Route, Routes } from 'react-router-dom';
import '../../../../BSDepositWithdraw/BSWithdraw.css';
import './BSTransactionHistory.css';
import BeeTransactionHistoryContent from './BeeTransactionHistoryContent';

export const BeeTransactionHistoryLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main' style={{paddingTop:"10px"}}>
                <Routes>
                    <Route index element={<BeeTransactionHistoryContent />} />
                </Routes>
            </div>
        </>
    )

}

export default BeeTransactionHistoryLayout;