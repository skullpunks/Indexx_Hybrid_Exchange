import { useState } from 'react'
import "./IndexxSwap.css";
import IndexxScan from "../IndexxScan/IndexxScan";
import SelectToken from '../SelectToken/SelectToken';
import ConfirmSwap from '../ConfirmSwap/ConfirmSwap';

const IndexxSwap = () => {
    const [status, setStatus] = useState("");

    return (
        <div>IndexxSwap <br />
            {(function () {
                switch (status) {
                    case 'SelectToken':
                        return <SelectToken setStatus={setStatus} />;
                    case 'ConfirmSwap':
                        return <ConfirmSwap setStatus={setStatus} />;
                    // case 'WaitForConfirmation':
                    //     return <WaitForConfirmation setStatus={setStatus} />;
                    // case 'TransactionSubmit':
                    //     return <TransactionSubmit setStatus={setStatus} />;
                    default:
                        return <IndexxScan setStatus={setStatus} />;
                }
            })()}
        </div>
    )
}

export default IndexxSwap