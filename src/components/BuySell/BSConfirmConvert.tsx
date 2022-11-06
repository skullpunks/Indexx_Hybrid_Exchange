import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { CheckCircleFilled } from '@ant-design/icons';
import { getAppSettings, getCoinPriceByName } from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";


// const filteredArray = (items: any, keyName: any, key: any) => {
//     return items.filter(function (obj: any) {
//         return obj[keyName] === key;
//     });
// }

// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSConfirmConvert: React.FC<(Props)> = ({ setScreenName }) => {
    // const BSConfirmConvert: React.FC = () => {
    // console.log(setStatus);
    const navigate = useNavigate();
    const [rateData1, setRateData1] = useState();
    const [rateData3, setRateData3] = useState(0);
    const [totalAmountToPay, setTotalAmountToPay] = useState(0);
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    const filteredToArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.toToken;
    });
    const navigateBak = () => {
        navigate("/indexx-exchange/buy-sell?type=convert");
        // setScreenName("");
    }
    
    let priceData1: any = {};
    let priceData2: any = {};
    let appSettingArr: any[] = [];

    useEffect(() => {
        getAllSetting();
        getPricesData();
    }, [BSvalue])

    const getPricesData = async () => {
        const res = await getCoinPriceByName(String(filteredFromArray[0].title));
        priceData1 = res.data;
        console.log(priceData1.results.data);
        setRateData1(priceData1.results.data);
        const res2 = await getCoinPriceByName(String(filteredToArray[0].title));
        priceData2 = res2.data;
        console.log(priceData2);
        let finalRate = priceData1.results.data / priceData2.results.data;
        console.log(finalRate);
        setRateData3(finalRate);
        console.log(rateData1);

        console.log(finalRate * Number(BSvalue?.amount));
        setTotalAmountToPay(finalRate * Number(BSvalue?.amount))
        // let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
        // console.log('usid oper', oneUsdValue)
        // console.log('usid oper1', Number(BSvalue?.amount))
        // setTotalAmountToPay(priceData * Number(BSvalue?.amount) - (priceData * Number(BSvalue?.amount) * Number(adminFee)));
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
        console.log(adminFee)
    }
    const [adminFee, setAdminFees] = useState("");

    // const processConvertOrder = async () => {
    //     let basecoin: string = filteredFromArray[0].title;
    //     const res = await confirmSellOrder(order.user.email, order.orderId, "Completed", basecoin);
    //     if (res.status === 200) {
    //         openNotificationWithIcon('success');
    //         // setScreenName("BSSellInprogress");
    //         navigate("/indexx-exchange/buy-sell/sell-in-progress");
    //     } else {
    //         openNotificationWithIcon2('error');
    //     }
    // }

    return (
        <div className="bs_container card">

            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={navigateBak}>&#60;</span>
                    Confirm Convert
                </h1>
                {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
            </div>

            <div className='card-body '>
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >{filteredFromArray[0].title}</span>
                        <span placeholder="0" className="ps-2" style={{ fontSize: 60 }} >{BSvalue?.amount}</span>
                    </div>
                    {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Rate</span>
                    <span>{Math.floor(rateData3 * 100) / 100} {filteredFromArray[0].title} / {filteredToArray[0].title}</span>
                </div>
                <div className="bs_token d-flex cursor-pointer justify-between font_20x" style={{ alignItems: "center" }}>
                    <span>Total</span>
                    <span>{Math.floor(totalAmountToPay * 100) / 100} {filteredToArray[0].title}</span>
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

                    {/* setScreenName("BSConvertInProgress")  rocessSellOrder()*/}
                    <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => navigate("/indexx-exchange/buy-sell/convert-in-progress")}> Confirm Conversion (11s)</Button>
                
                </div>
            </div>

        </div>
    )
}

export default BSConfirmConvert