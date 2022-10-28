import React from 'react'
import InProgressClock from "../../assets/arts/InProgressClock.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSBuyInProgress: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => setScreenName("confirmPurchase")}>&#60;</span>
                    Purchase in Progress
                </h1>
            </div>
            <div className='card_body text-center'>
                <img src={InProgressClock} alt="InProgressClock" className='padding-t-2x' />

                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "35px 20px 0 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >{BSvalue?.amount}</span>
                    </div>
                    <div className='swap_Arrow_icon' style={{ position: "absolute", right: "4px", top: "6%" }}>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" />
                    </div>
                </div>
                <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", paddingBottom: "50px", paddingTop: 0 }}>

                    <span placeholder="0" className="font_20x " style={{ fontSize: 60 }} >0.00908 </span>
                    <span className="font_20x" style={{
                        color: "rgba(96, 96, 96,.5)", paddingLeft: 10
                    }} >{filteredFromArray[0].title}</span>

                </div>

                <div className='font_20x padding-b-2x'>Your convert order is being processed.</div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("/indexx-exchange/buy-sell/wallet")}> Go to Wallet</Button>
                <a className="font_15x bs_link text-center d-block padding-t-3x" href="# " >New Convert</a>
            </div>
        </div>
    )
}

export default BSBuyInProgress;