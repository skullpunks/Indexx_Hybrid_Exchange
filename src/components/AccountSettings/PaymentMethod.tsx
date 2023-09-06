import { Button } from 'antd'
import React from 'react'
import Verification from "../../assets/arts/Verification.svg";

export const PaymentMethod = () => {
  return (
    <div 
      style={{minWidth:300,
        margin:"auto",
        marginTop:60, 
        borderColor:"var(--border-color)", 
        borderRadius:"5px",
        marginBottom:20
      }} 
      className="card bs_main padding-lr-2x padding-b-2x margin-b-2x">
        <br/>
        <br/>
        <br/>
<img src={Verification} alt="Verification"  style={{width: "100px",
    margin: "0 auto"
}}/>
<br/>
      
<h1 className="font_40x text-center">
Verification Required
</h1>
     
<div  className="font_15x margin-t-2x text-center">
You need to be verified to add a payment method
</div>
<Button type="primary" className="margin-t-auto">Understood</Button>
    </div>
  )
}
