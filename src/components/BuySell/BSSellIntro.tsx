import React, { useEffect, useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import arrowAddress from "../../assets/arts/arrowAddress.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";
import bsDollar from "../../assets/arts/bsDollar.svg";
import "./BS-Sell.css";
// import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { Option } from 'antd/lib/mentions';
import initialTokens from "../../utils/Tokens.json";
import { getMinAndMaxOrderValues, getWalletBalance, decodeJWT } from '../../services/api';
import { useNavigate } from 'react-router-dom';
export interface TokensObj {
    title: string;
    subTitle: string;
    image: string;
    address: string;
    commonToken: boolean;
    graph: string;
}

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSSellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const [val, setVal] = useState("");
    const navigate = useNavigate()
    // const [flag, setFlag] = useState(false);
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const [isLimitPassed, setLimitPassed] = useState(true);
    const [minMavData, setMinMaxData] = useState() as any;
    const [email, setEmail] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    const [showUserBalance, setShowUserBalance] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState("");

    useEffect(() => {
        let access_token = String(localStorage.getItem("access_token"));
        let decoded: any = decodeJWT(access_token);
        setEmail(decoded.email)
        if (BSvalue && BSvalue.amount !== 0)
            setVal(BSvalue?.amount.toString());
        getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
            setMinMaxData(x);
        });
        //getCoinBalance(String(filteredFromArray[0].title));
        //removing INEX for sell
        //     const filteredPeople = initialTokens.filter((item) => item.title !== 'INEX');
        //    setUpdateInitialTokens(filteredPeople);

    }, [BSvalue])

    const getCoinBalance = async (value: string) => {
        const res = await getWalletBalance(email, value);
        console.log(res);
        setSelectedCoin(value);
        if (res.status === 200) {
            setUserBalance(res.data.balance);
            setShowUserBalance(true);
        } else {
            setUserBalance(0);
            setShowUserBalance(true);
        }
    }

    const handleChange = async (value: string) => {
        // setNetwork(value)
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value });
        }
        let getRequiredCoin = initialTokens.find(x => x.address === value);
        await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(val));
        await getCoinBalance(String(getRequiredCoin?.title));
    };

    const updateVal = async (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setVal(testVal);

            let charFontSize = testVal.length < 6 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
            let charWidth = testVal.length <= 1 ? 1.1 : 0.9
            e.currentTarget.style.width = ((testVal.length + 1) * charWidth) + 'ch';
            e.currentTarget.style.fontSize = charFontSize + "ch";

            let value = BSvalue?.fromTitle;
            console.log(filteredFromArray[0].title)
            console.log(value)
            //let getRequiredCoin = initialTokens.find(x => x.address === value);
            //console.log(String(getRequiredCoin?.title));
            console.log(isLimitPassed, minMavData)
            await checkMinMaxValue(String(value), parseInt(testVal));



        }
    }

    const filteredFromArray = initialTokens.filter(function (obj: any) {
        return (obj?.address === BSvalue?.fromToken);
    });

    const getMinMaxValue = async (value: string) => {
        let res = await getMinAndMaxOrderValues(value, "SELL");
        console.log(res);
        return res;
    }

    const checkMinMaxValue = async (value: string, buyValue: number) => {
        let minAndMax = await getMinMaxValue(value);
        setMinMaxData(minAndMax);
        if (buyValue > minAndMax.max) {
            setLimitPassed(false);
        } else if (buyValue < minAndMax.min) {
            setLimitPassed(false);
        }
        else {
            setLimitPassed(true);
        }
    }

    const formSubmit = () => {

        if (val) {
            // setScreenName("BSSellConfirmConvert");
            navigate("/indexx-exchange/buy-sell/sell-confirm-convert");
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(val) });
            }
        }
    }
    // console.log(checkPurchase);
    // debugger;
    return (
        <div className='sell_screens'>

            <div className="padding-lr-2x padding-tb-3x">
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-2x flex-align-center" style={{ transform: "scale(1)" }}>
                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} style={{ width: "1.2ch" }} />
                        <span className="font_20x px-1">{filteredFromArray[0].title}</span>

                        {/* <span className="font_20x">IN500</span> */}
                    </div>
                    {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
                </div>
                {/* {((!isLimitPassed) && )?
                    <div className='error_message font_15x'>You can only Sell a minimum of {String(minMavData?.min)} USD or maximum of {String(minMavData?.max)} USD </div>
                    :
                    <></>
                } */}

            </div>
            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>
                {/* <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={require(`../../assets/token-icons/IN500.png`).default} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        IN500  <span className="token_grey">Index500</span><Link to="" className="font_15x bs_link padding-l-2x" style={{ paddingTop: "5px", }}>Max</Link>
                    </div>
                </div> */}
                <Select className='width-100 border-0'
                    onChange={handleChange} value={BSvalue?.fromToken}>
                    {
                        initialTokens
                            .filter(function (token) {
                                return token.title !== "INEX";
                            })
                            .map((token, index) => {

                                return <Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} >
                                    <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                                </Option>
                            })
                    }

                </Select>

            </div>

            <div className="bs_token d-flex cursor-pointer py-4" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">

                    <div className="bs_token_num d-flex flex-align-center px-3" >
                        <img src={bsDollar} alt="Index icon" width="38" height="38" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>
                {/* <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div> */}
            </div>
            <div className="bs_footer_action ">
                {/* <button className="sell_btn" disabled={(!isLimitPassed)} onClick={formSubmit}>Preview Sell </button> */}
                <button className={((parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) && (parseFloat(val) <= (Math.floor(userBalance * 1000) / 1000))) ? "disable_icon" :
                    (userBalance === 0 || (userBalance < parseFloat(val))) ? "disable_icon" : ""} onClick={formSubmit}>Preview Sell </button>
            </div>
            {showUserBalance &&
                <div>
                    <h6 className='text-center'> Current Avaliable Balance : {Math.floor(userBalance * 10000) / 10000}  {selectedCoin} </h6>
                </div>
            }
        </div >
    )
}
export default BSSellIntro;
