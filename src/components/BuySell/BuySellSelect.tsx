
import { Button } from 'antd';
import arrowAdressLeft from "../../assets/arts/arrowAdressLeft.svg";
import SearchIcon from "../../assets/arts/SearchIcon.svg";
import initialTokens from "../../utils/Tokens.json";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
// const removeCommonTokens = () => {
//     return initialTokens.filter(function (obj) {
//         return !obj?.commonToken;
//     })
// }
// const onlyCommonTokens = initialTokens.filter(function (obj) {
//     return obj?.commonToken;
// });

const BuySellSelect: React.FC<(Props)> = ({ setScreenName }) => {
    return (
        <div className="bs_container card">
            <div className="bs_container_header d-flex border-b-0">
                <img src={arrowAdressLeft} alt="adressLeft" className="left_arrow" onClick={() => setScreenName("")} />
                <h1>Select Coin</h1>
            </div>
            <div className="bs_container_select_main position-relative" >
                <input type="text" className="width-100 search" placeholder='Search' /><img src={SearchIcon} alt="arrow icon" className="search_icon" />
            </div>
            <div className="token_container  flex-justify-between common_tokens" style={{
                maxHeight: 395,
                overflowY: "auto"
            }} onClick={() => setScreenName("create")}>
                {
                    initialTokens.map((token, index) => {

                        return <Button key={index} type="link" className='common__token d-flex bs_token_container' data-address={token.address} >
                            <img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="bit coin" width="25" />
                            <span className='common__token__title' >{token.title}</span>
                            <span className='common__token__subTitle' >{token.subTitle}</span>
                        </Button>
                    })
                }
            </div>


        </div>
    )
}

export default BuySellSelect;