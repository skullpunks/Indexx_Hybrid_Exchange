import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import AdvanceVerfication from "../../assets/arts/AdvanceVerfication.svg";
import BasicVerfication from "../../assets/arts/BasicVerfication.svg";

import { Button } from 'antd';

const BasicInfo = () => {
    return (
        <div>
            <div className="basic_info container margin-t-2x padding-t-3x">

                <div>
                    <header className="font_25x border-b-1x padding-lr-2x padding-tb-1x">Account Info</header>
                    <div className="padding-2x">
                        <h2 className="font_25x">WILLIE SAMPLE</h2>
                        <p className="font_20x">w****@****.com</p>
                        <div className="d-flex">
                            <div>VIP 1 </div>
                            <div className="padding-lr-1x">Personal</div>
                            <div>User ID</div>
                            <div className="padding-lr-1x d-flex align-items-center"><span>12345678</span><CopyOutlined /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="basic_info container margin-t-2x padding-t-3x">

                <div>
                    <header className="font_18x border-b-1x padding-lr-2x padding-tb-1x">Verification & Limits</header>
                    <div className="padding-2x row">
                        <div className="col-lg-5">
                            <span className="font_18x margin-b-3x d-block">
                                Personal Verification
                            </span>
                            <div className="d-flex align-items-center border-1x-orange padding-1x">
                                <div><img src={BasicVerfication} alt="AdvanceVerfication" className="font_30x margin-r-1x" /></div>
                                <div>
                                    <h2 className="font_18x margin-b-0">Basic Verification</h2>
                                    <div className="font_12x text_link">Region currently not supported </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center border margin-t-2x padding-1x">
                                <div><img src={AdvanceVerfication} alt="AdvanceVerfication" className="font_30x margin-r-1x" /></div>
                                <div>
                                    <h2 className="font_18x margin-b-0">Advanced Verification
                                    </h2>
                                    <div className="font_12x opacity-50">Unlock further features and raise your deposit and
                                        withdrawal limits </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center align-items-stretch border margin-t-2x padding-1x col-lg-8 margin-lr-auto">

                                <div className="font_12x ">Please verify your identity first in order to start
                                    advanced verification</div>

                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-5 basic_funtion bs_main">
                            <h1 className="font_18x margin-b-3x d-block font_weight_800 padding-l-24px">
                                Basic Functions
                            </h1>
                            <div className="usd_deposit">USD Deposits & Withdrawals,</div>
                            <div className="padding-tb-1x crypto_deposit">Crypto Deposits & Withdrawals,</div>
                            <div className="buy_Sell_convert">Buy, Sell & Convert</div>
                            <div className="padding-tb-1x adv_trade">Advanced Trading</div>
                            <div className="bank_trns_debit">Bank Transfer & Debit Card</div>
                            <div className="padding-tb-1x apple_pay">Apple Pay</div>
                            <div className="api_trading">API Trading</div>
                            <h1 className="padding-tb-1x font_18x  font_weight_800 margin-tb-2x padding-l-24px">Advanced Functions</h1>
                            <div className="staking">Staking</div>
                            <div className="padding-tb-1x otc_trading">OTC Trading</div>
                            <div className="wire_transfer">Wire Transfer</div>
                            <div className="padding-tb-1x ">Region currently not supported</div>
                            <Button type="primary" className="disabled_button margin-l-2x">Verify Identity</Button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo