import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Staking from '../components/updated/Staking';
import { baseURL, decodeJWT, loginWithToken } from '../services/api';

const StakingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');
    
    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    } else {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
      }
    }
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        let resObj = await decodeJWT(res.data.access_token);

        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', resObj?.refresh_token);
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
      <Staking />
    </div>
  );
};

export default StakingPage;
