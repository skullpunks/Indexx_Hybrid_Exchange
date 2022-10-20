import React from 'react';
import { Button } from 'antd';
import arrowAdressLeft from "../../assets/arts/arrowAdressLeft.svg";

import createAccount from "../../assets/arts/createAccount.svg";
import { useNavigate } from 'react-router-dom';
// import initialTokens from "../../utils/Tokens.json";


interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}


// const removeCommonTokens = () => {
//     return initialTokens.filter(function (obj) {
//         return !obj?.commonToken;
//     })
// }
// const onlyCommonTokens = initialTokens.filter(function (obj) {
//     return obj?.commonToken;
// });

const BuySellCreate: React.FC<(Props)> = ({ setScreenName }) => {
    const navigate = useNavigate();
    return (
        <div className="bs_container card">
            <div className="bs_container_header d-flex">
                <img src={arrowAdressLeft} alt="adressLeft" className="left_arrow" onClick={() => setScreenName("select")} />
                <h1> Create Account</h1>
            </div>
            <div className="bs_container_create_main flex-align-center" >
                <img src={createAccount} alt=" createAccount" style={{ paddingRight: 8, width: 150, height: 167 }} />
                <div>Create an Account to Start Buying Crypto</div>
            </div>
            <div className="bs_container_create_footer">
                {/* style={{ height: 55, borderColor: "#F66036", backgroundColor: "#F66036", color: "#fff", fontSize: 20, borderRadius: 5 }} */}
                <Button type="primary" className="atn-btn atn-btn-round" onClick={() => navigate("/indexx-exchange/buy-sell/get-started")} block>Get Started </Button>
                <Button type="link" danger className="btn_link" onClick={() => navigate("/indexx-exchange/buy-sell/login")}>Log In</Button>
            </div>


        </div>
    )
}

export default BuySellCreate;