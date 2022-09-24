import React from 'react';
import chartIcon from '../../assets/arts/chartIcon.svg';
import './ConfirmSwap.css';
import BNBIcon from "../../assets/arts/BNBIcon.svg";
import BUSDIcon from "../../assets/arts/BUSDIcon.svg";
import downArrow from "../../assets/arts/downArrow.svg";
import { ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button,Tag,InputNumber} from 'antd';
import swapIcon from "../../assets/arts/swapIcon.svg";

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const ConfirmSwap: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className="scan-container">
            <div className='card'>
                <div className="card__header">
                    <div className="card_header_inner d-flex flex-justify-between flex-align-center">
                        <div className="card_header_inner_left">
                            <img src={chartIcon} alt="chartIcon"/>
                        </div>
                        <h1 className="card_title">
                            Swap
                        </h1>
                        <div className=" d-flex card_header_inner_right ">
                        <ReloadOutlined className='undo_icon swap_icons' />
                            <ReloadOutlined className='swap_icons'  style={{color:"rgba(129, 129, 129, 0.5)"}}/>
                        </div>
                    </div>
                    <div className="d-flex flex-justify-center helper_text" >Trade token easier and faster</div>
                </div>
                

                <div className="card_body">
                    <div className="from_body">
                        <div className="d-flex flex-align-center">
                            <img src={BNBIcon} alt= "BNBIcon Here" />
                            <h1 className="chart_title">BNB</h1>
                            <img src={downArrow} alt="downarrow"  style={{width:19, height:18}}/>
                        </div>

                        <InputNumber
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                           
                            size="large"
                            className='input__field'
                            type='number'
                            placeholder='1'
                        />
                    </div>
                    <div className='swap__coin centered'>
                        <span className='swap__coin__circle centered'>
                            <img src={downArrow} alt="Swap coins" />
                        </span>
                    </div>

                    <div className="to_body">
                        <div className="d-flex flex-align-center">
                            <img src={BUSDIcon} alt= "BUSDIcon Here" />
                            <h1 className="chart_title">BUSD</h1>
                            <img src={downArrow} alt="downarrow"  style={{width:19, height:18}}/>
                        </div>

                        <InputNumber
                            style={{ width: "100%" }}
                            defaultValue=""
                            min="0"
                            max="1000"
                           
                            size="large"
                            className='input__field'
                            type='number'
                            placeholder='0.00133973'
                        />
                    </div> 
                    <div className='info__text'>
                        <Tag color="#006DFF" className='tag' >SCAN RISK</Tag>
                        <QuestionCircleOutlined style={{ fontSize: '20px', color: '#006DFF' }} />

                    </div>
                    <div className="card_body_meta_data" style={{color:"#5f5f5f"}}>
                        <div className="d-flex flex-justify-between">
                            <div>Price</div> 
                            <div style={{height:35}}>0.004 BNB per USD<img src={swapIcon} alt="swapIcon" style={{marginTop: -6,paddingLeft:5}}/></div>
                        </div>
                        <div className="d-flex flex-justify-between">
                            <div>Slippage Tolerance</div> 
                            <div className="helper_text">0.5%</div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <Button type="primary" className="atn-btn atn-btn-round" style={{height:55,backgroundColor:" #006DFF",color:"#fff",fontSize:20,borderRadius:5}} block>Swap</Button>
              
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
                </div>
            </div>
        </div>
    )
}

export default ConfirmSwap