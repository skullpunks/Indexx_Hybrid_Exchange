import React from 'react';
import circleArrow from "../../assets/arts/circleArrow.svg";
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const TransactionSubmit: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className='scan-container'>
            <div className='card card-s '>
                <div className="d-flex flex-justify-between flex-align-center">
                    <h1 style={{ color: "#5f5f5f" }}>Transaction submitted</h1>
                    <CloseOutlined style={{ fontSize: "16" }} onClick={() => { setStatus(""); }} />
                </div>
                <div className='centered' style={{ margin: "30px 0 50px" }}>
                    <img src={circleArrow} alt="circle Arrow" width="80" style={{ display: "block", margin: "50 0 50" }} />
                </div>
                <div className='centered'>
                    <h3 className="heper_text primary_color">View on BscScan</h3>
                </div>
                <Button type="primary" className="atn-btn atn-btn-round" style={{ height: 55, backgroundColor: " #006DFF", color: "#fff", fontSize: 20, borderRadius: 5 }} block>Swap</Button>
            </div>
        </div>
    )
}

export default TransactionSubmit