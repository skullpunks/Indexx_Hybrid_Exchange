import React, { useEffect, useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";
import bsDollar from "../../assets/arts/bsDollar.svg";
import "./BS-Sell.css";
// import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { Option } from 'antd/lib/mentions';
import initialTokens from "../../utils/Tokens.json";
import { getMinAndMaxOrderValues } from '../../services/api';
interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSSellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const [val, setVal] = useState("");
    // const [flag, setFlag] = useState(false);
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const [isLimitPassed, setLimitPassed] = useState(true);
    const [minMavData, setMinMaxData] = useState() as any;

    useEffect(() => {
        if (BSvalue && BSvalue.amount !== 0)
            setVal(BSvalue?.amount.toString());
        getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
            setMinMaxData(x);
        });
    }, [BSvalue])

    const handleChange = async (value: string) => {
        // setNetwork(value)
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value });
        }
        let getRequiredCoin = initialTokens.find(x => x.address === value);
        await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(val));
    };

    const updateVal = async (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setVal(testVal);
            let value = BSvalue?.fromTitle;
            let getRequiredCoin = initialTokens.find(x => x.address === value);
            console.log(String(getRequiredCoin?.title));
            await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(testVal));
        }
    }

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
    // const checkPurchase = () => {



    // }

    const formSubmit = () => {

        if (val) {
            setScreenName("BSSellConfirmConvert");
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(val) });
            }
        }
    }
    // console.log(checkPurchase);
    // debugger;
    return (
        <div className='sell_screens'>

            <div style={{ marginTop: "40px", marginRight: "26px" }} className="padding-b-2x ">
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)" }}>

                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} />
                        {/* <span className="font_20x">IN500</span> */}
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                {(!isLimitPassed) ?
                    <div className='error_message font_15x'>You can only Sell a minimum of {String(minMavData?.min)} USD or maximum of {String(minMavData?.max)} USD </div>
                    :
                    <></>
                }
            </div>
            <div className="bs_token d-flex cursor-pointer py-4" style={{ alignItems: "center" }}>
                {/* <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={require(`../../assets/token-icons/IN500.png`).default} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        IN500  <span className="token_grey">Index500</span><Link to="" className="font_15x bs_link padding-l-2x" style={{ paddingTop: "5px", }}>Max</Link>
                    </div>
                </div> */}
                <Select className='width-100 border-0'
                    onChange={handleChange} value={BSvalue?.fromToken}>
                    {
                        initialTokens.map((token, index) => {

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
                <button className="sell_btn" disabled={(!isLimitPassed)} onClick={formSubmit}>Preview Sell </button>
            </div>

        </div >
    )
}
export default BSSellIntro;
