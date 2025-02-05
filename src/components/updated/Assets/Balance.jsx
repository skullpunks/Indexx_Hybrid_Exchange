import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GenericButton from '../shared/Button';
import {
  getUserWallets,
  decodeJWT,
  baseURL,
  getUserInvestments,
} from '../../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    // maxWidth: '1380px',
    width: '100%',
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    '&>div': {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '15px',
      border: 'none !important',
    },
  },
  balanceSection: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    flex: 2,
    gap: '50px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'auto',
    },
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
  pnlTextToday: {
    fontSize: '14px !important',
    marginTop: '35px !important',
  },
  pnlText: {
    fontSize: '14px !important',
    marginTop: '15px !important',
  },
  eyeIcon: {
    marginLeft: '8px',
    cursor: 'pointer',
  },
  redText: {
    color: 'red !important',
  },
  greenText: {
    color: `${theme.palette.primary.main} !important`,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
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

const BalanceOverview = ({ selectedValue }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [visibleStaking, setVisibleStaking] = useState(false);
  const [pnl, setPnl] = useState({ value: 0, percentage: 0 });
  const [pnlClass, setPnlClass] = useState(classes.redText);
  const [profitClass, setProfitClass] = useState(classes.redText);
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  const [totalStakedBalanceInUSD, setTotalStakedBalanceInUSD] = useState(0); // State for staked balance
  const [totalInvestment, setTotalInvestment] = useState(0); // State for staked balance
  const [isLoading, setIsLoading] = useState(true);
  const [visibleTotalBalance, setVisibleTotalBalance] = useState(false);
  const [visibleTotalInvestment, setVisibleTotalInvestment] = useState(false);
  const [profit, setProfit] = useState({ value: 0, percentage: 0 });
  const [email, setEmail] = useState('');
  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  const handleToggleStakingVisibility = () => {
    setVisibleStaking(!visibleStaking);
  };
  const handleToggleTotalBalanceVisibility = () => {
    setVisibleTotalBalance(!visibleTotalBalance);
  };
  const handleToggleTotalInvestmentVisibility = () => {
    setVisibleTotalInvestment(!visibleTotalInvestment);
  };

  useEffect(() => {
    const fetchUserWallets = async () => {
      setIsLoading(true);
      try {
        let email = String(localStorage.getItem('email'));
        setEmail(email);
        if (!email) {
          navigate('/auth/login');
          return;
        }

        const userWallets = await getUserWallets(email);
        const usersWallet = userWallets.data;
        let totalBalInUSD = 0;
        let totalPrevBalInUSD = 0;
        let totalStakedBalInUSD = 0; // Variable for staked balance
        const getInvestments = await getUserInvestments(email);
        let totalInvestment = getInvestments.data; // Variable for staked balance
        setTotalInvestment(totalInvestment);
        const processedSymbols = new Set(); // To track already processed INEX and WIBS

        usersWallet.forEach((wallet) => {
          const balance = Number(wallet.coinBalance);
          const stakedBalance = Number(wallet.coinStakedBalance); // Assuming stakingBalance is available in the API response
          const price = Number(wallet.coinPrice);
          const prevPrice = Number(wallet.coinPrevPrice);

          // Specific handling for INEX and WIBS to avoid duplicates
          if (wallet.coinSymbol === 'INEX' || wallet.coinSymbol === 'WIBS') {
            if (processedSymbols.has(wallet.coinSymbol)) {
              return; // Skip if already processed
            }
            processedSymbols.add(wallet.coinSymbol); // Mark as processed

            if (balance > 0) {
              if (!isNaN(price)) {
                totalBalInUSD += balance * price;
              } else {
                totalBalInUSD += balance;
              }
            }

            if (stakedBalance > 0 && !isNaN(price)) {
              totalStakedBalInUSD += stakedBalance * price;
            }
          } else {
            // General logic for other symbols
            if (balance > 0 && wallet.coinSymbol !== 'USD') {
              if (
                wallet.coinType === 'Crypto' &&
                !isNaN(price) &&
                !isNaN(prevPrice)
              ) {
                totalBalInUSD += balance * price;
                totalPrevBalInUSD += balance * prevPrice;
              } else if (!isNaN(price)) {
                totalBalInUSD += balance * price;
              } else {
                totalBalInUSD += balance;
              }
            }

            if (wallet.coinSymbol === 'USD' && wallet.coinBalance > 0) {
              totalBalInUSD += wallet.coinBalance;
            }

            if (stakedBalance > 0 && !isNaN(price)) {
              totalStakedBalInUSD += stakedBalance * price;
            }
          }
        });

        setTotalBalanceInUSD(totalBalInUSD);
        setTotalStakedBalanceInUSD(totalStakedBalInUSD); // Set staked balance

        let pnlValue = 0;
        let pnlPercentage = 0;

        console.log('Final totalBalanceInUSD', totalBalInUSD);
        console.log('Final totalPrevBalInUSD', totalPrevBalInUSD);
        if (totalPrevBalInUSD > 0) {
          pnlValue = totalBalInUSD - totalPrevBalInUSD;
          console.log(pnlValue);
          pnlPercentage = (pnlValue / totalPrevBalInUSD) * 100;
        }

        setPnl({
          value: pnlValue.toFixed(2),
          percentage: pnlPercentage.toFixed(2),
        });
        // Set the class based on PNL value
        setPnlClass(pnlValue >= 0 ? classes.greenText : classes.redText);

        // Now calculate the profit (Total Balance - Total Investment)
        const totalBalance = totalBalInUSD + totalStakedBalInUSD;
        const profitValue = totalBalance - totalInvestment;
        const profitPercentage =
          totalInvestment > 0 ? (profitValue / totalInvestment) * 100 : 0;

        setProfit({
          value: profitValue.toFixed(2),
          percentage: profitPercentage.toFixed(2),
        });
        // Dynamically set the profit class
        setProfitClass(profitValue >= 0 ? classes.greenText : classes.redText);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserWallets();
  }, [navigate, searchParams]);

  return (
    <Box className={classes.container}>
      <Box>
        <Box className={classes.balanceSection}>
          <Box className={classes.balanceSectionWrapper}>
            <Box className={classes.header}>
              <Typography variant="h6">
                {email === 'wallet@azooca.com'
                  ? '10% Balance'
                  : 'Estimated Balance'}
              </Typography>
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
              $
              {visible
                ? '*******'
                : `${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalBalanceInUSD)}`}
            </Typography>
          </Box>
          <Box className={classes.balanceSectionWrapper}>
            <Box className={classes.header}>
              <Typography variant="h6">
                {email === 'wallet@azooca.com'
                  ? '3% Balance'
                  : 'Staked Balance'}
              </Typography>
              <div
                className={classes.eyeIcon}
                onClick={handleToggleStakingVisibility}
                size="small"
                style={{ cursor: 'pointer' }}
              >
                {visibleStaking ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </Box>
            <Typography className={classes.hiddenBalance}>
              $
              {visibleStaking
                ? '*******'
                : `${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalStakedBalanceInUSD)}`}
            </Typography>
          </Box>
          <Box className={classes.balanceSectionWrapper}>
            <Box className={classes.header}>
              <Typography variant="h6">Total Balance</Typography>
              <div
                className={classes.eyeIcon}
                onClick={handleToggleTotalBalanceVisibility}
                size="small"
                style={{ cursor: 'pointer' }}
              >
                {visibleTotalBalance ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </div>
            </Box>
            <Typography className={classes.hiddenBalance}>
              $
              {visibleTotalBalance
                ? '*******'
                : `${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalBalanceInUSD + totalStakedBalanceInUSD)}`}
            </Typography>
          </Box>
          <Box className={classes.balanceSectionWrapper}>
            <Box className={classes.header}>
              <Typography variant="h6">Investment Amount</Typography>
              <div
                className={classes.eyeIcon}
                onClick={handleToggleTotalInvestmentVisibility}
                size="small"
                style={{ cursor: 'pointer' }}
              >
                {visibleTotalInvestment ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </div>
            </Box>
            <Typography className={classes.hiddenBalance}>
              $
              {visibleTotalInvestment
                ? '*******'
                : `${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalInvestment)}`}
            </Typography>
          </Box>
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

      <Typography className={classes.pnlTextToday}>
        Today's PNL:{' '}
        <span className={pnlClass}>{`$${pnl.value} (${pnl.percentage}%)`}</span>
      </Typography>

      {/* Profit Section */}
      <Typography className={classes.pnlText}>
        Portfolio PNL:${' '}
        <span className={profitClass}>
          {`$${profit.value} (${profit.percentage}%)`}
        </span>
      </Typography>
    </Box>
  );
};

export default BalanceOverview;
