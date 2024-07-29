import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import GenericButton from '../shared/Button';
import bg from '../../../assets/updated/deposit/Group 35385.png';
import { useTheme } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import buttonIcon from '../../../assets/referral/buttonIcon.png';
import { getUserDetails, decodeJWT } from '../../../services/api'; // Assuming these are the correct import paths

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url("${bg}")`,
    padding: '100px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1380px',
    margin: 'auto',
  },
  leftContent: {
    maxWidth: '600px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
    },
  },
  headingTop: {
    fontSize: '60px',
    color: '#EAECEF !important',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '15px',
    color: '#EAECEF',
    marginTop: '30px',
  },
  referralRules: {
    fontSize: '15px',
    color: '#EAECEF',
    marginTop: '30px',
    fontWeight: '500',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  rightContainer: {
    maxWidth: '560px',
    width: '100%',
    borderRadius: '11px',
    backgroundColor: '#181A20',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
    },
  },
  rightDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '10px',
    background: '#164B36',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  green: {
    backgroundColor: '#005C2F',
  },
  black: {
    backgroundColor: '#12161C',
  },
  leftText: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#EAECEF',
    display: 'flex',
    textAlign: 'left',
  },
  rightText: {
    fontSize: '18px',
    fontWeight: 400,
    color: '#11BE6A ',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  amount: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 600,
    color: '#EAECEF',
    textAlign: 'left',
    marginTop: '10px',
  },
  section: {
    flex: 1,
    textAlign: 'center',
  },
  referralButton: {
    fontSize: '18px !important',
    fontFamily: 'poppins !important',
    marginTop: '30px !important',
  },
  '@media (max-width: 768px)': {
    heroSection: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    rightContainer: {
      width: '100%',
      height: 'auto',
      marginTop: '30px',
    },
    headingTop: {
      textAlign: 'center',
      fontSize: '42px',
    },
    description: {
      textAlign: 'center',
    },
    referralRules: {
      textAlign: 'center',
    },
    copyButton: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      gap: '5px',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

const HeroSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded = decodeJWT(access_token);

    setEmail(decoded.email);
    getUserDetails(decoded.email).then((res) => {
      if (res.status === 200) {
        console.log('res.data', res.data);
        setUserData(res.data);
      }
    });
  }, [email]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={classes.root}>
      <div className={classes.heroSection}>
        <div className={classes.leftContent}>
          <h1 className={classes.headingTop}>
            Refer Friends. Earn Crypto Together.
          </h1>
          <p className={classes.description}>
            Earn up to 40% commission on every trade on indexx Exchange.
          </p>
          <p className={classes.referralRules}>View referral rules...</p>
        </div>
        <div className={classes.rightContainer}>
          <div className={`${classes.rightDiv} ${classes.transparent}`}>
            <span className={classes.leftText}>Default Referral</span>
          </div>
          <div className={`${classes.rightDiv}`}>
            <div className={classes.section}>
              <span className={classes.leftText}>You Receive</span>
              <span className={classes.amount}>20%</span>
            </div>
            <div className={classes.section}>
              <span className={classes.leftText}>Friends Received</span>
              <span className={classes.amount}>0%</span>
            </div>
          </div>
          <div className={`${classes.rightDiv} ${classes.black}`}>
            <span className={classes.leftText}>Referral ID</span>
            <span className={classes.rightText} style={{ color: '#EAECEF' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{userData?.referralCode || 'Loading...'}</span>
                <div
                  className={classes.copyButton}
                  onClick={() => copyToClipboard(userData?.referralCode || '')}
                >
                  <ContentCopy
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                    fontSize="small"
                  />
                </div>
              </div>
            </span>
          </div>
          <div className={`${classes.rightDiv} ${classes.black}`}>
            <span className={classes.leftText}>Referral Link</span>
            <span className={classes.rightText}>
              <span className={classes.rightText} style={{ color: '#EAECEF' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span>https://indexx.ai//auth/signup-email?referral={userData?.referralCode || 'Loading...'}</span>
                  <div
                    className={classes.copyButton}
                    onClick={() => copyToClipboard(`https://indexx.ai/auth/signup-email?referral=${userData?.referralCode || ''}`)}
                  >
                    <ContentCopy
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                      fontSize="small"
                    />
                  </div>
                </div>
              </span>
            </span>
          </div>
          <GenericButton
            className={classes.referralButton}
            text={'Invite Friends'}
            IconComponent={
              <img
                src={buttonIcon}
                style={{ position: 'absolute', top: '-50px' }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
