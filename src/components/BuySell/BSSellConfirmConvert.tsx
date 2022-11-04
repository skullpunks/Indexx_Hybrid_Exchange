import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
import { CheckCircleFilled } from '@ant-design/icons';

import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import "./BS-Sell.css";
// import { createSellOrder, getAppSettings } from '../../services/api';
import { confirmSellOrder, createSellOrder, getAppSettings, getCoinPriceByName, oneUSDHelper } from '../../services/api';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let appSettingArr: any[] = [];

const BSSellConfirmConvert: React.FC<(Props)> = ({ setScreenName }) => {
    // const BSSellConfirmConvert: React.FC = () => {
    // console.log(setStatus);
    const navigate = useNavigate();
    const [rateData, setRateData] = useState();
    const [totalAmountToPay, setTotalAmountToPay] = useState(0);
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const [isFirstEnabled, setisFirstEnabled] = useState(true);
    const [isSecondEnabled, setisSecondEnabled] = useState(false);
    const [order, setOrder] = useState() as any;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    let priceData: any = {};

    const navigateBak = () => {
        navigate("/indexx-exchange/buy-sell?type=sell");
        // setScreenName("");
    }

    useEffect(() => {
        getAllSetting();
        getPricesData();

    })

    const getPricesData = async () => {
        const res = await getCoinPriceByName(String(filteredFromArray[0].title));
        priceData = res.data;
        console.log(priceData);
        setRateData(priceData);
        let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
        console.log('usid oper', oneUsdValue)
        console.log('usid oper1', Number(BSvalue?.amount))
        setTotalAmountToPay(priceData * Number(BSvalue?.amount) - (priceData * Number(BSvalue?.amount) * Number(adminFee)));
    }

    const createNewSellOrder = async () => {
        let basecoin: string = filteredFromArray[0].title;
        let quotecoin: string = 'USD';
        let amount: number = Number(BSvalue?.amount);
        const res = await createSellOrder(basecoin, quotecoin, amount);
        console.log(res.data, res);
        if (res.status === 200) {
            setisFirstEnabled(false);
            setisSecondEnabled(true);
            setOrder(res.data);
        }
        //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    }

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
            message: 'Successfully Processed Sell Order',
            description: '',
            icon: <CheckCircleFilled className='text_link' />,
            style: {
                border: "1px solid #F66036",
                boxShadow: "none",
                borderRadius: 5,
                top: 100
            },

        });
    };

    const openNotificationWithIcon2 = (type: NotificationType) => {
        notification[type]({
            message: 'Failed to Process Sell Order. Please check balance on the wallet',
            description: '',
            icon: <CheckCircleFilled className='text_link' />,
            style: {
                border: "1px solid #F66036",
                boxShadow: "none",
                borderRadius: 5,
                top: 100
            },

        });
    };

    const processSellOrder = async () => {
        let basecoin: string = filteredFromArray[0].title;
        const res = await confirmSellOrder(order.user.email, order.orderId, "Completed", basecoin);
        if (res.status === 200) {
            openNotificationWithIcon('success');
            // setScreenName("BSSellInprogress");
            navigate("/indexx-exchange/buy-sell/sell-in-progress");
        } else {
            openNotificationWithIcon2('error');
        }
    }

    const getAllSetting = async () => {
        const res = await getAppSettings();
        appSettingArr = res.data;
        if (filteredFromArray[0].title.includes('I')) {
            let adminFees = appSettingArr.find((item: any) => item.key === "IndexxTokensAdminFees");
            setAdminFees(adminFees.value);
        } else {
            let adminFees = appSettingArr.find((item: any) => item.key === "AdminFees");
            setAdminFees(adminFees.value);
        }
    }
    const [adminFee, setAdminFees] = useState("");

    // const createNewSellOrder = async () => {
    //     let quotecoin: string = filteredFromArray[0].title;
    //     let basecoin: string = 'USD';
    //     let amount: number = Number(BSvalue?.amount);
    //     const res = await createSellOrder(basecoin, quotecoin, amount);
    //     console.log(res.data);

    //     setScreenName("BSSellInprogress");
    // }

    return (
        <div className="bs_container card sell_screens">

            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered cursor-pointer' style={{ color: "#5f5f5f" }}>
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
                    {/* <span className="font_20x" style={{
                        position: "absolute", bottom: "38px", left: "50%", fontSize: "12px"
                    }} >$ 1</span>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "24px", top: "60%" }} />
                    </div> */}
                </div>

                <div className='padding-lr-2x font_15x padding-b-2x padding-t-2x'>
                    <div className='d-flex flex-justify-between'><span> Sell To</span><span className='font_w_800'>USD Balance</span></div>
                    <div className='d-flex flex-justify-between'><span> Price</span><span className='font_w_800'>{rateData} {filteredFromArray[0].title}/ USD </span></div>
                    <div className='d-flex flex-justify-between'><span> You will get</span><span className='font_w_800'>{Math.floor(totalAmountToPay * 100) / 100} USD</span></div>
                    <div className='d-flex flex-justify-between'><span> Transaction/Admin Fee:</span><span className='font_w_800'>{adminFee} %</span></div>

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
                    {Number(totalAmountToPay) > 50 &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.round(Number(totalAmountToPay) * 100) / 100) * 30 / 100} INEX</h6>
                    }
                    {/* <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" block onClick={() => setScreenName("BSSellInprogress")}> Confirm Conversion (11s)</Button> */}
                    <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" hidden={(!isFirstEnabled)} block onClick={() => createNewSellOrder()}> Confirm Sell (11s)</Button>
                    <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" hidden={(!isSecondEnabled)} block onClick={() => processSellOrder()}> Confirm Conversion (11s)</Button>
                    {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => createNewSellOrder()}> Confirm Purchase (11s)</Button> */}

                </div>
            </div>

        </div >
    )
}

export default BSSellConfirmConvert