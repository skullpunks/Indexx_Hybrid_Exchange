import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import comingSoon from "../../assets/coming_soon.png";
import {
  decodeJWT,
  getUserWallets,
  getCoinPriceByName,
} from '../../services/api';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import iUSD from '../../assets/token-icons/iUSD+ new2 3.svg';
import eth from '../../assets/token-icons/eth new PP lpgo 1.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StakingTop = () => {
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  let access_token = String(localStorage.getItem('access_token'));
  let decoded = decodeJWT(access_token);

  const [stakingtype, setStakingtype] = useState('token');
  const [token, setToken] = useState('iUSD');
  const [calcAmt, setcalcAmt] = useState('');
  const [amt, setAmt] = useState('');

  useEffect(() => {
    getAllUserWallet();
  });

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

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="orange width-100 padding-t-2x align-items-center d-flex justify-content-center mb-4">
        <h1 className="padding-l-3x padding-b-1x staking-sty">
          Indexx Staking
        </h1>
      </div>
      <div className="padding-t-1x width-100 bs_wallet_top_banner position-relative">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'baseline',
            width: '100%',
            background: 'var(--main-body)',
            gap: 4,
            //   pl: 1,
            pt: 0.4,
          }}
        >
          <Typography
            //   variant="text"
            fontSize={'25px'}
            //   fontWeight={600}
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
            <MenuItem key="token" value="token">
              Token
            </MenuItem>
            <MenuItem key="stock-token" value="stock-token">
              Stock Token
            </MenuItem>
          </Select>
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
            <MenuItem key="iUSD" value="iUSD">
              <>
                <img
                  src={iUSD}
                  alt="iUSD"
                  width={30}
                  height={30}
                  style={{ marginRight: '8px' }}
                />
                iUSD+
              </>
            </MenuItem>
          </Select>
        </Box>
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
            mt: 3,
          }}
        >
          <Box className="d-flex flex-direction-column" width={'48%'}>
            <Box className="d-flex" sx={{ gap: 1, mb: 4 }}>
              <Button
                variant="contained"
                disableTouchRipple
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
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
                sx={{
                  borderColor: 'var(--primary-color)',
                  borderRadius: '2px',
                  color: 'var(--primary-color)',
                  height: '40px',
                  px: 1,
                  textTransform: 'none',
                  fontSize: '16px',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: 'var(--secondary-color)',
                    color: 'var(--secondary-color)',
                    boxShadow: 'none',
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
                Balance: 0
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
                    setAmt(e.target.value);
                  }}
                />
                <Box>
                  <img
                    src={iUSD}
                    alt="iUSD"
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  iUSD+
                </Box>
              </Box>
            </Box>

            <Box
              className="d-flex flex-direction-column"
              sx={{ mt: 3, pt: 1, borderRadius: '2px' }}
            >
              <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                Lock-up Period
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="1yr"
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
                    label="1 Year"
                  />
                  <FormControlLabel
                    value="6m"
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
                    label="6 Months"
                  />
                </RadioGroup>
              </FormControl>
              <Box className="d-flex" sx={{ gap: 3, mt: 1 }}></Box>
            </Box>

            <Box className="d-flex flex-direction-column" sx={{ mt: 2 }}>
              <Box className="d-flex justify-content-between">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Transaction Cost
                </Typography>
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  N/A
                </Typography>
              </Box>
              <Button
                variant="contained"
                disableTouchRipple
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
                Deposit
              </Button>
            </Box>
          </Box>

          <Box className="d-flex flex-direction-column" width={'45%'}>
            <Box className="d-flex" sx={{ gap: 3, mb: 4 }}>
              <Box
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
              </Box>
              <Box
                sx={{
                  backgroundColor: 'var(--staking-color)',
                  borderRadius: '2px',
                  fontSize: '16px',
                  height: '40px',
                  py: 0.7,
                  px: 2,
                }}
              >
                <img
                  src={eth}
                  alt="ETH"
                  width={30}
                  height={30}
                  style={{ marginRight: '8px' }}
                />
                ETH Mainnet
              </Box>
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
                  }}
                />
                <Box>
                  <img
                    src={iUSD}
                    alt="iUSD"
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  iUSD+
                </Box>
              </Box>
            </Box>

            <Box className="d-flex" sx={{ gap: 7, mt: 3, pt: 1 }}>
              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Rewards (by $0)
                </Typography>
                <Box className="d-flex align-items-center" sx={{ mt: 0.7 }}>
                  <img
                    src={iUSD}
                    alt="iUSD"
                    width={30}
                    height={30}
                    style={{ marginRight: '8px' }}
                  />
                  iUSD+
                  <Box
                    className="d-flex align-items-center"
                    sx={{
                      backgroundColor: 'var(--primary-color)',
                      color:'#282828',
                      px: 1,
                      ml: 1,
                      height: '35px',
                      borderRadius: '2px',
                    }}
                  >
                    Vesting
                  </Box>
                </Box>
              </Box>

              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Per week
                </Typography>
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  textAlign={'left'}
                  sx={{ pt: 0.75 }}
                >
                  0.05%
                </Typography>
              </Box>

              <Box className="d-flex flex-direction-column">
                <Typography variant="text" fontSize={'18px'} textAlign={'left'}>
                  Per month
                </Typography>
                <Typography
                  variant="text"
                  fontSize={'18px'}
                  textAlign={'left'}
                  sx={{ pt: 0.75 }}
                >
                  0.5%
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
