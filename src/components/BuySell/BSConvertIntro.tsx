import React, { useState } from 'react';
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";

import bsDollar from "../../assets/arts/bsDollar.svg";
import { Link } from 'react-router-dom';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSConvertIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const [val, setVal] = useState("");
    const [flag, setFlag] = useState(false);
    const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setVal(testVal);
        }
    }
    const checkPurchase = () => {

        if (parseFloat(val) < 0.0007) {
            // alert("You can only convert a minimum total of 0.0007 IN500");
            setFlag(true);
        } else {

        }

    }
    return (
        <div>

            <div style={{ marginTop: "40px", marginRight: "26px" }} className="padding-b-2x">
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)" }}>
                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} />
                        <span className="font_20x">IN500</span>
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                {(parseFloat(val) < 0.0007 && flag) ?
                    <div className='error_message font_15x'>You can only convert a minimum total of 0.0007 IN500</div>
                    :
                    <></>
                }
            </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        {/* <img src={require(`../../assets/token-icons/${fromImage}.png`).default}  */}
                        <img src={require(`../../assets/token-icons/IN500.png`).default} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        IN500  <span className="token_grey">Index500</span><Link className="font_15x bs_link padding-l-2x" to="" style={{ paddingTop: "5px", }}>Max</Link>
                    </div>
                </div>
                <div className="d-flex">  <div style={{
                    fontSize: "10px",
                    paddingTop: "7px",
                    paddingRight: "4px"
                }}><div>0.00908 IN500</div><div>= $ 11.72</div></div><img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div>
            </div>

            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>
                <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div>
            </div>
            <div className="bs_footer_action ">
                <button onClick={checkPurchase} >Preview Purchase </button>
            </div>
            <div className='font_15x text-center d-block'>Convert all your (too) small balances directly</div>
            <Link to="" className="font_15x bs_link text-center d-block padding-tb-2x" onClick={() => setScreenName("confirmConvert")}>Convert Small Balances</Link>
        </div >
    )
}
export default BSConvertIntro;