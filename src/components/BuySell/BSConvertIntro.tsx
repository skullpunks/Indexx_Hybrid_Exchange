import React, { useEffect, useRef, useState } from 'react';
// import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";

// import bsDollar from "../../assets/arts/bsDollar.svg";
// import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { decodeJWT, getHoneyBeeDataByUsername, getWalletBalance } from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import graphTokens from "../../utils/graphs.json";

import { useNavigate, useParams } from 'react-router-dom';
// import { Option } from 'antd/lib/mentions';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

// const filteredArray = (items: any, keyName: any, key: any) => {
//     return items.filter(function (obj: any) {
//         return obj[keyName] === key;
//     });
// }
const BSConvertIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const ref = useRef<HTMLInputElement>(null);
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const [val, setVal] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    // const [showUserBalance, setShowUserBalance] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState("");
    const [honeyBeeId, setHoneyBeeId] = useState("");
    const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (ref.current) {
            ref.current.value = '';
        }
    }, []);
    useEffect(() => {
        return () => {
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            setEmail(decoded.email)
            if (BSvalue && BSvalue.amount !== 0) {

                setVal(BSvalue?.amount.toString());

                let amount = BSvalue?.amount.toString();
                let charFontSize = amount.length < 7 ? "1.1" : amount.length < 9 ? "0.9" : amount.length < 12 ? "0.8" : amount.length < 15 ? "0.6" : "0.4";
                let charWidth = amount.length <= 1 ? 1.2 : 0.9
                if (document.getElementsByClassName("input_currency")[0]) {
                    let element = document.getElementsByClassName("input_currency")[0] as HTMLBodyElement;
                    element.style.width = ((amount.length + 1) * charWidth) + 'ch';
                    element.style.fontSize = charFontSize + "ch";
                }
            }
            // getCoinBalance(String(filteredFromArray[0].title)).then((x) => {
            //     setUserBalance(x);
            // });

            if (id) {
                setHoneyBeeId(String(id));
                getHoneyBeeDataByUsername(String(id)).then((data) => {
                    setHoneyBeeEmail(data.data.userFullData?.email);
                });

            }
        }
    }, [BSvalue]);

    // const [flag, setFlag] = useState(false);
    const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            
            if (!/^\d{0,6}(?:\.\d{0,5})?$/.test(testVal)) {
                e.preventDefault();
                return;
            }
            setVal(testVal);
            let charFontSize = testVal.length < 7 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
            let charWidth = testVal.length <= 1 ? 1.1 : 0.9
            e.currentTarget.style.width = ((testVal.length + 1) * charWidth) + 'ch';
            e.currentTarget.style.fontSize = charFontSize + "ch";

            handleChange(String(BSvalue?.fromToken))
        }
    }

    const checkPurchase = () => {
        let getRequiredCoin = initialTokens.find(x => x.address === BSvalue?.fromToken);
        let getRequiredToCoin = initialTokens.find(x => x.address === BSvalue?.toToken);
        if (getRequiredCoin?.title === "FTT" && getRequiredToCoin?.title !== "INXP") {
            alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredCoin?.title === "INXP") {
            alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredToCoin?.title === "INXP" && getRequiredCoin?.title !== "FTT") {
            alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredToCoin?.title === "FTT" && getRequiredCoin?.title !== "INXP") {
            alert("You can only convert Indexx Phoenix(INXP) to FTX Token(FTT)");
            return;
        }
        if (val) {
            // setScreenName("confirmConvert");
            
            
            if (honeyBeeId === "undefined" || honeyBeeId === "")
                navigate("/indexx-exchange/buy-sell/confirm-convert");
            else
                navigate(`/indexx-exchange/buy-sell/confirm-convert/${honeyBeeId}`);
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(val) });
            }
        }
    }

    const getCoinBalance = async (value: string) => {
        
        if (honeyBeeId && honeyBeeEmail) {
            const res = await getWalletBalance(honeyBeeEmail, value);
            setSelectedCoin(value);
            if (res.status === 200) {
                setUserBalance(res.data.balance);
                // setShowUserBalance(true);
            } else {
                setUserBalance(0);
                // setShowUserBalance(true);
                return 0;
            }
        } else {
            const res = await getWalletBalance(email, value);
            
            setSelectedCoin(value);
            if (res.status === 200) {
                setUserBalance(res.data.balance);
                // setShowUserBalance(true);
                return Number(res.data.balance);
            } else {
                setUserBalance(0);
                // setShowUserBalance(true);
                return 0;
            }
        }
    }

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === BSvalue?.fromToken;
    });

    const handleChange = async (value: string) => {
        let getGraphCoin = graphTokens.find(x => x.address === value);
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value, fromGraph: String(getGraphCoin?.graph) });
        }
        let getRequiredCoin = initialTokens.find(x => x.address === value);
        await getCoinBalance(String(getRequiredCoin?.title));

    };

    const handleChangeToToken = (value: string) => {
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, toToken: value });
        }
    };
    const swapCoin = () => {
        let temp = BSvalue?.fromToken;
        let getRequiredCoin = initialTokens.find(x => x.address === temp);
        
        
        if (BSvalue && temp) {
            setBSvalue({ ...BSvalue, fromToken: BSvalue?.toToken, toToken: temp });
            //getCoinBalance(BSvalue?.fromTitle)
        }

    }

    return (
        <div>

            <div className="padding-lr-1x padding-tb-3x" style={{ paddingTop: 50, paddingBottom: 50 }} >
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-2x" style={{ transform: "scale(1)" }}>

                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} style={{ width: "1.2ch" }} />
                        <span className="font_20x px-1">{filteredFromArray[0].title}</span>
                        {/* <span className="font_20x">{BSvalue?.fromTitle}</span> */}
                    </div>
                    <div className='swap_Arrow_icon cursor-pointer' onClick={swapCoin}>
                        <img src={SwapArrowIcon} className="" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                <div className="font_20x opacity-75 justify-content-center d-flex" style={{ color: "var(--body_color)" }}>Enter Amount</div>
                {/* {(userBalance < parseFloat(val)) ?
                    <div className='error_message font_15x'>You can only convert a total of {Math.floor(userBalance * 10000) / 10000} </div>
                    :
                    <></>
                } */}
            </div>
            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>

                <Select className='width-100 border-0'
                    onChange={handleChange} value={BSvalue?.fromToken}>
                    {
                        initialTokens.filter(token => token.address !== BSvalue?.toToken).map((token, index) => {
                            return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} data-title={token.title} style={{paddingLeft : "15px", paddingRight : 0}}>
                                <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "var(--body_color)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                            </Select.Option>
                        })
                    }
                </Select>
            </div>

            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>
                <Select className='width-100 border-0'
                    onChange={handleChangeToToken} value={BSvalue?.toToken}>
                    {
                        initialTokens.filter(token => token.address !== BSvalue?.fromToken).map((token, index) => {
                            return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} data-title={token.title} style={{paddingLeft : "15px", paddingRight : 0}}>
                                <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "var(--body_color)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                            </Select.Option>
                        })
                    }
                </Select>
            </div>
            <div className="bs_footer_action " >
                <button style={{ marginTop: 5 }} className={((parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) && (parseFloat(val) <= (Math.floor(userBalance * 1000) / 1000))) ? " disable_icon" : (userBalance === 0 || (userBalance < parseFloat(val))) ? "disable_icon" : ""} disabled={((parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) && (parseFloat(val) <= (Math.floor(userBalance * 1000) / 1000))) || ((userBalance === 0 || (userBalance < parseFloat(val))))} onClick={checkPurchase} >Preview Convert </button>
            </div>

            {/* {showUserBalance && */}
                <div>
                    <h6 className='text-center'> Current avaliable balance : {Math.floor(userBalance * 10000) / 10000}  {selectedCoin} </h6>
                </div>
            {/* } */}
            {/* <div className='font_15x text-center d-block'>Convert all your (too) small balances directly</div>
            <Link to="" className="font_15x bs_link text-center d-block padding-tb-2x" onClick={() => setScreenName("confirmConvert")}>Convert Small Balances</Link> */}
        </div >
    )
}
export default BSConvertIntro;
