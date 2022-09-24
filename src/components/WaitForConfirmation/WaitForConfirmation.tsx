import React from 'react';
import "./WaitForConfirmation.css";
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const WaitForConfirmation: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className='scan-container'>
            <div className='card card-s'>
                <div className="d-flex flex-justify-between flex-align-center">
                    <h1 style={{ color: "#5f5f5f" }}>Waiting for Confirmation</h1>
                    <CloseOutlined style={{ fontSize: "16" }} onClick={() => { setStatus(""); }} />
                </div>
                <LoadingOutlined className='primary_color' style={{ fontSize: 80, margin: "30px 0 50px" }} />
                <p>Swapping 1BNB for 0.0133973</p>
                <p>Confirm this transaction in your wallet</p>
                <Button type="primary" block shape="round" size="large" className="btn_xl"
                    onClick={() => { setStatus("TransactionSubmit"); }}>Dummy button</Button>
            </div>
        </div>
    )
}

export default WaitForConfirmation