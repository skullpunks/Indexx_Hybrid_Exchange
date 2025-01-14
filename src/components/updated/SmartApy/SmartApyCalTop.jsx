import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme, InputAdornment } from '@mui/material';
import InputField from '../shared/TextField';
import iusd from '../../../assets/updated/buySell/usd.svg';
import GenericButton from '../shared/Button';
import {
  baseURL,
  calculateStakeReward,
  decodeJWT,
  getUserWallets,
  loginWithToken,
  stakeCoin,
} from '../../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tokensList from '../../../utils/Tokens.json';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import { title } from 'process';
import smartApyCalImage from '../../../assets/updated/SmartApy/smartApyCalRight.png';
import smartAPYLogo from '../../../assets/updated/SmartApy/smartApyLogo.svg';
import CustomSelectBox from './CustomSelectBox';
import iusdIcon from '../../../assets/updated/SmartApy/iUSD+.svg';
import ViewAllPlansPopup from './ViewAllPlansPopup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
  flexContainerRoot: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    '& h2': {
      margin: 0,
      fontSize: '38px',
      fontWeight: '500',
      fontStyle: 'italic',
    },
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
    marginBottom: '30px',
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
    margin: '15px 0px',
  },
  buttonTabContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',

    flexWrap: 'wrap',
    '& > button': {
      maxWidth: '205px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > button': {
        width: '100%',
        maxWidth: '100%',
      },
    },
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
  selectTypeContainer: {
    marginBottom: '20px',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },
  },
}));

const SmartApyTop = ({ onStakeSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  const [stakingtype, setStakingtype] = useState('token');
  const [token, setToken] = useState('INEX');
  const [selectedToken, setSelectedToken] = useState({
    title: 'IUSD+',
    image: 'IUSD+',
    stakingPercentage6months: 6,
    stakingPercentage1year: 15,
    chain: 'Binance Smart Chain',
  });
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(0);
  const [value, setValue] = useState('Bronze');

  const [allWallets, setAllWallets] = useState();
  const [tokenType, setTokenType] = useState('Tokens');
  const [calcAmt, setcalcAmt] = useState('');
  const [amt, setAmt] = useState(0);
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewAllPlansPopup, setViewAllPlansPopup] = useState(false);
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState('6 Months');
  const defaultSignInToken = searchParams.get('signInToken');

  const handleButtonClick = async (button) => {
    setActiveButton(button);
    console.log('Button', button);
    if (button === '1 Year') {
      let result = await calculateStakeReward(
        amt ?? 0,
        selectedToken.title,
        'Long',
        selectedToken.stakingPercentage1year
      );
      console.log('result', result);
      setRewards(result?.data?.finalAmount ?? 0);
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage1year / 100));
      setType('Long');
    } else if (button === '6 Months') {
      let result = await calculateStakeReward(
        amt ?? 0,
        selectedToken.title,
        'Short',
        selectedToken.stakingPercentage6months
      );
      console.log('result', result);
      setRewards(result?.data?.finalAmount ?? 0);
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage6months / 100));
      setType('Short');
    }
  };

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');

    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    } else {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
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

  const formatPrice = (value) =>
    value < 1 ? value.toFixed(5) : value.toFixed(2);

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
      console.log(res);
      if (res.status === 200) {
        setLoadings(false);
        setShowSuccessPopup(true); // Show success popup
        onStakeSuccess();
        setAmt('');
        setRewards(0);
        // Re-fetch the updated wallet balances after staking
        await getAllUserWallet();
      } else {
        setLoadings(false);
        setShowErrorPopup(true); // Show success popup
        setErrorMessage(res.message);
        setAmt('');
        setRewards(0);
        // Re-fetch the updated wallet balances after staking
        await getAllUserWallet();
      }
    } catch (err) {
      setLoadings(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '50px',
        }}
      >
        <div className={classes.flexContainerRoot}>
          <img src={smartAPYLogo} alt="" />
          <h2>Smart APY</h2>
        </div>
        <p>Maximize your rewards by investing your IUSD+</p>
      </div>
      <div className={classes.container}>
        <div className={classes.item}>
          <div className={classes.balanceContainer}>
            <label className={classes.label}>
              Balance: {formatPrice(selectedTokenBalance)}
            </label>
            <div className={classes.selectTypeContainer}>
              <label>Investment Tier</label>
              <CustomSelectBox
                items={[
                  { name: 'Bronze', value: 'Bronze' },
                  {
                    name: 'Silver',
                    value: 'Silver',
                  },

                  {
                    name: 'Gold',
                    value: 'Gold',
                  },
                ]}
                value={value}
                onChange={handleChange}
                hasborder
              />
            </div>

            <InputField
              label="Enter amount"
              type="text"
              placeholder="0.0"
              value={amt}
              onChange={async (e) => {
                const inputAmt = e.target.value;
              }}
              endAdornment={
                <InputAdornment position="end">
                  <div className={classes.dropDownIconContainer}>
                    <img src={iusdIcon} alt={'usdIcon'} />
                    <p>{selectedToken?.title}</p>
                  </div>
                </InputAdornment>
              }
            />
            {error && <div className={classes.errorText}>{error}</div>}

            <div className="lockup-container">
              <div className={classes.lockUpHeading}>Lock-up Period</div>
              <div className={classes.buttonTabContainer}>
                {['6 Months (20%)', '12 months (30%)', '18 months (40%)'].map(
                  (period) => (
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
                  )
                )}
              </div>
              <div className={classes.rewardContainer}>
                <InputField
                  label="Rewards you will receive in IUSD+"
                  type="text"
                  placeholder="0.0"
                  value={amt}
                  onChange={async (e) => {
                    const inputAmt = e.target.value;
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <div className={classes.dropDownIconContainer}>
                        <img src={iusdIcon} alt={'usdIcon'} />
                        <p>{selectedToken?.title}</p>
                      </div>
                    </InputAdornment>
                  }
                />
              </div>
              <div className={classes.fullWidthButton}>
                <GenericButton
                  text="Invest"
                  disabled={loadings || !!error} // Disable button if loading or if there is an error
                  loading={loadings}
                  onClick={submitStake}
                />
              </div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <GenericButton
              text="Buy token"
              className={classes.inactiveButton}
              onClick={() => navigate('/update/home?buyToken=IUSD%2B')}
            />
            <GenericButton
              text="View all Plans"
              className={classes.inactiveButton}
              onClick={() => setViewAllPlansPopup(true)}
            />
          </div>
        </div>
        <div className={classes.item} style={{ alignSelf: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={smartApyCalImage} alt="" />
            <p>Investment made easy with Smart APY</p>
          </div>
        </div>
      </div>

      {viewAllPlansPopup && (
        <ViewAllPlansPopup onClose={() => setViewAllPlansPopup(false)} />
      )}
    </div>
  );
};

export default SmartApyTop;
