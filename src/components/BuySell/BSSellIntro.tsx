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

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSSellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const [val, setVal] = useState("");
    // const [flag, setFlag] = useState(false);
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;

    useEffect(() => {
        if (BSvalue && BSvalue.amount !== 0)
            setVal(BSvalue?.amount.toString());
    }, [BSvalue])

    const handleChange = (value: string) => {
        // setNetwork(value)
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value });
        }
        console.log(`selected ${value}`);
        console.log(BSvalue);
    };
    const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;

            // if (parseFloat(val) > 0.0007) {
            //     setFlag(false);
            // } else {
            //     setFlag(true)
            // }
            setVal(testVal);
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
                {(parseFloat(val) < 0.0007) ?
                    <div className='error_message font_15x'>You can only convert a minimum total of 0.0007 </div>
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
                        <img src={bsDollar} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>
                {/* <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div> */}
            </div>
            <div className="bs_footer_action ">
                <button className={(parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) ? "sell_btn disable_icon" : "sell_btn"} onClick={formSubmit}>Preview Sell </button>
            </div>

        </div >
    )
}
export default BSSellIntro;
