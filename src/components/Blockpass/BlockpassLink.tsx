
// import { Button } from 'antd';
import React from 'react';
import { Button } from 'react-bootstrap';


const BlockpassLink = () => {
    const openBlockpassLink = async () => {
        // route to new page by changing window.location
        window.open("https://verify-with.blockpass.org/?clientId=indexx_2c1c1&serviceName=Indexx.ai&env=prod", "_blank") //to open new page
    }

    //https://verify-with.blockpass.org/?clientId=indexx_2c1c1&serviceName=Indexx.ai&env=prod

    return (
        <div className='row scan-container'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='col-2'>

                <Button className='margin-r-1x btn btn-danger' onClick={() => openBlockpassLink()}>
                    Verify KYC
                </Button>
            </div>
        </div>
    )

}


export default BlockpassLink;