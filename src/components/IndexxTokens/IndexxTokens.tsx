import React from 'react';
import INXC from "../../assets/arts/INXC.svg";
import INEX from "../../assets/arts/INEX.svg";
import INFX from "../../assets/arts/INFX.svg";
import IUSD from "../../assets/token-icons/35.png";
import IN500 from "../../assets/token-icons/33.png";

const IndexxTokens = () => {
    return (
        <div className='scan-container d-block'>
            <h1 className='font_50x margin-t-3x centered padding-lr-2x'>
                Prosperous life awaits with indexx tokens
            </h1>
            <div className='d-flex flex-justify-between index_tokens row padding-t-3x margin-t-3x'>
                <div className='text-center d-block col-md-4 padding-t-1x'>
                    <img src={INXC} alt="indexicon" />
                    <div className='font_25x padding-t-2x'>iNXC </div>
                    <div className='font_15x'>indexx Crypto</div>
                </div>
                <div className='col-md-4 text-center d-block  padding-t-1x'>
                    <img src={IN500} alt="indexicon" />
                    <div className='font_25x padding-t-2x'>iN500  </div>
                    <div className='font_15x'>indexx 500</div>
                </div>
                <div className='col-md-4 text-center d-block padding-t-1x'>
                    <img src={IUSD} alt="indexicon" />
                    <div className='font_25x padding-t-2x'> iUSD+  </div>
                    <div className='font_15x'>indexx USD+</div>
                </div>
                <div className='d-flex row padding-t-3x'>
                    <div className='col-md-6 text-center d-block padding-t-3x'>
                        <img src={INEX} alt="indexicon" />
                        <div className='font_25x padding-t-2x'> iNEX  </div>
                        <div className='font_15x'>indexx Exchange</div>
                    </div>
                    <div className='col-md-6 text-center d-block padding-t-3x'>
                        <img src={INFX} alt="indexicon" />
                        <div className='font_25x padding-t-2x'> iNXF  </div>
                        <div className='font_15x'>indexx Fortune</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexxTokens