import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import GenericButton from '../../components/updated/shared/Button';
import CustomSelectBox from '../../components/updated/Deposit/CustomSelect';
import InputField from '../../components/updated/shared/TextField';
import { InputAdornment, useTheme } from '@mui/material';
import WithdrawCryptoLayout from '../../components/updated/WithdrawCrypto';
import inexLogo from '../../assets/updated/buySell/INEX-sm.svg';
import initialTokens from '../../utils/Tokens.json';
import {
  decodeJWT,
  transactionList,
  getUserWallets,
  getMinAndMaxOrderValues,
  createCryptoWithdraw,
} from '../../services/api';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import { Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import ShortenText from '../../utils/ShortenText';
import { Table } from 'antd';
import * as bitcoin from 'bitcoinjs-lib';
import Web3 from 'web3';
import GeneralPopup from '../../components/updated/BuySell/Popup';
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const { Text } = Typography;

const useStyle = makeStyles((theme) => ({
  enterAmountRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'left',
  },
  secHeading: {
    fontSize: '24px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    marginBottom: theme.spacing(2),
  },
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
    margin: '15px 0px',
  },
  depositContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    display: 'flex',
    gap: '10px',
    padding: '20px 15px',
    alignItems: 'center',
    width: '100%',
    '& h6': {
      fontSize: '16px',
      color: `${theme.palette.text.primary} !important`,
    },
    '& p': {
      fontSize: '12px',
      color: `${theme.palette.text.secondary} !important`,
    },
  },
  text: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
    margin: '15px 0px',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  gridHeading: {},
  gridText: {
    color: theme.palette.text.primary,
  },
  listItem: {
    fontSize: '15px',
    color: theme.palette.text.primary,
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  endAdornmentContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
    borderLeft: `1px solid ${theme.palette.divider}`,
    '& img': {
      width: '25px',
      height: '25px',
    },
  },
}));

