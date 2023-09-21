import React from 'react';
import InProgressClock from "../../assets/arts/InProgressClock.svg";
import initialTokens from "../../utils/Tokens.json";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BSContext, BSContextType } from '../../utils/SwapContext';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSSellInprogress: React.FC<(Props)> = ({ setScreenName }) => {
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    const filteredToArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.toToken;
    });
    const navigate = useNavigate()
    const navigateBak = () => {
        // setScreenName("BSSellConfirmConvert");
        navigate("/indexx-exchange/buy-sell");
    }
    
    
    
    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span style={{ fontSize: 20, paddingRight: 10 }} onClick={navigateBak}>&#60;</span>
                    Sell in Progress
                </h1>
            </div>
            <div className='card_body text-center'>
                <img src={InProgressClock} alt="InProgressClock" className='padding-t-2x' />

                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ padding: "30px 20px", alignItems: "baseline" }}>
                        <span placeholder="0" className="font_60x color_general" >{BSvalue?.amount}</span>
                        <span className="font_20x ps-2" >{BSvalue?.fromTitle}</span>
                    </div>

                </div>

                <div className='font_18x padding-b-2x'>Your sell order is being processed. A confirmation email will be sent once the order is complete.</div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block > Go to Wallet</Button>
                <Link className="font_15x bs_link text-center d-block padding-t-3x" to="/indexx-exchange/buy-sell?type=sell" >New Sell</Link>
            </div>
        </div>
    )
}

export default BSSellInprogress;