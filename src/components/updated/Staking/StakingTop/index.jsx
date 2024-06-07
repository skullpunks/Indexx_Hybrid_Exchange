import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme, InputAdornment } from '@mui/material';
import InputField from '../../shared/TextField';
import iusd from '../../../../assets/updated/buySell/usd.svg';
import GenericButton from '../../shared/Button';
import SingleSelectPlaceholder from '../CustomSelect';
import { decodeJWT, getUserWallets } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';
import tokensList from '../../../../utils/Tokens.json';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  item: {
    padding: '20px',
    width: '100%',
    flex: 1,
  },
  selectContainer: {
    display: 'flex',
    marginBottom: '15px',
    gap: '10px',
    '& > *': {
      flex: 1,
    },
  },
  balanceContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    padding: '20px',
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontSize: '30px',
    fontWeight: '500',
    lineHeight: '36.31px',
    color: theme.palette.text.primary,
  },
  dropDownIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '32px',
      height: '32px',
    },
    '& p': {
      fontSize: '20px',
      marginLeft: '5px',
      fontWeight: '200',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  lockUpHeading: {
    fontSize: '25px',
    fontWeight: 300,
    display: 'flex',
    gap: '10px',
    color: theme.palette.text.secondary,
    marginBottom: '15px',
  },
  buttonTabContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
  },
  rewardContainer: {
    fontSize: '18px',
    fontWeight: 300,
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
  },
  fullWidthButton: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
  },
  activeButton: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: 'black !important',
  },
  inactiveButton: {
    border: `1px solid ${theme.palette.primary.main} !important`,
    background: 'none !important',
    color: `${theme.palette.primary.main} !important`,
  },
  inputFieldContainer: {
    display: 'grid',
    gridTemplateColumns: '43% 26.5% 26.5%',
    gap: '10px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      '& > :nth-child(1)': {
        gridColumn: '1 / 2',
      },
      '& > :nth-child(2)': {
        gridColumn: '1 / 2',
      },
      '& > :nth-child(3)': {
        gridColumn: '1 / 2',
      },
    },
  },
}));

const CustomSelect = ({ label, items, type }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: theme.palette.divider,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          fontSize: '13px',
        }}
      >
        <div
          style={{
            borderRight: `1px solid ${theme.palette.background.default}`,
            padding: '5px 15px',
          }}
        >
          {label}
        </div>
      </div>
      <div>
        <SingleSelectPlaceholder items={items} type={type}/>
      </div>
    </div>
  );
};

const StakingTop = () => {
  const classes = useStyles();
  let access_token = String(localStorage.getItem('access_token'));
  let decoded = decodeJWT(access_token);
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  const [stakingtype, setStakingtype] = useState('token');
  const [token, setToken] = useState('INEX');
  const [selectedToken, setSelectedToken] = useState();
  const [calcAmt, setcalcAmt] = useState('');
  const [amt, setAmt] = useState('');
  const [type, setType] = useState('Long');
  const [isVisible, setIsVisible] = useState(true);
  const [initialTokens, setInitialTokens] = useState(tokensList); // Start with all tokens, but this will change
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [sixMonthReward, setSixMonthReward] = useState(0);
  const [oneYearReward, setOneYearReward] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [error, setError] = useState('');
  const [loadings, setLoadings] = useState(false);

  const theme = useTheme();
  const [activeButton, setActiveButton] = useState('6 Months');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const getAllUserWallet = async () => {
    try {
      const userWallets = await getUserWallets(decoded.email);
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

      console.log('final total balance in USD', totalBalInUSD);
      setTotalBalanceInUSD(totalBalInUSD);
    } catch (err) {
      console.error('Error in getAllUserWallet', err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <div className={classes.selectContainer}>
          <CustomSelect label="Staking type" items={['Tokens', 'Stock Tokens']} type={"Type"}/>
          <CustomSelect label="Select Token" items={tokensList} type={"Tokens"}/>
        </div>
        <div className={classes.balanceContainer}>
          <label className={classes.label}>Balance: 0</label>
          <InputField
            label=""
            type="text"
            placeholder="Enter Amount"
            endAdornment={
              <InputAdornment position="end">
                <div className={classes.dropDownIconContainer}>
                  <img src={iusd} alt="IUSD+" />
                  <p>IUSD+</p>
                </div>
              </InputAdornment>
            }
          />
        </div>
        <div className="lockup-container">
          <div className={classes.lockUpHeading}>Lock-up Period</div>
          <div className={classes.buttonTabContainer}>
            {['6 Months', '1 Year'].map((period) => (
              <GenericButton
                key={period}
                text={`${period} (${period === '6 Months' ? '6%' : '15%'})`}
                onClick={() => handleButtonClick(period)}
                className={
                  activeButton === period
                    ? classes.activeButton
                    : classes.inactiveButton
                }
              />
            ))}
          </div>
          <div className={classes.rewardContainer}>
            <div>Reward you will receive</div>
            <div>0</div>
          </div>
          <div className={classes.fullWidthButton}>
            <GenericButton text="Deposit" />
          </div>
          <div className={classes.buttonContainer}>
            <GenericButton text="Deposit Amount" />
            <GenericButton text="Withdraw Amount" />
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <div className={classes.selectContainer}>
          <CustomSelect label="Blockchain" />
          <div></div>
        </div>
        <div
          style={{
            background: '#174b35',
            height: '110px',
            textAlign: 'center',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '50px',
            color: theme.palette.text.primary,
            borderRadius: '5px',
            marginBottom: '15px',
          }}
        >
          APR: 6%
        </div>
        <div className={classes.lockUpHeading}>
          Calculate your approximate rewards
        </div>
        <InputField
          label=""
          type="text"
          placeholder="Enter Amount"
          endAdornment={
            <InputAdornment position="end">
              <div className={classes.dropDownIconContainer}>
                <img src={iusd} alt="IUSD+" />
                <p>IUSD+</p>
              </div>
            </InputAdornment>
          }
        />
        <div className={classes.inputFieldContainer}>
          {['Rewards (by $0)', 'Per week', 'Per month'].map((label, index) => (
            <InputField
              key={label}
              label={label}
              type="text"
              placeholder={label === 'Rewards (by $0)' ? '' : 'Enter Amount'}
              value={
                label === 'Rewards (by $0)'
                  ? ''
                  : label === 'Per week'
                  ? '0.05%'
                  : '0.5%'
              }
              startAdornment={
                label === 'Rewards (by $0)' ? (
                  <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                    <div className={classes.dropDownIconContainer}>
                      <img src={iusd} alt="IUSD+" />
                      <p>IUSD+</p>
                    </div>
                  </InputAdornment>
                ) : null
              }
              //   endAdornment={
              //     label === 'Rewards (by $0)' ? (
              //       <InputAdornment position="end">
              //         <GenericButton
              //           text="Vesting"
              //           styles={{ height: '90%', padding: '0 10px' }}
              //         />
              //       </InputAdornment>
              //     ) : null
              //   }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StakingTop;
