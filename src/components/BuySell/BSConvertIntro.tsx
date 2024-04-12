import React, { useEffect, useRef, useState } from 'react';
// import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import ethereum from "../../assets/arts/ethereum.svg";

// import bsDollar from "../../assets/arts/bsDollar.svg";
// import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { decodeJWT, getHoneyBeeDataByUsername, getWalletBalance } from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from "../../utils/Tokens.json";
import graphTokens from "../../utils/graphs.json";
import { Option } from 'antd/lib/mentions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Option } from 'antd/lib/mentions';
import OpenNotification from '../OpenNotification/OpenNotification';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
    tokenType: number;
    subtokenType: number;
}

// const filteredArray = (items: any, keyName: any, key: any) => {
//     return items.filter(function (obj: any) {
//         return obj[keyName] === key;
//     });
// }
const BSConvertIntro: React.FC<(Props)> = ({ setScreenName, tokenType, subtokenType }) => {
    const ref = useRef<HTMLInputElement>(null);
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const [val, setVal] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    // const [showUserBalance, setShowUserBalance] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState("");
    const [honeyBeeId, setHoneyBeeId] = useState("");
    const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
    const [filteredtokens, setFilteredtokens] = useState(initialTokens);

    const { id } = useParams();

    useEffect(() => {
        if (ref.current) {
            ref.current.value = '';
        }
    }, []);

    useEffect(() => {
        let newTokens: any[] = [];

        if (tokenType === 2) {
            if (subtokenType === 0) {
                newTokens = initialTokens.filter(item =>
                    (item.subTitle.toLowerCase().includes('stock') ||
                        item.subTitle.toLowerCase().includes('snp500')) &&
                    !item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
                );
            }
            else if (subtokenType === 1) {
                newTokens = initialTokens.filter(item =>
                    item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
                );
            }
        } else if (tokenType === 1) {
            newTokens = initialTokens.filter(item =>
                !item.subTitle.toLowerCase().includes('stock') &&
                !item.subTitle.toLowerCase().includes('snp500') &&
                !item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
            );
        } else if (tokenType === 0) {
            newTokens = initialTokens;
        }

        setFilteredtokens(newTokens);

    }, [tokenType, subtokenType]);

    const urlParams = new URLSearchParams(window.location.search);
    const coinnameToIndex: Record<string, number> = {
      'iusd': 3,
      'inexbrc': 2,
      'inexplg': 1
    };

    useEffect(() => {
        const coinname1 = urlParams.get('coinname1') || '';
        const coinname2 = urlParams.get('coinname2') || '';

        console.log("coinname1",coinname1)
        // This effect triggers when filteredtokens changes
        if (filteredtokens && filteredtokens.length) {
            // Check if BSvalue.fromToken and BSvalue.toToken are already set
          
                handleChange(filteredtokens[coinnameToIndex[coinname1] || 0]?.address || "");
                console.log("filteredtokens",filteredtokens[coinnameToIndex[coinname1]]);
                handleChangeToToken(filteredtokens[coinnameToIndex[coinname2] || 0]?.address || "");
            
        }
    }, [filteredtokens]);


    useEffect(() => {
        // This effect triggers when filteredtokens changes
        if (filteredtokens && filteredtokens.length) {
            // Check if BSvalue.fromToken and BSvalue.toToken are already set
            if (!BSvalue.fromToken && !BSvalue.toToken) {
                handleChange(filteredtokens[0]?.address || "");
                handleChangeToToken(filteredtokens[1]?.address || "");
            }
        }
    }, [filteredtokens, BSvalue.fromToken, BSvalue.toToken]);


    // Function to update the user balance
    const updateUserBalance = async (tokenTitle: string, coinNetwork: string = "") => {
        let access_token = String(localStorage.getItem("access_token"));
        let decoded: any = decodeJWT(access_token);
        let email = decoded.email;
        const balanceResponse = await getWalletBalance(email, tokenTitle);
        if (balanceResponse.status === 200) {
            setUserBalance(balanceResponse.data.balance);
        } else {
            setUserBalance(0); // Handle error or set default balance
        }
    };

    useEffect(() => {
        // Initial user balance update on component mount
        if (filteredtokens.length > 0) {
            updateUserBalance(filteredtokens[0]?.title || '', filteredtokens[0]?.chain);
        }
    }, []);

    useEffect(() => {
        // Update user balance when the first dropdown selection changes
        if (BSvalue?.fromToken) {
            const selectedToken = filteredtokens.find(token => token.address === BSvalue.fromToken);
            if (selectedToken) {
                updateUserBalance(selectedToken.title, selectedToken.chain);
            }
        }
    }, [BSvalue?.fromToken]);

    const location = useLocation();

    useEffect(() => {
        // Function to be called when the location changes
        const handleLocationChange = () => {
            // Update the balance here
            const selectedToken = filteredtokens.find(token => token.address === BSvalue.fromToken);
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            setEmail(decoded.email)
            if (selectedToken) {
                updateUserBalance(selectedToken.title);
            }
        };

        // Call the function when the component mounts or location changes
        handleLocationChange();
    }, [location, filteredtokens, BSvalue.fromToken]);

    const categorizeTokens = (tokens: any) => {
        return {
            Crypto: tokens.filter((token: any) => !token.isStock && !token.isETF),
            StockTokens: tokens.filter((token: any) => token.isStock),
            //ETFs: tokens.filter((token: any) => token.isETF)
        };
    };

    // Categorized tokens for 'From Token' Select
    const categorizedFromTokens = categorizeTokens(filteredtokens.filter(token => token.address !== BSvalue?.toToken));

    // Categorized tokens for 'To Token' Select
    const categorizedToTokens = categorizeTokens(filteredtokens.filter(token => token.address !== BSvalue?.fromToken));

    useEffect(() => {
        return () => {
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            setEmail(decoded.email)
            if (BSvalue && BSvalue.amount !== 0) {

                setVal(BSvalue?.amount.toString());

                let amount = BSvalue?.amount.toString();
                let charFontSize = amount.length < 7 ? "1.1" : amount.length < 9 ? "0.9" : amount.length < 12 ? "0.8" : amount.length < 15 ? "0.6" : "0.4";
                let charWidth = amount.length <= 1 ? 1.2 : 0.9
                if (document.getElementsByClassName("input_currency")[0]) {
                    let element = document.getElementsByClassName("input_currency")[0] as HTMLBodyElement;
                    element.style.width = ((amount.length + 1) * charWidth) + 'ch';
                    element.style.fontSize = charFontSize + "ch";
                }
            }
            // getCoinBalance(String(filteredFromArray[0].title)).then((x) => {
            //     setUserBalance(x);
            // });

            if (id) {
                setHoneyBeeId(String(id));
                getHoneyBeeDataByUsername(String(id)).then((data) => {
                    setHoneyBeeEmail(data.data.userFullData?.email);
                });

            }
        }
    }, [BSvalue]);

    // // const [flag, setFlag] = useState(false);
    // const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
    //     let testVal: string = "";
    //     if (e.currentTarget != null) {
    //         testVal = e?.currentTarget?.value;

    //         if (!/^\d{0,6}(?:\.\d{0,5})?$/.test(testVal)) {
    //             e.preventDefault();
    //             return;
    //         }
    //         setVal(testVal);
    //         let charFontSize = testVal.length < 7 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
    //         let charWidth = testVal.length <= 1 ? 1.1 : 0.9
    //         e.currentTarget.style.width = ((testVal.length + 1) * charWidth) + 'ch';
    //         e.currentTarget.style.fontSize = charFontSize + "ch";

    //         handleChange(String(BSvalue?.fromToken))
    //     }
    // }

    const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = e.currentTarget.value;

        // Ensure that the input adheres to the desired format
        if (/^\d{0,6}(?:\.\d{0,5})?$/.test(testVal)) {
            setVal(testVal);

            // Update styling based on input length
            let charFontSize = testVal.length < 7 ? "1.1" : testVal.length < 9 ? "0.9" : testVal.length < 12 ? "0.8" : testVal.length < 15 ? "0.6" : "0.4";
            let charWidth = testVal.length <= 1 ? 1.1 : 0.9;
            e.currentTarget.style.width = ((testVal.length + 1) * charWidth) + 'ch';
            e.currentTarget.style.fontSize = charFontSize + "ch";
        }
    }

    const isIndexxToken = (tokenTitle: string) => {
        const indexxTokens = ["IN500", "INEX", "INXC", "IUSD+", "ALCRYP", "AMZN", "APPL", "BCM", "CRYC10",
            "EQSTK", "GOOGL", "INDXXF", "META", "MSFT", "NVDA", "PEP", "SNP500", "TLSA", "TOB"];
        return indexxTokens.includes(tokenTitle);
    };

    const isWIBSToken = (tokenTitle: string) => {
        const indexxTokens = ["WIBS"];
        return indexxTokens.includes(tokenTitle);
    };

    const checkPurchase = () => {
        let getRequiredCoin = filteredtokens.find(x => x.address === BSvalue?.fromToken);
        let getRequiredToCoin = filteredtokens.find(x => x.address === BSvalue?.toToken);

        if (!isWIBSToken(String(getRequiredCoin?.title))) {
            OpenNotification("error", "Feature of conversion from WIBS tokens to Non-Indexx or Indexx tokens is coming soon.");
            return;
        }

        // If either the fromToken or toToken is not in the allowed list of indexxTokens, show an error notification
        if (!isIndexxToken(String(getRequiredCoin?.title)) || !isIndexxToken(String(getRequiredToCoin?.title))) {
            OpenNotification("error", "Feature of conversion from Indexx tokens to Non-Indexx tokens is coming soon.");
            return;
        }

        if (getRequiredCoin?.title === "FTT" && getRequiredToCoin?.title !== "INXP") {
            //alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            OpenNotification("error", "You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredCoin?.title === "INXP") {
            //alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            OpenNotification("error", "You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredToCoin?.title === "INXP" && getRequiredCoin?.title !== "FTT") {
            //alert("You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            OpenNotification("error", "You can only convert FTX Token(FTT) to Indexx Phoenix(INXP)");
            return;
        } else if (getRequiredToCoin?.title === "FTT" && getRequiredCoin?.title !== "INXP") {
            //alert("You can only convert Indexx Phoenix(INXP) to FTX Token(FTT)");
            OpenNotification("error", "You can only convert Indexx Phoenix(INXP) to FTX Token(FTT)");
            return;
        }
        if (val) {
            // setScreenName("confirmConvert");


            if (honeyBeeId === "undefined" || honeyBeeId === "")
                navigate("/indexx-exchange/buy-sell/confirm-convert");
            else
                navigate(`/indexx-exchange/buy-sell/confirm-convert/${honeyBeeId}`);
            if (setBSvalue && BSvalue) {
                setBSvalue({ ...BSvalue, amount: parseFloat(val) });
            }
        }
    }

    const getCoinBalance = async (value: string) => {

        if (honeyBeeId && honeyBeeEmail) {
            const res = await getWalletBalance(honeyBeeEmail, value);
            setSelectedCoin(value);
            if (res.status === 200) {
                setUserBalance(res.data.balance);
                // setShowUserBalance(true);
            } else {
                setUserBalance(0);
                // setShowUserBalance(true);
                return 0;
            }
        } else {
            const res = await getWalletBalance(email, value);

            setSelectedCoin(value);
            if (res.status === 200) {
                setUserBalance(res.data.balance);
                // setShowUserBalance(true);
                return Number(res.data.balance);
            } else {
                setUserBalance(0);
                // setShowUserBalance(true);
                return 0;
            }
        }
    }

    const handleChange = async (value: string) => {
        let getGraphCoin = graphTokens.find(x => x.address === value);

        if (setBSvalue && BSvalue) {
            setBSvalue(prevValue => ({ ...prevValue, fromToken: value, fromGraph: String(getGraphCoin?.graph) }));
        }

        let getRequiredCoin = filteredtokens.find(x => x.address === value);
        if (getRequiredCoin) {
            await getCoinBalance(String(getRequiredCoin?.title));
        }
    };


    // const handleChangeFromToken = (value: string) => {
    //     if (setBSvalue && BSvalue) {
    //         setBSvalue({ ...BSvalue, fromToken: value });
    //     }
    // };

    const handleChangeToToken = (value: string) => {
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, toToken: value });
        }
    };


    const swapCoin = () => {
        let tempFromToken = BSvalue?.fromToken;
        let tempToToken = BSvalue?.toToken;

        // Find the graph related to the toToken since after swapping, toToken will be the new fromToken
        let getGraphCoin = graphTokens.find(x => x.address === tempToToken);

        if (BSvalue && tempFromToken && tempToToken) {
            setBSvalue(prevValue => ({
                ...prevValue,
                fromToken: tempToToken,
                toToken: tempFromToken,
                fromGraph: String(getGraphCoin?.graph)
            }));
            // Find the token object corresponding to the new 'fromToken' after swap
            let swappedToken = filteredtokens.find(token => token.address === tempToToken);

            if (swappedToken) {
                getCoinBalance(swappedToken.title);  // Fetch balance for the new 'fromToken'
            }
        }

    }

    return (
        <div>

            <div className="padding-lr-1x padding-tb-3x" style={{ paddingTop: 50, paddingBottom: 50 }} >
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-2x" style={{ transform: "scale(1)" }}>

                        <input placeholder="0" className="input_currency" type="text" value={val} onChange={updateVal} style={{ width: "1.2ch" }} />
                        <span className="font_20x px-1">{filteredtokens.find(token => token.address === BSvalue?.fromToken)?.title || ''}</span>
                        {/* <span className="font_20x">{BSvalue?.fromTitle}</span> */}
                    </div>
                    <div className='swap_Arrow_icon cursor-pointer' onClick={swapCoin}>
                        <img src={SwapArrowIcon} className="" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                <div className="font_20x opacity-75 justify-content-center d-flex" style={{ color: "var(--body_color)" }}>Enter Amount</div>
                {/* {(userBalance < parseFloat(val)) ?
                    <div className='error_message font_15x'>You can only convert a total of {Math.floor(userBalance * 10000) / 10000} </div>
                    :
                    <></>
                } */}
            </div>
            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>

                <Select className='width-100 border-0'
                    onChange={handleChange} value={BSvalue?.fromToken} key={BSvalue.fromToken}
                >
                    {Object.entries(categorizedFromTokens).map(([category, tokens]) => (
                        tokens.length > 0 && (
                            <Select.OptGroup key={category} label={<span className={`custom-optgroup-label theme-${localStorage.getItem('userlogged')}`}>{category}</span>}>
                                {tokens.map((token: any) => (
                                    <Option
                                        key={token.address}
                                        value={token.address}
                                        className="common__token d-flex bs_token_container"
                                        data-address={token.address}
                                        style={{ paddingLeft: "15px", paddingRight: 0 }}
                                    >
                                        <div className='d-flex bs_token_num'>
                                            <img src={require(`../../assets/token-icons/${token.image}.png`).default} alt={token.title}
                                                width={["INEX", "IN500", "INXC", "IUSD"].some(str => token.image.includes(str)) ? "52" : "40"}
                                            />
                                            <div className='padding-l-1x d-flex flex-align-center'>
                                                {token.title}
                                                <span style={{ color: "var(--body_color)" }} className="margin-l-0_5x">
                                                    {token.subTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </Option>
                                ))}
                            </Select.OptGroup>
                        )
                    ))}
                </Select>


            </div>

            <div className="bs_token d-flex cursor-pointer py-3" style={{ alignItems: "center" }}>
                <Select className='width-100 border-0'
                    onChange={handleChangeToToken} value={BSvalue?.toToken} key={BSvalue.toToken}
                >
                    {Object.entries(categorizedToTokens).map(([category, tokens]) => (
                        tokens.length > 0 && (
                            <Select.OptGroup key={category} label={<span className={`custom-optgroup-label theme-${localStorage.getItem('userlogged')}`}>{category}</span>}>
                                {tokens.map((token: any) => (
                                    <Option
                                        key={token.address}
                                        value={token.address}
                                        className="common__token d-flex bs_token_container"
                                        data-address={token.address}
                                        style={{ paddingLeft: "15px", paddingRight: 0 }}
                                    >
                                        <div className='d-flex bs_token_num'>
                                            <img src={require(`../../assets/token-icons/${token.image}.png`).default} alt={token.title} 
                                            width={["INEX", "IN500", "INXC", "IUSD"].some(str => token.image.includes(str)) ? "52" : "40"}
                                             />
                                            <div className='padding-l-1x d-flex flex-align-center'>
                                                {token.title}
                                                <span style={{ color: "var(--body_color)" }} className="margin-l-0_5x">
                                                    {token.subTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </Option>
                                ))}
                            </Select.OptGroup>
                        )
                    ))}
                </Select>
            </div>
            <div className="bs_footer_action " >
                <button
                    // style={{ marginTop: 5 }}
                    className={(parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) || userBalance < parseFloat(val) ? "disable_icon" : ""}
                    disabled={(parseFloat(val) < 0.0007 || isNaN(parseFloat(val))) || userBalance < parseFloat(val)}
                    onClick={checkPurchase}
                >
                    Preview Convert
                </button>
            </div>

            {/* {showUserBalance && */}
            <div>
                <h6 className='text-center mb-0'> Current Available balance : {Math.floor(userBalance * 10000) / 10000}  {filteredtokens.find(token => token.address === BSvalue?.fromToken)?.title || ''} </h6>
            </div>
        </div >
    )
}
export default BSConvertIntro;
