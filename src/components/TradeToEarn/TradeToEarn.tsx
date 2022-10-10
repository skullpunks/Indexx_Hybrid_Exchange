import { Button ,Card, Image } from 'antd'
import { Divider,Space } from 'antd';
import { Typography } from 'antd';

import React from 'react'
import exgcoin from  "../../assets/arts/exgcoin.png";
import exglady from "../../assets/arts/exglady.png";
import no1 from "../../assets/arts/no1.png";
import no2 from "../../assets/arts/no2.png";
import no3 from "../../assets/arts/no3.png";

import Footer from '../Footer/Footer';

const { Text , Title} = Typography;
const TradeToEarn = () => {
  return (
    <>
    <div className='scan-container trade-to-earn flex-direction-column '>
       <br/><br/><br/>
       <p className='card__title' style={{ color: "#5F5F5F", fontSize: "50px",lineHeight:"1em",margin:-19 }}>Trade To Earn </p>
       <p style={{marginLeft:320}}>&trade;</p> 
       <br></br>
       <Card>
        <h2 className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "30px" }}>Withdraw Earnings</h2>
        <Divider />
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
      }}>
          <Image src={exgcoin} width={120}></Image>
        </div>
        <h2 className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "25px" }}>indexx Exchange (INEX)</h2>
        <h1 style={{display:'flex',marginTop:0,justifyContent:'center',alignItems:'center',opacity:"20%", color: "#5F5F5F", fontSize: "90px"}}>$0</h1>
       <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "15px" }}>Minimum limit:100</Text>
        <br /> <br></br>
        <button   style={{ backgroundColor:"#0084ff",width: "371px",
            height: "55px",
            borderRadius: "5px",textAlign:"center",fontSize: "22px"}}>Withdraw Tokens</button>
        
          
        </Card>
        
        <Image src={exglady} style={{display:'flex',justifyContent:'center',width:650,alignItems:'center'}}></Image> 
        <Image src={no1} style={{display:'flex',justifyContent:'center',width:500,alignItems:'center'}}></Image> 
        <Image src={no2} style={{display:'flex',justifyContent:'center',width:500,alignItems:'center'}}></Image>  
        <Image src={no3} style={{paddingLeft:10,display:'flex',justifyContent:'center',width:480,alignItems:'center'}}></Image> 
        
        </div>
      
        <Footer></Footer>
        </>


  )
}

export default TradeToEarn