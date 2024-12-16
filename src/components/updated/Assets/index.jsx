import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';
import GenericButton from '../shared/Button';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import assetLight from '../../../assets/updated/iconicHeader/lightMode/Vector.svg';
import assetDark from '../../../assets/updated/iconicHeader/Asset wallet.svg';
import assetHive from '../../../assets/updated/iconicHeader/asset_wallet_hive.svg';
import greenAssetWallet from '../../../assets/updated/smartCrypto/green asset wallet.svg';
import CategoryIconicHeader from './CategoryIconicHeader';
import EnhancedTable from './CoinTable';
import PlanIconicHeader from './PlanIconicHeader';
import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';

import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';
import PlainsPopup from './PlainsPopup';
import AllocationPopup from '../SmartCrypto/AllocationPopup';
import CreateAPlanPopup from '../SmartCrypto/CreateAPlan';
import CongratulationsPopup from './Congratulations';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '50px',
    margin: '50px auto 50px auto', // Center the container
    position: 'relative', // Center the container
  },
  maxWidthContainer: {
    // maxWidth: '1380px',
    width: '100%',
    margin: 'auto',
    padding: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',

    margin: '30px auto 10px auto',
    [theme.breakpoints.down('md')]: {
      margin: '0px auto 10px auto',
      gap: '10px',
      padding: '20px',
      flexDirection: 'column',
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
  flexContainer1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      '&>div': {
        width: '100%',
      },
    },
  },
  smartCryptoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
    '& img': {
      height: '50px',
    },
    marginBottom: '20px',
  },
  activeLink: {
    color: theme.palette.text.primary,
    borderBottom: `0px solid ${theme.palette.primary.main}`, // 3px underline
    '&::before': {
      content: '""',
      display: 'block',
      width: '16px', // height of the line at the start of the item
      height: '3px', // thickness
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      position: 'absolute',
      left: 20,
      top: '90%',
      transform: 'translateY(-50%)', // vertical alignment
    },
  },
  hoverEffect: {
    fontSize: '14px',
    position: 'relative', // for the pseudo-element
    background: 'none',
    color: '#FFBB00',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: 'transparent',
      borderBottom: `0px solid ${
        theme.palette.mode === 'dark' ? '#fff' : '#000'
      }`, // underline on hover
    },
    '&:hover::before': {
      content: '""',
      display: 'block',
      width: '16px',
      height: '3px',
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      position: 'absolute',
      left: 20,
      top: '90%',
      transform: 'translateY(-50%)',
    },
  },
  tableContainer: {
    display: 'flex',
    padding: '0px 20px',
    maxWidth: '1540px',
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
    },
  },
  exploreContainer: {
    position: 'relative',
    '& h3': {
      fontSize: '48px',
      marginBottom: '50px',
      fontWeight: '500',
      maxWidth: '1280px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  contentContainer: {
    maxWidth: '1280px',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    gap: '20px',
    '&>div': { flex: 1 },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  planCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '10px',
    '& img': {
      height: '100px',
      width: '100px',
      margin: 'auto',
    },
    '& h4': {
      marginTop: '-10px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    '& p': {
      marginBottom: '40px',
      textAlign: 'center',
    },
  },
  yellowButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  switchPlanRoot: {
    maxWidth: '1280px',
    width: '100%',
    padding: '20px',
    margin: '0 auto',
  },
  switchPlanHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px auto',
    '& h2': {
      fontSize: '42px',
      fontWeight: '500',
      marginBottom: '40px',
    },

    '& h3': {
      marginBottom: '10px',
    },
  },
  tableContainer1: {
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: '24px',
    minHeight: '682px',
    [theme.breakpoints.down('md')]: {
      border: 'none !important',
    },
  },
  selectNewPlanContainer: {
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Assets = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('Asset Wallet');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedListValue, setSelectedListValue] = useState('Overview');
  const [updatePlanMode, setupdatePlanMode] = useState(false);
  const [currentPlanName, setCurrentPlanName] = useState('');
  const [userType, setUserType] = useState('Indexx Exchange');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAssets, setHideAssets] = useState(true);
  const [selectedPlanTab, setSelectedPlanTab] = useState(0);
  const [planDetailsShow, setPlanDetailsShow] = useState(false);
  const [plainName, setPlainName] = useState('');
  const [allocationPopop, setAllocationPopup] = useState(false);
  const [createAPlanPopop, setCreateAPlanPopup] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  const tab = useMediaQuery('(max-width:900px)');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleListClick = (value, path) => {
    setSelectedListValue(value); // Update the selected list value
    navigate(path); // Navigate to the desired path
  };

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user) {
      setUserType(user);
    }
  }, []);

  console.log('currentPlanName', currentPlanName);

  const xBlueplanDetails = [
    {
      image: ripple,
      name: 'Ripple',
      description: 'Designed for stability and stable returns',
      path: '/smart-crypto/plan-detail/ripple',
    },
    {
      image: surge,
      name: 'Surge',
      description: 'Moderate volatility, consistent returns.',
      path: '/smart-crypto/plan-detail/surge',
    },
    {
      image: wave,
      name: 'Wave',
      description: ' High volatility, high potential rewards.',
      path: '/smart-crypto/plan-detail/wave',
    },
  ];

  const xBitcoinplanDetails = [
    {
      image: bloomingIcon,
      name: 'Blooming',
      description: 'Optimized for low volatility and steady performance.',
      path: '/smart-crypto/plan-detail/blooming',
    },
    {
      image: rushIcon,
      name: 'Rush',
      description: 'Moderate volatility, consistent returns',
      path: '/smart-crypto/plan-detail/rush',
    },
    {
      image: bullRunIcon,
      name: 'Bull-Run',
      description: 'High volatility, high potential returns.',
      path: '/smart-crypto/plan-detail/bull-run',
    },
  ];

  const planDetails =
    selectedPlanTab === 0 ? xBlueplanDetails : xBitcoinplanDetails;

  const handleViewAllocation = (allocationData) => {
    setSelectedAllocation(allocationData);
    setAllocationPopup(true);
  };

  const handleClickBuyPlan = (allocationData) => {
    setSelectedAllocation(allocationData);
    setCreateAPlanPopup(true);
  };

  return (
    <div className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      {!updatePlanMode ? (
        <div>
          <div
            className={`${classes.flexContainer1} ${classes.maxWidthContainer}`}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
              }}
            >
              <div className={classes.smartCryptoContainer}>
                <img
                  src={
                    userType === 'Indexx Exchange'
                      ? greenAssetWallet
                      : assetHive
                  }
                />
                <h3 style={{ margin: 0 }}>Asset Wallet</h3>
              </div>
              <p>
                Securely Manage, Grow, and Track Your Assets in One Powerful
                Wallet.
              </p>
            </div>
          </div>
          {tab && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              className={classes.maxWidthContainer}
            >
              <CategoryIconicHeader
                selectedTab={selectedCategory}
                setSelectedTab={setSelectedCategory}
              />
            </div>
          )}

          <div className={classes.tableContainer}>
            {!tab && (
              <div
                style={{
                  width: '300px',
                  position: 'sticky',
                  top: 100,
                  marginTop: '20px',
                }}
              >
                <List sx={{ position: 'sticky', top: 100 }}>
                  {[
                    { name: 'Overview', path: '/wallet/overview' },
                    { name: 'Crypto', path: '/wallet/crypto' },
                    { name: 'Fiat', path: '/wallet/fiat' },
                    { name: 'Smart Crypto', path: '/wallet/smart-crypto' },
                    { name: 'Smart APY', path: '/wallet/iusd+' },
                  ].map((el, index) => (
                    <ListItem
                      key={el.path}
                      disablePadding
                      disableRipple
                      onClick={() => handleListClick(el.name, el.path)} // Handle click
                      className={`${classes.hoverEffect} ${
                        location.pathname === el.path ? classes.activeLink : ''
                      }`}
                    >
                      <ListItemButton
                        disableRipple
                        sx={{
                          color:
                            userType === 'Indexx Exchange'
                              ? '#11BE6A'
                              : 'inherit',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        <ListItemText primary={el.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
            )}

            <div className={classes.maxWidthContainer}>
              <BalanceOverview selectedValue={selectedListValue} />

              <Box className={`${classes.buttonContainer}`}>
                <GenericButton
                  text={'Transaction History'}
                  className={classes.button}
                  onClick={() =>
                    navigate('/indexx-exchange/buy-sell/transaction-history')
                  }
                />
                <GenericButton
                  text={'Order History'}
                  className={classes.button}
                  onClick={() =>
                    navigate('/indexx-exchange/buy-sell/order-history')
                  }
                />
                <GenericButton
                  text={'Staking History'}
                  className={classes.button}
                  onClick={() =>
                    navigate('/indexx-exchange/buy-sell/staking-history')
                  }
                />
              </Box>
              <div>
                <CoinBreakdown
                  selectedValue={selectedListValue}
                  setupdatePlanMode={setupdatePlanMode}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.switchPlanRoot}>
          <div className={classes.switchPlanHeader}>
            <h2>Switch your Plan</h2>

            <h3>Current Plan</h3>
            <img src={wave} />
            <p>Smart Crypto x-Blue Wave-Issah</p>
          </div>

          <div className={classes.tableContainer1}>
            <EnhancedTable
              searchQuery={searchQuery}
              hideAssets={hideAssets}
              selectedValue={selectedListValue}
              setupdatePlanMode={setupdatePlanMode}
              setCurrentPlanName={setCurrentPlanName}
            />
          </div>

          <div className={classes.selectNewPlanContainer}>
            <h3>Select New Plan</h3>
            <PlanIconicHeader
              selectedPlanTab={selectedPlanTab}
              setSelectedPlanTab={setSelectedPlanTab}
            />

            <div className={classes.exploreContainer}>
              <div className={classes.contentContainer}>
                {planDetails.map((curr) => (
                  <div className={classes.planCardRoot}>
                    <img src={curr.image} />
                    <h4>{curr.name}</h4>
                    <p>{curr.description}</p>
                    <GenericButton
                      text={`Switch to ${curr.name}`}
                      className={
                        selectedPlanTab === 0
                          ? classes.blueButton
                          : classes.yellowButton
                      }
                      onClick={() => {
                        setPlainName(curr.name.toLowerCase());
                        setPlanDetailsShow(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {planDetailsShow && (
        <PlainsPopup
          onClose={() => setPlanDetailsShow(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          plainName={plainName}
          setAllocationPopup={setAllocationPopup}
          setCreateAPlanPopup={setCreateAPlanPopup}
          setSelectedAllocation={setSelectedAllocation}
        />
      )}

      {allocationPopop && (
        <AllocationPopup
          onClose={() => setAllocationPopup(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          allocationData={selectedAllocation}
          onStartPopup={(pkg) => handleClickBuyPlan(pkg)}
          buttonTextName="Switch Plan"
        />
      )}

      {createAPlanPopop && (
        <CreateAPlanPopup
          onClose={() => setCreateAPlanPopup(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          allocationData={selectedAllocation}
          buttonTextName="Switch Plan"
          currentPlanName={currentPlanName}
        />
      )}

      {/* {true && <CongratulationsPopup category={'x-Blue'} />} */}
    </div>
  );
};

export default Assets;
