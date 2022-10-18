import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BSWithdarwCryptoContent from '../BSDeposit/BSWithdarwCryptoContent';
import './BSWithdraw.css';

const BSWithdrawCryptoLayout = () => {
    return (
        <div>
            <Routes>
                <Route index element={<BSWithdarwCryptoContent />} />
                {/* <Route path="info" element={<BSWithdrawInfo />} />
                        <Route path="amount" element={<BSDWAmount />} />
                        <Route path="recorded" element={<BSDWRecorded />} /> */}
            </Routes>
        </div>
    )
}

export default BSWithdrawCryptoLayout