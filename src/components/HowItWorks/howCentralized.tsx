import { Card, Image, Button, Input } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import buysell from "../../assets/how-it-works/buysellss.png";
import sell from "../../assets/how-it-works/sell.png";
import convert from "../../assets/how-it-works/convert.png";

import Footer from '../Footer/Footer';

const { Text } = Typography;

const HowCentralized = () => {
  const navigate = useNavigate();

  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  }

  return (
    <>
        <div className='scan-container how-it-works flex-direction-column' >
        <Text className='card__title' style={{ marginBottom:100,color: "#5F5F5F", fontSize: "70px", lineHeight: "1em", marginTop:50 }}>Centralized </Text>
        <br/>

        <div className="container">
  <div className="row">
    <div className="col-sm text-left">
    <Text  style={{ color: "#5F5F5F", fontSize: "30px", lineHeight: "1em", marginTop:50, paddingLeft:60 }}> Buy and Sell</Text><br/>
        <p style={{ color: "#5F5F5F", fontSize: "30px", lineHeight: "1em", paddingLeft:60}}> <br/> Buy </p>
        
        <p  className='mt-20' style={{ color: "#5F5F5F", fontSize: "20px", lineHeight: "1em"  ,paddingLeft:60}}> <br/><br/><br/> Indexx.ai provides a clean and easy to use interface to buy and sell cryptocurrency. The following are the steps on how to do the transactions.<br/>

        <br/>On the centralized Indexx Exchange in the Buy tab, enter the amount in $ that you want to buy in the specific coin you have selected from the drop down menu.<br/><br/>

        On  pressing on Preview Purchase, you will be redirected to a purchase page where you will continue with the payment process.<br/> <br/> <br/> <br/> 
        </p>
    </div>
    <div className="col-sm">
    <div className='col-lg-10 text-right '><Image preview={false} src={buysell} style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', width: 400, alignItems: 'center', paddingLeft:100}}></Image></div>
    </div>
  
  </div>

  <div className="row">
    <div className="col-sm text-left">

        <p style={{ color: "#5F5F5F", fontSize: "30px", lineHeight: "1em", paddingLeft:60}}> <br/> Sell </p>
        
        <p  className='mt-20' style={{ color: "#5F5F5F", fontSize: "20px", lineHeight: "1em"  ,paddingLeft:60}}> <br/><br/><br/> 

For SELL, you have to switch to the SELL tab, you wont be able to see these tabs unless you login, so make sure to sign up first and login in order to have access to these functionality.<br/> <br/> 

You have to follow the same procedure with Sell and press on Preview Sell once you have entered the required amount.

        </p>
    </div>
    <div className="col-sm">
    <div className='col-lg-10 text-right '><Image preview={false} src={sell} style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', width: 400, alignItems: 'center', paddingLeft:100}}></Image></div>
    </div>
  
  </div>
  <div className="row">
    <div className="col-sm text-left">

        <p style={{ color: "#5F5F5F", fontSize: "30px", lineHeight: "1em", paddingLeft:60}}> <br/> Convert </p>
        
        <p  className='mt-20' style={{ color: "#5F5F5F", fontSize: "20px", lineHeight: "1em"  ,paddingLeft:60}}> <br/><br/><br/> 

Converting crypto means exchanging one type of crypto for another. To convert crypto, choose the coin that you wish to convert, and the coin that you wish to convert to. You will then be asked to enter the required amount in units.<br/><br/>

Press on Preview Purchase once you have entered the amount to follow along the process to convert from indexx500 to indexxCrypto in a matter of seconds!


        </p>
    </div>
    <div className="col-sm">
    <div className='col-lg-10 text-right '><Image preview={false} src={convert} style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', width: 400, alignItems: 'center', paddingLeft:100}}></Image></div>
    </div>
  
  </div>
</div>

<div className='text-center' style={{ width: 300 ,marginTop:100}}> 
<Button danger type="primary"  shape="round" size="large" className="btn_xl btn-primary w-100 p-10 " onClick={() => navigateUser("/indexx-exchange/buy-sell")}>Buy Crypto</Button> <br /><br />
  </div>  

       
        </div>
     
      <Footer></Footer>
    </>

  )
  
}

export default HowCentralized;