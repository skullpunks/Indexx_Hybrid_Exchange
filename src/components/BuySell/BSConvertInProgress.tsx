import React, { useEffect, useState } from 'react'
import InProgressClock from "../../assets/arts/new_arts/clock green.svg";
import HiveInProgressClock from "../../assets/arts/new_arts/clock yellow hive.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { Button } from 'antd';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { decodeJWT, getHoneyBeeDataByUsername, getOrderDetails } from '../../services/api';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSConvertInProgress: React.FC<(Props)> = ({ setScreenName }) => {
    const { BSvalue } = React.useContext(BSContext) as BSContextType;
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState() as any;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });
    const filteredToArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.toToken;
    });
    const [honeyBeeId, setHoneyBeeId] = useState("");
    const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
    const { id } = useParams();

    useEffect(() => {
        //getOrder();
        if (id) {
            setHoneyBeeId(String(id));
            getHoneyBeeDataByUsername(String(id)).then((data) => {
                
                setHoneyBeeEmail(data.data.userFullData?.email);
                getOrderDetails(data.data.userFullData?.email, String(BSvalue?.orderId)).then((order) => {
                    setOrderData(order.data);
                });
            });

        } else {
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            getOrderDetails(decoded.email, String(BSvalue?.orderId)).then((order) => {
                setOrderData(order.data);
            });
        }

    }, [])
    // }

    // const getOrder = async () => {
    //     let access_token = String(localStorage.getItem("access_token"));
    //     let decoded: any = decodeJWT(access_token);
    //     const order = await getOrderDetails(decoded.email, String(BSvalue?.orderId));
    //     
    //     setOrderData(order.data);
    // }

    return (
        <div className='bs_container card'>
            <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    {/* setScreenName("confirmConvert") */}
                    <span className='cursor-pointer' style={{ fontSize: 20, paddingRight: 10 }} onClick={() => {
                        if (honeyBeeId === "undefined" || honeyBeeId === "")
                            navigate('/indexx-exchange/buy-sell/');
                        else
                            navigate(`/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}`);
                    }
                    }>&#60;</span>

                    Convert in Progress
                </h1>
            </div>
            <div className='card_body text-center'>
                <img  src={localStorage.getItem("userlogged") === 'normal' ? InProgressClock : HiveInProgressClock}  alt="InProgressClock" className='padding-t-2x' width={"90px"} />

                <div className=" d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "35px 20px 0 20px" }}>
                        <span placeholder="0" className="font_60x " >{BSvalue?.amount}</span>
                        <span className="font_20x ps-2" style={{ lineHeight: 4 }} >{filteredFromArray[0].title}</span>
                    </div>
                    {/* <div className='swap_Arrow_icon' style={{ position: "absolute", right: "4px", top: "6%" }}>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" />
                    </div> */}
                </div>
                <div className="bs_curreny_left padding-b-2x pe-0" style={{ transform: "scale(1)", paddingBottom: "20px", paddingTop: 0 }}>

                    <span placeholder="0" className="font_20x " > <span className='dummy'>{Math.floor(orderData?.breakdown?.outAmount * 100000) / 100000}</span>  </span>
                    <span className="font_20x" style={{
                        color: "var(--conf_purchase)", paddingLeft: 10
                    }} >{filteredToArray[0].title}</span>

                </div>

                <div className='font_20x padding-b-2x'>Your convert order is being processed.</div>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("/indexx-exchange/buy-sell/wallet")}> Go to Wallet</Button>
                <Link className="font_15x bs_link text-center d-block padding-t-3x" to="/indexx-exchange/buy-sell?type=convert" >New Convert</Link>
            </div>
        </div>
    )
}

export default BSConvertInProgress;