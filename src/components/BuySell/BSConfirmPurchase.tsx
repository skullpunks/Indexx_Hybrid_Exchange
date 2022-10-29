import { Button } from 'antd';
import React, { useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import { getCoinPriceByName, getAppSettings, createBuyOrder, oneUSDHelper } from '../../services/api';

// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let priceData: any = {};
let appSettingArr: any[] = [];



const BSConfirmPurchase: React.FC<(Props)> = ({ setScreenName }) => {
    const { BSvalue } = React.useContext(BSContext) as BSContextType;

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });

    const getPricesData = async () => {
        const res = await getCoinPriceByName(String(filteredFromArray[0].title));
        priceData = res.data;
        console.log(priceData);
        let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
        setTotalAmountToPay(oneUsdValue * Number(BSvalue?.amount));
    }
    getPricesData();
    const getAllSetting = async () => {
        const res = await getAppSettings();
        appSettingArr = res.data;
        let adminFees = appSettingArr.find((item: any) => item.key === "IndexxTokensAdminFees");
        setAdminFees(adminFees.value)
    }
    const [adminFee, setAdminFees] = useState("");
    getAllSetting();
    const [totalAmountToPay, setTotalAmountToPay] = useState(0);

    const openStipePayment = async () => {
        let res = await createBuyOrder(filteredFromArray[0].title, 'USD', Number(BSvalue?.amount), priceData);
        if (res.status === 200) {
            // route to new page by changing window.location
            window.open("https://buy.stripe.com/test_14k3dEgSm2Zb2Iw289", "_self") //to open new page
        } else {
            alert("Failed to create an order");
        }
    }


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
                    <span>{Math.round(totalAmountToPay * 100) / 100} {filteredFromArray[0].title}</span>
                </div>
                <div className='d-flex' style={{
                    justifyContent: "flex-end"
                }}> <small>Transaction/Admin Fee: {adminFee}</small></div>


                <div className="footer bs_footer_action">
                    {Number(BSvalue?.amount) > 50 &&
                        <h6>Rewards Applied for this order: {(Math.round(Number(BSvalue?.amount) * 100) / 100) * 30 / 100} INEX</h6>
                    }
                    {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => setScreenName("BSBuyInProgress")}> Confirm Purchase (11s)</Button> */}
                    <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => openStipePayment()}> Confirm Purchase (11s)</Button>
                </div>
            </div>

        </div>
    )
}

export default BSConfirmPurchase