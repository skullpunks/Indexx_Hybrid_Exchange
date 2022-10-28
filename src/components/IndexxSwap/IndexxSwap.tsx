import { useState } from 'react'
import "./IndexxSwap.css";
import IndexxScan from "../IndexxScan/IndexxScan";
import SelectToken from '../SelectToken/SelectToken';
import ConfirmSwap from '../ConfirmSwap/ConfirmSwap';
import WaitForConfirmation from '../WaitForConfirmation/WaitForConfirmation';
import TransactionSubmit from '../TransactionSubmit/TransactionSubmit';
import ConfirmSwapTwo from '../ConfirmSwapTwo/ConfirmSwapTwo';
import Footer from '../Footer/Footer';
import { SwapFromContext, SwapToContext } from '../../utils/SwapContext';
import bgContainer from "../../assets/arts/bgContainer.png";

const IndexxSwap = () => {
    const [status, setStatus] = useState("");
    const [tokenType, setTokenType] = useState("from");
    const [fromToken, setFromToken] = useState("0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A");
    const [toToken, setToToken] = useState("IN500");

    return (
        <div className='swap_container' style={{ backgroundImage: `url(${bgContainer})` }}> <br />
            <SwapFromContext.Provider value={{ fromToken, setFromToken }} >
                <SwapToContext.Provider value={{ toToken, setToToken }} >
                    {status === "" && <IndexxScan setStatus={setStatus} setTokenType={setTokenType} />}
                    {status === "SelectToken" && <SelectToken setStatus={setStatus} tokenType={tokenType} />}
                    {status === "ConfirmSwap" && <ConfirmSwap setStatus={setStatus} />}
                    {status === "ConfirmSwapTwo" && <ConfirmSwapTwo setStatus={setStatus} />}
                    {status === "WaitForConfirmation" && <WaitForConfirmation setStatus={setStatus} />}
                    {status === "TransactionSubmit" && <TransactionSubmit setStatus={setStatus} />}
                </SwapToContext.Provider>
            </SwapFromContext.Provider>
            <Footer />
        </div>
    )
}

export default IndexxSwap