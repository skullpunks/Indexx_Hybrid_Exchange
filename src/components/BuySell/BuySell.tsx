import { useEffect, useState } from 'react';
import '../IndexxSwap/IndexxSwap.css';
// import Footer from '../Footer/Footer';
import { BSProvider } from '../../utils/SwapContext';
import BuySellMain from './BuySellMain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getCaptainBeeStatics } from '../../services/api';

const BuySell = () => {
  const [status, setStatus] = useState('');

  const [haspowerpack, setHaspowerpack] = useState(true);
  const [isCaptain, setisCaptain] = useState(false);

  useEffect(() => {
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    const username =
      localStorage.getItem('username') !== undefined
        ? String(localStorage.getItem('username'))
        : undefined;

    if (userType === 'CaptainBee') {
      setisCaptain(true);
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          if (
            data?.data?.powerPackData !== undefined &&
            data?.data?.powerPackData !== null &&
            data?.data?.powerPackData !== ''
          ) {
            setHaspowerpack(true);
          } else {
            setHaspowerpack(false);
          }
        });
      }
    }
  }, []);

  return (
    <div className="swap_container">
      {window.location.pathname.includes('for-honeybee') === true ? (
        <div className="notif">
          <WarningAmberIcon sx={{ fontSize: '24px' }} /> You are currently
          controlling {window.location.pathname.split('/').pop()}’s Exchange.
          Any transaction done here will affect their assets!!{' '}
          <WarningAmberIcon sx={{ fontSize: '24px' }} />
        </div>
      ) : null}
      {isCaptain === true && haspowerpack === false && (
        <div className="notif">
          <WarningAmberIcon sx={{ fontSize: '24px' }} /> Please purchase Power
          Pack in order to access your Hive Dashboard{' '}
          <WarningAmberIcon sx={{ fontSize: '24px' }} />
        </div>
      )}
      <BSProvider>
        {status === '' && <BuySellMain setStatus={setStatus} />}
      </BSProvider>
      {/* <Footer /> */}
    </div>
  );
};

export default BuySell;
