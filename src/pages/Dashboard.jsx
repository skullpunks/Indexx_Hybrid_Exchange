import React, { useEffect } from 'react';
import Assets from '../components/updated/Assets';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/updated/Dashboard';
import { baseURL } from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
    }
  }, [navigate]);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
