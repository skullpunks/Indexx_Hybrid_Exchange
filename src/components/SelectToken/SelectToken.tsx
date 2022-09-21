import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import bitCoin from "../../assets/token-icons/25.png";
import React from 'react'

const SelectToken = () => {
    return (
        <div>
            <div className="scan-container">
                <div className='card'>
                    <div className='card__header'>
                        <div className='card__header__inner'>
                            <h1 style={{ marginBottom: 0 }}>Select a Token</h1>
                            <CloseOutlined style={{ fontSize: 20 }} />
                        </div>
                    </div>

                    <div className='card__body' style={{ padding: 20 }}>
                        <Input size="large" placeholder="Search name or paste address" prefix={<UserOutlined />} className="input__field" />
                        <br />
                        <Button type="link" style={{ display: "flex", alignItems: "center", marginBottom: 10, padding: 0 }}>
                            <img src={bitCoin} alt="bit coin" width="30" />
                            <span style={{ fontSize: "20px", padding: "0 10px 0", lineHeight: 1 }}>BTC</span>
                            <span>Bitcoin</span>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectToken