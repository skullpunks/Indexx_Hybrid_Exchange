import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GenericButton from '../shared/Button';
import { decodeJWT, getUserWallets } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '936px',
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      border: 'none !important',
    },
  },
  balanceSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      fontSize: '20px !important',
      color: `${theme.palette.text.primary} !important`,
      fontWeight: '600',
    },
  },
  hiddenBalance: {
    fontSize: '32px !important',
    marginTop: '8px',
    fontWeight: '600 !important',
  },
  pnlText: {
    fontSize: '14px !important',
    marginTop: '25px !important',
  },
  eyeIcon: {
    marginLeft: '8px',
  },
  redText: {
    color: 'red !important',
  },
  greenText: {
    color: `${theme.palette.primary.main} !important`,
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      flex: 1,
      marginTop: '20px',
    },
  },
  button: {
    fontSize: '13px !important',
    lineHeight: '10px !important',
    padding: '0px 12px !important',
    height: '28px !important',
    background: `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
}));

const BalanceOverview = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);

  useEffect(() => {
    getAllUserWallet();
  }, []);

  const getAllUserWallet = async () => {
    try {
      let email = String(localStorage.getItem('email'));
      if (email === null || email === undefined || email === '') {
        navigate('/auth/login');
      } else {
        const userWallets = await getUserWallets(email);
        const usersWallet = userWallets.data;
        let totalBalInUSD = 0;

        usersWallet.forEach((wallet) => {
          const balance = Number(wallet.coinBalance);
          if (wallet.coinType === 'Crypto' && wallet.coinPrice) {
            const price = Number(wallet.coinPrice);
            if (!isNaN(price)) {
              totalBalInUSD += balance * price;
            }
          } else {
            totalBalInUSD += balance;
          }
        });

        setTotalBalanceInUSD(totalBalInUSD);
      }
    } catch (err) {
      console.error('Error in getAllUserWallet', err);
    }
  };

  const pnl = totalBalanceInUSD > 0 ? '- $8.99(0.83%)' : '$0.00(0.00%)';

  return (
    <Box className={classes.container}>
      <Box className={classes.balanceSection}>
        <Box className={classes.header}>
          <Typography variant="h6">Estimated Balance</Typography>
          <div
            className={classes.eyeIcon}
            onClick={handleToggleVisibility}
            size="small"
            style={{ cursor: 'pointer' }}
          >
            {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </Box>
        <Typography className={classes.hiddenBalance}>
          {visible ? '*******' : `${totalBalanceInUSD}`}
        </Typography>
        <Typography className={classes.pnlText}>
          Today's PNL: <span className={classes.redText}>{pnl}</span>
        </Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <GenericButton
          text={'Deposit'}
          className={classes.button}
          onClick={() => navigate('/indexx-exchange/buy-sell/deposit-crypto')}
        />
        <GenericButton
          text={'Withdraw'}
          className={classes.button}
          onClick={() => navigate('/indexx-exchange/buy-sell/withdraw-crypto')}
        />
        <GenericButton
          text={'Transfer'}
          className={classes.button}
          onClick={() => navigate('/indexx-exchange/send')}
        />
      </Box>
    </Box>
  );
};

export default BalanceOverview;
