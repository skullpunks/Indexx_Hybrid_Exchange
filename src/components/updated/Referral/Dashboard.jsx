import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import dashboardIcon from '../../../assets/referral/dashboard.svg';
import axios from 'axios';
import { decodeJWT, getAllRefferedDetails } from '../../../services/api';

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
    marginTop: '5px',
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
  const [referredUsers, setReferredUsers] = useState([]);
  const [tradeCount, setTradeCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [commissionCurrency, setCommissionCurrency] = useState('INEX');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchReferredUsers() {
      try {
        let access_token = String(localStorage.getItem('access_token'));
        let decoded = decodeJWT(access_token);
        setEmail(decoded.email);
        const response = await getAllRefferedDetails(decoded.email);
        console.log(response, "response");
        if (response.data) {
          const users = response.data.referredUsers;
          const referralData = response.data.referralData;
          let tradeCount = 0;

          users.forEach((user) => {
            if (user.orders.length > 0) {
              tradeCount += 1;
            }
          });

          setReferredUsers(users);
          setTradeCount(tradeCount);
          setFriendsCount(users.length);
          setTotalEarned(referralData.totalEarned);
          setCommissionCurrency(referralData.commissionCurrency);
        }
      } catch (error) {
        console.error('Error fetching referred users:', error);
      }
    }

    fetchReferredUsers();
  }, []);

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
          <img src={dashboardIcon} alt="Dashboard Icon" />
          <h3 style={{ margin: '0' }}>Dashboard</h3>
        </div>

        <div className={classes.statsSection}>
          <div className={classes.statCard}>
            <span className={classes.statHeading}>Your Earnings</span>
            <span className={classes.statValue}>{totalEarned} {commissionCurrency}</span>
            <span className={classes.statSubtext}>+0 BTC</span>
          </div>

          <div className={classes.statCard}>
            <span className={classes.statHeading}>
              Friends Who Started Trading
            </span>
            <span className={classes.statValue}>{tradeCount}</span>
            <span className={classes.statSubtext}>+{tradeCount}</span>
          </div>

          <div className={classes.statCard}>
            <span className={classes.statHeading}>Friends</span>
            <span className={classes.statValue}>{friendsCount}</span>
            <span className={classes.statSubtext}>+{friendsCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
