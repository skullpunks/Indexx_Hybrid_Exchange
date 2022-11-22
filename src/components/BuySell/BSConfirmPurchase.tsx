import { Button, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import { getCoinPriceByName, getAppSettings, oneUSDHelper, createStripePaymentIntent, createBuyOrder } from '../../services/api';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Stripe/CheckoutForm";
import "../Stripe/CheckoutForm.css"
import { useNavigate } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';

// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let priceData: any = {};
let appSettingArr: any[] = [];

// This is your test publishable API key.
 const stripePromise = loadStripe("pk_test_ZTI5dPgnBbXxRALEMXe68On600sw5BceTC");
// This is your live publishable API key.
//const stripePromise = loadStripe("pk_live_zzWqHxo3dd26OcBFKjTHrsNZ00O7B4PcT6");

const BSConfirmPurchase: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    const { BSvalue } = React.useContext(BSContext) as BSContextType;

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });

    const getPricesData = async () => {
        const res = await getCoinPriceByName(String(filteredFromArray[0].title));
        priceData = res.data.results.data;
        console.log(priceData);
        setRateData(priceData);
        let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
        console.log('usid oper', oneUsdValue)
        console.log('usid oper1', Number(BSvalue?.amount))
        const finalPay = oneUsdValue * Number(BSvalue?.amount) * (1 - Number(adminFee) / 100);
        setTotalAmountToPay(finalPay);
    }

    const getAllSetting = async () => {
        const res = await getAppSettings();
        appSettingArr = res.data;
        let adminFees = appSettingArr.find((item: any) => item.key === "IndexxTokensAdminFees");
        setAdminFees(adminFees.value)
    }
    const [adminFee, setAdminFees] = useState("");
    const [totalAmountToPay, setTotalAmountToPay] = useState(0);
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [rateData, setRateData] = useState();
    const showTransferModal = () => {
        setIsTransferModalVisible(true);
    };

    const handleTransferOk = () => {
        setIsTransferModalVisible(false);
    };

    const handleTransferCancel = () => {
        setIsTransferModalVisible(false);
    };

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon2 = (type: NotificationType, message: string) => {
        notification[type]({
            message: message,
            description: '',
            icon: <CloseCircleFilled />,
            style: {
                border: "1px solid #F66036",
                boxShadow: "none",
                borderRadius: 5,
                top: 100
            },
        });
    };

    // Create an order and PaymentIntent as soon as the confirm purchase button is clicked

    const createNewBuyOrder = async () => {
        let basecoin: string = filteredFromArray[0].title;
        let quotecoin: string = 'USD';
        let amount: number = Number(BSvalue?.amount);
        const res = await createBuyOrder(basecoin, quotecoin, amount);
        if (res.status === 200) {
            getStripePaymentIntent(res.data.orderId, res.data.user.email);
        } else {
            openNotificationWithIcon2('error', res.data);
        }
    }

    const getStripePaymentIntent = async (orderId: string, email: string) => {
        const res = await createStripePaymentIntent(Number(BSvalue?.amount), orderId, email);
        setClientSecret(res.client_secret);
        showTransferModal();
    };

    useEffect(() => {
        getAllSetting();
        getPricesData();
        // if(document.getElementById("input_get_value") && document.getElementById("input_get_value")?.innerHTML){
        let element = document.getElementById("input_get_value")!;
        let testVal = element.innerText;
        let charFontSize = testVal.length < 6 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
        let charWidth = testVal.length <= 1 ? 1.1 : 0.9
        element.style.width = ((testVal.length + 1) * charWidth) + 'ch';
        element.style.fontSize = charFontSize + "ch";
        // }
    })

    const appearance = {
        theme: String('stripe'),
    };
    const options = {
        clientSecret,
        appearance
        // appearance: {
        //     theme: String('stripe'),
        // }
    } as any;
    // const openStipePayment = async () => {
    //     let res = await createBuyOrder(filteredFromArray[0].title, 'USD', Number(BSvalue?.amount), priceData);
    //     if (res.status === 200) {
    //         // route to new page by changing window.location
    //         window.open("https://buy.stripe.com/test_14k3dEgSm2Zb2Iw289", "_self") //to open new page
    //     } else {
    //         alert("Failed to create an order");
    //     }
    // }

    return (
        <div className="bs_container card">

            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span className='cursor-pointer' onClick={() => navigate("/indexx-exchange/buy-sell/")}>&#60;</span> &nbsp;
                    Confirm Purchase
                </h1>
                {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
            </div>

            <div className='card-body padding-0'>
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left flex-align-center padding-b-2x" style={{ alignItems: "baseline", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className="font_60x color_general padding-l-1x" id="input_get_value" style={{ width: "1.2ch", minHeight: "100px", lineHeight: "100px" }} >{BSvalue?.amount}</span>
                        {/* <span placeholder="0" id="input_get_value" style={{ width: "1.2ch" }} className="font_60x color_general padding-l-1x"  >{BSvalue?.amount}</span> */}
                    </div>
                    {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Rate</span>
                    <span>{rateData} USD / {filteredFromArray[0].title}</span>
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Total</span>
                    <span>{Math.floor(totalAmountToPay * 1000000) / 1000000} {filteredFromArray[0].title}</span>
                </div>
                <div className='d-flex pe-3' style={{
                    justifyContent: "flex-end"
                }}> <small>Transaction/Admin Fee: {adminFee || "0.00"} %</small></div>


                <div className="footer bs_footer_action">
                    {Number(BSvalue?.amount) > 50 &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.floor(Number(BSvalue?.amount) * 100) / 100) * 30 / 100} INEX</h6>
                    }
                    {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => setScreenName("BSBuyInProgress")}> Confirm Purchase (11s)</Button> */}
                    <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => createNewBuyOrder()}> Confirm Purchase</Button>

                    <Modal title="indexx.ai" visible={isTransferModalVisible} onOk={handleTransferOk} onCancel={handleTransferCancel} footer={null} width={850} maskClosable={false} className="buy_purchase_modal">
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </Modal>
                </div>
            </div>

        </div>
    )
}

export default BSConfirmPurchase