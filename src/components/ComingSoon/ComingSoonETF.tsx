import React from 'react'
// import Footer from '../Footer/Footer';
import fortuneLadyCoin from "../../assets/arts/fortuneLadyCoin.png";
import PowerPackHeader from '../PowerPack/PowerPackHeader/PowerPackHeader';

const ComingSoonETF = () => {
    
    return (
        <>
            <PowerPackHeader/>
            <div className='scan-container flex-direction-column' style={{paddingTop:"220px"}}>
                    <img src={fortuneLadyCoin} className="pt-5" alt="Coming soon art" width="400" />
                <h1 className='coming_soon  font_60x'>
                    <span className='page_name'>ETF </span>
                    Coming Soon
                </h1>
            </div>

            {/* <Footer /> */}
        </>
    )
}

export default ComingSoonETF