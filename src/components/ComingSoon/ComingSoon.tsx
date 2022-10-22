import React from 'react'
import Footer from '../Footer/Footer';
import { useSearchParams } from "react-router-dom";
import fortuneLadyCoin from "../../assets/arts/fortuneLadyCoin.png";

const ComingSoon = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let pageName = searchParams.get("page");
    console.log(setSearchParams);
    return (
        <>
            <div className='scan-container flex-direction-column'>
                <img src={fortuneLadyCoin} className="pt-5" alt="Coming soon art" width="400" />
                <h1 className='coming_soon  font_60x'>
                    <span className='page_name'>{pageName || "Decentralized"} </span>
                    Coming Soon
                </h1>

            </div>

            <Footer />
        </>
    )
}

export default ComingSoon