import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useContext, useState } from 'react';
import BuySellCreate from './BuySellCreate';
import BuySellIntro from './BuySellIntro';
// import BuySellSelect from './BuySellSelect';
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
import IndexxPhoenixGraph from '../Graphs/IndexxPhoenixGraph';
import IndexxCryptoGraph from '../Graphs/IndexxCrypto';
import BSBuyInProgress from './BSBuyInProgress';
import BSConfirmPurchase from './BSConfirmPurchase';
import IndexxUSDPGraph from '../Graphs/IndexxUSDPGraph';
import IndexxExchangeGraph from '../Graphs/IndexxExchange';
import LitecoinGraph from '../Graphs/LitecoinGraph';
import BinanceGraph from '../Graphs/BinanceGraph';
import FTTGraph from '../Graphs/FTTGraph';
// import BuySellGetStarted from './BuySellGetStarted';
import { Route, Routes } from 'react-router-dom';
// import { BSProvider } from '../../utils/SwapContext';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}
let graphs: any = {
    "BitcoinGraph": BitcoinGraph,
    "Indexx500Graph": Indexx500Graph,
    "EthereumGraph": EthereumGraph,
    "IndexxCrypto": IndexxCryptoGraph,
    "IndexxUSDPGraph": IndexxUSDPGraph,
    "BinanceGraph": BinanceGraph,
    "LitecoinGraph": LitecoinGraph,
    "IndexxExchange": IndexxExchangeGraph,
    "IndexxPhoenixGraph": IndexxPhoenixGraph,
    "FTTGraph": FTTGraph
}

const BuySellMain: React.FC<(Props)> = ({ setStatus }) => {
    // const [status, setStatus] = useState("");
    const [toggleChart, setToggleChart] = useState(true);
    const [screenName, setScreenName] = useState("");
    const { BSvalue } = useContext(BSContext) as BSContextType;

    let ChartCoin: any = Indexx500Graph;
    if (BSvalue && BSvalue.fromGraph && graphs) {
        console.log("ChartCoin", BSvalue.fromGraph);
        ChartCoin = graphs[BSvalue.fromGraph];
        console.log("ChartCoin", ChartCoin);
    }

    return (
        <div className='swap_container' >
            <div className="scan-container flex-align-stretch bs_main">
                {toggleChart && <ChartCoin />}
                {/* {screenName === "" && <BuySellIntro setScreenName={setScreenName} />} */}
                {/* {screenName === "select" && <BuySellSelect setScreenName={setScreenName} />} */}
                {/* {screenName === "confirmPurchase" && <BSConfirmPurchase setScreenName={setScreenName} />} */}
                {/* {screenName === "BSBuyInProgress" && <BSBuyInProgress setScreenName={setScreenName} />} */}
                {/* {screenName === "create" && <BuySellCreate setScreenName={setScreenName} />} */}
                {/* {screenName === "confirmConvert" && <BSConfirmConvert setScreenName={setScreenName} />} */}
                {/* {screenName === "BSConvertInProgress" && <BSConvertInProgress setScreenName={setScreenName} />} */}
                {/* {screenName === "BSConvertInProgressProcessing" && <BSConvertInProgressProcessing setScreenName={setScreenName} />} */}
                {/* {screenName === "BSTractionHistory" && <BSTractionHistory setScreenName={setScreenName} setToggleChart={setToggleChart} />} */}
                {/* {screenName === "BSSellConfirmConvert" && <BSSellConfirmConvert setScreenName={setScreenName} />} */}
                {/* {screenName === "BSSellInprogress" && <BSSellInprogress setScreenName={setScreenName} />} */}
                <Routes>
                    <Route path="" element={<BuySellIntro setScreenName={setScreenName} />} />
                    <Route path="confirm-purchase" element={<BSConfirmPurchase setScreenName={setScreenName} />} />
                    <Route path="buy-in-progress" element={<BSBuyInProgress setScreenName={setScreenName} />} />
                    <Route path="create" element={<BuySellCreate setScreenName={setScreenName} />} />
                    <Route path="confirm-convert" element={<BSConfirmConvert setScreenName={setScreenName} />} />
                    <Route path="convert-in-progress" element={<BSConvertInProgress setScreenName={setScreenName} />} />
                    <Route path="convert-in-progress-process" element={<BSConvertInProgressProcessing setScreenName={setScreenName} />} />
                    <Route path="traction-history" element={<BSTractionHistory setScreenName={setScreenName} setToggleChart={setToggleChart} />} />
                    <Route path="sell-confirm-convert" element={<BSSellConfirmConvert setScreenName={setScreenName} />} />
                    <Route path="sell-in-progress" element={<BSSellInprogress setScreenName={setScreenName} />} />

                </Routes>
            </div>



            {
                (screenName === "" || screenName === "select" || screenName === "create") ?
                    <></>
                    :
                    <></>

            }
        </div >


    )
}

export default BuySellMain