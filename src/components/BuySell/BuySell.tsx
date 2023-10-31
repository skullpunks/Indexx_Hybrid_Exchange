import { useEffect, useState } from 'react'
import "../IndexxSwap/IndexxSwap.css";
// import Footer from '../Footer/Footer';
import { BSProvider } from '../../utils/SwapContext';
import BuySellMain from './BuySellMain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const BuySell = () => {

  const [status, setStatus] = useState("");
  

  return (
    <div className='swap_container'>
      {window.location.pathname.includes("for-honeybee") === true ? 
        <div className="notif"> 
        <WarningAmberIcon sx={{fontSize:"24px"}}/>

        {" "}You are currently controlling {window.location.pathname.split('/').pop()}’s Exchange. Any transaction done here will affect their assets!!
        {" "}
        <WarningAmberIcon sx={{fontSize:"24px"}}/>
        
        </div>
        : null
         } 
      <BSProvider >
        {status === "" && <BuySellMain setStatus={setStatus} />}
      </BSProvider>
      {/* <Footer /> */}
    </div>
  )
}

export default BuySell
