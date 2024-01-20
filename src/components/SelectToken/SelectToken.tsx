import { CloseOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import "./SelectToken.css";
import initialTokens from "../../utils/Tokens.json";

import { useFromTokenContext, useToTokenContext } from '../../utils/SwapContext';
// let disableClass, disableClass2;
interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
    tokenType: string;
}
const removeCommonTokens = () => {
    return initialTokens.filter(function (obj) {
        return !obj?.commonToken;
    })
}
const onlyCommonTokens = initialTokens.filter(function (obj) {
    return obj?.commonToken;
});

const SelectToken: React.FC<(Props)> = ({ setStatus, tokenType }) => {
    const [tokens, setTokens] = useState(removeCommonTokens);
    const { fromToken, setFromToken } = useFromTokenContext();
    const { toToken, setToToken } = useToTokenContext();
    let tokenAddress: string;

    const filterTokens = (event: any) => {

        if (event.target.value === "") {
            setTokens(initialTokens);
            return;
        }
        const re = new RegExp(event.target.value, 'i');
        const tempArr = tokens.filter((entry: any) => Object.values(entry).some(val => typeof val === "string" && val.match(re)));
        setTokens(tempArr);
    }

    if (tokenType && tokenType === "from") {
        tokenAddress = fromToken;
    } else if (tokenType === "to") {
        tokenAddress = toToken;
    }

    const updateSelectedToken = (e: React.MouseEvent<HTMLElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e.currentTarget?.getAttribute('data-address')!
        }

        if (tokenType === "from") {
            setFromToken?.(testVal);
        }
        else {
            setToToken?.(testVal);
        }
        setStatus("");
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
                        <div className='d-flex flex-justify-between common_tokens'>
                            {
                                onlyCommonTokens.map((token, index) => {
                                    let disableClass = (tokenAddress === token.address) ? true : false
                                    return <Button key={index} type="link" className='common__token d-flex' disabled={disableClass} data-address={token.address} onClick={updateSelectedToken}>
                                        <img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="bit coin" 
                                        width={["INEX", "IN500", "INXC", "IUSD"].some(str => token.image.includes(str)) ? "37" : "25"} />
                                        <span className='common__token__title' >{token.title}</span>
                                    </Button>
                                })
                            }
                        </div>
                    </div>
                    {
                        tokens.map((token, index) => {
                            let disableClass2 = (tokenAddress === token.address) ? true : false
                            return <Button type="link" className='token' key={index} data-address={token.address} disabled={disableClass2} onClick={updateSelectedToken}>
                                <img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="bit coin" width={["INEX", "IN500", "INXC", "IUSD"].some(str => token.image.includes(str)) ? "52" : "40"} />
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