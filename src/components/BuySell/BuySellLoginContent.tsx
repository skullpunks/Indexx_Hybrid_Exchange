import React from 'react'

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BuySellLoginContent: React.FC<(Props)> = ({ setScreenName }) => {
    console.log(setScreenName);
    return (
        <div className='bs_container card'>BuySellLoginContent</div>
    )
}

export default BuySellLoginContent