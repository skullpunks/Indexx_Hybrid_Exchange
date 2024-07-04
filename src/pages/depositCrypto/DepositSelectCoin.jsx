import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import CustomSelectBox from '../../components/updated/Deposit/CustomSelect';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/updated/shared/TextField';
import DepositCryptoLayout from '../../components/updated/DepositCrypto';
import { useTheme } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import initialTokens from '../../utils/Tokens.json';
import {
  decodeJWT,
  transactionList,
  getUserWallets,
  checkAndUpdateDeposit,
  getFTTCoreWalletDetails,
} from '../../services/api';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import GeneralPopup from '../../components/updated/BuySell/Popup';

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
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
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
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  gridHeading: {
    color: theme.palette.text.secondary,
  },
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
  warning: {
    color: 'red',
  },
}));

// const defaultNetwork = {
//   WIBS: 'Ethereum',
//   INEX: 'BNB',
//   IN500: 'BNB',
//   'IUSD+': 'BNB',
//   INXC: 'BNB',
// };

// const currencyToNetwork = {
//   INEX: 'BNB',
//   IN500: 'BNB',
//   INXC: 'BNB',
//   'IUSD+': 'BNB',
//   ETH: 'ETH',
//   DOGE: 'DOGE',
//   XRP: 'XRP',
//   BNB: 'BNB',
//   BTC: 'BTC',
//   FTT: 'BNB',
// };

const DepositSelectCoin = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState('INEX');
  const [network, setNetwork] = useState('Binance Smart Chain');
  const [showWarning, setShowWarning] = useState(false);
  const [depositHash, setDepositHash] = useState('');
  const [singleWallet, setSingleWallet] = useState(null);
  const [usersWallets, setUsersWallets] = useState([]);
  const [copiedValue, copy] = useCopyToClipboard();
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token));

    getUserWallets(decodedToken?.email).then((res) => {
      setUsersWallets(res.data);
      const userWallet = res.data.filter(
        (x) => x.coinSymbol === selectedCurrency
      );
      setSingleWallet(userWallet[0]);
    });
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency) {
      const defaultNet = singleWallet?.coinNetwork;
      setNetwork(defaultNet);
    }
  }, [selectedCurrency, singleWallet]);

  const handleCurrencyChange = (value) => {
    let getRequiredCoin = initialTokens.find((x) => x.title === value);
    const userWallet = usersWallets.filter(
      (x) => x.coinSymbol === getRequiredCoin?.title
    );
  
    setSelectedCurrency(String(getRequiredCoin?.title));
    setSingleWallet(userWallet[0]);
    const newNetwork = userWallet[0]?.coinNetwork;
    setNetwork(newNetwork);
  };

  const handleNetworkChange = (value) => {
    // if (
    //   (selectedCurrency === 'WIBS' && value !== 'ETH') ||
    //   (['INEX', 'IN500', 'IUSD+', 'INXC'].includes(selectedCurrency) && value !== 'BNB')
    // ) {
    //   setShowWarning(true);
    // } else {
      setNetwork(value);
      setShowWarning(false);
    //}
  };

  const getNetworkItems = () => {
    const predefinedNetworks = [];
    if (!predefinedNetworks.includes(singleWallet?.coinNetwork)) {
      predefinedNetworks.push(singleWallet?.coinNetwork);
    }
    return predefinedNetworks;
  };

  const copyToClipboard = (text) => {
    copy(text);
    //OpenNotification('success', 'Copied to clipboard');
  };

  const updateDepositTx = (e) => {
    setDepositHash(e.target.value);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const submitDepositRequest = async () => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token));
    setIsLoading(true);
    const res = await checkAndUpdateDeposit(
      decodedToken.email,
      depositHash,
      String(selectedCurrency),
      String(network)
    );

    if (res.status === 200) {
      setPopupMessage('Your deposit is successful.');
      setIsLoading(false);
    } else {
      setPopupMessage(res.data.message);
      setIsLoading(false);
    }
    setDepositHash('');
    setShowPopup(true);
  };

  return (
    <DepositCryptoLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>Select Coin</h3>
        <h4 className={classes.label}>Coin</h4>
        <CustomSelectBox
          items={initialTokens.filter(token => !token.isStock && !token.isETF).map((token) => token.title)}
          type={'Coin'}
          defaultValue={'INEX'}
          onCurrencyChange={handleCurrencyChange}
        />
        <div style={{ margin: '10px' }}></div>
        <h3 className={classes.heading}>Deposit to</h3>
        <h4 className={classes.label}>Network</h4>
        <CustomSelectBox
          items={getNetworkItems()}
          type={'network'}
          onCurrencyChange={handleNetworkChange}
          defaultValue={network}
        />
        <p className={classes.heading}>Address</p>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginBottom: theme.spacing(2),
          }}
        >
          <span
            style={{ color: theme.palette.text.primary, fontWeight: '500' }}
          >
            {singleWallet?.coinWalletAddress}{' '}
          </span>
          <div
            className={classes.copyButton}
            onClick={() => copyToClipboard(singleWallet?.coinWalletAddress)}
          >
            <ContentCopy
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
              fontSize="small"
            />
          </div>
        </div>
        <div container className={classes.gridContainer}>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Expected arrival</p>
              <p className={classes.gridText}>3 network confirmations</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Expected Unlock</p>
              <p className={classes.gridText}>
                <span style={{ color: theme.palette.primary.main }}>2</span>{' '}
                network confirmations
              </p>
            </div>
          </div>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Minimum deposit</p>
              <p className={classes.gridText}>
                {' '}
                0.0001 {singleWallet?.coinSymbol}{' '}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Selected Wallet</p>
              <p className={classes.gridText}>
                Asset Wallet{' '}
              </p>
            </div>
          </div>
        </div>
        <ul>
          <li className={classes.listItem}>
            Send only {singleWallet?.coinSymbol} to this deposit address.
          </li>
          <li className={classes.listItem}>
            Ensure the network is
            <span
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {' '}
              {singleWallet?.coinNetwork}.
            </span>{' '}
          </li>
          <li className={classes.listItem}>
            Do not send NFTs to this address.{' '}
          </li>
        </ul>
        <InputField
          type={'text'}
          placeholder="Enter deposit transaction hash"
          style={{ height: '55px' }}
          onChange={updateDepositTx}
        />
        <div style={{ margin: '10px' }}>
          {showWarning && (
            <div className={classes.warning}>
              Please use the default network for {selectedCurrency} ({singleWallet?.coinNetwork}).
            </div>
          )}
        </div>
        <GenericButton
          text={'Submit deposit transaction hash'}
          styles={{ marginTop: 'auto' }}
          onClick={submitDepositRequest}
          disabled={showWarning || !depositHash}
          loading={isLoading}
        />
      </div>
      {showPopup && (
        <GeneralPopup
          message={popupMessage}
          onClose={handlePopupClose}
        />
      )}
    </DepositCryptoLayout>
  );
};

export default DepositSelectCoin;
