import React from 'react'
import InProgressClock from "../../assets/arts/InProgressClock.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { Button } from 'antd';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSConvertInProgress: React.FC<(Props)> = ({ setScreenName }) => {
  return (
    <div className='bs_container card'>
         <div className="card__header flex-justify-between d-flex flex-align-center">
                <h1 className='centered' style={{ color: "#5f5f5f" }}>
                    <span style={{ fontSize: 20, paddingRight: 10 }}>&#60;</span>
                    Convert in Progress
                </h1>
         </div>
         <div className='card_body text-center'>
            <img src={InProgressClock} alt="InProgressClock" className='padding-t-2x'/>

            <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)", padding: "50px 20px" }}>
                        <span className="font_20x" style={{ lineHeight: 4 }} >$</span>
                        <span placeholder="0" className=" " style={{ fontSize: 60 }} >11.3258</span>
                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>

            <div className='font_20x padding-b-2x'>Your convert order is being processed.</div>
            <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" block onClick={() => setScreenName("BSConvertInProgressProcessing")}> Go to Wallet</Button>
            <a className="font_15x bs_link text-center d-block padding-t-3x" href="# " >New Convert</a>
         </div>
    </div>
  )
}

export default BSConvertInProgress;