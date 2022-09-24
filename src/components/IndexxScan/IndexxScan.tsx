import './IndexxScan.css';
import chartIcon from "../../assets/arts/chartIcon.svg";
import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

import IN500 from "../../assets/token-icons/33.png";
import IUSD from "../../assets/token-icons/35.png";
import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, InputNumber, Tag } from 'antd';
import { useState } from 'react';
import downArrow from "../../assets/arts/downArrow.svg";
import Chart from "../Chart/Chart";
import swapIcon from "../../assets/arts/swapIcon.svg";
import historyIcon from "../../assets/arts/historyIcon.svg";

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const App: React.FC<(Props)> = ({ setStatus }) => {
    const [toggleChart, setToggleChart] = useState(true);
    let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    const [fromTokenVal, setFromTokenVal] = useState(0);
    const [toTokenVal, setToTokenVal] = useState(0);

    const onChangeFromToken = (value: any) => {
        console.log('changed', value);
        setFromTokenVal(value);
    };
    const onChangeToToken = (value: any) => {
        console.log('changed', value);
        setToTokenVal(value);
    };


    const connectWallet = () => {
        console.log("wallet clicked");
        setStatus("ConfirmSwap");
    }
    const changeFromIcon = () => {
        setStatus("SelectToken");
    }
    return (
        <div className="scan-container flex-align-stretch">
            {toggleChart && <Chart />}
            <div className='card'>
                <div className='card__header'>
                    <div className='card__header__inner'>
                        <div className='card__header__inner__left'>
                            <img src={chartIconVisible} className="cursor-pointer" alt="chart icon" onClick={() => setToggleChart(!toggleChart)} />
                        </div>
                        <h1 className='card__title'>Swap</h1>
                        <div className='card__header__inner__right'>
                            {/* <img src={gearIcon} className="setting__icon" alt="Settings icon" /> */}
                            <img src={historyIcon} width="20" height="20" className='swap_icons' alt="History Icon" />
                            <ReloadOutlined className='swap_icons padding-l-1x' />
                        </div>
                    </div>
                    <div className='card__header__inner flex-justify-center'>
                        <p style={{ marginBottom: 0, color: "#006DFF", fontSize: "14px" }}>Trade token easier and faster</p>
                    </div>
                </div>

                <div className='card__body'>
                    <div className='from__icon'>
                        <Button type="link" className='icon__label' onClick={changeFromIcon}>
                            <img src={IN500} alt="bit coin" width="30" />
                            <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>IN500</span>
                            <DownOutlined style={{ fontSize: "16px" }} />
                        </Button>
                        <InputNumber<string>
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                            onChange={onChangeFromToken}
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
                            <img src={IUSD} alt="bit coin" width="30" />
                            <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>IUSD+</span>
                            <DownOutlined style={{ fontSize: "16px" }} />
                        </Button>
                        <InputNumber<string>
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                            onChange={onChangeToToken}
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
                    {(fromTokenVal > 0 || toTokenVal > 0) &&
                        <div className="d-flex flex-justify-between">
                            <div>Price</div>
                            <div style={{ height: 35 }}>0.004 IN500 per USD<img src={swapIcon} alt="swapIcon" style={{ marginTop: -6, paddingLeft: 5 }} /></div>
                        </div>
                    }
                    <div className="d-flex flex-justify-between">
                        <div>Slippage Tolerance</div>
                        <div className="helper_text">0.5%</div>
                    </div>

                </div>

                <div className='card__footer padding-t-0'>
                    <Button type="primary" block shape="round" size="large" className="btn_xl"
                        onClick={connectWallet}>Connect Wallet</Button>
                    {(fromTokenVal > 0 || toTokenVal > 0) &&
                        <div className="footer_body">
                            <div className="d-flex flex-justify-between">
                                <div>Minimum Received </div>
                                <div>1 BUSD</div>
                            </div>
                            <div className="d-flex flex-justify-between">
                                <div>Price Impact</div>
                                <div className="helper_text">7.90%</div>
                            </div>
                            <div className="d-flex flex-justify-between">
                                <div>Liquidity Provider Fee</div>
                                <div>0.005988 BNB</div>
                            </div>
                        </div>
                    }

                </div>
            </div>


        </div>
    );
}

export default App;
