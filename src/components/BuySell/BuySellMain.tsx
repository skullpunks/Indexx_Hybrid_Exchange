import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useState } from 'react';
// import downArrow from "../../assets/arts/downArrow.svg";
import Chart from "../ChartBuy/Chart";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import historyIcon from "../../assets/arts/historyIcon.svg";
// import initialTokens from "../../utils/Tokens.json";




import BuySellIntro from './BuySellIntro';
import BuySellSelect from './BuySellSelect';
import BuySellCreate from './BuySellCreate';
import BuySellGetStarted from './BuySellGetStarted';
import BuySellEmailAuth from './BuySellEmailAuth';
import BuySellSecureSteps from './BuySellSecureSteps';
import BuySellMobiAuth from './BuySellMobiAuth';
import BuySellmobiVerfication from './BuySellmobiVerfication';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}


const BuySellMain: React.FC<(Props)> = ({ setStatus }) => {
    const [toggleChart, setToggleChart] = useState(true);
    const [screenName, setScreenName] = useState("");
    console.log(setToggleChart);
    // let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    return (
        <div className="scan-container flex-align-stretch">
            {toggleChart && <Chart />}
            {screenName === "" && <BuySellIntro setScreenName={setScreenName} />}
            {screenName === "select" && <BuySellSelect setScreenName={setScreenName} />}
            {screenName === "create" && <BuySellCreate setScreenName={setScreenName} />}
            {screenName === "getStarted" && <BuySellGetStarted setScreenName={setScreenName} setToggleChart={setToggleChart} />}
            {screenName === "EmailAuth" && <BuySellEmailAuth setScreenName={setScreenName}  setToggleChart={setToggleChart} />}
            {screenName === "SecureSteps" && <BuySellSecureSteps setScreenName={setScreenName} setToggleChart={setToggleChart}  />}
            {screenName === "MobiAuth" && <BuySellMobiAuth setScreenName={setScreenName} setToggleChart={setToggleChart}  />}
            {screenName === "mobiVerfication" && <BuySellmobiVerfication setScreenName={setScreenName} setToggleChart={setToggleChart}  />}
        </div>






    )
}

export default BuySellMain