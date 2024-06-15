import React, { useEffect } from 'react';
import Assets from '../components/updated/Assets';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/updated/Dashboard';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
