import React from "react";
import { Tabs } from "antd";
import BSConvertIntro from "./BSConvertIntro";
import BSSellIntro from "./BSSellIntro";
import BuyContent from "./BuyContent";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { useSearchParams } from "react-router-dom";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const filteredArray = (items: any, keyName: any, key: any) => {
    return items.filter(function (obj: any) {
        return obj[keyName] === key;
    });
}

const BuySellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const userId = localStorage.getItem("user");
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const items = [
        { label: 'Buy', key: '1', value: "buy", children: <BuyContent setScreenName={setScreenName} /> }, // remember to pass the key prop
        { label: 'Sell', key: '2', value: "sell", children: <BSSellIntro setScreenName={setScreenName} /> },
        { label: 'Convert', key: '3', value: "convert", children: <BSConvertIntro setScreenName={setScreenName} /> },
    ];
    const callback = function (key: any) {
        console.log(key);
        const filteredFromArray = items.filter(function (obj) {
            return obj?.key === key;
        });
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, orderType: filteredFromArray[0].value });
        }
        console.log(BSvalue);
    };

    let activeKey = "1";
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(setSearchParams);
    let orderType = searchParams.get("type");
    if (orderType) {
        let fileteredArrayWithItem = filteredArray(items, "value", orderType);
        activeKey = fileteredArrayWithItem[0].key;
    }

    return (<div className="bs_container card">
        {(userId) ?
            <Tabs defaultActiveKey={activeKey} items={items} className="bs_tab_item" onChange={callback} />
            :
            <>
                <div className="bs_container_header">
                    <h1>Buy Crypto</h1>
                </div>
                <BuyContent setScreenName={setScreenName} />
            </>
        }


    </div>
    )

}


export default BuySellIntro;