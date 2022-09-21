import './IndexxScan.css';
//import BackgroundImage from "../../assets/background.jpg";
import chartIcon from "../../assets/arts/chartIcon.svg";
import gearIcon from "../../assets/arts/gearIcon.svg";
import bitCoin from "../../assets/token-icons/25.png";
import busdCoin from "../../assets/token-icons/20.png";
// import IndexxText from "../../assets/indexxscan.png";
// import Bottom from "../../assets/scan-bottom.png";
import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, InputNumber, Tag } from 'antd';

function App() {

    const onChange = (value: string) => {
        console.log('changed', value);
    };

    const connectWallet = () => {
        console.log("wallet clicked");
    }
    return (
        <div>
            <div className="scan-container">
                <div className='card'>
                    <div className='card__header'>
                        <div className='card__header__inner'>
                            <div className='card__header__inner__left'>
                                <img src={chartIcon} alt="chart icon" />
                            </div>
                            <h1 className='card__title'>Swap</h1>
                            <div className='card__header__inner__right'>
                                <img src={gearIcon} className="setting__icon" alt="Settings icon" />
                                <ReloadOutlined className='undo_icon' style={{ fontSize: "24px", color: "#5f5f5f" }} />
                                <ReloadOutlined style={{ fontSize: "24px", color: "#5f5f5f" }} />
                            </div>
                        </div>
                        <div className='card__header__inner flex-justify-center'>
                            <p style={{ marginBottom: 0, color: "#006DFF", fontSize: "20px" }}>Trade token easier and faster</p>
                        </div>
                    </div>

                    <div className='card__body'>
                        <div className='from__icon'>
                            <Button type="link" style={{ display: "flex", alignItems: "center", marginBottom: 10, padding: 0 }}>
                                <img src={bitCoin} alt="bit coin" width="30" />
                                <span style={{ fontSize: "20px", padding: "0 10px 0", lineHeight: 1 }}>BTC</span>
                                <DownOutlined style={{ fontSize: "16px" }} />
                            </Button>
                            <InputNumber<string>
                                style={{ width: "100%", fontSize: "20px" }}
                                defaultValue="0.0"
                                min="0"
                                max="1000"
                                step="0.0000001"
                                onChange={onChange}
                                size="large"
                                className='input__field'
                                type='number'
                            />
                        </div>

                        <div className='swap__coin centered'>
                            <span className='swap__coin__circle centered'><DownOutlined style={{ fontSize: 23 }} /></span>
                        </div>

                        <div className='to__icon'>
                            <Button type="link" style={{ display: "flex", alignItems: "center", marginBottom: 10, padding: 0 }}>
                                <img src={busdCoin} alt="bit coin" width="30" />
                                <span style={{ fontSize: "20px", padding: "0 10px 0", lineHeight: 1 }}>BUSD</span>
                                <DownOutlined style={{ fontSize: "16px" }} />
                            </Button>
                            <InputNumber<string>
                                style={{ width: "100%", fontSize: "20px" }}
                                defaultValue="0.0"
                                min="0"
                                max="1000"
                                step="0.0000001"
                                onChange={onChange}
                                size="large"
                                className='input__field'
                                type='number'
                            />
                        </div>

                        <div className='info__text'>
                            <Tag color="#006DFF" className='tag' >SCAN RISK</Tag>
                            <QuestionCircleOutlined style={{ fontSize: '20px', color: '#006DFF' }} />

                        </div>

                    </div>

                    <div className='card__footer'>
                        <Button type="primary" block shape="round" size="large" className="btn_xl"
                            onClick={connectWallet}>Connect Wallet</Button>

                    </div>
                </div>
                {/* Card close */}

            </div>
        </div>
    );
}

export default App;
