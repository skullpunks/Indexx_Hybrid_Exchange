import React, { useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
import { Select } from 'antd';
// import { Option } from 'antd/lib/mentions';
import bsDollar from "../../assets/arts/bsDollar.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import initialTokens from "../../utils/Tokens.json";
import graphTokens from "../../utils/graphs.json";
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMinAndMaxOrderValues, isLoggedIn } from "../../services/api";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import "./BS-Sell.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuyContent: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const navigateUser = () => {
        if (isLoggedIn()) {
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(buyVal) });
            }
            navigate("/indexx-exchange/buy-sell/confirm-purchase");
            // setScreenName("confirmPurchase");
        } else {
            // setScreenName("create");
            navigate("/indexx-exchange/buy-sell/create");
        }
    }

    const [buyVal, setBuyVal] = useState("");
    const [isLimitPassed, setLimitPassed] = useState(true);
    const [minMavData, setMinMaxData] = useState() as any;

    useEffect(() => {
        if (BSvalue && BSvalue.amount !== 0) {
            setBuyVal(BSvalue?.amount.toString());
            let amount = BSvalue?.amount.toString();
            let charFontSize = amount.length < 6 ? "1.1" : amount.length < 9 ? "0.9" : amount.length < 12 ? "0.8" : amount.length < 15 ? "0.6" : "0.4";
            let charWidth = amount.length <= 1 ? 1.2 : 0.9
            if (document.getElementsByClassName("input_currency")[0]) {
                let element = document.getElementsByClassName("input_currency")[0] as HTMLBodyElement;
                element.style.width = ((amount.length + 1) * charWidth) + 'ch';
                element.style.fontSize = charFontSize + "ch";
            }
        }
        getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
            // console.log(x);
            setMinMaxData(x);
        });


    }, [BSvalue])

    const handleChange = async (value: string) => {
        let getRequiredCoin = initialTokens.find(x => x.address === value);
        let getGraphCoin = graphTokens.find(x => x.address === value);

        console.log(getGraphCoin);
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value, fromGraph: String(getGraphCoin?.graph) });
        }
        await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(buyVal));
    };

    const checkMinMaxValue = async (value: string, buyValue: number) => {

        let minAndMax = await getMinMaxValue(value);
        // debugger;
        if (buyValue > minAndMax.max) {
            setLimitPassed(false);
        } else if (buyValue < minAndMax.min) {
            setLimitPassed(false);
        }
        else {
            setLimitPassed(true);
        }
    }

    const getMinMaxValue = async (value: string) => {
        let res = await getMinAndMaxOrderValues(value, "BUY");
        return res;
    }

    const updateBuyVal = async (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setBuyVal(testVal);

            // let charFontSize = (testVal.length > 7) ? 0.9 : 1.1;
            let charFontSize = testVal.length < 6 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
            let charWidth = testVal.length <= 1 ? 1.2 : 0.9
            e.currentTarget.style.width = ((testVal.length + 1) * charWidth) + 'ch';
            e.currentTarget.style.fontSize = charFontSize + "ch";



            let value = BSvalue?.fromToken;
            // debugger;
            let getRequiredCoin = initialTokens.find(x => x.address === value);
            console.log(String(getRequiredCoin?.title));
            await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(testVal));
        }
    }

    return (
        <div><div className="bs_container_main">
            <div className="bs_curreny d-flex position-relative ">
                <div className="bs_curreny_left padding-b-2x flex-align-center" style={{ transform: "scale(1)" }}>
                    <span className="font_20x">$</span>
                    {/* <input placeholder="0" className=" " type="text" value={val} onChange={() => updateBuyVal} style={{ width: "207px" }} /> */}
                    <input placeholder="0" className="input_currency" type="number" value={buyVal} onChange={updateBuyVal} style={{ width: "1.2ch" }} />
                </div>
                {/* <div className='swap_Arrow_icon'>
                    <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                </div> */}

            </div>
            {(!isLimitPassed) ?
                <div className='error_message font_15x'>You can only Buy a minimum of {String(minMavData?.min)} USD or maximum of {String(minMavData?.max)} USD</div>
                :
                <></>
            }
            {/* <div className="bs_purchase d-flex">
                <Dropdown overlay={menu} trigger={['click']} >
                    <Space style={{ color: "#F66036" }}>
                        <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                        One-time purchase
                    </Space>
                </Dropdown>
            </div> */}
        </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="38" height="38" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>

            </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center", padding: 8 }} >
                <div className="bs_token_left d-flex justify-between">
                    <div className=' d-flex flex-justify-between flex-align-center width-100'>
                        <Select className='width-100 border-0'
                            onChange={handleChange} value={BSvalue?.fromToken}>
                            {
                                initialTokens.map((token, index) => {

                                    return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} >
                                        <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                                    </Select.Option>
                                })
                            }

                        </Select>
                    </div>
                </div>

            </div>



            <div className="bs_footer_action">
                {/* disabled={(!isLimitPassed)} */}
                <button onClick={navigateUser} className={(!isLimitPassed || buyVal === "") ? "disable_icon " : ""} >Preview Purchase </button>
            </div>
        </div>
    )
}

export default BuyContent;