import React from 'react'
import { useState } from 'react';
import BuySellLoginContent from './BuySellLoginContent';

const BuySellLogin = () => {
    const [screenName, setScreenName] = useState("");
    return (
        <div className='scan-container flex-align-stretch bs_main'>

            {screenName === "" && <BuySellLoginContent setScreenName={setScreenName} />}


        </div>
    )
}

export default BuySellLogin