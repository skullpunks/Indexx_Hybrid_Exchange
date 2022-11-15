import React from 'react';
import InProgressClock from "../../assets/arts/InProgressClock.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSConvertInProgressProcessing: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    {/* setScreenName("BSConvertInProgress") */}
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => navigate("/indexx-exchange/buy-sell/convert-in-progress")}>&#60;</span>

                    Convert in Processing
                </h1>
            </div>
            <div className='card_body text-center'>
                <img src={InProgressClock} alt="InProgressClock" className='padding-t-2x' />

                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>

                        <span placeholder="0" className="color_general" style={{ fontSize: 50 }} >0.00005102</span>
                        <span className="font_20x" style={{ paddingBottom: 14, paddingLeft: 4 }} >BTC</span>
                    </div>
                    {/* <div className='swap_Arrow_icon' style={{ position: "absolute", right: "4px", top: "2%" }} >
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" />
                    </div> */}
                </div>

                <div className='font_18x padding-b-2x'>Your convert order is being processed.A confirmation email will be sent once the order is complete.</div>
                {/*setScreenName("BSTractionHistory")  */}
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("/indexx-exchange/buy-sell/traction-history")}> Go to Wallet</Button>
                <Link className="font_15x bs_link text-center d-block padding-t-3x" to="/indexx-exchange/buy-sell?type=convert" >New Convert</Link>
            </div>
        </div>
    )
}

export default BSConvertInProgressProcessing;