const WithdrawCryptoSelectCoin = () => {
  const classes = useStyle();
  const theme = useTheme();
  const [showWarning, setShowWarning] = useState(false);
  const [network, setNetwork] = useState('');
  const [value, setValue] = useState('funding');
  const [txList, setTxList] = useState([]);
  const [usersWallets, setUsersWallets] = useState([]);
  const [coinNetwork, setCoinNetwork] = useState('');
  const [singleWallet, setSingleWallet] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('INEX');
  const [receiveAmountt, setReceiveAmount] = useState('');
  const [selectedCoinObj, setSelectedCoinObj] = useState({});
  const [isWalletAddrValid, setIsWalletAddrValid] = useState(true);
  const [, copy] = useCopyToClipboard();
  const [loadings, setLoadings] = useState(false);
  const [values, setValues] = useState({});
  const [finalAmount, setFinalAmount] = useState('');
  const [walletAddress, setWalletAddre] = useState('');
  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token));
    setEmail(decodedToken.email);
    transactionList(decodedToken?.email).then((res) => {
      const finalArr = res.data.filter(
        (x) => x.transactionType === 'WITHDRAW_CYRPTO'
      );
      setTxList(finalArr);
    });
    getUserWallets(decodedToken?.email).then((res) => {
      setUsersWallets(res.data);
      const userWallet = res.data.find((x) => x.coinSymbol === 'INEX');
      setSingleWallet(userWallet);
      setSelectedCoinObj(initialTokens.find((token) => token.title === 'INEX'));
      setCoinNetwork(userWallet?.coinNetwork);
      getMinAndMaxOrderValues('INEX', 'WITHDRAW_CRYPTO').then((res) => {
        setValues(res);
      });
    });
  }, []);

  const categorizeTokens = (tokens) => {
    return {
      Stocks: tokens.filter((token) => token.isStock),
      ETFs: tokens.filter((token) => token.isETF),
      Cryptos: tokens.filter((token) => !token.isStock && !token.isETF),
    };
  };

  const categorizedTokens = categorizeTokens(initialTokens);

  const handleCurrencyChange = async (value) => {
    const getRequiredCoin = initialTokens.find((x) => x.title === value);
    const userWallet = usersWallets.filter(
      (x) => x.coinSymbol === getRequiredCoin?.title
    );
    console.log('getRequiredCoin', getRequiredCoin);
    setSelectedCoinObj(getRequiredCoin || {});
    setSelectedCoin(getRequiredCoin?.title || '');
    setSingleWallet(userWallet[0]);
    setCoinNetwork(getRequiredCoin?.chain);

    const res = await getMinAndMaxOrderValues(
      String(getRequiredCoin?.title),
      'WITHDRAW_CRYPTO'
    );
    setValues(res);
  };

  const onChangeReceiveAmt = (e) => {
    const val = e.currentTarget.value;
    setReceiveAmount(val + '');
    setNetwork('');
    setFinalAmount(parseFloat(val) - 0.0005);
    if (val < 0.001) {
      setFinalAmount(0.0005);
    }
  };

  const onChageAdd = (e) => {
    const val = e.currentTarget.value;
    setWalletAddre(val);
    checkWalletAddress(val, selectedCoin);
  };

  const checkWalletAddress = async (address, currency) => {
    let isValid = false;

    if (currency === 'BTC') {
      try {
        bitcoin.address.toOutputScript(address, bitcoin.networks.testnet);
        isValid = true;
      } catch (error) {
        isValid = false;
      }
    } else {
      isValid = web3.utils.checkAddressChecksum(address);
    }

    setIsWalletAddrValid(isValid);
  };

  const withdrawCrypto = async () => {
    setLoadings(true);

    const res = await createCryptoWithdraw(
      email,
      Number(finalAmount),
      walletAddress,
      selectedCoin,
      coinNetwork
    );
    if (res.status === 200) {
      const txs = await transactionList(email);
      const message =
        'Withdraw Successful. Transaction Id: ' + res.data.data.hash;
      setPopupMessage(message);
      const finalArr = txs.data.filter(
        (x) => x.transactionType === 'WITHDRAW_CYRPTO'
      );
      setTxList(finalArr);
      setLoadings(false);
    } else {
      setLoadings(false);
      setPopupMessage(res?.data?.message || 'Failed to withdraw. Please try again or contact support');
    }
    setShowPopup(true);
  };

  const getImage = (image) => {
    console.log('my image', image);
    try {
      return require(`../../assets/token-icons/${image}.png`).default;
    } catch (error) {
      return inexLogo; // Fallback image if specific token icon is not found
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <WithdrawCryptoLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>1. Select Coin</h3>
        <h4 className={classes.label}>Coin</h4>
        <CustomSelectBox
          items={categorizedTokens.Cryptos.map((token) => token.title)}
          type={'Coin'}
          defaultValue={'INEX'}
          onCurrencyChange={handleCurrencyChange}
        />
        <div style={{ margin: '10px' }}></div>

        <h3 className={classes.secHeading}>Send to</h3>
        <h4 className={classes.label}>Address</h4>
        <InputField
          type={'text'}
          placeholder="Enter address"
          style={{ height: '55px', margin: 0 }}
          onChange={onChageAdd}
        />
        {!isWalletAddrValid && (
          <Text style={{ color: theme.palette.text.primary }}>
            Invalid Wallet Address
          </Text>
        )}

        <h4 className={classes.label}>Amount</h4>
        <InputField
          type={'text'}
          placeholder="Enter Amount"
          style={{ height: '55px', margin: 0 }}
          value={receiveAmountt}
          onChange={onChangeReceiveAmt}
          endAdornment={
            <InputAdornment position="end">
              <span className={classes.endAdornmentContainer}>
                <img src={getImage(selectedCoin)} alt={'INEX'} />
                <p>{selectedCoin}</p>
              </span>
            </InputAdornment>
          }
        />

        <div container className={classes.gridContainer}>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>{selectedCoin} Balance</p>
              <p className={classes.gridText}>
                {singleWallet?.coinBalance} {selectedCoin}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Asset Wallet</p>
              <p className={classes.gridText}>{selectedCoin}</p>
            </div>
          </div>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Minimum withdrawal</p>
              <p className={classes.gridText}>
                {values?.min} {selectedCoin}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Maximum withdrawal</p>
              <p className={classes.gridText}>
                {values?.max} {selectedCoin}
              </p>
            </div>
          </div>

          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Network Fee</p>
              <p className={classes.gridText}>0.0005 {selectedCoin}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Final Receive Amount</p>
              <p className={classes.gridText}>
                {finalAmount} {selectedCoin}
              </p>
            </div>
          </div>
        </div>

        <div style={{ margin: '10px' }}></div>

        <GenericButton
          text={'Withdraw'}
          styles={{ marginTop: 'auto' }}
          onClick={withdrawCrypto}
          disabled={!isWalletAddrValid || !receiveAmountt}
          loading={loadings}
        />
      </div>
      {showPopup && (
        <GeneralPopup
          message={popupMessage}
          onClose={handlePopupClose}
          width={popupMessage.length > 100 ? '600px' : '360px'}
        />
      )}
    </WithdrawCryptoLayout>
  );
};

export default WithdrawCryptoSelectCoin;
