import { Button, Modal } from 'antd';
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
// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let priceData: any = {};
let appSettingArr: any[] = [];

// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_ZTI5dPgnBbXxRALEMXe68On600sw5BceTC");


const BSConfirmPurchase: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    const { BSvalue } = React.useContext(BSContext) as BSContextType;

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });

    const getPricesData = async () => {
        const res = await getCoinPriceByName(String(filteredFromArray[0].title));
        priceData = res.data;
        console.log(priceData);
        setRateData(priceData);
        let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
        console.log('usid oper', oneUsdValue)
        console.log('usid oper1', Number(BSvalue?.amount))
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

    // Create an order and PaymentIntent as soon as the confirm purchase button is clicked

    const createNewBuyOrder = async () => {
        let basecoin: string = filteredFromArray[0].title;
        let quotecoin: string = 'USD';
        let amount: number = Number(BSvalue?.amount);
        const res = await createBuyOrder(basecoin, quotecoin, amount);
        console.log(res.data);
        getStripePaymentIntent(res.data.orderId, res.data.user.email);
    }

    const getStripePaymentIntent = async (orderId: string, email: string) => {
        const res = await createStripePaymentIntent(Number(BSvalue?.amount), orderId, email);
        setClientSecret(res.client_secret);
        showTransferModal();
    };

    useEffect(() => {
        getAllSetting();
    }, [BSvalue])

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
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => navigate("/indexx-exchange/buy-sell/")}>&#60;</span>
                    Confirm Purchase
                </h1>
                {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
            </div>

            <div className='card-body padding-0'>
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left flex-align-center padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className="font_60x color_general padding-l-1x"  >{BSvalue?.amount}</span>
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
                    <span>{Math.floor(totalAmountToPay * 100) / 100} {filteredFromArray[0].title}</span>
                </div>
                <div className='d-flex pe-3' style={{
                    justifyContent: "flex-end"
                }}> <small>Transaction/Admin Fee: {adminFee || "0.00"}</small></div>


                <div className="footer bs_footer_action">
                    {Number(BSvalue?.amount) > 50 &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.floor(Number(BSvalue?.amount) * 100) / 100) * 30 / 100} INEX</h6>
                    }
                    {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => setScreenName("BSBuyInProgress")}> Confirm Purchase (11s)</Button> */}
                    <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => createNewBuyOrder()}> Confirm Purchase</Button>

                    <Modal title="Stripe Payment" visible={isTransferModalVisible} onOk={handleTransferOk} onCancel={handleTransferCancel} footer={null} width={850} maskClosable={false}>
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