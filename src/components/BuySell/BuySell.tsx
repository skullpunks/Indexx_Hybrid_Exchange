import { useState } from 'react'
import "../IndexxSwap/IndexxSwap.css";
import Footer from '../Footer/Footer';
// import { SwapFromContext, SwapToContext } from '../../utils/SwapContext';
import { BSProvider } from '../../utils/SwapContext';
// import bgContainer from "../../assets/arts/bgContainer.png";
import BuySellMain from './BuySellMain';

const BuySell = () => {
  const [status, setStatus] = useState("");
  // const [fromToken, setFromToken] = useState("0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A");
  // const [toToken, setToToken] = useState("IN500");

  // const [BSvalue, setBSvalue] = useState({
  //   fromToken: "0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A",
  //   toToken: "IN500",
  //   amount: 0,
  //   fee: 0.05
  // });

  return (
    <div className='swap_container' > <br />

      <BSProvider >
        {status === "" && <BuySellMain setStatus={setStatus} />}
      </BSProvider>
      <Footer />
    </div>
  )
}

export default BuySell
