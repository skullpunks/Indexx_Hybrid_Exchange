import React from 'react'

import "./Account.css";
import { Tabs } from 'antd';
import { CopyOutlined, MessageOutlined } from '@ant-design/icons';


const Account = () => {
    return (
        <div style={{ paddingTop: 90 }} className="accounts_container">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Basic Info" key="1">

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
                                    <div className="padding-lr-1x"><span>12345678</span><CopyOutlined /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="basic_info container margin-t-2x padding-t-3x">

                        <div>
                            <header className="font_18x border-b-1x padding-lr-2x padding-tb-1x">Verification & Limits</header>
                            <div className="padding-2x row">
                                <div className="col-lg-6">
                                    <span className="font_18x margin-b-3x d-block">
                                        Personal Verification
                                    </span>
                                    <div className="d-flex align-items-center">
                                    <MessageOutlined  className="font_30x margin-r-2x"/>
                                    <div>
                                        <h2 className="font_18x margin-b-0">Basic Verification</h2>
                                    Region currently not supported
                                    </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <span className="font_18x margin-b-3x d-block">
                                        Basic Functions
                                    </span>
                                    <div>USD Deposits & Withdrawals,</div>
                                    <div className="padding-tb-1x">Crypto Deposits & Withdrawals,</div>
                                    <div>Buy, Sell & Convert</div>
                                    <div className="padding-tb-1x">Advanced Trading</div>
                                    <div>Bank Transfer & Debit Card</div>
                                    <div className="padding-tb-1x">Apple Pay</div>
                                    <div>API Trading</div>
                                    <div className="padding-tb-1x">Advanced Functions</div>
                                    <div>Staking</div>
                                    <div className="padding-tb-1x">OTC Trading</div>
                                    <div>Wire Transfer</div>
                                    <div className="padding-tb-1x">Region currently not supported</div>


                                </div>

                            </div>
                        </div>
                    </div>


                </Tabs.TabPane>
                <Tabs.TabPane tab="Security" key="2">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Preferences" key="3">
                    Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Payment Method" key="4">
                    Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Account;