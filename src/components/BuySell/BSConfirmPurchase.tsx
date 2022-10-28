import { Button } from 'antd';
import React from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";


// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSConfirmPurchase: React.FC<(Props)> = ({ setScreenName }) => {
    const { BSvalue } = React.useContext(BSContext) as BSContextType;


    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });

    return (
        <div className="bs_container card">

            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => setScreenName("")}>&#60;</span>
                    Confirm Purchase
                </h1>
                {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
            </div>

            <div className='card-body '>
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >{BSvalue?.amount}</span>
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Rate</span>
                    <span>{BSvalue?.amount} USD / {filteredFromArray[0].title}</span>
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Total</span>
                    <span>0.00908 {filteredFromArray[0].title}</span>
                </div>
                <div className='d-flex' style={{
                    justifyContent: "flex-end"
                }}> <small>Transaction/Admin Fee: 0.05% </small></div>


                <div className="footer bs_footer_action">


                    <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => setScreenName("BSBuyInProgress")}> Confirm Purchase (11s)</Button>
                </div>
            </div>

        </div>
    )
}

export default BSConfirmPurchase