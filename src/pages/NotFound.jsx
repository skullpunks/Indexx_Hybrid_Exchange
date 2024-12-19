// src/pages/NotFound.js
import React from 'react';
import { useEffect } from 'react';
import GenericButton from '../components/updated/shared/Button';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import notFoundImg from '../assets/updated/404.svg';
const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    padding: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    '& img': {
      marginBottom: '30px',
    },
  },
  icon: {
    fontSize: '100px',
    color: '#555',
    marginBottom: '20px',
  },
  title: {
    fontSize: '92px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    marginBottom: '30px',
  },
  button: {
    maxWidth: '300px',
    width: '100%',
  },
});

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    // Set 404 status for SEO crawlers if using server-side rendering
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className={classes.container}>
      {/* add some relevant icon here */}
      <img src={notFoundImg} />
      <p className={classes.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <GenericButton
        className={classes.button}
        text="Go to Home"
        onClick={() => navigate('/')}
      />
    </div>
  );
};

export default NotFound;
