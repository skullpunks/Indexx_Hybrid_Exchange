
import {  Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useState } from 'react';
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

    const [network, setNetwork] = useState<any>("Select");

    const handleChange = (value: any) => {
        setNetwork(value)
        console.log(`selected ${value}`);
      };
    

    return (
        <div className="bs_container card">
            <div className="bs_container_header d-flex border-b-0">
                <img src={arrowAdressLeft} alt="adressLeft" className="left_arrow" onClick={() => setScreenName("")} />
                <h1>Select Coin</h1>
            </div>
            <div className="bs_container_select_main position-relative" >
                <input type="text" className="width-100 search" placeholder='Search' /><img src={SearchIcon} alt="arrow icon" className="search_icon" />
            </div>
            <div className=' d-flex flex-justify-between flex-align-center'>
          <Select className='width-100'
              onChange={handleChange} value={network}>
                {
                    initialTokens.map((token, index) => {
                        return <Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} >
                         <div className='d-flex'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                        </Option>
                    })
                }

    </Select>
              
            </div>


        </div>
    )
}

export default BuySellSelect;