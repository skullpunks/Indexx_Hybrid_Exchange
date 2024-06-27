import { useEffect, useState } from 'react';
import '../IndexxSwap/IndexxSwap.css';
// import Footer from '../Footer/Footer';
import { BSProvider } from '../../utils/SwapContext';
import BuySellMain from './BuySellMain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { decodeJWT, getCaptainBeeStatics, loginWithToken } from '../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BuySell = () => {
  const [status, setStatus] = useState('');
  const [searchParams] = useSearchParams();
  const [haspowerpack, setHaspowerpack] = useState(true);
  const [isCaptain, setisCaptain] = useState(false);
  const defaultSignInToken = searchParams.get('signInToken');
  let defaultToken = searchParams.get('buyToken') || 'INEX';
  const navigate = useNavigate();

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');

    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    }
  }, []);

  async function checkLogin(defaultSignInToken :any) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        window.location.reload();
        // if (searchParams.get('buyToken')) {
        //   navigate(`/update/home?buyToken=${defaultToken}`);
        // } else {
        //   navigate('/update/home');
        // }
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

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
