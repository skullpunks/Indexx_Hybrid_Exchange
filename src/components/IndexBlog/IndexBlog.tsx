import React from 'react'
import './IndexBlog.css';
import IndexPreSaleIcon from "../../assets/arts/IndexPreSaleIcon.svg";
import indexFamilyToken from "../../assets/arts/indexFamilyToken.svg";
import indexFund from "../../assets/arts/indexFund.svg";
import indexFinance from "../../assets/arts/indexFinance.svg";
import Footer from '../Footer/Footer';
import personFlipCoin from "../../assets/arts/personFlipCoin.svg";


export const IndexBlog = () => {
    return (
        <div>
        <div className='swap_container blog_container'>
            <div className="margin-t-2x blog_container_header">
                <h1 className='font_60x'>indexx.ai | Blog</h1>
            </div>
            <div className="margin-t-2x blog_container_main">
                <div className='d-flex flex-justify-between margin-b-3x'>
                    <div className='blog_flipicon_image position-relative'><img src={personFlipCoin} alt="personFlipCoin"/></div>
                    <div className='blog_flipicon_image_content'>
                        <p className='font_48x padding-b-2x'>A deeper look into What makes Indexx work with Brian Zheng</p>
                        <p className='font_30x'>Indexx 500 tokens offer the low risk, security and simplicity of S&P 500 stock index coupled with the innovative nature of blockchain technology...</p>
                    </div>
                </div>
                <div className='d-flex flex-justify-between flex-wrap'>
                    <div className='flex-b-50 border-1x margin-b-2x'>
                        <img src={IndexPreSaleIcon} alt="IndexPreSaleIcon" className='width-100' />
                        <p className='font_48x padding-lr-2x'>Indexx 500 and Indexx Crypto’s presale is ON!</p>
                        <p className='font_30x padding-lr-2x margin-t-2x margin-b-3x '> As per our last announcement, we have some exciting news to share with you all.</p>
                        <span className='font_20x text-center d-block padding-b-1x'>September 13, 2022 - 2 min read</span>
                    </div>
                    <div className='flex-b-50 border-1x  margin-b-2x'>
                        <img src={indexFamilyToken} alt="indexFamilyToken" className='width-100' />
                        <p className='font_48x padding-lr-2x'>Indexx 500 and Indexx Crypto’s presale is ON!</p>
                        <p className='font_30x padding-lr-2x margin-t-2x margin-b-3x ' > As per our last announcement, we have some exciting news to share with you all.</p>
                        <span className='font_20x text-center d-block padding-b-1x'>August 23, 2022 - 2 min read</span>
                    </div>
                    <div  className='flex-b-50 border-1x  margin-tb-2x'>
                    <img src={indexFund} alt="indexFund" className='width-100'/>
                    <p className='font_48x padding-lr-2x'>Indexx 500 Opens a new way to Index funds</p>
                    <p className='font_30x padding-lr-2x margin-t-2x margin-b-3x ' > 02 August 2022 The launch of a token backed by S&P Holdings and as development is moving forward the hunt for investors to buy...</p>
                    <span className='font_20x text-center d-block padding-b-1x'>August 23, 2022 - 2 min read</span>
                </div>
                <div  className='flex-b-50 border-1x  margin-tb-2x'>
                    <img src={indexFinance} alt="indexFinance" className='width-100'/>
                    <p className='font_48x padding-lr-2x'>Indexx, the future of Stock Tokens — An Asset-Backed token by S&P 500 holdings</p>
                    <p className='font_30x padding-lr-2x margin-t-2x margin-b-3x ' > The Indexx Stock Token is an asset-backed token pegged to the S&P 500.</p>
                    <span className='font_20x text-center d-block padding-b-1x'>July 4, 2022 - 2 min read</span>
                </div>
                </div>

            </div>

            
        </div>
        <Footer/>
        </div>
    )
}

export default IndexBlog;
