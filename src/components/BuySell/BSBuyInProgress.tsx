import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InProgressClock from "../../assets/arts/new_arts/clock green.svg";
import HiveInProgressClock from "../../assets/arts/new_arts/clock yellow hive.svg";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getPaypalOrder } from '../../services/api';
import CanStake from './Notification/CanStake';

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
    const [, setIncurr] = useState("");
    const [, setInAmt] = useState(0);
    const [outcurr, setoutcurr] = useState("");
    const [outAmt, setoutAmt] = useState(0);
    const [, setToken] = useState("");
    const [tokenValue] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const orderCurr = String(orderCurrency.get("orderCurrency"));
        setIncurr(orderCurr)
        setInAmt(Number(orderAmount.get("orderAmount")));
        setoutcurr(String(payCurrency.get("payCurrency")));
        setoutAmt(Number(payAmount.get("payAmount")));
        //---Below commented code is for Paypal payments---
        setToken(String(tokenValue.get("token")));
        if (tokenValue.get("token") !== undefined) {
            getPaypalOrder(String(tokenValue.get('token'))).then((res) => {
                
                if (res.status === 200) {
                    let orderData = res.data.data;
                    if(orderData?.orderType == "Buy" || orderData?.orderType == "Sell" || orderData?.orderType == "Convert") {
                    setoutAmt(orderData.breakdown.outAmount)
                    setoutcurr(orderData.breakdown.outCurrencyName)
                    setIsModalOpen(true);
                    } else {
                        navigate(`/indexx-exchange/powerpack-payment-success?orderId=${orderData?.orderId}`);
                    }
                    
                }
            });
        }
    }, [payAmount, payCurrency, orderAmount, orderCurrency, tokenValue])


    // const filteredFromArray = initialTokens.filter(function (obj) {
    //     return obj?.address === BSvalue?.fromToken;
    // });
    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "var(--body_color)" }}>
                    {/* onClick={() => setScreenName("confirmPurchase")} */}
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => navigate("/indexx-exchange/buy-sell")}>&#60;</span>
                    Purchase in Progress
                </h1>
            </div>
            <div className='card_body text-center'>
                <img  src={localStorage.getItem("userlogged") === 'normal' ? InProgressClock : HiveInProgressClock}  alt="InProgressClock" className='padding-t-2x' width={"90px"} />

                {/* <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "35px 20px 0 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >{inAmt}</span>
                    </div>
                    <div className='swap_Arrow_icon' style={{ position: "absolute", right: "4px", top: "6%" }}>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" />
                    </div>
                </div> */}
                <div className="bs_curreny_left p-3 " style={{ transform: "scale(1)", paddingBottom: "50px", paddingTop: 0, alignItems: "baseline", color:"var(--body_color)" }}>

                    <span placeholder="0" className="font_20x " style={{ fontSize: 60 }} >{Math.floor(outAmt * 10000) / 10000}</span>
                    <span className="font_20x" style={{
                        color: "var(--conf-purchase)", paddingLeft: 10
                    }} >{outcurr}</span>

                </div>

                <div className='font_20x padding-b-2x'>Your buy order is being processed. A confirmation email will be sent once the order is complete.</div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("/indexx-exchange/buy-sell/wallet")}> Go to Wallet</Button>
                <Link className="font_15x bs_link text-center d-block padding-t-3x" to="/indexx-exchange/buy-sell?type=buy" >New Buy</Link>
            </div>
            <div>
          <CanStake
            isVisible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        </div>
    )
}

export default BSBuyInProgress;