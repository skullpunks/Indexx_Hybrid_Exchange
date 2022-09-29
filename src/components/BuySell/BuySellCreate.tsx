
import { Button } from 'antd';
import arrowAdressLeft from "../../assets/arts/arrowAdressLeft.svg";

import createAccount from "../../assets/arts/createAccount.svg";
import initialTokens from "../../utils/Tokens.json";



const removeCommonTokens = () => {
    return initialTokens.filter(function (obj) {
        return !obj?.commonToken;
    })
}
const onlyCommonTokens = initialTokens.filter(function (obj) {
    return obj?.commonToken;
});

const BuySellCreate =()=>{
    return(
        <div className="bs_container card">
                <div className="bs_container_header d-flex">
                    <img src={arrowAdressLeft} alt="adressLeft"  />
                    <h1> Create Account</h1>
                </div>
                <div className="bs_container_create_main" > 
                   <img src={createAccount} alt=" createAccount"  className="search_icon" style={{paddingRight:8,width:150,height:167}} />
                   <div>Create an Account to Start Buying Crypto</div>
                </div>
                <div className="bs_container_create_footer
                " > 
                  <Button type="primary" className="atn-btn atn-btn-round" style={{ height: 55, backgroundColor: "#F66036;", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Get Started </Button> 
                </div>
                
              
            </div>
    )
}

export default BuySellCreate;