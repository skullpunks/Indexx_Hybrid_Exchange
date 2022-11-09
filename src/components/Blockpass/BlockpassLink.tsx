
import { Button } from 'antd';
import React from 'react';


const BlockpassLink = () => {
    const openBlockpassLink = async () => {
        // route to new page by changing window.location
        window.open("https://verify-with.blockpass.org/?clientId=indexx_2c1c1&serviceName=Indexx.ai&env=prod", "_blank") //to open new page
    }

    //https://verify-with.blockpass.org/?clientId=indexx_2c1c1&serviceName=Indexx.ai&env=prod

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button type="primary" className='margin-r-1x buy_crypto_btn' style={{backgroundColor:"#F66036"}}danger onClick={() => openBlockpassLink()}>
                Verify KYC
            </Button>
        </div>
    )

}


export default BlockpassLink;