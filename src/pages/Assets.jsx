import React, { useEffect } from 'react';
import Assets from '../components/updated/Assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeJWT, loginWithToken } from '../services/api';

const AssetsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    const checkAuthentication = async () => {
      const redirectFlag = localStorage.getItem('redirected');
      debugger;
      if (defaultSignInToken && !redirectFlag) {
        console.log('I am here ', defaultSignInToken);
        await checkLogin(defaultSignInToken);
      } else {
        const email = localStorage.getItem('email');
        if (!email) {
          navigate('/auth/login');
        }
      }
    };

    checkAuthentication();
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      if (res.status === 200) {
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <div>
      <Assets />
    </div>
  );
};

export default AssetsPage;
