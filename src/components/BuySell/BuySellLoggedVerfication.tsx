

import React from 'react';

import { Button } from 'antd';
import  loggedVerify from "../../assets/arts/loggedVerify.svg";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
  
}

const BuySellLoggedVerfication: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    return (
        <div className='d-flex flex-direction-column'>
        <h1 className='text-center margin-lr-auto'>Verify Identity</h1>
        <br/>
        <div className="bs_container bs_form card">
            <img src={loggedVerify} alt="loggedVerify" width="80px" height="80px" className="margin-lr-auto" />
            <div className="font_20x text-center">SSN Authentication</div>
            <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                    <div>US and state regulators require us to verify your identity. To continue, enter the last 4 digits of your Social Security Number (SSN)</div>

                </div>
                <br/>
            <div className="form_element email position-relative">
                <label>Last 4 digits of your SSN</label>
                <div className="control-input"><input type="Number" name="SSN" value="XXX-XX-" />       
            </div>
            </div>
           
            <div className="font_15x padding-tb-2x padding-l-2x">
            Your SSN is required by federal law
            </div>
            <div className="font_15x padding-l-2x padding-b-2x">
            All personal data is securely stored
                </div>
          <br/>

            <Button type="primary" className="atn-btn atn-btn-round" style={{ height: 55, borderColor: "#F66036", backgroundColor: "#F66036", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Continue</Button>
            <div className="d-flex justify-center padding-t-2x" ><a className="text_link">Skip for Now.</a></div>
        </div>
    </div>
    )
}
export default BuySellLoggedVerfication;