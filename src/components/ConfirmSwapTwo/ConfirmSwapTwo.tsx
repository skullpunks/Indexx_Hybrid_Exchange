import { Button } from 'antd';
import React from 'react';
import IN500 from "../../assets/token-icons/33.png";
import IUSD from "../../assets/token-icons/35.png";
import downArrow from "../../assets/arts/downArrow.svg";
import swapIcon from "../../assets/arts/swapIcon.svg";

import './ConfirmSwapTwo.css';
import { CloseOutlined } from '@ant-design/icons';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}
const ConfirmSwapTwo: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className='scan-container'>
            <div className="card">

                <div className="card__header flex-justify-between d-flex flex-align-center">
                    <h1 style={{ color: "#5f5f5f" }}>Confirm Swap</h1>
                    <CloseOutlined style={{ fontSize: "16" }} onClick={() => { setStatus(""); }} />
                </div>

                <div className='card-body padding-2x'>
                    <div className='d-flex flex-justify-between'>
                        <div className='d-flex flex-align-center'>
                            <img src={IN500} alt="bit coin" width="30" height="30" />
                            <h1 className='padding-l-1x' style={{ color: "#5f5f5f" }}>1</h1>
                        </div>
                        <h1>IN500</h1>
                    </div>
                    <div className='swap__coin centered padding-b-2x'>
                        <span className=' centered'>
                            <img src={downArrow} alt="Swap coins" />
                        </span>
                    </div>
                    <div className='d-flex flex-justify-between padding-b-2x'>
                        <div className='d-flex flex-align-center'>
                            <img src={IUSD} alt="bit coin" width="30" height="30" />
                            <h1 className='primary_color padding-l-1x'>0.00133973</h1>
                        </div>
                        <h1>IUSD+</h1>
                    </div>
                    <p>
                        Output is estimated. You will receive at least <span className='primary_color'>0.00133973 IUSD+</span> or the transaction will revert.

                    </p>

                </div>

                <div className="footer" style={{ marginTop: 60 }}>

                    <div className="footer_body">
                        <div className="d-flex flex-justify-between">
                            <div>Price</div>
                            <div style={{ height: 35 }}>0.004 IN500 per USD<img src={swapIcon} alt="swapIcon" style={{ marginTop: -6, paddingLeft: 5 }} /></div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Minimum Received </div>
                            <div>1 IUSD+</div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Price Impact</div>
                            <div className="helper_text">7.90%</div>
                        </div>
                        <div className="d-flex flex-justify-between" style={{ marginBottom: 15 }}>
                            <div>Liquidity Provider Fee</div>
                            <div>0.005988 IN500</div>
                        </div>
                    </div>
                    <Button type="primary" onClick={() => { setStatus("WaitForConfirmation"); }} className="atn-btn atn-btn-round" style={{ height: 55, backgroundColor: " #006DFF", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Swap Anyway</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmSwapTwo