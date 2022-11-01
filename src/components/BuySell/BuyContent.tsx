import React, { useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import bsDollar from "../../assets/arts/bsDollar.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import initialTokens from "../../utils/Tokens.json";
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMinAndMaxOrderValues, isLoggedIn } from "../../services/api";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import "./BS-Sell.css";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
// const menu = (
//     <Menu
//         items={[
//             {
//                 label: <span>
//                     One-time purchase </span>,
//                 key: '0',
//             },
//             {
//                 label: <span>Daily <span>(coming soon)</span> <br />Every day starting today </span>,
//                 key: '1',
//                 disabled: true,
//             },
//             {
//                 label: <span>Weekly <span>(coming soon)</span> <br />Every Tuesday starting today</span>,
//                 key: '2',
//                 disabled: true,
//             },
//             {
//                 label: <span>Every 1st and 15th <span>(coming soon)</span> <br />Today and every 1st and 15th</span>,
//                 key: '3',
//                 disabled: true,
//             },
//             {
//                 label: <span>Monthly <span>(coming soon)</span> <br /> Purchase recurs every month</span>,
//                 key: '4',
//                 disabled: true,
//             },
//         ]}
//     />
// );
const BuyContent: React.FC<(Props)> = ({ setScreenName }) => {
    // const navigate= useNavigate();
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const navigateUser = () => {
        if (isLoggedIn()) {
            // navigate("./")
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(buyVal) });
            }
            setScreenName("confirmPurchase");
        } else {
            setScreenName("create");
        }
    }

    const [buyVal, setBuyVal] = useState("");
    const [isLimitPassed, setLimitPassed] = useState(true);
    const [minMavData, setMinMaxData] = useState() as any;

    useEffect(() => {
        if (BSvalue && BSvalue.amount !== 0)
            setBuyVal(BSvalue?.amount.toString());
        getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
            setMinMaxData(x);
        });

    }, [BSvalue])

    const handleChange = async (value: string) => {
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, fromToken: value });
        }
        let getRequiredCoin = initialTokens.find(x => x.address === value);
        await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(buyVal));
    };

    const checkMinMaxValue = async (value: string, buyValue: number) => {
        let minAndMax = await getMinMaxValue(value);
        if (buyValue > minAndMax.max) {
            setLimitPassed(false);
        } else if (buyValue < minAndMax.min) {
            setLimitPassed(false);
        }
        else {
            setLimitPassed(true);
        }
    }

    const getMinMaxValue = async (value: string) => {
        let res = await getMinAndMaxOrderValues(value, "BUY");
        return res;
    }

    const updateBuyVal = async (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setBuyVal(testVal);
            let value = BSvalue?.fromTitle;
            let getRequiredCoin = initialTokens.find(x => x.address === value);
            console.log(String(getRequiredCoin?.title));
            await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(testVal));
        }
    }

    return (
        <div><div className="bs_container_main">
            <div className="bs_curreny d-flex position-relative ">
                <div className="bs_curreny_left padding-b-2x flex-align-center" style={{ transform: "scale(1)" }}>
                    <span className="font_20x">$</span>
                    {/* <input placeholder="0" className=" " type="text" value={val} onChange={() => updateBuyVal} style={{ width: "207px" }} /> */}
                    <input placeholder="0"  className="input_currency" type="number" value={buyVal} onChange={updateBuyVal} />
                </div>
                <div className='swap_Arrow_icon'>
                    <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                </div>

            </div>
            {(!isLimitPassed) ?
                <div className='error_message font_15x'>You can only Buy a minimum of {String(minMavData?.min)} USD or maximum of {String(minMavData?.max)} USD</div>
                :
                <></>
            }
            {/* <div className="bs_purchase d-flex">
                <Dropdown overlay={menu} trigger={['click']} >
                    <Space style={{ color: "#F66036" }}>
                        <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                        One-time purchase
                    </Space>
                </Dropdown>
            </div> */}
        </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center", padding: 8 }} >
                <div className="bs_token_left d-flex justify-between">
                    <div className=' d-flex flex-justify-between flex-align-center width-100'>
                        <Select className='width-100 border-0'
                            onChange={handleChange} value={BSvalue?.fromToken}>
                            {
                                initialTokens.map((token, index) => {

                                    return <Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} >
                                        <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                                    </Option>
                                })
                            }

                        </Select>
                    </div>
                </div>

            </div>

            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="38" height="38" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>

            </div>
            
            <div className="bs_footer_action">
                <button onClick={navigateUser} disabled={(!isLimitPassed)}>Preview Purchase </button>
            </div>
        </div>
    )
}

export default BuyContent;