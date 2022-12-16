import './IndexxScan.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, InputNumber, Tag, Tooltip } from 'antd';
import { useState } from 'react';
// import downArrow from "../../assets/arts/downArrow.svg";
// import Chart from "../Chart/Chart";
import swapIcon from "../../assets/arts/swapIcon.svg";
import historyIcon from "../../assets/arts/historyIcon.svg";
import ladySwapIcon from "../../assets/arts/ladySwapIcon.png";
import initialTokens from "../../utils/Tokens.json";


import { useFromTokenContext, useToTokenContext } from '../../utils/SwapContext';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
    setTokenType: (value: string | ((prevVar: string) => string)) => void;
}

const App: React.FC<(Props)> = ({ setStatus, setTokenType }) => {
    const [toggleChart, setToggleChart] = useState(true);
    // let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    let chartIconVisible = toggleChart ? "cursor-pointer disable_icon" : "cursor-pointer ";
    const [fromTokenVal, setFromTokenVal] = useState(0);
    const [toTokenVal, setToTokenVal] = useState(0);

    const { fromToken } = useFromTokenContext();
    const { toToken } = useToTokenContext();

    let fromTitle, fromAddress, fromImage;
    let title, address, image;

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === fromToken;
    });

    if (filteredFromArray && filteredFromArray.length) {
        fromTitle = filteredFromArray[0].title;
        fromAddress = filteredFromArray[0].address;
        fromImage = filteredFromArray[0].image;
    }

    const filteredArray = initialTokens.filter(function (obj) {
        return obj?.address === toToken;
    });

    if (filteredArray && filteredArray.length) {
        title = filteredArray[0].title;
        address = filteredArray[0].address;
        image = filteredArray[0].image;
    }


    // console.log(filteredArray[0]);

    const onChangeFromToken = (value: any) => {
        // console.log('changed', value);
        setFromTokenVal(value);
    };
    const onChangeToToken = (value: any) => {
        // console.log('changed', value);
        setToTokenVal(value);
    };


    const connectWallet = () => {
        console.log("wallet clicked");
        setStatus("ConfirmSwap");
    }
    const changeFromIcon = () => {
        setStatus("SelectToken");
        setTokenType("from");
    }
    const changeToIcon = () => {
        setStatus("SelectToken");
        setTokenType("to");
    }
    return (
        <>
            <div className="scan-container flex-align-stretch">
                {toggleChart}
                <div className='card'>
                    <div className='card__header'>
                        <div className='card__header__inner'>
                            <div className='card__header__inner__left'>
                                {/* <img src={chartIconVisible} className="cursor-pointer" alt="chart icon" onClick={() => setToggleChart(!toggleChart)} /> */}
                                <img src={chartHiddenIcon} className={chartIconVisible} alt="chart icon" onClick={() => setToggleChart(!toggleChart)} />
                            </div>
                            <h1 className='card__title'>Swap</h1>
                            <div className='card__header__inner__right'>
                                {/* <img src={gearIcon} className="setting__icon" alt="Settings icon" /> */}
                                <img src={historyIcon} width="20" height="20" className='swap_icons' alt="History Icon" />
                                <ReloadOutlined className='swap_icons padding-l-1x' style={{ color: "rgba(129, 129, 129, 0.5)" }} />
                            </div>
                        </div>
                        <div className='card__header__inner flex-justify-center'>
                            <p style={{ marginBottom: 0, color: "#5f5f5f", fontSize: "14px" }}>Trade token easier and faster</p>
                        </div>
                    </div>

                    <div className='card__body'>
                        <div className='from__icon'>
                            <Button type="link" className='icon__label' onClick={changeFromIcon} data-address={address}>
                                <img src={require(`../../assets/token-icons/${fromImage}.png`).default} alt="bit coin" width="30" />
                                <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>{fromTitle}</span>
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
                            <Button className='swap__coin__circle centered'>
                                {/* <img src={downArrow} alt="Swap coins" /> */}
                                &nbsp;
                            </Button>
                        </div>

                        <div className='to__icon'>
                            <Button type="link" className='icon__label' onClick={changeToIcon} data-address={fromAddress}>
                                <img src={require(`../../assets/token-icons/${image}.png`).default} alt="bit coin" width="30" />
                                <span style={{ fontSize: "28px", padding: "0 10px 0", lineHeight: 1, color: "#5F5F5F" }}>{title}</span>
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
                            <Tooltip title="The scan result is provided by 3rd parties and may not cover every token. Therefore the result is for reference only, do NOT take it as investment or financial advice.">
                                <QuestionCircleOutlined className='question_iocn primary_hover' />
                            </Tooltip>
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
                                    <div>1 iUSD+</div>
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
            <div className='centered lady_swap_icon'>
                {toggleChart && ladySwapIcon && <img src={ladySwapIcon} width="800" alt="Gold swap" />}
            </div>
        </>

    );
}

export default App;
