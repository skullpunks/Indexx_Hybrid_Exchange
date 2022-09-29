import IN500 from "../../assets/token-icons/33.png";
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellIntro: React.FC<(Props)> = ({ setScreenName }) => {

    return (<div className="bs_container card">
        <div className="bs_container_header">
            <h1>Buy Crypto</h1>
        </div>
        <div className="bs_container_main">
            <div className="bs_curreny d-flex ">
                <div className="bs_curreny_left"><span className="bs_currency_symbol">$ </span>0</div>
                <div><img src={SwapArrowIcon} alt="ddd" /></div>
            </div>
            <div className="bs_purchase d-flex">
                <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                One-time purchase
            </div>
        </div>
        <div className="bs_token d-flex" style={{ alignItems: "center" }}>
            <div className="bs_token_left d-flex justify-between">
                <div className="bs_token_num d-flex flex-align-center" onClick={() => setScreenName("select")}>
                    <img src={IN500} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                    IN500 <span className="token_grey">Indexx500</span>
                </div>

            </div>
            <div>  <img src={arrowAddress} alt="arrow icon" style={{}} /></div>
        </div>
        <div className="bs_footer_action">
            <button>Preview Purchase </button>
        </div>
    </div>
    )

}


export default BuySellIntro;