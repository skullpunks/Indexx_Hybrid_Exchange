import React, { useEffect } from 'react';
import Assets from '../components/updated/Assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  baseURL,
  decodeJWT,
  getCaptainBeeByEmail,
  loginWithToken,
} from '../services/api';

const AssetsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    if (defaultSignInToken) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    }
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.access_token, 'res.data.access_token');
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        if (resObj?.userType === 'CaptainBee') {
          let resObj2 = await getCaptainBeeByEmail(String(resObj?.email));
          console.log(resObj2);
          let username = resObj2?.data.Username;
          localStorage.setItem('username', username);
        }
        searchParams.delete('signInToken');
        setSearchParams(searchParams);
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
