import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import comingSoon from "../../assets/coming_soon.png";
// import { Button } from 'antd';
import {
  decodeJWT,
  getUserWallets,
  getCoinPriceByName,
  getHoneyBeeDataByUsername,
  getWalletBalance,
  stakeCoin,
} from '../../services/api';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
// import iUSD from '../../assets/token-icons/iUSD+ new2 3.svg';
// import eth from '../../assets/token-icons/eth new PP lpgo 1.png';
import bnb from '../../assets/token-icons/BNB.png';
import pig from '../../assets/arts/pig staking 1.svg';
import lock from '../../assets/arts/lock4 2.png';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import tokensList from '../../utils/Tokens.json';
import OpenNotification from '../../components/OpenNotification/OpenNotification';

const StakingTop = () => {
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  let access_token = String(localStorage.getItem('access_token'));
  let decoded = decodeJWT(access_token);
  const { id } = useParams();
  const [stakingtype, setStakingtype] = useState('token');
  const [token, setToken] = useState(tokensList?.[0]?.title || 'INEX');
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

  useEffect(() => {
    getAllUserWallet();
    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {
        setHoneyBeeEmail(data.data.userFullData?.email);
      });
    }
  }, []);

  const getAllUserWallet = async () => {
    let userWallets = await getUserWallets(decoded.email);
    let usersWallet = userWallets.data;
    let totalBalInUSD = 0;
    for (let i = 0; i < usersWallet.length; i++) {
      if (usersWallet[i].coinType === 'Crypto') {
        let res = await getCoinPriceByName(usersWallet[i]?.coinSymbol);
        let price = Number(res.data.results.data);
        totalBalInUSD += Number(usersWallet[i]?.coinBalance) * price;
      } else {
        totalBalInUSD += Number(usersWallet[i]?.coinBalance);
      }
    }
    setTotalBalanceInUSD(totalBalInUSD);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getCoinBalance = async (value) => {
    if (honeyBeeId && honeyBeeEmail) {
      const res = await getWalletBalance(honeyBeeEmail, value);
      if (res.status === 200) {
        setUserBalance(res.data.balance);
        let inputAmt = amt;
        let minimumRequired = 50;
        // Check if the token is among BTC, LTC, ETH, BCH, or BNB
        if (['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(value)) {
          minimumRequired = 0.01;
        }

        if (inputAmt < minimumRequired) {
          setError(
            `Minimum staking amount must be at least ${minimumRequired}.`
          );
        } else if (inputAmt > userBalance) {
          setError(
            `Insufficient balance available to stake. Please buy ${value} or deposit ${value}.`
          );
        } else {
          setError('');

          if (type === 'Long') {
            setRewards(inputAmt * (selectedToken.stakingPercentage1year / 100));
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage1year / 100)
            );
          } else if (type === 'Short') {
            setRewards(
              inputAmt * (selectedToken.stakingPercentage6months / 100)
            );
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage6months / 100)
            );
          }
        }
      } else {
        setUserBalance(0);
        let inputAmt = amt;
        let minimumRequired = 50;
        // Check if the token is among BTC, LTC, ETH, BCH, or BNB
        if (['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(value)) {
          minimumRequired = 0.01;
        }

        if (inputAmt < minimumRequired) {
          setError(
            `Minimum staking amount must be at least ${minimumRequired}.`
          );
        } else if (inputAmt > userBalance) {
          setError(
            `Insufficient balance available to stake. Please buy ${value} or deposit ${value}.`
          );
        } else {
          setError('');

          if (type === 'Long') {
            setRewards(inputAmt * (selectedToken.stakingPercentage1year / 100));
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage1year / 100)
            );
          } else if (type === 'Short') {
            setRewards(
              inputAmt * (selectedToken.stakingPercentage6months / 100)
            );
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage6months / 100)
            );
          }
        }
      }
    } else {
      const res = await getWalletBalance(decoded.email, value);
      if (res.status === 200) {
        setUserBalance(res.data.balance);
        let inputAmt = amt;
        let minimumRequired = 50;
        // Check if the token is among BTC, LTC, ETH, BCH, or BNB
        if (['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(value)) {
          minimumRequired = 0.01;
        }

        if (inputAmt < minimumRequired) {
          setError(
            `Minimum staking amount must be at least ${minimumRequired}.`
          );
        } else if (inputAmt > userBalance) {
          setError(
            `Insufficient balance available to stake. Please buy ${value} or deposit ${value}.`
          );
        } else {
          setError('');

          if (type === 'Long') {
            setRewards(inputAmt * (selectedToken.stakingPercentage1year / 100));
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage1year / 100)
            );
          } else if (type === 'Short') {
            setRewards(
              inputAmt * (selectedToken.stakingPercentage6months / 100)
            );
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage6months / 100)
            );
          }
        }
      } else {
        setUserBalance(0);
        let inputAmt = amt;
        let minimumRequired = 50;
        // Check if the token is among BTC, LTC, ETH, BCH, or BNB
        if (['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(value)) {
          minimumRequired = 0.01;
        }

        if (inputAmt < minimumRequired) {
          setError(
            `Minimum staking amount must be at least ${minimumRequired}.`
          );
        } else if (inputAmt > userBalance) {
          setError(
            `Insufficient balance available to stake. Please buy ${value} or deposit ${value}.`
          );
        } else {
          setError('');

          if (type === 'Long') {
            setRewards(inputAmt * (selectedToken.stakingPercentage1year / 100));
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage1year / 100)
            );
          } else if (type === 'Short') {
            setRewards(
              inputAmt * (selectedToken.stakingPercentage6months / 100)
            );
            setFinalAmount(
              inputAmt * (1 + selectedToken.stakingPercentage6months / 100)
            );
          }
        }
      }
    }
  };

  const submitStake = async () => {
    try {
      setLoadings(true);
      let percentage =
        type === 'Short'
          ? selectedToken.stakingPercentage6months
          : selectedToken.stakingPercentage1year;
      let res = await stakeCoin(decoded.email, amt, token, type, percentage);
      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', `Your ${token} token staked successfully`);
      }
    } catch (err) {
      setLoadings(false);
      OpenNotification('error', 'Failed to updated. Please try again.');
    }
  };

  useEffect(() => {
    let filteredTokens = [];
    if (stakingtype === 'token') {
      filteredTokens = tokensList?.filter((token) => !token.isStock);
    } else if (stakingtype === 'stock-token') {
      filteredTokens = tokensList?.filter((token) => token.isStock);
    }

    setInitialTokens(filteredTokens);

    // Set the default token (the first token from the filtered list)
    if (filteredTokens.length > 0) {
      setToken(filteredTokens[0].title);
      setSelectedToken(filteredTokens[0]);
      getCoinBalance(filteredTokens[0].title);
      let inputAmt = amt;
      let minimumRequired = 50;
      // Check if the token is among BTC, LTC, ETH, BCH, or BNB
      if (
        ['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(filteredTokens[0].title)
      ) {
        minimumRequired = 0.01;
      }

      if (inputAmt < minimumRequired) {
        setError(`Minimum staking amount must be at least ${minimumRequired}.`);
      } else if (inputAmt > userBalance) {
        setError(
          `Insufficient balance available to stake. Please buy ${filteredTokens[0].title} or deposit ${filteredTokens[0].title}.`
        );
      } else {
        setError('');

        if (type === 'Long') {
          setRewards(
            inputAmt * (filteredTokens[0].stakingPercentage1year / 100)
          );
          setFinalAmount(
            inputAmt * (1 + filteredTokens[0].stakingPercentage1year / 100)
          );
        } else if (type === 'Short') {
          setRewards(
            inputAmt * (filteredTokens[0].stakingPercentage6months / 100)
          );
          setFinalAmount(
            inputAmt * (1 + filteredTokens[0].stakingPercentage6months / 100)
          );
        }
      }
    } else {
      setToken(''); // No tokens available for the selected type, so set an empty value.
    }
  }, [stakingtype]); // The useEffect depends on stakingtype. Whenever it changes, this effect will run.

  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value === 'Long') {
      setRewards(amt * (selectedToken.stakingPercentage1year / 100));
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage1year / 100));
    } else if (event.target.value === 'Short') {
      setRewards(amt * (selectedToken.stakingPercentage6months / 100));
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage6months / 100));
    }
  };

  return (
    <>
      <div className="orange width-100 padding-t-2x align-items-center d-flex justify-content-center mb-4">
        <h1 className="padding-b-1x font_40x">
          <img src={pig} alt="pig" style={{ marginRight: '30px' }} />
          Staking
        </h1>
      </div>
      <div className="padding-t-1x width-100 bs_wallet_top_banner position-relative">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '100%',
            background: 'var(--main-body)',
            gap: 5,
            //   pl: 1,
            pt: 0.4,
          }}
        >
          <Box className="d-flex " width={'48%'} sx={{gap:4}}>
          <Typography
            fontSize={'25px'}
            textAlign={'left'}
          >
            Staking type
          </Typography>
          <Select
            value={stakingtype}
            onChange={(e) => {
              setStakingtype(e.target.value);
            }}
            variant="standard"
            //   InputLabelProps={{ shrink: true }}
            sx={{
              width: '72.5%',
              borderRadius: 0,
              background: 'var(--main-body)',
              color: 'var(--body_color)',
              border: 'none',
              outline: 'none',
              padding: 0,
              fontSize: '25px',
            }}
            size="small"
            disableUnderline
          >
            <MenuItem key="token" value="token">
              Token
            </MenuItem>
            <MenuItem key="stock-token" value="stock-token">
              Stock Token
            </MenuItem>
          </Select>
          </Box>
          <Box className="d-flex " width={'45%'}>
          <Typography fontSize={'25px'} textAlign={'left'}>
            Blockchain
          </Typography>
          <Box
            sx={{
              backgroundColor: 'var(--staking-color)',
              borderRadius: '2px',
              fontSize: '16px',
              height: '40px',
              py: 0.7,
              px: 2,
              ml: 6,
              alignSelf: 'center',
            }}
          >
            <img
              src={bnb}
              alt="BSC"
              width={30}
              height={30}
              style={{ marginRight: '8px' }}
            />
            BSC Mainnet
          </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'baseline',
            width: '100%',
            background: 'var(--main-body)',
            gap: 3,
            //   pl: 1,
            pt: 0.4,
            mt: 1,
          }}
        >
          <Typography
            //   variant="text"
            fontSize={'25px'}
            //   fontWeight={600}
            textAlign={'left'}
          >
            Select Token
          </Typography>
          <Select
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              let selectedCoin = initialTokens.find(
                (x) => x.title === e.target.value
              );
              setSelectedToken(selectedCoin);
              getCoinBalance(e.target.value);
              let inputAmt = amt;
              let minimumRequired = 50;
              // Check if the token is among BTC, LTC, ETH, BCH, or BNB
              if (
                ['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(e.target.value)
              ) {
                minimumRequired = 0.01;
              }

              if (inputAmt < minimumRequired) {
                setError(
                  `Minimum staking amount must be at least ${minimumRequired}.`
                );
              } else if (inputAmt > userBalance) {
                setError(
                  `Insufficient balance available to stake. Please buy ${e.target.value} or deposit ${e.target.value}.`
                );
              } else {
                setError('');

                if (type === 'Long') {
                  setRewards(inputAmt * selectedCoin.stakingPercentage1year);
                  setFinalAmount(
                    inputAmt * (1 + selectedCoin.stakingPercentage1year)
                  );
                } else if (type === 'Short') {
                  setRewards(inputAmt * selectedCoin.stakingPercentage6months);
                  setFinalAmount(
                    inputAmt * (1 + selectedCoin.stakingPercentage6months)
                  );
                }
              }
            }}
            variant="standard"
            //   InputLabelProps={{ shrink: true }}
            sx={{
              width: '35%',
              borderRadius: 0,
              background: 'var(--main-body)',
              color: 'var(--body_color)',
              border: 'none',
              outline: 'none',
              padding: 0,
              fontSize: '25px',
            }}
            size="small"
            disableUnderline
          >
            {initialTokens.map((token) => (
              <MenuItem key={token.title} value={token.title}>
                <img
                  src={
                    require(`../../assets/token-icons/${token.image}.png`)
                      .default
                  }
                  alt={token.title}
                  width={30}
                  height={30}
                  style={{ marginRight: '8px' }}
                />
                {token.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            background: 'var(--main-body)',
            gap: 5,
            //   pl: 1,
            pt: 0.4,
            mt: 3,
          }}
        >
          <Box className="d-flex flex-direction-column" width={'48%'}>
            <Box className="d-flex" sx={{ gap: 1, mb: 8.7 }}>
              <Button
                variant="contained"
                disableTouchRipple
                onClick={() =>
                  navigate('/indexx-exchange/buy-sell/deposit-crypto')
                }
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '44px',
                  px: 1,
                  textTransform: 'none',
                  fontSize: '16px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--secondary-color)',
                    boxShadow: 'none',
                  },
                }}
              >
                Deposit
              </Button>
              <Button
                variant="outlined"
                disableTouchRipple
                onClick={() =>
                  navigate('/indexx-exchange/buy-sell/withdraw-crypto')
                }
                sx={{
                  borderColor: 'var(--primary-color)',
                  borderRadius: '2px',
                  color: 'var(--primary-color)',
                  height: '44px',
                  px: 1,
                  textTransform: 'none',
                  fontSize: '16px',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: 'var(--secondary-color)',
                    color: 'var(--secondary-color)',
                    boxShadow: 'none',
                  },
                  '&:active': {
                    borderColor: 'var(--secondary-color)',
                    color: 'var(--secondary-color)',
                    boxShadow: 'none',
                    background: 'transparent',
                  },
                  '&:focus': {
                    borderColor: 'var(--secondary-color)',
                    color: 'var(--secondary-color)',
                    boxShadow: 'none',
                    background: 'transparent',
                  },
                }}
              >
                Withdraw
              </Button>
            </Box>

            <Box
              className="d-flex flex-direction-column"
              sx={{
                mt: 1,
                backgroundColor: 'var(--staking-color)',
                pl: 2,
                pt: 1,
                borderRadius: '2px',
              }}
            >
              <Typography variant="text" fontSize={'25px'} textAlign={'left'}>
                Balance: {userBalance}
              </Typography>
              <Box className="d-flex" sx={{ gap: 3, mt: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Enter Amount"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '60%' }}
                  size="small" // Make the input box smaller
                  value={amt}
                  onChange={(e) => {
                    const inputAmt = e.target.value;
                    setAmt(inputAmt);
                    let minimumRequired = 50;
                    // Check if the token is among BTC, LTC, ETH, BCH, or BNB
                    if (['BTC', 'LTC', 'ETH', 'BCH', 'BNB'].includes(token)) {
                      minimumRequired = 0.01;
                    }

                    if (inputAmt < minimumRequired) {
                      setError(
                        `Minimum staking amount must be at least ${minimumRequired}.`
                      );
                    } else if (inputAmt > userBalance) {
                      setError(
                        `Insufficient balance available to stake. Please buy ${token} or deposit ${token}.`
                      );
                    } else {
                      setError('');

                      if (type === 'Long') {
                        setRewards(
                          inputAmt *
                            (selectedToken?.stakingPercentage1year / 100) ?? 0
                        );
                        setFinalAmount(
                          inputAmt *
                            (1 + selectedToken?.stakingPercentage1year / 100 ??
                              0)
                        );
                      } else if (type === 'Short') {
                        setRewards(
                          inputAmt *
                            (selectedToken?.stakingPercentage1year / 100) ?? 0
                        );
                        setFinalAmount(
                          inputAmt *
                            (1 + selectedToken?.stakingPercentage1year / 100 ??
                              0)
                        );
                      }
                    }
                  }}
                  error={!!error}
                  helperText={error}
                />
                <Box>
                  <img
                    src={
                      require(`../../assets/token-icons/${token}.png`).default
                    }
                    alt={token}
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  {token}
                </Box>
              </Box>
            </Box>

            <Box
              className="d-flex flex-direction-column staking-toggle"
              sx={{ mt: 3, pt: 0.6, borderRadius: '2px' }}
            >
              <Typography
                variant="text"
                fontSize={'18px'}
                textAlign={'left'}
                pb={0.4}
              >
                <img
                  src={lock}
                  alt="lock"
                  style={{ height: '25px', marginRight: '10px' }}
                />
                Lock-up Period
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={type}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  width: '100%',
                  gap: 1,
                  justifyContent: 'space-between',
                }}
              >
                <ToggleButton
                  value="Short"
                  disableTouchRipple
                  sx={{
                    color: 'var(--primary-color)',
                    borderRadius: '2px',
                    height: '44px',
                    width: '49%',
                    border: '1px solid var(--border-color)',
                    '&:hover': {
                      background: 'var(--staking-color)',
                    },
                    '&:active': {
                      borderColor: 'var(--secondary-color)',
                      color: 'var(--secondary-color)',
                      boxShadow: 'none',
                      background: 'transparent',
                    },
                    '&:focus': {
                      borderColor: 'var(--secondary-color)',
                      color: 'var(--secondary-color)',
                      boxShadow: 'none',
                      background: 'transparent',
                    },
                    '&.Mui-selected': {
                      color: '#282828',
                      background: 'var(--primary-color)',
                      '&:hover': {
                        background: 'var(--primary-color)',
                      },
                    },
                  }}
                >
                  6 Months ({selectedToken?.stakingPercentage6months ?? 0}%)
                </ToggleButton>

                <ToggleButton
                  value="Long"
                  disableTouchRipple
                  sx={{
                    color: 'var(--primary-color)',
                    borderRadius: '2px',
                    height: '44px',
                    width: '49%',
                    border: '1px solid var(--border-color)',
                    '&:hover': {
                      background: 'var(--staking-color)',
                    },
                    '&:active': {
                      borderColor: 'var(--secondary-color)',
                      color: 'var(--secondary-color)',
                      boxShadow: 'none',
                      background: 'transparent',
                    },
                    '&:focus': {
                      borderColor: 'var(--secondary-color)',
                      color: 'var(--secondary-color)',
                      boxShadow: 'none',
                      background: 'transparent',
                    },
                    '&.Mui-selected': {
                      color: '#282828',
                      background: 'var(--primary-color)',
                      '&:hover': {
                        background: 'var(--primary-color)',
                      },
                    },
                  }}
                >
                  1 Year ({selectedToken?.stakingPercentage1year ?? 0}%)
                </ToggleButton>
              </ToggleButtonGroup>
              {/* <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleChange}
                  value={type}
                >
                  <FormControlLabel
                    value="Long"
                    control={
                      <Radio
                        sx={{
                          color: 'var(--primary-color)',
                          '&.Mui-checked': {
                            color: 'var(--primary-color)',
                          },
                        }}
                      />
                    }
                    label={`1 Year (${selectedToken?.stakingPercentage1year ?? 0}%)`}
                  />
                  <FormControlLabel
                    value="Short"
                    control={
                      <Radio
                        sx={{
                          color: 'var(--primary-color)',
                          '&.Mui-checked': {
                            color: 'var(--primary-color)',
                          },
                        }}
                      />
                    }
                    label={`6 Months (${selectedToken?.stakingPercentage6months ?? 0}%)`}

                  />
                </RadioGroup>
              </FormControl> */}
              <Box className="d-flex" sx={{ gap: 3, mt: 1 }}></Box>
            </Box>

            <Box className="d-flex flex-direction-column" sx={{ mt: 2 }}>
              <Box className="d-flex justify-content-between">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Rewards you will receive
                </Typography>
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  {rewards}
                </Typography>
              </Box>
              <Box className="d-flex justify-content-between">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Final Amount you will receive
                </Typography>
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  {finalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Box className="d-flex justify-content-between">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Transaction Cost
                </Typography>
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  N/A
                </Typography>
              </Box>
              {/* <Button
            type="primary"
            className="atn-btn atn-btn-round"
            block
                onClick={submitStake}
                disabled={!!error || !amt || !type}
            loading={loadings}
          >
            {' '}
            Confirm Purchase
          </Button> */}
              <Button
                variant="contained"
                disableTouchRipple
                disabled={!!error || !amt || !type}
                onClick={submitStake}
                loading={loadings}
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  px: 1,
                  mt: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--secondary-color)',
                    boxShadow: 'none',
                  },
                }}
              >
                Stake
              </Button>
            </Box>
          </Box>

          <Box className="d-flex flex-direction-column" width={'45%'}>
            <Box
              className="d-flex"
              sx={{
                gap: 3,
                mb: 2.5,
                background: 'var(--primary-color)',
                fontSize: '50px',
                width: '91%',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#343434',
                py: 1,
              }}
            >
              APR:
              {type === 'Short'
                ? selectedToken?.stakingPercentage6months
                : selectedToken?.stakingPercentage1year}
              %
              {/* <Box
                sx={{
                  backgroundColor: 'var(--staking-color)',
                  borderRadius: '2px',
                  fontSize: '16px',
                  height: '40px',
                  py: 1,
                  px: 2,
                }}
              >
                APR:14.03%
              </Box> */}
            </Box>

            <Box className="d-flex flex-direction-column" sx={{ mt: 1, pt: 1 }}>
              <Typography
                //   variant="text"
                fontSize={'25px'}
                //   fontWeight={600}
                textAlign={'left'}
              >
                Calculate your approximate rewards
              </Typography>
              <Box className="d-flex" sx={{ gap: 3, mt: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Enter Amount"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2, width: '60%' }}
                  size="small" // Make the input box smaller
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
                />
                <Box>
                  <img
                    src={
                      require(`../../assets/token-icons/${token}.png`).default
                    }
                    alt={token}
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  {token}
                </Box>
              </Box>
            </Box>

            <Box className="d-flex" sx={{ gap: 7, mt: 3, pt: 1 }}>
              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Rewards
                </Typography>
                <Box className="d-flex align-items-center" sx={{ mt: 0.1 }}>
                  <img
                    src={require(`../../assets/token-icons/INEX.png`).default}
                    alt={'INEX'}
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  {'INEX'}
                  <Box
                    className="d-flex align-items-center"
                    sx={{
                      backgroundColor: 'var(--primary-color)',
                      color: '#282828',
                      px: 1,
                      ml: 1,
                      height: '44px',
                      borderRadius: '2px',
                    }}
                  >
                    Vesting
                  </Box>
                </Box>
              </Box>

              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  6 months ({selectedToken?.stakingPercentage6months}%)
                </Typography>
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  textAlign={'left'}
                  sx={{ pt: 0.85 }}
                >
                  {sixMonthReward.toFixed(2)}
                </Typography>
              </Box>

              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  1 year ({selectedToken?.stakingPercentage1year}%)
                </Typography>
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  textAlign={'left'}
                  sx={{ pt: 0.85 }}
                >
                  {oneYearReward.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default StakingTop;
