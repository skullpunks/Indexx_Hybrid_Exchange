import { CloseOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import "./SelectToken.css";


import BNB from "../../assets/token-icons/BNB.png";
import BUSD from "../../assets/token-icons/BUSD.png";
import CAKE from "../../assets/token-icons/CAKE.png";
import INXC from "../../assets/token-icons/34.png";
import IN500 from "../../assets/token-icons/33.png";
import IUSD from "../../assets/token-icons/35.png";
import BTCB from "../../assets/token-icons/25.png";
import EPS from "../../assets/token-icons/EPS.png";
import LINK from "../../assets/token-icons/LINK.png";
import MANA from "../../assets/token-icons/MANA.png";
import IBAT from "../../assets/token-icons/IBAT.png";
import DOT from "../../assets/token-icons/DOT.png";
import LBlock from "../../assets/token-icons/LBlock.png";

const initialTokens = [
    // {
    //     "title": "BNB",
    //     "subTitle": "Wrapped BNB",
    //     "image": BNB,
    //     "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    // },
    {
        "title": "BUSD",
        "subTitle": "Binance-Peg BUSD",
        "image": BUSD,
        "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        "title": "CAKE",
        "subTitle": "PancakeSwap",
        "image": CAKE,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
    },
    // {
    //     "title": "INXC",
    //     "subTitle": "INDEXXCRYPTO",
    //     "image": INXC,
    //     "address": "0x7325E062EA31E7b977fbEBBcC45De30c3e894988"
    // },
    // {
    //     "title": "IN500",
    //     "subTitle": "INDEXX500",
    //     "image": IN500,
    //     "address": "0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A"
    // },
    // {
    //     "title": "IUSD+",
    //     "subTitle": "INDEXX500",
    //     "image": IUSD,
    //     "address": "0xa18f33e2C63C0A781f6836f9Ae8F5f6517Ce4e90"
    // },
    {
        "title": "BTCB",
        "subTitle": "Binance-Peg BSC-USD",
        "image": BTCB,
        "address": "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        "title": "EPS",
        "subTitle": "Ellipsis",
        "image": EPS,
        "address": "0xA7f552078dcC247C2684336020c03648500C6d9F"
    },
    {
        "title": "LINK",
        "subTitle": "Binance-Peg ChainLink",
        "image": LINK,
        "address": "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD"
    },
    {
        "title": "MANA",
        "subTitle": "Decentraland ",
        "image": MANA,
        "address": "0x26433c8127d9b4e9B71Eaa15111DF99Ea2EeB2f8"
    },
    {
        "title": "IBAT",
        "subTitle": "BattleInfinity",
        "image": IBAT,
        "address": "0x19cd9B8e42d4EF62c3EA124110D5Cfd283CEaC43"
    },
    {
        "title": "DOT",
        "subTitle": "Binance-Peg Polkadot",
        "image": DOT,
        "address": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"
    },
    {
        "title": "LBlock",
        "subTitle": "LuckyBlock",
        "image": LBlock,
        "address": "0x2cD96e8C3FF6b5E01169F6E3b61D28204E7810Bb"
    }

];

// interface TokenProps {
//     tokenType: string;
//     setShowToken: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const SelectToken: React.FC<(Props)> = ({ setStatus }) => {

    const [tokens, setTokens] = useState(initialTokens);

    const filterTokens = (event: any) => {

        if (event.target.value === "") {
            setTokens(initialTokens);
            return;
        }
        const re = new RegExp(event.target.value, 'i');
        const tempArr = tokens.filter((entry: any) => Object.values(entry).some(val => typeof val === "string" && val.match(re)));
        setTokens(tempArr);
    }

    return (
        <div className="scan-container">
            <div className='card'>
                <div className='card__header'>
                    <div className='card__header__inner'>
                        <h1 style={{ marginBottom: 0 }}>Select a Token</h1>
                        <CloseOutlined style={{ fontSize: 20 }} onClick={() => setStatus("")} />
                    </div>
                </div>

                <div className='card__body' style={{ padding: 0, overflowY: "auto", maxHeight: 570 }}>
                    <Input size="large" placeholder="Search name or paste address" className="search_token" onChange={filterTokens} />
                    <div className='common_token_wrapper'>
                        <p className='common_token_heading'>Common tokens</p>
                        <div className='d-flex flex-justify-between'>
                            <Button type="link" className='common__token d-flex'>
                                <img src={BNB} alt="bit coin" width="25" />
                                <span className='common__token__title' >BNB</span>
                            </Button>
                            <Button type="link" className='common__token d-flex'>
                                <img src={IUSD} alt="bit coin" width="25" />
                                <span className='common__token__title' >IUSD+</span>
                            </Button>
                            <Button type="link" className='common__token d-flex'>
                                <img src={IN500} alt="bit coin" width="25" />
                                <span className='common__token__title' >IN500</span>
                            </Button>
                            <Button type="link" className='common__token d-flex' style={{ border: 0, padding: 0 }}>
                                <img src={INXC} alt="bit coin" width="25" />
                                <span className='common__token__title' >INXC</span>
                            </Button>
                        </div>
                    </div>
                    {
                        tokens.map((token, index) => {
                            return <Button type="link" className='token' key={index} >
                                <img src={token.image} alt="bit coin" width="40" />
                                <div className='token__data' >
                                    <span className='token__data__title' >{token.title}</span>
                                    <span className='token__data__subtitle'>{token.subTitle}</span>
                                </div>
                            </Button>
                        })
                    }

                </div>
            </div>
        </div >
    )
}

export default SelectToken