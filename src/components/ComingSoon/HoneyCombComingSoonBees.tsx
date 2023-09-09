import React from 'react'
import Footer from '../Footer/Footer';
// import { useSearchParams } from "react-router-dom";
// import fortuneLadyCoin from "../../assets/arts/fortuneLadyCoin.png";
// import careersIcon from "../../assets/arts/careersIcon.png";
import honeycomb from "../../assets/hive-dashboard/honeycomb.svg";
import BeeHeader from '../Dashboard/Honeybee/BeeHeader/BeeHeader';

const HoneyCombComingSoonBees = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    // let pageName = searchParams.get("page");
    // console.log(setSearchParams);
    return (
        <>
            <BeeHeader />
            <div className='hive-container'>
                <img src={honeycomb} alt='comingsoon'/>
                {/* {pageName === "Careers" ? <img src={careersIcon} className="pt-5" alt="Coming soon art" width="400" />
                    :
                    <img src={fortuneLadyCoin} className="pt-5" alt="Coming soon art" width="400" />
                }
                <h1 className='coming_soon  font_60x'>
                    HoneyComb Page Coming Soon
                </h1>
                {pageName === "Careers" ? <div className='pt-4  text-center'>
                    <span className='font_20x  '>For inquiries, please reach us out at <a href='mailto:hr@indexx.ai' className='text_link ps-1'> hr@indexx.ai</a></span>
                </div>
                    :
                    <></>
                } */}
            </div>

            <Footer />
        </>
    )
}

export default HoneyCombComingSoonBees