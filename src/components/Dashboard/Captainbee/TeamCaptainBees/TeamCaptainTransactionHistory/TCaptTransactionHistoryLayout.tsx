import React from 'react'
import { Route, Routes } from 'react-router-dom';
import '../../../../BSDepositWithdraw/BSWithdraw.css';
import './TCaptTransactionHistory.css';
import TCaptTransactionHistoryContent from './TCaptTransactionHistoryContent';

export const TCaptTransactionHistoryLayout = () => {
    return (
        <>
            <div className='scan-container flex-align-stretch bs_main' style={{paddingTop:"10px"}}>
                <Routes>
                    <Route index element={<TCaptTransactionHistoryContent />} />
                </Routes>
            </div>
        </>
    )

}

export default TCaptTransactionHistoryLayout;