import { makeStyles } from '@mui/styles';
import React from 'react';
import dashboardIcon from '../../../assets/referral/dashboard.svg';
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1380px',
    margin: 'auto',
    padding: '100px 0px',
    [theme.breakpoints.down('md')]: {
      padding: '100px 20px',
    },
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#164B36',
    borderRadius: '4px',
    gap: '10px',
  },
  statCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    color: 'white',
  },
  statHeading: {
    fontSize: '16px',
    fontWeight: 500,
  },
  statValue: {
    fontSize: '34px',
    fontWeight: 600,
    marginTop: '05px',
  },
  statSubtext: {
    fontSize: '16px',
    marginTop: '5px',
  },
  '@media (max-width: 768px)': {
    statsSection: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    statCard: {
      width: '100%',
      margin: '10px 0',
    },
  },
}));

const DashboardStats = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <img src={dashboardIcon} />
          <h3 style={{ margin: '0' }}>Dashboard</h3>
        </div>

        <div className={classes.statsSection}>
          <div className={classes.statCard}>
            <span className={classes.statHeading}>Your Earnings</span>
            <span className={classes.statValue}>0 INEX</span>
            <span className={classes.statSubtext}>+0 BTC</span>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className={classes.statHeading}>Your Earnings</span>
              <span className={classes.statValue}>500.64 INEX</span>
              <span className={classes.statSubtext}>ID 42****24</span>
            </div>
          </div>

          <div className={classes.statCard}>
            <span className={classes.statHeading}>
              Friends Who Started Trading
            </span>
            <span className={classes.statValue}>0</span>
            <span className={classes.statSubtext}>+0</span>
          </div>

          <div className={classes.statCard}>
            <span className={classes.statHeading}>Friends</span>
            <span className={classes.statValue}>0</span>
            <span className={classes.statSubtext}>+0</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
