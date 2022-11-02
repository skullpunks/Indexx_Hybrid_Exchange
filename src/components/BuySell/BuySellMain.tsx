import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useState } from 'react';
// import downArrow from "../../assets/arts/downArrow.svg";
import ChartBuySell from "../ChartBuy/ChartBuySell";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import historyIcon from "../../assets/arts/historyIcon.svg";
// import initialTokens from "../../utils/Tokens.json";
import BuySellCreate from './BuySellCreate';
import BuySellIntro from './BuySellIntro';
import BuySellSelect from './BuySellSelect';
// import BuySellEmailAuth from './BuySellEmailAuth';
// import BuySellSecureSteps from './BuySellSecureSteps';
// import BuySellMobiAuth from './BuySellMobiAuth';
// import BuySellmobiVerfication from './BuySellmobiVerfication';
import personFlipIconGold from "../../assets/arts/personFlipIconGold.svg";
import BSConfirmConvert from './BSConfirmConvert';
import BSConvertInProgress from './BSConvertInProgress';
import BSConvertInProgressProcessing from './BSConvertInProgressProcessing';
import BSSellConfirmConvert from './BSSellConfirmConvert';
import BSSellInprogress from './BSSellInprogress';
import BSTractionHistory from './BSTractionHistory';
// import { Route, Routes } from 'react-router-dom';
import Indexx500Graph from '../Graphs/Indexx500Graph';
import BSBuyInProgress from './BSBuyInProgress';
import BSConfirmPurchase from './BSConfirmPurchase';
// import BuySellGetStarted from './BuySellGetStarted';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}


const BuySellMain: React.FC<(Props)> = ({ setStatus }) => {
    const [toggleChart, setToggleChart] = useState(true);
    const [screenName, setScreenName] = useState("");
    console.log(setToggleChart);
    // let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    return (
        <>
            <div className="scan-container flex-align-stretch bs_main">
                {/* {toggleChart && <BitcoinGraph />} */}
                {toggleChart && <Indexx500Graph />}
                {/* {toggleChart && <EthereumGraph />} */}
                {/* {toggleChart && <IndexxCryptoGraph />} */}
                {/* {toggleChart && <LineGraph /> } Indexx500Graph */}
                {toggleChart && <ChartBuySell />}
                {screenName === "" && <BuySellIntro setScreenName={setScreenName} />}
                {screenName === "select" && <BuySellSelect setScreenName={setScreenName} />}
                {screenName === "confirmPurchase" && <BSConfirmPurchase setScreenName={setScreenName} />}
                {screenName === "BSBuyInProgress" && <BSBuyInProgress setScreenName={setScreenName} />}
                {screenName === "create" && <BuySellCreate setScreenName={setScreenName} />}
                {screenName === "confirmConvert" && <BSConfirmConvert setScreenName={setScreenName} />}
                {screenName === "BSConvertInProgress" && <BSConvertInProgress setScreenName={setScreenName} />}
                {screenName === "BSConvertInProgressProcessing" && <BSConvertInProgressProcessing setScreenName={setScreenName} />}
                {screenName === "BSTractionHistory" && <BSTractionHistory setScreenName={setScreenName} setToggleChart={setToggleChart} />}
                {screenName === "BSSellConfirmConvert" && <BSSellConfirmConvert setScreenName={setScreenName} />}
                {screenName === "BSSellInprogress" && <BSSellInprogress setScreenName={setScreenName} />}
            </div>

            {/* <Routes>
                <Route index element={<BuySellIntro setScreenName={setScreenName} />} />
            </Routes> */}

            {
                (screenName === "" || screenName === "select" || screenName === "create") ?
                    <div className='centered' style={{ paddingBottom: 180 }}>
                        <img className='mw-100' src={personFlipIconGold} alt="person Flip Icon Gold" />
                    </div>
                    :
                    <></>

            }
        </>


    )
}

export default BuySellMain