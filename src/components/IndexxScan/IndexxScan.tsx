import './IndexxScan.css';
//import BackgroundImage from "../../assets/background.jpg";
import chartIcon from "../../assets/arts/chartIcon.svg";
// import gearIcon from "../../assets/arts/gearIcon.svg";
import bitCoin from "../../assets/token-icons/25.png";
import busdCoin from "../../assets/token-icons/20.png";
// import IndexxText from "../../assets/indexxscan.png";
// import Bottom from "../../assets/scan-bottom.png";
import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, InputNumber, Tag } from 'antd';
import { useState } from 'react';
import downArrow from "../../assets/arts/downArrow.svg";
import Chart from "../Chart/Chart";

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const App: React.FC<(Props)> = ({ setStatus }) => {
    // const [showToken, setShowToken] = useState(false);
    const [toggleChart, setToggleChart] = useState(true);
    // const [tokenType, setTokenType] = useState("from");
    // const tokenType = "from";
    const onChange = (value: string) => {
        console.log('changed', value);
    };

    const connectWallet = () => {
        console.log("wallet clicked");
        setStatus("ConfirmSwap");
    }
    const changeFromIcon = () => {
        setStatus("SelectToken");
    }
    return (
        <div className="scan-container">
            {toggleChart && <Chart />}

            <div className='card'>
                <div className='card__header'>
                    <div className='card__header__inner'>
                        <div className='card__header__inner__left'>
                            <img src={chartIcon} alt="chart icon" onClick={() => setToggleChart(!toggleChart)} />
                        </div>
                        <h1 className='card__title'>Swap</h1>
                        <div className='card__header__inner__right'>
                            {/* <img src={gearIcon} className="setting__icon" alt="Settings icon" /> */}
                            <ReloadOutlined className='undo_icon swap_icons' />
                            <ReloadOutlined className='swap_icons' />
                        </div>
                    </div>
                    <div className='card__header__inner flex-justify-center'>
                        <p style={{ marginBottom: 0, color: "#006DFF", fontSize: "20px" }}>Trade token easier and faster</p>
                    </div>
                </div>

                <div className='card__body'>
                    <div className='from__icon'>
                        <Button type="link" className='icon__label' onClick={changeFromIcon}>
                            <img src={bitCoin} alt="bit coin" width="30" />
                            <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>BTC</span>
                            <DownOutlined style={{ fontSize: "16px" }} />
                        </Button>
                        <InputNumber<string>
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                            onChange={onChange}
                            size="large"
                            className='input__field'
                            type='number'
                            placeholder='0.0'
                        />
                    </div>

                    <div className='swap__coin centered'>
                        <span className='swap__coin__circle centered'>
                            <img src={downArrow} alt="Swap coins" />
                        </span>
                    </div>

                    <div className='to__icon'>
                        <Button type="link" className='icon__label' onClick={changeFromIcon}>
                            <img src={busdCoin} alt="bit coin" width="30" />
                            <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>BUSD</span>
                            <DownOutlined style={{ fontSize: "16px" }} />
                        </Button>
                        <InputNumber<string>
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                            onChange={onChange}
                            size="large"
                            className='input__field'
                            type='number'
                            placeholder='0.0'
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


        </div>
    );
}

export default App;
