import React from 'react'
import "./BS-Sell.css";
import "./BuySellDummy.css";
import Footer from '../Footer/Footer';
import BSWalletTable from './BSWalletTable';
import BSWalletTop from './BSWalletTop';

const BSWallet = () => {
    return (
        <div>
            <div className='scan-container d-flex flex-direction-column'>

                <div className=''>
                    <BSWalletTop />
                </div>
                <div className=''><BSWalletTable /></div>
            </div>
            <Footer footerArt="flipWoman" />
        </div>
    )
}

export default BSWallet