import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./TradeToEarnBanner.css";

const TradeToEarnBanner = () => {
    const navigate = useNavigate();
    return (
        <div className='trade_to_earn_banner d-flex flex-direction-row flex-align-stretch'>
            <div className='trade_left'>

            </div>
            <div className='trade_right text-center'>
                <h1 className='mega_heading text-white line_height_1' >
                    Trade to Earn
                    <sub className='tm_text'>TM</sub>
                </h1>
                <h1 className='mega_heading trade_percentage text-green line_height_1'>30%</h1>
                <h1 className='text-white '>Earn on each transaction.</h1>
                <Button type='primary' size="middle" className="btn-success earn_btn" onClick={() => navigate("indexx-exchange/trade-to-earn")}>
                    Earn Now
                </Button>
            </div>
        </div>
    )
}

export default TradeToEarnBanner