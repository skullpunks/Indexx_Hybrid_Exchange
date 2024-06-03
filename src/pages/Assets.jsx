import React, { useEffect } from 'react';
import Assets from '../components/updated/Assets';
import { useNavigate } from 'react-router-dom';

const AssetsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div>
      <Assets />
    </div>
  );
};

export default AssetsPage;
