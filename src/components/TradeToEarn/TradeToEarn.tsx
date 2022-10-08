import { Button ,Card, Image } from 'antd'
import { Divider } from 'antd';
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
   
    <div className='scan-container trade-to-earn flex-direction-column '>
       <br/><br/><br/>
       <Title level={2}>Trade To Earn ™</Title>
       <Card>
        <h2 className='centered'>Withdraw Earnings</h2>
        <Divider />
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
      }}>
          <Image src={exgcoin} width={90} height={90}></Image>
        </div>
       
        <h1 style={{display:'flex',justifyContent:'center',alignItems:'center', color:'gray'}}>$0</h1>
       <Text className='centered'>Minimum limit:100</Text>
       
        <Button type="primary">Withdraw Tokens</Button>
        
          
        </Card>
        
        <Image src={exglady} style={{display:'flex',justifyContent:'center',width:650,alignItems:'center'}}></Image> 
        <Image src={no1} style={{display:'flex',justifyContent:'center',width:500,alignItems:'center'}}></Image> 
        <Image src={no2} style={{display:'flex',justifyContent:'center',width:500,alignItems:'center'}}></Image>  
        <Image src={no3} style={{display:'flex',justifyContent:'center',width:630,alignItems:'center'}}></Image> 
        
        <br/><br/><br/><br/><br/><br/><br/><br/>

        <div style={{width: "100%",height:"100%",position:'relative',bottom: "0"
   }}>
        <Footer></Footer>
        </div>
        
         
        </div>
      
    


  )
}

export default TradeToEarn