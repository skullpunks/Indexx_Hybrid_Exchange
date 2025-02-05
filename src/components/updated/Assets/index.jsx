import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';
import GenericButton from '../shared/Button';
import {
  Avatar,
  AvatarGroup,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
import { getSmartCryptoPackages } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import initialTokens from '../../../utils/Tokens.json';
import CreateOwnPlan from '../SmartCrypto/CreateOwnPlan';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
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
  buttonContainer1: {
    display: 'flex',
    gap: '10px',
  },
  greyButton: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgb(71, 77, 87) !important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  yellowButton: {
    backgroundColor: `transparent !important`,
    background: `none !important`,
    color: `#FEBA00 !important`,
    border: `1px solid #FEBA00 !important`,
    '&:hover': {
      backgroundColor: `#FEBA00 !important`,
      color: `#000 !important`,
    },
  },
  blueButtonWithBg: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  yellowButtonWithBg: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },

  blueButton: {
    backgroundColor: `transparent !important`,
    background: `none !important`,
    color: `#07A6FC !important`,
    border: `1px solid #07A6FC !important`,
    '&:hover': {
      backgroundColor: `#07A6FC !important`,
      color: `#000 !important`,
    },
  },
  blueActive: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  yellowActive: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
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
  cardWrapper: {
    maxWidth: '1280px',
    width: '100%',
    display: 'flex',
    margin: '50px auto',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  createOwnPlan: {
    maxWidth: '1280px',
    width: '100%',
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&>h3': {
      fontSize: '38px',
      textAlign: 'center',
    },
    '&>p': {
      textAlign: 'center',
      marginBottom: '50px',
    },
  },
  cardContainer: {
    border:
      theme.palette.mode === 'dark'
        ? '1px solid rgb(71, 77, 87)'
        : `1px solid ${theme.palette.divider}`,
    width: '32.7%',
    background: theme.palette.mode === 'dark' ? theme.palette.divider : '#fff',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    margin: '0px',
    minWidth: 0,
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: '500',
      color: theme.palette.text.primary,
      margin: '0px 0px 16px',
    },
  },
  flexContainer2: {
    display: 'flex',
    justifyContent: 'space-between',
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
  activeChildLink: {
    color: theme.palette.text.primary,
    borderBottom: `0px solid ${theme.palette.primary.main}`, // 3px underline
    '&::before': {
      content: '""',
      display: 'block',
      width: '16px', // height of the line at the start of the item
      height: '3px', // thickness
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      position: 'absolute',
      left: 35,
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
  childHoverEffect: {
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
      left: 35,
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
    width: '100%',
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
    maxWidth: '1380px',
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
    margin: '50px auto 0px auto',
    '& h2': {
      fontSize: '42px',
      fontWeight: '500',
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
    margin: '10px auto 100px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescription: {
    margin: '50px 0px',
    '& h4': {
      fontSize: '16px',
    },
  },
}));

const Assets = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('Asset Wallet');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchParams] = useSearchParams();
  const selectedValueFromUrl = searchParams.get('selectedValue');
  const [selectedListValue, setSelectedListValue] = useState(
    selectedValueFromUrl || 'Overview'
  );
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
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState('surge');
  const [allTokens, setAllTokens] = useState([]);
  const [createOwnPlan, setCreateOwnPlan] = useState(false);
  const tab = useMediaQuery('(max-width:900px)');
  const [congratulationsPopup, setCongratulationsPopup] = useState(false);
  const [userSellPlanReformed, setUserPlanNameReformed] = useState('');
  const [userSellPlan, setUserPlanName] = useState('');
  const [cryptoTreasuryOpen, setCryptoTreasuryOpen] = useState(false); // State for dropdown

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleListClick = (value, path) => {
    setSelectedListValue(value); // Update the selected list value
    navigate(path); // Navigate to the desired path
  };

  const handleCryptoTreasuryClick = () => {
    setCryptoTreasuryOpen(!cryptoTreasuryOpen); // Toggle dropdown state
  };

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user) {
      setUserType(user);
    }
  }, []);

  useEffect(() => {
    if (selectedPlanTab === 0) {
      setDetails('ripple');
    } else {
      setDetails('blooming');
    }
  }, [selectedPlanTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSmartCryptoPackages();
        // Sort by subTitle (assuming subTitle is a string)
        const sortedData = (response.data || []).sort((a, b) =>
          a.subTitle.localeCompare(b.subTitle)
        );

        // Category-based filtering logic
        const categoryFilters = {
          'x-Blue': [
            'Smart Crypto Ripple',
            'Smart Crypto Surge',
            'Smart Crypto Wave',
          ],
          'x-Bitcoin': [
            'xBitcoin Blooming',
            'xBitcoin Bull-Run',
            'xBitcoin Rush',
          ],
        };

        console.log('sortedData', sortedData);
        const applicableNames =
          categoryFilters[selectedPlanTab === 0 ? 'x-Blue' : 'x-Bitcoin'] || [];
        // Filter with partial matches
        const filteredData = sortedData.filter((pkg) =>
          applicableNames.some((name) =>
            pkg.portfolioName.toLowerCase().includes(name.toLowerCase())
          )
        );

        console.log('Filtered Data:', filteredData);
        setPackagesData(filteredData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPlanTab]);

  useEffect(() => {
    setFilteredPackages(() => {
      const categoryFilters = {
        'x-Blue': [
          'Smart Crypto Ripple',
          'Smart Crypto Surge',
          'Smart Crypto Wave',
        ],
        'x-Bitcoin': [
          'xBitcoin Blooming',
          'xBitcoin Bull-Run',
          'xBitcoin Rush',
        ],
      };

      const applicableNames =
        categoryFilters[selectedPlanTab === 0 ? 'x-Blue' : 'x-Bitcoin'] || [];
      console.log(applicableNames, 'applicablenames');
      // Filter with partial matches
      const filteredByCategory = packagesData.filter((pkg) =>
        applicableNames.some((name) =>
          pkg.portfolioName.toLowerCase().includes(name.toLowerCase())
        )
      );
      console.log(filteredByCategory, 'filteredByCategory');

      // Filtering logic based on selectedInnerTab
      return filteredByCategory.filter((pkg) =>
        pkg.portfolioName.toLowerCase().includes(details)
      );
    });
  }, [details, packagesData, selectedPlanTab]);

  useEffect(() => {
    let getRequiredCoin = initialTokens.filter(
      (x) => x.commonToken === true && x.isStock === false && x.isETF === false
    );
    setAllTokens(getRequiredCoin);
  }, []);
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
      description: 'Optimized for low volatility and steady returns.',
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
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  const handleViewAllocation = (allocationData) => {
    console.log(isAuthenticated, 'isAuthenticated');
    if (!isAuthenticated) {
      window.location = 'https://indexx.ai/auth/signup-email/';
      return;
    }
    setSelectedAllocation(allocationData);
    setAllocationPopup(true);
  };

  const handleClickBuyPlan = (allocationData) => {
    if (!isAuthenticated) {
      window.location = 'https://indexx.ai/auth/signup-email/';
      return;
    }
    setSelectedAllocation(allocationData);
    setCreateAPlanPopup(true);
    console.log('Selected Plan currentPlanName:', currentPlanName);
  };

  const handlePlanChange = (plan) => {
    setCurrentPlanName(plan);
    setupdatePlanMode(true);
    console.log('Selected Plan:', plan);
    localStorage.setItem('CurrentPlan', plan);
  };

  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };

  function extractPlanDetails(inputString) {
    // Regular expressions
    const planNameRegex = /^(.*?)\s\$/; // Matches "Smart Crypto Wave" before the "$"
    const managedByRegex = /-\s*(\w+)/; // Matches "Omkar" or "Issa" after the "-"

    // Extract the plan name
    const planNameMatch = inputString.match(planNameRegex);
    const planName = planNameMatch ? planNameMatch[1].trim() : null;

    // Extract the managed by name
    const managedByMatch = inputString.match(managedByRegex);
    const managedBy = managedByMatch ? managedByMatch[1].trim() : null;

    // Return the result
    return { planName, managedBy };
  }

  const isCurrentPlan = (planName, managedBy) => {
    console.log('planName, managedBy', planName, managedBy);

    let currentPlanName = localStorage.getItem('CurrentPlan');
    let newName = extractPlanDetails(currentPlanName);
    console.log('newName', newName);
    if (
      planName.includes(newName.planName) &&
      managedBy.includes(newName.managedBy)
    ) {
      return true;
    } else {
      return false;
    }
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
                  width: '220px',
                  position: 'sticky',
                  top: 100,
                  marginTop: '20px',
                  flexShrink: 0,
                }}
              >
                <List sx={{ position: 'sticky', top: 100 }}>
                  {[
                    { name: 'Overview', path: '/wallet/overview' },
                    { name: 'Cryptos', path: '/wallet/crypto' },
                    {
                      name: 'Crypto Treasury',
                      path: '/wallet/smart-crypto',
                      children: [
                        { name: 'Smart Crypto', path: '/wallet/smart-crypto' },
                        { name: 'Smart APY', path: '/wallet/iusd+' },
                      ],
                    },
                    { name: 'Fiat / Cash', path: '/wallet/fiat' },
                  ].map((el, index) => (
                    <React.Fragment key={el.path}>
                      <ListItem
                        disablePadding
                        disableRipple
                        onClick={
                          el.children
                            ? handleCryptoTreasuryClick
                            : () => handleListClick(el.name, el.path)
                        }
                        className={`${classes.hoverEffect} ${
                          location.pathname === el.path ||
                          (el.children &&
                            el.children.some(
                              (child) => location.pathname === child.path
                            ))
                            ? classes.activeLink
                            : ''
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
                          {el.children &&
                            (cryptoTreasuryOpen ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            ))}
                        </ListItemButton>
                      </ListItem>
                      {el.children && (
                        <Collapse in={cryptoTreasuryOpen} timeout="auto">
                          <List component="div" disablePadding>
                            {el.children.map((child) => (
                              <ListItem
                                key={child.path}
                                className={`${classes.childHoverEffect} ${
                                  location.pathname === child.path
                                    ? classes.activeChildLink
                                    : ''
                                }`}
                                disablePadding
                                disableRipple
                                onClick={() =>
                                  handleListClick(child.name, child.path)
                                }
                              >
                                <ListItemButton
                                  disableRipple
                                  sx={{
                                    pl: 4,
                                    color:
                                      userType === 'Indexx Exchange'
                                        ? '#11BE6A'
                                        : 'inherit',
                                    '&:hover': {
                                      backgroundColor: 'transparent',
                                    },
                                  }}
                                >
                                  <ListItemText primary={child.name} />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
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
          </div>

          <div className={classes.selectNewPlanContainer}>
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
                      className={`${
                        selectedPlanTab === 0
                          ? classes.blueButton
                          : classes.yellowButton
                      } ${
                        details === curr.name.toLowerCase()
                          ? selectedPlanTab === 0
                            ? classes.blueActive
                            : classes.yellowActive
                          : ''
                      }`}
                      onClick={() => {
                        setPlainName(curr.name.toLowerCase());
                        setDetails(curr.name.toLowerCase());
                        // setPlanDetailsShow(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.cardWrapper}>
              {loading ? (
                <p>Loading...</p>
              ) : filteredPackages?.length > 0 ? (
                filteredPackages?.map((pkg) => (
                  <div key={pkg._id} className={classes.cardContainer}>
                    <h3>
                      {pkg.portfolioName.includes('Smart Crypto Ripple') &&
                        'x-Blue Ripple'}
                      {pkg.portfolioName.includes('Smart Crypto Wave') &&
                        'x-Blue Wave'}
                      {pkg.portfolioName.includes('Smart Crypto Surge') &&
                        'x-Blue Surge'}
                      {pkg.portfolioName.includes('xBitcoin Blooming') &&
                        'x-Bitcoin Blooming'}
                      {pkg.portfolioName.includes('xBitcoin Bull-Run') &&
                        'x-Bitcoin Bull-Run'}
                      {pkg.portfolioName.includes('xBitcoin Rush') &&
                        'x-Bitcoin Rush'}
                      ({pkg?.managedBy})
                    </h3>
                    <p>
                      {pkg.portfolioName.includes('Smart Crypto Ripple') &&
                        'Less Volatility'}
                      {pkg.portfolioName.includes('Smart Crypto Wave') &&
                        'High Volatility, Mid Return On Investment(ROI)'}
                      {pkg.portfolioName.includes('Smart Crypto Surge') &&
                        'Mid Level Volatility, Mid Return On Investment(ROI)'}
                      {pkg.portfolioName.includes('xBitcoin Blooming') &&
                        'High Performance Portfolio'}
                      {pkg.portfolioName.includes('xBitcoin Bull-Run') &&
                        'Aggressive Growth Portfolio'}
                      {pkg.portfolioName.includes('xBitcoin Rush') &&
                        'Diverse Crypto Portfolio'}
                    </p>
                    <div className={classes.flexContainer2}>
                      <div style={{ margin: '10px 0px' }}>
                        <p>Assets</p>
                        <AvatarGroup max={4}>
                          {pkg.cryptocurrencies.map((crypto) => (
                            <Avatar
                              key={crypto._id}
                              alt={crypto.name}
                              src={getImage(crypto?.token)}
                            />
                          ))}
                        </AvatarGroup>
                      </div>
                    </div>
                    <div className={classes.cardDescription}>
                      <h4>Description:</h4>
                      <p>{pkg.description}</p>
                    </div>
                    <div className={classes.buttonContainer1}>
                      <GenericButton
                        text="View Allocation"
                        className={classes.greyButton}
                        onClick={() => handleViewAllocation(pkg)}
                      />
                      <GenericButton
                        text={
                          !isCurrentPlan(pkg.portfolioName, pkg?.managedBy)
                            ? 'Switch Plan'
                            : 'Current Plan'
                        }
                        className={
                          selectedPlanTab === 0
                            ? classes.blueButtonWithBg
                            : classes.yellowButtonWithBg
                        }
                        disabled={isCurrentPlan(
                          pkg.portfolioName,
                          pkg?.managedBy
                        )}
                        onClick={() => handleClickBuyPlan(pkg)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No packages found.</p>
              )}
            </div>

            <div className={classes.createOwnPlan}>
              <h3>Create your own plan</h3>
              <p>
                Create a smart crypto plan to boost your autopilot, hands-off
                investment vehicle
              </p>

              <div className={classes.cardContainer}>
                <h3>Can’t find a plan you like?</h3>
                <div className={classes.flexContainer2}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <p style={{ marginBottom: '10px' }}>
                      Choose and create your own plan!
                    </p>
                    <AvatarGroup max={8} sx={{ marginBottom: '10px' }}>
                      {allTokens?.map((crypto) => (
                        <Avatar
                          key={crypto._id}
                          alt={crypto.name}
                          src={getImage(crypto?.image)}
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
                <div className={classes.cardDescription}>
                  <h4>Description:</h4>
                  <p>
                    Customize strategies to achieve your goals and take control
                    of your investment.
                  </p>
                </div>
                <div className={classes.buttonContainer1}>
                  <GenericButton
                    text="Create your own plan!"
                    className={
                      selectedPlanTab === 0
                        ? classes.blueButtonWithBg
                        : classes.yellowButtonWithBg
                    }
                    onClick={() => {
                      if (!isAuthenticated) {
                        window.location =
                          'https://indexx.ai/auth/signup-email/';
                        return;
                      }
                      setCreateOwnPlan(true);
                    }}
                  />
                </div>
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
          currentPlanName={currentPlanName}
        />
      )}

      {allocationPopop && (
        <AllocationPopup
          onClose={() => setAllocationPopup(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          allocationData={selectedAllocation}
          onStartPopup={(pkg) => handleClickBuyPlan(pkg)}
          buttonTextName="Switch Plan"
          currentPlanName={currentPlanName}
        />
      )}

      {createAPlanPopop && (
        <CreateAPlanPopup
          onClose={() => setCreateAPlanPopup(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          allocationData={selectedAllocation}
          buttonTextName="Switch Plan"
          currentPlanName={currentPlanName}
          confirmSwitch={(userSellPlanReformed, userSellPlan) => {
            setCreateAPlanPopup(false);
            setCongratulationsPopup(true);
            setUserPlanNameReformed(userSellPlanReformed);
            setUserPlanName(userSellPlan);
          }}
        />
      )}
      {createOwnPlan && (
        <CreateOwnPlan
          onClose={() => setCreateOwnPlan(false)}
          category={selectedPlanTab ? 'x-Bitcoin' : 'x-Blue'}
          filteredTokens={allTokens}
        />
      )}

      {congratulationsPopup && (
        <CongratulationsPopup
          onClose={() => setCongratulationsPopup(false)}
          category={'x-Blue'}
          userSellPlanReformed={userSellPlanReformed}
          userSellPlan={userSellPlan}
        />
      )}
    </div>
  );
};

export default Assets;
