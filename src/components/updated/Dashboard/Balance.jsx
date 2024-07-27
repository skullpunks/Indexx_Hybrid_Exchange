import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GenericButton from '../shared/Button';
import { baseURL, decodeJWT, getUserWallets } from '../../../services/api';
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const BalanceOverview = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [pnl, setPnl] = useState({ value: 0, percentage: 0 });
  const [pnlClass, setPnlClass] = useState(classes.redText);
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getAllUserWallet();
  }, [totalBalanceInUSD]);

  const getAllUserWallet = async () => {
    setIsLoading(true);
    try {
      let email = String(localStorage.getItem('email'));
      if (!email) {
        window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
        return;
      }

      const userWallets = await getUserWallets(email);
      const usersWallet = userWallets.data;
      let totalBalInUSD = 0;
      let totalPrevBalInUSD = 0;

      usersWallet.forEach((wallet) => {
        const balance = Number(wallet.coinBalance);
        const price = Number(wallet.coinPrice);
        const prevPrice = Number(wallet.coinPrevPrice);

        console.log(`Processing wallet: ${wallet.coinSymbol}`);
        console.log(
          `Balance: ${balance}, Price: ${price}, PrevPrice: ${prevPrice}`
        );

        if (balance > 0 && wallet.coinSymbol !== 'USD') {
          if (
            wallet.coinType === 'Crypto' &&
            !isNaN(price) &&
            !isNaN(prevPrice)
          ) {
            totalBalInUSD += balance * price;
            totalPrevBalInUSD += balance * prevPrice;
            console.log(`Updated totalBalInUSD: ${totalBalInUSD}`);
            console.log(`Updated totalPrevBalInUSD: ${totalPrevBalInUSD}`);
          } else if (!isNaN(price)) {
            totalBalInUSD += balance * price;
            console.log(`Updated totalBalInUSD (Non-Crypto): ${totalBalInUSD}`);
          } else {
            totalBalInUSD += balance;
            console.log(`Updated totalBalInUSD (Fallback): ${totalBalInUSD}`);
          }
        }
      });

      setTotalBalanceInUSD(totalBalInUSD);

      let pnlValue = 0;
      let pnlPercentage = 0;

      console.log('Final totalBalanceInUSD', totalBalInUSD);
      console.log('Final totalPrevBalInUSD', totalPrevBalInUSD);
      if (totalPrevBalInUSD > 0) {
        pnlValue = totalBalanceInUSD - totalPrevBalInUSD;
        pnlPercentage = (pnlValue / totalPrevBalInUSD) * 100;
      }

      setPnl({
        value: pnlValue.toFixed(2),
        percentage: pnlPercentage.toFixed(2),
      });

      // Set the class based on PNL value
      setPnlClass(pnlValue >= 0 ? classes.greenText : classes.redText);
    } catch (err) {
      console.error('Error in getAllUserWallet', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    );
  }

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
          {visible
            ? '*******'
            : `${new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(totalBalanceInUSD)}`}
        </Typography>
        <Typography className={classes.pnlText}>
          Today's PNL:{' '}
          <span
            className={pnlClass}
          >{`${pnl.value} (${pnl.percentage}%)`}</span>
        </Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <GenericButton
          text={'Deposit'}
          className={classes.button}
          onClick={() => navigate('/deposit-crypto-select-coin')}
        />
        <GenericButton
          text={'Withdraw'}
          className={classes.button}
          onClick={() => navigate('/withdraw-crypto-select-coin')}
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
