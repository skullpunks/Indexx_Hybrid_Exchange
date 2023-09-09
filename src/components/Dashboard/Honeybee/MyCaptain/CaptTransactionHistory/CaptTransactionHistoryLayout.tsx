import React from 'react'
import { Route, Routes } from 'react-router-dom';
import '../../../../BSDepositWithdraw/BSWithdraw.css';
import './CaptTransactionHistory.css';
import CaptTransactionHistoryContent from './CaptTransactionHistoryContent';

export const CaptTransactionHistoryLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main' style={{paddingTop:"10px"}}>
                <Routes>
                    <Route index element={<CaptTransactionHistoryContent />} />
                </Routes>
            </div>
        </>
    )

}

export default CaptTransactionHistoryLayout;