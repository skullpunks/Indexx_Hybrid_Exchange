import React from 'react'
import "./BS-Sell.css";
import "./BuySellDummy.css";
import Footer from '../Footer/Footer';
import BSWalletTable from './BSWalletTable';
import BSWalletTop from './BSWalletTop';
import { Link } from 'react-router-dom';
import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

import PlainCircle from "../../assets/arts/PlainCircle.svg";

const BSWallet = () => {
    return (
        <div className='bs_wallet' style={{ paddingTop: 125 }}>
            <div className='d-flex bs_wallet_top'>
                <div>
                    <Link to="" className='font_15x color_white' ><CheckCircleOutlined className='padding-r-2x margin-r-0_5x' />Create account</Link>
                </div>
                <div>
                    <Link to="" className='font_15x margin-l-2x color_white' ><img src={PlainCircle} alt="PlainCircle" width="15" height="15" className='padding-r-2x' /> Add payment method<CaretRightOutlined className='margin-l-0_5x' /></Link>
                </div>
            </div>

            <div className='scan-container d-flex flex-direction-column card large_card orange'>


                <BSWalletTop />

                <div className='width-100'>
                    <BSWalletTable />
                </div>
            </div>
            <Footer footerArt="flipWoman" />
        </div>
    )
}

export default BSWallet