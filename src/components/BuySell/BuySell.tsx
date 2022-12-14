import { useState } from 'react'
import "../IndexxSwap/IndexxSwap.css";
import Footer from '../Footer/Footer';
import { BSProvider } from '../../utils/SwapContext';
import BuySellMain from './BuySellMain';

const BuySell = () => {
  const [status, setStatus] = useState("");
  return (
    <div className='swap_container'>
      <BSProvider >
        {status === "" && <BuySellMain setStatus={setStatus} />}
      </BSProvider>
      <Footer />
    </div>
  )
}

export default BuySell
