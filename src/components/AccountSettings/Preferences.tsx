import { Switch } from 'antd';
import React from 'react'


const Preferences = () => {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <div className="container  margin-b-2x" style={{marginTop:"30px"}}>
      <div className='container preference_info'>

<h1 className="font-40x margin-b-2x margin-t-2x">Order Confirmation</h1>
<h6 className="margin-b-2x">If the order reminder function is enabled, it will need to be reconfirmed every time an order is submitted.</h6>
<div className="d-flex row padding-b-3x">
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x margin-r-1x">Limit Order</small><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x margin-r-1x">Market Order</small><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x margin-r-1x">Stop-Limit Order</small><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
</div>
</div>

<br/>
<br/>

<div className='container preference_info'>

<h1 className="font-40x margin-t-2x margin-b-2x"> Notification Management</h1>
<h6 className="margin-b-2x">Set preferred notification types.</h6>
<div className="d-flex row margin-b-3x">
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x">Staking Notifications</small><br/><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x">Trade Notifications</small><br/><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x">indexx.ai News</small><br/><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 margin-tb-2x">
<small className="font_18x">Promotions</small><br/><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
<div className="col-lg-4 ">
<small className="font_18x">System Notifications</small><br/><Switch defaultChecked onChange={onChange} style={{maxWidth:44}}/>
</div>
</div>
</div>
    </div>
  )
}

export default Preferences;