import React from 'react'
import "../../../BuySell/BS-Sell.css";
import "./BuySellDummy.css";
// import Footer from '../../../Footer/Footer';
import BeeWalletTable from './BeeWalletTable';
import BeeWalletTop from './BeeWalletTop';
// import { Link } from 'react-router-dom';
// import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

// import PlainCircle from "../../assets/arts/PlainCircle.svg";

const BeeWallet = () => {
    return (
        <div className=''>
            {/* <div className='d-flex bs_wallet_top'>
                <div>
                    <Link to="" className='font_15x text-white' ><CheckCircleOutlined className='padding-r-2x margin-r-0_5x' />Create account</Link>
                </div>
                <div>
                    <Link to="" className='font_15x margin-l-2x text-white' ><img src={PlainCircle} alt="PlainCircle" width="15" height="15" className='padding-r-2x' /> <span style={{paddingTop:5}}>Add payment method</span><CaretRightOutlined className='margin-l-0_5x' /></Link>
                </div>
            </div> */}

            <div className='scan-container d-flex flex-direction-column card not_so_large_card orange pb-0'>


                <BeeWalletTop />

                <div className='width-100 bs_wallet_table'>
                    <BeeWalletTable />
                </div>
            </div>
            {/* <Footer footerArt="flipWoman" /> */}
        </div>
    )
}

export default BeeWallet