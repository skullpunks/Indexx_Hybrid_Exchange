import React, { useEffect, useState } from 'react';
// import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";

// import bsDollar from "../../assets/arts/bsDollar.svg";
// import { Link } from 'react-router-dom';
import { Select } from 'antd';
import initialTokens from "../../utils/Tokens.json";
import { BSContext, BSContextType } from '../../utils/SwapContext';
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
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const [val, setVal] = useState("");
    // const [flag, setFlag] = useState(false);
    const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setVal(testVal);
        }
    }
    const checkPurchase = () => {
        if (val) {
            setScreenName("confirmConvert");
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(val) | 0 });
            }
        }

    }


    useEffect(() => {
        if (BSvalue && BSvalue.amount !== 0)
            setVal(BSvalue?.amount.toString());

    }, [BSvalue])

    const handleChange = (value: string) => {
        // setNetwork(value)
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value });
        }
    };

    const handleChangeToToken = (value: string) => {
        // setNetwork(value)
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, toToken: value });
        }
        console.log(`selected ${value}`);
        console.log(BSvalue);
    };

    return (
        <div>

            <div style={{ marginTop: "40px", marginRight: "26px" }} className="padding-b-2x">
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)" }}>
                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} />
                        {/* <span className="font_20x">{BSvalue?.fromTitle}</span> */}
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                {(parseFloat(val) < 0.0007) ?
                    <div className='error_message font_15x'>You can only convert a minimum total of 0.0007 </div>
                    :
                    <></>
                }
            </div>
            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>

                <Select className='width-100 border-0'
                    onChange={handleChange} value={BSvalue?.fromToken}>
                    {
                        initialTokens.filter(token => token.address !== BSvalue?.toToken).map((token, index) => {

                            return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} data-title={token.title}>
                                <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                            </Select.Option>
                        })
                    }

                </Select>
                {/* <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={require(`../../assets/token-icons/IN500.png`).default} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        IN500  <span className="token_grey">Index500</span><Link className="font_15x bs_link padding-l-2x" to="" style={{ paddingTop: "5px", }}>Max</Link>
                    </div>
                </div> */}
                {/* <div className="d-flex">  <div style={{
                    fontSize: "10px",
                    paddingTop: "7px",
                    paddingRight: "4px"
                }}><div>0.00908 IN500</div><div>= $ 11.72</div></div><img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div> */}
            </div>

            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>
                {/* <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>
                <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div> */}
                <Select className='width-100 border-0'
                    onChange={handleChangeToToken} value={BSvalue?.toToken}>
                    {
                        initialTokens.filter(token => token.address !== BSvalue?.fromToken).map((token, index) => {

                            return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} data-title={token.title}>
                                <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                            </Select.Option>

                        })
                    }

                </Select>
            </div>
            <div className="bs_footer_action ">
                <button className={(parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) ? " disable_icon" : ""} onClick={checkPurchase} >Preview Purchase </button>
            </div>
            {/* <div className='font_15x text-center d-block'>Convert all your (too) small balances directly</div>
            <Link to="" className="font_15x bs_link text-center d-block padding-tb-2x" onClick={() => setScreenName("confirmConvert")}>Convert Small Balances</Link> */}
        </div >
    )
}
export default BSConvertIntro;
