import React, { useState } from 'react';
import chartIcon from "../../assets/arts/chartIcon.svg";
import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";
import './ConfirmSwap.css';
// import BNBIcon from "../../assets/arts/BNBIcon.svg";
// import BUSDIcon from "../../assets/arts/BUSDIcon.svg";
import IN500 from "../../assets/token-icons/33.png";
import IUSD from "../../assets/token-icons/35.png";
import downArrow from "../../assets/arts/downArrow.svg";
import { ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tag, InputNumber } from 'antd';
import swapIcon from "../../assets/arts/swapIcon.svg";
import historyIcon from "../../assets/arts/historyIcon.svg";
import Chart from '../Chart/Chart';
import { Tooltip } from 'antd';
import initialTokens from "../../utils/Tokens.json";
import { useFromTokenContext, useToTokenContext } from '../../utils/SwapContext';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const ConfirmSwap: React.FC<(Props)> = ({ setStatus }) => {
    const { fromToken } = useFromTokenContext();
    const { toToken } = useToTokenContext();
    let fromImage, image;
    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === fromToken;
    });
    const filteredArray = initialTokens.filter(function (obj) {
        return obj?.address === toToken;
    });

    (filteredFromArray && filteredFromArray.length) ? (fromImage = filteredFromArray[0].image) : fromImage = "";
    (filteredArray && filteredArray.length) ? (image = filteredArray[0].image) : image = "";


    const [toggleChart, setToggleChart] = useState(false);
    let chartIconVisible = toggleChart ? "cursor-pointer disable_icon" : "cursor-pointer ";
    console.log(setStatus);
    return (
        <div className="scan-container flex-align-stretch">
            {toggleChart && <Chart />}
            <div className='card'>
                <div className="card__header">
                    <div className="card_header_inner d-flex flex-justify-between flex-align-center">
                        <div className="card_header_inner_left">
                            <img src={chartHiddenIcon} className={chartIconVisible} alt="chart icon" onClick={() => setToggleChart(!toggleChart)} />
                        </div>
                        <h1 className="card_title">
                            Swap
                        </h1>
                        <div className=" d-flex card_header_inner_right ">
                            <img src={historyIcon} width="20" height="20" className='swap_icons' alt="History Icon" />
                            <ReloadOutlined className='swap_icons padding-l-1x' style={{ color: "rgba(129, 129, 129, 0.5)" }} />
                        </div>
                    </div>
                    <div className="d-flex flex-justify-center helper_text" >Trade token easier and faster</div>
                </div>


                <div className="card_body">
                    <div className="from_body">
                        <div className="d-flex flex-align-center">
                            {/* <img src={IN500} alt="IN500 Here" width="30" /> */}
                            <img src={require(`../../assets/token-icons/${fromImage}.png`).default} alt="bit coin" width="30" />

                            <h1 className="chart_title">IN500</h1>
                            <img src={downArrow} alt="downarrow" style={{ width: 19, height: 18 }} />
                        </div>

                        <InputNumber
                            style={{ width: "100%" }}
                            defaultValue="1"
                            min="0"
                            max="1000"

                            size="large"
                            className='input__field'
                            type='number'
                            placeholder='0.0'
                        />
                    </div>
                    <div className='swap__coin centered'>
                        <Button className='swap__coin__circle centered'>
                            <img src={downArrow} alt="Swap coins" width="30" />
                        </Button>
                    </div>

                    <div className="to_body">
                        <div className="d-flex flex-align-center">
                            {/* <img src={IUSD} alt="IUSD+ Here" width="30" /> */}
                            <img src={require(`../../assets/token-icons/${image}.png`).default} alt="bit coin" width="30" />

                            <h1 className="chart_title">IUSD+</h1>
                            <img src={downArrow} alt="downarrow" style={{ width: 19, height: 18 }} />
                        </div>

                        <InputNumber
                            style={{ width: "100%" }}
                            defaultValue="0.00133973"
                            min="0"
                            max="1000"

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
                    <div className="card_body_meta_data" style={{ color: "#5f5f5f" }}>
                        <div className="d-flex flex-justify-between">
                            <div>Price</div>
                            <div style={{ height: 35 }}>0.004 IN500 per USD<img src={swapIcon} alt="swapIcon" style={{ marginTop: -6, paddingLeft: 5 }} /></div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Slippage Tolerance</div>
                            <div className="helper_text">0.5%</div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <Button type="primary" onClick={() => { setStatus("ConfirmSwapTwo"); }} className="atn-btn atn-btn-round btn_xl" block>Swap</Button>

                    <div className="footer_body">
                        <div className="d-flex flex-justify-between">
                            <div>Minimum Received </div>
                            <div>1 IUSD+</div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Price Impact</div>
                            <div className="helper_text">7.90%</div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Liquidity Provider Fee</div>
                            <div>0.005988 IN500</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmSwap