import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme, InputAdornment } from '@mui/material';
import InputField from '../../shared/TextField';
import iusd from '../../../../assets/updated/buySell/usd.svg';
import GenericButton from '../../shared/Button';
import SingleSelectPlaceholder from '../CustomSelect';
import { decodeJWT, getUserWallets, loginWithToken, stakeCoin } from '../../../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tokensList from '../../../../utils/Tokens.json';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import { title } from 'process';

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
  errorText: {
    color: theme.palette.error.main,
    marginTop: '10px',
  },
}));

const CustomSelect = ({ label, items, type, onTokenSelect }) => {
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
        <SingleSelectPlaceholder
          items={items}
          type={type}
          onTokenSelect={onTokenSelect}
        />
      </div>
    </div>
  );
};

const StakingTop = ({ onStakeSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  const [stakingtype, setStakingtype] = useState('token');
  const [token, setToken] = useState('INEX');
  const [selectedToken, setSelectedToken] = useState({
    title: 'INEX',
    image: 'INEX',
    stakingPercentage6months: 6,
    stakingPercentage1year: 15,
    chain: 'Binance Smart Chain',
  });
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(0);
  const [allWallets, setAllWallets] = useState();
  const [tokenType, setTokenType] = useState('Tokens');
  const [calcAmt, setcalcAmt] = useState('');
  const [amt, setAmt] = useState('');
  const [type, setType] = useState('Short');
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
  const [searchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState('6 Months');
  const defaultSignInToken = searchParams.get('signInToken');

  const handleButtonClick = (button) => {
    setActiveButton(button);
    console.log('Button', button);
    if (button === '1 Year') {
      setRewards(amt * (selectedToken.stakingPercentage1year / 100));
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage1year / 100));
      setType('Long');
    } else if (button === '6 Months') {
      setRewards(amt * (selectedToken.stakingPercentage6months / 100));
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage6months / 100));
      setType('Short');
    }
  };

  const handleTokenSelect = (token) => {
    console.log('I am here', token);
    if (
      token === 'Stock Tokens' ||
      token === 'Tokens' ||
      token === 'ETF Tokens'
    ) {
      setTokenType(token);
    } else {
      const findToken = initialTokens.find((x) => x.title === token);
      console.log(findToken);
      setSelectedToken(findToken);
      const findTokenBal = allWallets.find((x) => {
        if (
          token === 'INEX' ||
          token === 'INEX-POLYGON' ||
          token === 'INEX-ETHEREUM'
        ) {
          return (
            x.coinSymbol === findToken.image &&
            x.coinNetwork === findToken.chain
          );
        }
        return x.coinSymbol === token;
      });
      console.log('findTokenBal', findTokenBal);
      if (findTokenBal) {
        setSelectedTokenBalance(findTokenBal.coinBalance);
        if (type === '1 Year') {
          setRewards(amt * (selectedToken.stakingPercentage1year / 100));
          setFinalAmount(
            amt * (1 + selectedToken.stakingPercentage1year / 100)
          );
        } else if (type === '6 Months') {
          setRewards(amt * (selectedToken.stakingPercentage6months / 100));
          setFinalAmount(
            amt * (1 + selectedToken.stakingPercentage6months / 100)
          );
        }
      } else {
        setSelectedTokenBalance(0); // or any default value you prefer
      }
    }
  };

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');
    debugger;
    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    } else {
      const email = localStorage.getItem('email');
      if (!email) {
        navigate('/auth/login');
      }
    }
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        let resObj = await decodeJWT(res.data.access_token);

        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', resObj?.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const getAllUserWallet = async () => {
    try {
      let email = String(localStorage.getItem('email'));
      const userWallets = await getUserWallets(email);
      const usersWallet = userWallets.data;
      setAllWallets(usersWallet);
      const findTokenBal = usersWallet.find(
        (x) => x.coinSymbol === selectedToken.title
      );
      setSelectedTokenBalance(findTokenBal.coinBalance);
    } catch (err) {
      console.error('Error in getAllUserWallet', err);
    }
  };

  useEffect(() => {
    getAllUserWallet();
  }, []);

  const getImage = (image) => {
    try {
      return require(`../../../../assets/token-icons/${image}.png`).default;
    } catch (error) {
      return Inex; // Fallback image if specific token icon is not found
    }
  };

  const filterTokens = () => {
    return initialTokens.filter((token) => {
      if (tokenType === 'Tokens') {
        return token.commonToken && !token.isStock && !token.isETF;
      } else if (tokenType === 'Stock Tokens') {
        return token.isStock;
      } else if (tokenType === 'ETF Tokens') {
        return token.isETF;
      }
      return false;
    });
  };
  const formatPrice = (value) =>
    value < 1 ? value.toFixed(6) : value.toFixed(2);

  const submitStake = async () => {
    try {
      setLoadings(true);
      const email = localStorage.getItem('email');
      let percentage =
        type === 'Short'
          ? selectedToken.stakingPercentage6months
          : selectedToken.stakingPercentage1year;
      let res = await stakeCoin(
        email,
        amt,
        selectedToken.title,
        type,
        percentage
      );
      if (res.status === 200) {
        setLoadings(false);
        onStakeSuccess();
        setAmt('');
      }
    } catch (err) {
      setLoadings(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <div className={classes.selectContainer}>
          <CustomSelect
            label="Staking type"
            items={['Tokens', 'Stock Tokens', 'ETF Tokens']}
            type={'Type'}
            onTokenSelect={handleTokenSelect}
          />
          <CustomSelect
            label="Select Token"
            items={filterTokens()}
            type={'Tokens'}
            onTokenSelect={handleTokenSelect}
          />
        </div>
        <div className={classes.balanceContainer}>
          <label className={classes.label}>
            Balance: {formatPrice(selectedTokenBalance)}
          </label>
          <InputField
            label=""
            type="text"
            placeholder="Enter Amount"
            value={amt}
            onChange={(e) => {
              const inputAmt = e.target.value;
              console.log('I am here', inputAmt);
              setAmt(inputAmt);
              let minimumRequired = 50;
              try {
                // Check if the token is among BTC, LTC, ETH, BCH, or BNB
                if (
                  ['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(
                    selectedToken.title
                  )
                ) {
                  minimumRequired = 0.01;
                }

                if (inputAmt < minimumRequired) {
                  console.log('I am heere in mumum');
                  setError(
                    `Minimum staking amount must be at least ${minimumRequired}.`
                  );
                } else if (inputAmt > selectedTokenBalance) {
                  console.log('I am heere in Insufficient');
                  setError(
                    `Insufficient balance available to stake. Please buy ${selectedToken.title} or deposit ${selectedToken.title}.`
                  );
                } else {
                  setError('');
                  console.log('type', type);
                  if (type === 'Long') {
                    setRewards(
                      inputAmt *
                        (selectedToken?.stakingPercentage1year / 100) ?? 0
                    );
                    setFinalAmount(
                      inputAmt *
                        (1 + selectedToken?.stakingPercentage1year / 100 ?? 0)
                    );
                  } else if (type === 'Short') {
                    setRewards(
                      inputAmt *
                        (selectedToken?.stakingPercentage6months / 100) ?? 0
                    );
                    setFinalAmount(
                      inputAmt *
                        (1 + selectedToken?.stakingPercentage6months / 100 ?? 0)
                    );
                  }
                }
              } catch (err) {
                console.log('err', err);
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <div className={classes.dropDownIconContainer}>
                  <img
                    src={getImage(selectedToken?.image)}
                    alt={selectedToken?.image}
                  />
                  <p>{selectedToken?.title}</p>
                </div>
              </InputAdornment>
            }
          />
          {error && <div className={classes.errorText}>{error}</div>}
        </div>
        <div className="lockup-container">
          <div className={classes.lockUpHeading}>Lock-up Period</div>
          <div className={classes.buttonTabContainer}>
            {['6 Months', '1 Year'].map((period) => (
              <GenericButton
                key={period}
                text={`${period} (${
                  period === '6 Months'
                    ? `${selectedToken?.stakingPercentage6months} %`
                    : `${selectedToken?.stakingPercentage1year} %`
                })`}
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
            <div> Rewards you will receive in INEX</div>
            <div>{formatPrice(rewards)} INEX</div>
          </div>
          <div className={classes.fullWidthButton}>
            <GenericButton
              text="Stake"
              disabled={loadings}
              loading={loadings}
              onClick={submitStake}
            />
          </div>
          <div className={classes.buttonContainer}>
            <GenericButton text="Deposit Amount" />
            <GenericButton text="Withdraw Amount" />
          </div>
        </div>
      </div>
      <div className={classes.item}>
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
            color: '#EAECEF',
            borderRadius: '5px',
            marginBottom: '15px',
          }}
        >
          APR:{' '}
          {type === 'Short'
            ? selectedToken?.stakingPercentage6months
            : selectedToken?.stakingPercentage1year}{' '}
          {'%'}
        </div>
        <div className={classes.lockUpHeading}>
          Calculate your approximate rewards
        </div>
        <InputField
          label=""
          type="text"
          placeholder="Enter Amount"
          value={calcAmt}
          onChange={(e) => {
            setcalcAmt(e.target.value);
            setSixMonthReward(
              Number(e.target.value) *
                (selectedToken?.stakingPercentage6months / 100) ?? 0
            );
            setOneYearReward(
              Number(e.target.value) *
                (selectedToken?.stakingPercentage1year / 100) ?? 0
            );
          }}
          endAdornment={
            <InputAdornment position="end">
              <div className={classes.dropDownIconContainer}>
                <img
                  src={getImage(selectedToken?.image)}
                  alt={selectedToken?.image}
                />
                <p>{selectedToken?.title}</p>
              </div>
            </InputAdornment>
          }
        />
        <div className={classes.inputFieldContainer}>
          {[
            { label: 'Rewards (by $0)', value: '' },
            {
              label: `Per 6 Months (${selectedToken?.stakingPercentage6months}%)`,
              value: sixMonthReward,
            },
            {
              label: `Per Year (${selectedToken?.stakingPercentage1year}%)`,
              value: oneYearReward,
            },
          ].map((field) => (
            <InputField
              key={field.label}
              label={field.label}
              type="text"
              placeholder={
                field.label === 'Rewards (by $0)' ? '' : 'Enter Amount'
              }
              value={field.value}
              startAdornment={
                field.label === 'Rewards (by $0)' ? (
                  <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                    <div className={classes.dropDownIconContainer}>
                      <img
                        src={getImage(selectedToken?.image)}
                        alt={selectedToken?.image}
                      />
                      <p>{selectedToken?.title}</p>
                    </div>
                  </InputAdornment>
                ) : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StakingTop;
