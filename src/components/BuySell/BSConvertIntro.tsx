import React from 'react';
import IN500 from "../../assets/token-icons/33.png";
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import ethereum  from "../../assets/arts/ethereum.svg";
import bsDollar  from "../../assets/arts/bsDollar.svg";

export default function BSConvertIntro() {
    return (
        <div>

            <div style={{marginTop: "40px",marginRight: "26px"}} className="padding-b-2x">
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{transform: "scale(1)"}}>
                        <input placeholder="0" className=" " type="text" value="" style={{width: "57px"}}/>
                        <span className="font_20x">ETH</span>
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" style={{position:"absolute",right: "4px",top: "60%"}} />
                    </div>
                </div>
            </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={ethereum } alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        ETH  <span className="token_grey">Ethereum</span><a className="font_15x bs_link padding-l-2x" style={{    paddingTop: "5px",}}>Max</a>
                    </div>
                </div>
                <div className="d-flex">  <div style={{    fontSize: "10px",
    paddingTop: "7px",
    paddingRight: "4px"}}><div>0.00908 ETH</div><div>= $ 11.72</div></div><img src={arrowAddress} alt="arrow icon" style={{}} /></div>
            </div>

            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>
                <div>  <img src={arrowAddress} alt="arrow icon" style={{}} /></div>
            </div>
            <div className="bs_footer_action ">
                <button>Preview Purchase </button>
            </div>
            <div className='font_15x text-center d-block'>Convert all your (too) small balances directly</div>
            <a className="font_15x bs_link text-center d-block padding-tb-2x">Convert Small Balances</a>
        </div>
    )
}
