import React from 'react';

import { Button } from 'antd';


interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellLoginFail: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    return(
<div className="bs_container bs_form card card_s">
                <h1 className='text-center'>Log In Failed</h1>
            
                <div className="text-center margin-lr-auto verfication_text padding-tb-2x ">
                    <div>Your email or password is incorrect.</div>
                    <div>Please try again</div>
                </div>
                <br/>
                <br/>
                <Button type="primary" className="atn-btn atn-btn-round margin-b-1x" onClick={() => setScreenName("LoginSuccess")} style={{ height: 55, borderColor: "#F66036", backgroundColor: "#F66036", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Ok</Button>
            </div>
    )
}

export default BuySellLoginFail;
