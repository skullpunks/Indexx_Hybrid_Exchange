import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./TradeToEarnBanner.css";

const TradeToEarnBanner = () => {
    const navigate = useNavigate();
    return (
        <div className='trade_to_earn_banner'>
            <Button type='primary' size="middle" className="btn-success earn_btn" onClick={() => navigate("indexx-exchange/trade-to-earn")}>
                Earn Now
            </Button>
        </div>
    )
}

export default TradeToEarnBanner