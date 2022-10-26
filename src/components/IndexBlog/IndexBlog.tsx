import React from 'react'
import './IndexBlog.css';
import IndexPreSaleIcon from "../../assets/arts/IndexPreSaleIcon.svg";
import indexFamilyToken from "../../assets/arts/indexFamilyToken.svg";
import indexFund from "../../assets/arts/indexFund.svg";
import indexFinance from "../../assets/arts/indexFinance.svg";
import Footer from '../Footer/Footer';
import FlipIconGreyBG from "../../assets/arts/FlipIconGreyBG.svg";


export const IndexBlog = () => {

    const onClickHandler = (path: any) => {
        window.open(`${path}`);
    };

    return (
        <div>
            <div className='swap_container blog_container' style={{ paddingBottom: 200 }}>
                <div className="margin-t-2x blog_container_header">
                    <h1 className='font_60x'>Blog</h1>
                </div>
                <div className="margin-t-2x blog_container_main">
                    <div className='d-flex flex-justify-between margin-b-3x padding-b-3x row' onClick={() => onClickHandler("https://medium.com/@Indexx/a-deeper-look-into-what-makes-indexx-work-with-brian-zheng-6cbfae9307b1")}>
                        <div className='blog_flipicon_image  col-lg-8 col-md-12'><img src={FlipIconGreyBG} alt="personFlipCoin" className='w-100' /></div>
                        <div className='blog_flipicon_image_content col-lg-4 col-md-12'>
                            <p className='font_40x padding-b-2x'>A deeper look into What makes Indexx work.</p>
                            <p className='font_23x'>Indexx 500 tokens offer the low risk, security and simplicity of S&P 500 stock index coupled with the innovative nature of blockchain technology...</p>
                        </div>
                    </div>
                    <div className='d-flex flex-justify-between flex-wrap row blog_Responsive'>
                        <div className=' border-1x margin-b-2x col-lg-6 col-md-1 padding-0' onClick={() => onClickHandler("https://medium.com/@Indexx/indexx-500-and-indexx-cryptos-presale-is-on-160da8cc9f45")}>
                            <img src={IndexPreSaleIcon} alt="IndexPreSaleIcon" className='width-100' />
                            <p className='font_40x padding-lr-2x padding-t-1x'>Indexx 500 and Indexx Crypto’s presale is ON!</p>
                            <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x '> As per our last announcement, we have some exciting news to share with you all.</p>
                            <span className='font_20x text-center d-block padding-b-1x'>September 13, 2022 - 2 min read</span>
                        </div>
                        <div className='col-lg-6 col-md-1 border-1x margin-b-2x padding-0 ' onClick={() => onClickHandler("https://medium.com/@Indexx/indexx-family-new-products-launching-eb049862a913")}>
                            <img src={indexFamilyToken} alt="indexFamilyToken" className='width-100' />
                            <p className='font_40x padding-lr-2x padding-t-1x'>Indexx family — New products launching</p>
                            <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x ' > As per our last announcement, we have some exciting news to share with you all.</p>
                            <span className='font_20x text-center d-block padding-b-1x'>August 23, 2022 - 2 min read</span>
                        </div>
                        <div className='col-lg-6 col-md-1 border-1x margin-tb-2x padding-0 ' onClick={() => onClickHandler("https://medium.com/@Indexx/indexx-500-opens-a-new-way-to-index-funds-508eb27a7a15")}>
                            <img src={indexFund} alt="indexFund" className='width-100' />
                            <p className='font_40x padding-lr-2x padding-t-1x'>Indexx 500 Opens a new way to Index funds</p>
                            <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x ' > 02 August 2022 The launch of a token backed by S&P Holdings and as development is moving forward the hunt for investors to buy...</p>
                            <span className='font_20x text-center d-block padding-b-1x'>August 23, 2022 - 2 min read</span>
                        </div>
                        <div className='col-lg-6 col-md-1 border-1x margin-tb-2x padding-0 ' onClick={() => onClickHandler("https://medium.com/@Indexx/indexx-the-future-of-stock-tokens-an-asset-backed-token-by-s-p-500-holdings-282f6342df8e")}>
                            <img src={indexFinance} alt="indexFinance" className='width-100' />
                            <p className='font_40x padding-lr-2x padding-t-1x'>Indexx, the future of Stock Tokens — An Asset-Backed token by S&P 500 holdings</p>
                            <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x ' > The Indexx Stock Token is an asset-backed token pegged to the S&P 500.</p>
                            <span className='font_20x text-center d-block padding-b-1x'>July 4, 2022 - 2 min read</span>
                        </div>
                    </div>

                </div>


            </div>
            <Footer />
        </div>
    )
}

export default IndexBlog;
