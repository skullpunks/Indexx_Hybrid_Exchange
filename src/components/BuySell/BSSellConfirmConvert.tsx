import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import "./BS-Sell.css";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSSellConfirmConvert: React.FC<(Props)> = ({ setScreenName }) => {
    // const BSSellConfirmConvert: React.FC = () => {
    // console.log(setStatus);
    const navigate = useNavigate();
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    const navigateBak = () => {
        navigate("indexx-exchange/buy-sell?type=sell");
        setScreenName("");
    }

    return (
        <div className="bs_container card sell_screens">

            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span className='font_20x pe-2' onClick={navigateBak}>&#60;</span>
                    Confirm Sell
                </h1>
            </div>

            <div className='card-body '>
                <div className="bs_curreny d-flex position-relative padding-lr-2x  ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} > {filteredFromArray[0].title}</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >{BSvalue?.amount}</span>
                    </div>
                    <span className="font_20x" style={{
                        position: "absolute", bottom: "38px", left: "50%", fontSize: "12px"
                    }} >$ 1</span>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "24px", top: "60%" }} />
                    </div>
                </div>

                <div className='padding-lr-2x font_15x padding-b-2x padding-t-2x'>
                    <div className='d-flex flex-justify-between'><span> Sell To</span><span className='font_w_800'>USD Balance</span></div>
                    <div className='d-flex flex-justify-between'><span> Price</span><span className='font_w_800'>18,645.3576844548 USD / {filteredFromArray[0].title}</span></div>
                    <div className='d-flex flex-justify-between'><span> You will get</span><span className='font_w_800'>1.00 USD</span></div>
                    <div className='d-flex flex-justify-between'><span> Fees</span><span className='font_w_800'>0 USD</span></div>

                </div>
                {/* <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                        <div className="bs_token_left d-flex justify-between">
                            <div className="bs_token_num d-flex flex-align-center" >
                                <img src={ethereum} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                                ETH  <span className="token_grey">Ethereum</span><a className="font_15x bs_link padding-l-2x" style={{ paddingTop: "5px", }}>Max</a>
                            </div>
                        </div>
                        <div className="d-flex">  <div style={{
                            fontSize: "10px",
                            paddingTop: "7px",
                            paddingRight: "4px"
                        }}><div>0.00908 ETH</div><div>= $ 11.72</div></div><img src={arrowAddress} alt="arrow icon" style={{}} /></div>
                    </div> */}
                <div className="footer bs_footer_action">


                    <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" block onClick={() => setScreenName("BSSellInprogress")}> Confirm Conversion (11s)</Button>
                </div>
            </div>

        </div >
    )
}

export default BSSellConfirmConvert