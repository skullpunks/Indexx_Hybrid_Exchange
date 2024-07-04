import { makeStyles } from '@mui/styles';
import React from 'react';
import HeroSection from './HeroSection';
import DashboardStats from './Dashboard';
import ReferralList from './TableView';
import referralIcon from '../../../assets/referral/referralIcon.svg';
import DollarIcon from '../../../assets/referral/dollarIcon.svg';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '70px',
  },
  tableContainer: {
    padding: '24px',
    maxWidth: '1380px',
    margin: 'auto',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: '24px',

    [theme.breakpoints.down('md')]: {
      border: 'none !important',
    },
  },
}));

const Referral = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <HeroSection />
        <DashboardStats />
        <div className={classes.tableContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '00px',
              marginBottom: '10px',
            }}
          >
            <img src={referralIcon} style={{ height: '35px' }} />
            <h3 style={{ margin: '0' }}>Referral</h3>
          </div>

          <ReferralList />
        </div>
        <div
          className={classes.tableContainer}
          style={{ margin: '120px auto' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <img src={DollarIcon} style={{ height: '35px' }} />
            <h3 style={{ margin: '0' }}>Commission Rebate</h3>
          </div>

          <ReferralList />
        </div>
        <div
          className={classes.tableContainer}
          style={{ margin: '120px auto' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <img src={DollarIcon} style={{ height: '35px' }} />
            <h3 style={{ margin: '0' }}>Shared Commision</h3>
          </div>

          <ReferralList />
        </div>
      </div>
    </>
  );
};

export default Referral;
