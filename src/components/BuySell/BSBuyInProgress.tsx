import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InProgressClock from "../../assets/arts/InProgressClock.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

//http://localhost:3001/indexx-exchange/buy-sell/buy-in-progress/?orderCurrency=${inCurrenyName}&orderAmount=${orderAmount}&payCurrency=${outCurrencyName}&payAmount=${payAmount}
const BSBuyInProgress: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    const [orderCurrency] = useSearchParams();
    const [orderAmount] = useSearchParams();
    const [payCurrency] = useSearchParams();
    const [payAmount] = useSearchParams();
    const [incurr, setIncurr] = useState("");
    const [inAmt, setInAmt] = useState(0);
    const [outcurr, setoutcurr] = useState("");
    const [outAmt, setoutAmt] = useState(0);

    useEffect(() => {
        const orderCurr = String(orderCurrency.get("orderCurrency"));
        //setOrderCurrency(orderCurr)
        console.log(orderCurr)
        setIncurr(orderCurr)
        setInAmt(Number(orderAmount.get("orderAmount")));
        setoutcurr(String(payCurrency.get("payCurrency")));
        setoutAmt(Number(payAmount.get("payAmount")));
    }, [payAmount, payCurrency, orderAmount, orderCurrency])
    console.log(incurr)

    // const filteredFromArray = initialTokens.filter(function (obj) {
    //     return obj?.address === BSvalue?.fromToken;
    // });
    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    {/* onClick={() => setScreenName("confirmPurchase")} */}
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => navigate("/indexx-exchange/buy-sell/confirm-purchase")}>&#60;</span>
                    Purchase in Progress
                </h1>
            </div>
            <div className='card_body text-center'>
                <img src={InProgressClock} alt="InProgressClock" className='padding-t-2x' />

                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "35px 20px 0 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >{inAmt}</span>
                    </div>
                    <div className='swap_Arrow_icon' style={{ position: "absolute", right: "4px", top: "6%" }}>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" />
                    </div>
                </div>
                <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", paddingBottom: "50px", paddingTop: 0 }}>

                    <span placeholder="0" className="font_20x " style={{ fontSize: 60 }} >{Math.floor(outAmt * 100) / 100}</span>
                    <span className="font_20x" style={{
                        color: "rgba(96, 96, 96,.5)", paddingLeft: 10
                    }} >{outcurr}</span>

                </div>

                <div className='font_20x padding-b-2x'>Your convert order is being processed.</div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("/indexx-exchange/buy-sell/wallet")}> Go to Wallet</Button>
                <a className="font_15x bs_link text-center d-block padding-t-3x" href="# " >New Convert</a>
            </div>
        </div>
    )
}

export default BSBuyInProgress;