import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Staking from '../components/updated/Staking';

const StakingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div>
      <Staking />
    </div>
  );
};

export default StakingPage;
