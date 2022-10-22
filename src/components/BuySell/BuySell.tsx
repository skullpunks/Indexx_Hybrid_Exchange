import { useState } from 'react'
import "../IndexxSwap/IndexxSwap.css";
import Footer from '../Footer/Footer';
import { SwapFromContext, SwapToContext } from '../../utils/SwapContext';
// import bgContainer from "../../assets/arts/bgContainer.png";
import BuySellMain from './BuySellMain';

const BuySell = () => {
  const [status, setStatus] = useState("");
  const [fromToken, setFromToken] = useState("0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A");
  const [toToken, setToToken] = useState("0xa18f33e2C63C0A781f6836f9Ae8F5f6517Ce4e90");

  return (
    <div className='swap_container' > <br />
      <SwapFromContext.Provider value={{ fromToken, setFromToken }} >
        <SwapToContext.Provider value={{ toToken, setToToken }} >
          {status === "" && <BuySellMain setStatus={setStatus} />}
        </SwapToContext.Provider>
      </SwapFromContext.Provider>
      <Footer />
    </div>
  )
}

export default BuySell
