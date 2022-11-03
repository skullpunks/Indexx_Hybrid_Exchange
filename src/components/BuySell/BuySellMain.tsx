import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useContext, useState } from 'react';
// import downArrow from "../../assets/arts/downArrow.svg";
// import ChartBuySell from "../ChartBuy/ChartBuySell";
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
// import personFlipIconGold from "../../assets/arts/personFlipIconGold.svg";
// import ladyBuyGoldImage from "../../assets/arts/ladyBuyGoldImage.png";
import BSConfirmConvert from './BSConfirmConvert';
import BSConvertInProgress from './BSConvertInProgress';
import BSConvertInProgressProcessing from './BSConvertInProgressProcessing';
import BSSellConfirmConvert from './BSSellConfirmConvert';
import BSSellInprogress from './BSSellInprogress';
import BSTractionHistory from './BSTractionHistory';
// import { Route, Routes } from 'react-router-dom';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import BitcoinGraph from '../Graphs/BitcoinGraph';
import EthereumGraph from '../Graphs/EthereumGraph';
import Indexx500Graph from '../Graphs/Indexx500Graph';
import IndexxCryptoGraph from '../Graphs/IndexxCrypto';
import BSBuyInProgress from './BSBuyInProgress';
import BSConfirmPurchase from './BSConfirmPurchase';
// import IndexxUSDPGraph from '../Graphs/IndexxUSDPGraph';
import IndexxExchangeGraph from '../Graphs/IndexxExchange';
import LitecoinGraph from '../Graphs/LitecoinGraph';
// import BinanceGraph from '../Graphs/BinanceGraph';
// import BuySellGetStarted from './BuySellGetStarted';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}
let graphs: any = {
    "BitcoinGraph": BitcoinGraph,
    "Indexx500Graph": Indexx500Graph,
    "EthereumGraph": EthereumGraph,
    "IndexxCrypto": IndexxCryptoGraph,
    // "IndexxUSDPGraph": IndexxUSDPGraph,
    // "BinanceGraph": BinanceGraph,
    "LitecoinGraph": LitecoinGraph,
    "IndexxExchange": IndexxExchangeGraph

}

const BuySellMain: React.FC<(Props)> = ({ setStatus }) => {
    const [toggleChart, setToggleChart] = useState(true);
    const [screenName, setScreenName] = useState("");
    const { BSvalue } = useContext(BSContext) as BSContextType;

    // const Checkout = ({ step }: any) => {
    //     const ToRender = graphs[step]
    //     return (
    //         <ToRender />
    //     )
    // }
    // console.log(setToggleChart);
    // let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    let ChartCoin: any = Indexx500Graph;
    if (BSvalue && BSvalue.fromGraph && graphs) {
        ChartCoin = graphs[BSvalue.fromGraph];
    }

    return (
        <>
            <div className="scan-container flex-align-stretch bs_main">
                {/* {(BSvalue && BSvalue.fromGraph == "Indexx500Graph") && <Indexx500Graph />} */}


                {/* {toggleChart && <Indexx500Graph />} */}
                {toggleChart && <ChartCoin />}
                {/* {<ChartCoin />} */}
                {/* {toggleChart && <Checkout step={BSvalue?.fromGraph} />} */}
                {/* {toggleChart && <ChartCoin />} */}
                {/* {toggleChart && <EthereumGraph />} */}
                {/* {toggleChart && <IndexxCryptoGraph />} */}
                {/* {toggleChart && <ChartBuySell />} */}
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
                    <div className='centered buy_sell_bg'>
                        {/* <img className='mw-100' src={ladyBuyGoldImage} alt="person Flip Icon Gold" /> */}
                    </div>
                    :
                    <></>

            }
        </>


    )
}

export default BuySellMain