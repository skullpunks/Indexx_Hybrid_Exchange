import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Navbar from 'react-bootstrap/Navbar';
import hive from '../../assets/BSheader/hive logo HD2 1.svg';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './Header.css';
import indexText_dark from '../../assets/indexx.ai_black.svg';
import indexText from '../../assets/indexx.ai white.png';
import indexTextyellow from '../../assets/indexx ai yellow 1.svg';
import indexTextyellowdark from '../../assets/yellow_dark.svg';

import {
  baseURL,
  baseCEXURL,
  getCaptainBeeStatics,
  getHoneyUserDetails,
  baseDEXURL,
  baseHiveURL,
  baseMktplaceURL,
  baseShopURL,
  baseWSURL,
  baseWalletURL,
  baseXnftURL,
  decodeJWT,
  baseAcademyUrl,
} from '../../services/api';
import { Typography } from '@mui/material';
// import DarkMode from '../DarkMode/DarkMode';

const MobileHeader = () => {
  const [level1Open, setLevel1Open] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [level2Open, setLevel2Open] = useState(false);

  const toggleLevel1 = () => {
    setLevel1Open(!level1Open);
    setSelectedItem(null);
    setLevel2Open(false);
  };

  const toggleLevel2 = (item) => {
    setSelectedItem(item);
    setLevel2Open(true);
  };

  const [, setIsInsideApp] = useState(false);
  const location = useLocation();
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [isCaptain, setisCaptain] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [url, setUrl] = useState('');
  const [haspowerpack, setHaspowerpack] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log(haspowerpack, 'has pack');

  // alert(pageName)
  useEffect(() => {
    if (location) {
      setIsInsideApp(location.pathname.includes('/indexx-exchange/'));
    }
  }, [location]);
  useEffect(() => {
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    const username =
      localStorage.getItem('username') !== undefined
        ? String(localStorage.getItem('username'))
        : undefined;

    const user =
      localStorage.getItem('user') !== undefined
        ? String(localStorage.getItem('user'))
        : undefined;

    if (userType === 'CaptainBee') {
      setisCaptain(true);
      if (username) {
        getCaptainBeeStatics(String(username)).then((data) => {
          setUserProfile(data?.data?.affiliateUserProfile?.photoIdFileurl);
          setStaticsData(data.data);
          if (
            data?.data?.powerPackData !== undefined &&
            data?.data?.powerPackData !== null &&
            data?.data?.powerPackData !== ''
          ) {
            setHaspowerpack(true);
          }
        });
      }
    } else {
      setisCaptain(false);

      getHoneyUserDetails(String(user)).then((data) => {
        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
        setUserProfile(data?.data?._doc?.profilePic);
      });
    }
  }, []);

  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    console.log('access', access_token);
    if (access_token) {
      try {
        let decoded = decodeJWT(access_token);
        const userEmail = decoded.email;
        const userKey = String(localStorage.getItem('userkey'));
        const userType = localStorage.getItem('userType');
        const userpassword = localStorage.getItem('userpass');
        console.log('userEmail', userEmail);
        console.log('userKey', userKey);
        console.log('userpassword', userpassword);
        const walletUrl = `${baseWalletURL}/login/sign-in/?useremail=${userEmail}&userkey=${userpassword}&usertype=${userType}`;
        setUrl(walletUrl);
      } catch (error) {
        console.error('Error decoding access_token:', error);
        // Handle the error, e.g., show an error message to the user or perform appropriate actions.
      }
    }
  }, []);

  const [userLogged, setUserLogged] = useState('normal'); // Set the user's type
  useEffect(() => {
    const user =
      localStorage.getItem('userlogged') !== undefined
        ? setUserLogged(String(localStorage.getItem('userlogged')))
        : setUserLogged('normal');
    const handleStorageChange = (event) => {
      // console.log(event);
      if (setUserLogged !== event.currentTarget.localStorage.userlogged)
        setUserLogged(event.currentTarget.localStorage.userlogged);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logOutUser = (e) => {
    console.log('presed logout');
    e.preventDefault();
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    localStorage.removeItem('user'); //remove one item
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token');
    localStorage.clear(); //clear all localstorage
    console.log(userType);
    debugger;
    if (userType === 'CaptainBee') {
      window.location.href = '/indexx-exchange/buy-sell/hive-login';
    } else if (userType === 'HoneyBee') {
      window.location.href = '/indexx-exchange/buy-sell/login-honeybee/';
    } else {
      if (window.location.pathname.includes('trade-to-earn'))
        window.location.reload();
      else window.location.href = '/indexx-exchange/buy-sell/login';
    }
  };

  const items = [
    {
      name: 'Platforms',
      subItems: [
        { name: 'Academy', url: baseAcademyUrl },
        { name: 'Exchange', url: baseCEXURL },
        { name: 'Fantasy Lotto', url: 'https://lotto.indexx.ai/' },
        // { name: 'Shop', url: baseShopURL },
        { name: 'Shop', url: baseCEXURL },
        { name: 'Swap', url: baseDEXURL },
        { name: 'Wall Street', url: baseWSURL },
        { name: 'Market', url: baseMktplaceURL },
      ],
      action: [
        {
          name: 'Sign Up in Exchange',
          url: '/indexx-exchange/buy-sell/get-started',
        },
        { name: 'Sign In in Exchange', url: '/indexx-exchange/buy-sell/login' },
        {
          name: 'Buy Lottery tickets',
          url: 'https://lotto.indexx.ai/',
        },
        // {
        //   name: 'Buy Gift Cards',
        //   url: `${baseShopURL}/collections/gift-cards-1`,
        // },
        // {
        //   name: 'Buy Greeting Cards',
        //   url: `${baseShopURL}/collections/greeting-cards`,
        // },
        // {
        //   name: 'Buy Stock Certificates',
        //   url: `${baseShopURL}/collections/indexx-stock-token-tickets`,
        // },
        // {
        //   name: 'Buy Stock Tokens',
        //   url: `${baseShopURL}/collections/stock-gift-cards`,
        // },
        {
          name: 'Buy Gift Cards',
          url: 'https://indexxgifts.com/',
        },
        {
          name: 'Buy Greeting Cards',
          url: baseCEXURL,
        },
        {
          name: 'Buy Stock Certificates',
          url: baseCEXURL,
        },
        {
          name: 'Buy Stock Tokens',
          url: baseCEXURL,
        },
        { name: 'Trade in swap', url: baseDEXURL },
        { name: 'Walk on Wall Street', url: baseWSURL },
        { name: 'Buy XNFTs', url: `${baseMktplaceURL}/collections?type=all` },
      ],
      support: [
        {
          name: 'How to use Exchange',
          url: `${baseURL}/indexx-exchange/how-it-works/centralized`,
        },
        {
          name: 'Know how to play the lottery',
          url: 'https://lotto.indexx.ai/how-to-play',
        },
        { name: 'Walk through the Hive', url: baseHiveURL },
        // { name: 'Know how to buy in the Shop', url: baseShopURL },
        { name: 'Know how to buy in the Shop', url: baseCEXURL },
        {
          name: 'How to use Swap',
          url: `${baseURL}/indexx-exchange/how-it-works/decentralized`,
        },
        { name: 'Go through Wall Street', url: baseWSURL },
        { name: 'How to buy XNFTs', url: baseMktplaceURL },
      ],
    },
    {
      name: 'Products',
      subItems: [
        { name: 'Web Wallet', url: `${url}` },
        // { name: 'Gift Cards', url: `${baseShopURL}/collections/gift-cards-1` },
        // {
        //   name: 'Greeting Cards',
        //   url: `${baseShopURL}/collections/greeting-cards`,
        // },
        { name: 'Gift Cards', url: 'https://indexxgifts.com/' },
        {
          name: 'Greeting Cards',
          url: baseCEXURL,
        },
        { name: 'NFT', url: `${baseURL}/indexx-exchange/nfts` },
        { name: 'Power Pack', url: `${baseCEXURL}/indexx-exchange/power-pack` },
        { name: 'Stock Certificates', url: `${baseWSURL}/certificates` },
        { name: 'Stock Tokens', url: `${baseWSURL}/details` },
        { name: 'Tokens', url: `${baseURL}/indexx-exchange/token-details` },
        { name: 'XNFT', url: baseXnftURL },
        { name: 'XUSD', url: `${baseXnftURL}/#fiat-cur` },
        { name: '$1 Bitcoin', url: '/indexx-exchange/coming-soon' },
      ],
      action: [
        // {
        //   name: 'Shop Gift Cards',
        //   url: `${baseShopURL}/collections/gift-cards-1`,
        // },
        // {
        //   name: 'Shop Greeting Cards',
        //   url: `${baseShopURL}/collections/greeting-cards`,
        // },
        {
          name: 'Shop Gift Cards',
          url: baseCEXURL,
        },
        {
          name: 'Shop Greeting Cards',
          url: baseCEXURL,
        },
        {
          name: 'Shop NFTs',
          url: 'https://opensea.io/collection/skullpunksog',
        },
        // {
        //   name: 'Shop Stock Certificates',
        //   url: `${baseShopURL}/collections/indexx-stock-token-tickets`,
        // },
        // {
        //   name: 'Shop Stock Tokens',
        //   url: `${baseShopURL}/collections/stock-gift-cards`,
        // },
        {
          name: 'Shop Stock Certificates',
          url: baseCEXURL,
        },
        {
          name: 'Shop Stock Tokens',
          url: baseCEXURL,
        },
        {
          name: 'Shop Tokens',
          url: `${baseURL}/indexx-exchange/token-details`,
        },
        // { name: 'Shop XNFTs', url: `${baseShopURL}/collections/xnft` },
        { name: 'Shop XNFTs', url: baseCEXURL },
        {
          name: 'Shop XUSDs',
          url: `${baseMktplaceURL}/collections/xusd-nft/3`,
        },
        { name: 'Buy $1 Bitcoin', url: '/indexx-exchange/coming-soon' },
      ],
      support: [
        // {
        //   name: 'How to buy Gift Cards',
        //   url: `${baseShopURL}/collections/gift-cards-1`,
        // },
        // {
        //   name: 'How to buy Greeting Cards',
        //   url: `${baseShopURL}/collections/greeting-cards`,
        // },
        {
          name: 'How to buy Gift Cards',
          url: 'https://indexxgifts.com/',
        },
        {
          name: 'How to buy Greeting Cards',
          url: baseCEXURL,
        },
        { name: 'How to buy NFTs', url: `${baseURL}/indexx-exchange/nfts` },
        // {
        //   name: 'How to buy Stock Certificates',
        //   url: `${baseShopURL}/collections/indexx-stock-token-tickets`,
        // },
        {
          name: 'How to buy Stock Certificates',
          url: baseCEXURL,
        },
        {
          name: 'How to buy Stock Token',
          url: baseCEXURL,
        },
        {
          name: 'Learn about indexx Tokens',
          url: `${baseURL}/indexx-exchange/how-it-works/tokens`,
        },
        { name: 'How to buy XNFTs', url: baseXnftURL },
        { name: 'How to buy XUSDs', url: `${baseXnftURL}/#fiat-cur` },
        {
          name: 'Know how to buy $1 Bitcoin',
          url: '/indexx-exchange/coming-soon',
        },
      ],
    },
    {
      name: 'Program',
      subItems: [
        {
          name: 'Airdrop',
          url: `${baseURL}/airdrop`,
        },
        {
          name: 'Affiliate Program',
          url: 'https://register.affiliate.indexx.ai/',
        },
        { name: 'Elite Club', url: `${baseCEXURL}/indexx-exchange/elite-club` },
        { name: 'Hive', url: baseHiveURL },
        {
          name: 'Trade to Earn',
          url: `${baseURL}/indexx-exchange/trade-to-earn`,
        },
        {
          name: 'Staking',
          url: `${baseCEXURL}/indexx-exchange/buy-sell/staking`,
        },
      ],
      action: [
        {
          name: 'Sign up as an Afilliate',
          url: 'https://register.affiliate.indexx.ai/about',
        },
        { name: 'Captain Bee Sign Up', url: `${baseHiveURL}/sign-up` },
        { name: 'Honeycomb Build Up', url: '/indexx-exchange/coming-soon' },
        // {
        //   name: 'Trade to Earn Sign Up',
        //   url: `${baseURL}/indexx-exchange/buy-sell/get-started`,
        // },
        // {
        //   name: 'Trade to Earn Sign In',
        //   url: `${baseURL}/indexx-exchange/buy-sell/login`,
        // },
      ],
      support: [
        {
          name: 'Benefit of an Affiliate',
          url: 'https://register.affiliate.indexx.ai/about',
        },
        {
          name: 'How to Trade to Earn',
          url: `${baseURL}/indexx-exchange/how-it-works/tradetoearn`,
        },
      ],
    },
    {
      name: 'Wallet',
      subItems: [
        {
          name: 'Extension',
          url: 'https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en',
        },
        { name: 'Web', url: baseWalletURL },
      ],
      action: [
        {
          name: 'Install Extension',
          url: 'https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en',
        },
        { name: 'Sign up Web-2 Wallet', url: baseWalletURL },
        { name: 'Sign Up Web-3 Wallet', url: baseWalletURL },
      ],
      support: [
        {
          name: 'How to install and use wallet extension',
          url: 'https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en',
        },
        {
          name: 'How to use wallet Web',
          url: `${baseWalletURL}/Indexx-wallet/wallet-whitepaper`,
        },
      ],
    },
    {
      name: 'Company',
      subItems: [
        { name: 'About', url: `${baseURL}/indexx-exchange/about` },
        { name: 'Blog', url: `${baseURL}/indexx-exchange/blog` },
        { name: 'Careers', url: `${baseURL}/indexx-exchange/careers` },
        {
          name: 'How it Works',
          url: `${baseURL}/indexx-exchange/how-it-works`,
        },
        { name: 'Markets', url: `${baseURL}/indexx-exchange/markets` },
        { name: 'Vlog', url: `${baseURL}/indexx-exchange/vlog` },
        { name: 'Document', url: '/indexx-exchange/coming-soon' },
      ],
      action: [
        { name: 'Know the company', url: `${baseURL}/indexx-exchange/about` },
        { name: 'Read updates', url: `${baseURL}/indexx-exchange/blog` },
        { name: 'Find opportunity', url: `${baseURL}/indexx-exchange/careers` },
        { name: 'Features', url: `${baseURL}/indexx-exchange/how-it-works` },
        { name: 'Crypto trends', url: `${baseURL}/indexx-exchange/markets` },
        { name: 'Watch videos', url: `${baseURL}/indexx-exchange/vlog` },
      ],
      support: [
        {
          name: 'Government Certificates',
          url: '/indexx-exchange/coming-soon',
        },
        { name: 'Legal docs', url: `${baseURL}/indexx-exchange/legal` },
        { name: 'Patent documents', url: '/indexx-exchange/coming-soon' },
        { name: 'Whitepapers', url: '/indexx-exchange/coming-soon' },
      ],
    },
    {
      name: 'Profile',
      subItems: [
        { name: 'Account & Settings', url: '/indexx-exchange/account' },
        { name: 'Bridge', url: '/indexx-exchange/bridge' },
        { name: 'Hive Dashboard', url: '/indexx-exchange/dashboard' },
        { name: 'Deposit', url: '/indexx-exchange/buy-sell/deposit-crypto' },
        { name: 'Notification', url: '/indexx-exchange/notification' },
        {
          name: 'Order History',
          url: '/indexx-exchange/buy-sell/order-history',
        },
        { name: 'Reward Center', url: '/indexx-exchange/reward-center' },
        { name: 'Trade to Earn', url: '/indexx-exchange/trade-to-earn' },
        {
          name: 'Staking History',
          url: '/indexx-exchange/buy-sell/staking-history',
        },
        {
          name: 'Transaction History',
          url: '/indexx-exchange/buy-sell/transaction-history',
        },
        { name: 'Wallet', url: '/indexx-exchange/buy-sell/wallet' },
        { name: 'Withdraw', url: '/indexx-exchange/buy-sell/withdraw-crypto' },
        { name: 'Logout', url: '/' },
      ],
      action: [
        { name: 'Sales', url: '/indexx-exchange/dashboard' },
        { name: 'Trade and Earn', url: '/indexx-exchange/trade-to-earn' },
        { name: 'Reward Center', url: '/indexx-exchange/reward-center' },
        {
          name: 'Recent Transactions',
          url: '/indexx-exchange/buy-sell/transaction-history',
        },
      ],
      support: [
        {
          name: 'How to deposit',
          url: '/indexx-exchange/buy-sell/deposit-crypto',
        },
        {
          name: 'Know how to withdraw',
          url: '/indexx-exchange/buy-sell/withdraw-crypto',
        },
      ],
    },
  ];

  return (
    <div className="mob-head">
      <div style={{ maxWidth: '100%', display: 'flex' }}>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: '#000',
            boxShadow: 'none',
            maxWidth: '100vw',
            left: 0,
          }}
          className="app-head"
        >
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <div
              className="d-flex logo__holder"
              style={{
                marginLeft: `${
                  localStorage.getItem('userlogged') === 'normal' ? '' : '0px'
                  // localStorage.getItem('userlogged') === 'normal' ? '' : '-50px'
                }`,
              }}
            >
              <Navbar.Brand
                href={baseURL}
                className={
                  localStorage.getItem('userlogged') === 'normal'
                    ? 'logo__icon'
                    : 'hive_icon'
                }
              >
                index.ai
              </Navbar.Brand>
              {localStorage.getItem('userlogged') === 'normal' ? (
                <></>
              ) : (
                <a href={baseHiveURL}>
                  <img
                    src={hive}
                    alt="AdvanceVerfication"
                    className="font_30x margin-r-1x"
                    width={'40px'}
                  />
                </a>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <div style={{ marginTop: '39px' }}>{/* <DarkMode /> */}</div>
              <IconButton
                edge="end" // Set edge to "end" to align the icon to the right
                color="inherit"
                aria-label="menu"
                onClick={toggleLevel1}
                sx={{ width: 'fit-content' }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <Drawer
        anchor="right"
        open={level1Open}
        onClose={toggleLevel1}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'fixed',
            width: '100%',
            height: '100%',
            transition: 'width 1.5s ease-in-out',
          },
        }}
      >
        <Paper
          style={{ width: '100vw', height: '100vh', borderRadius: 0 }}
          className="my-pap"
        >
          <div>
            <div
              className="d-flex align-items-end"
              style={{ marginLeft: '100px' }}
            >
              {localStorage.getItem('userlogged') === 'normal' ? (
                <a href={baseURL}>
                  <img
                    src={theme === 'dark' ? indexText_dark : indexText}
                    alt="AdvanceVerfication"
                    className="font_30x margin-r-1x"
                    width={'119px'}
                  />
                </a>
              ) : (
                <a href={baseURL}>
                  <img
                    src={
                      theme === 'dark' ? indexTextyellow : indexTextyellowdark
                    }
                    alt="AdvanceVerfication"
                    className="font_30x margin-r-1x"
                    width={'119px'}
                  />
                </a>
              )}
              {localStorage.getItem('userlogged') === 'normal' ? (
                <></>
              ) : (
                <a href={baseHiveURL}>
                  <img
                    src={hive}
                    alt="AdvanceVerfication"
                    className="font_30x margin-r-1x"
                    width={'40px'}
                  />
                </a>
              )}
              <button onClick={toggleLevel1}>
                <CloseIcon fill="var(--body_color)" />
              </button>
            </div>
            <List sx={{ ml: 5 }}>
              {items.map((item, index) => (
                <ListItem button key={index} onClick={() => toggleLevel2(item)}>
                  <ListItemText
                    primary={
                      <Typography className="main-list">{item.name}</Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </Drawer>

      {selectedItem && (
        <Drawer
          anchor="right"
          open={level2Open}
          onClose={() => setLevel2Open(false)}
        >
          <Paper
            style={{
              width: '100vw',
              height: '100%',
              borderRadius: 0,
              overflowY: 'scroll',
            }}
            className="sec-head"
          >
            <div>
              <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-between align-items-end w-75">
                  <button
                    onClick={() => setLevel2Open(false)}
                    style={{ width: 'fit-content', marginRight: '30px' }}
                  >
                    <ArrowBackIosNewIcon fill="var(--body_color)" />
                  </button>
                  {localStorage.getItem('userlogged') === 'normal' ? (
                    <a href={baseURL}>
                      <img
                        src={theme === 'dark' ? indexText_dark : indexText}
                        alt="AdvanceVerfication"
                        className="font_30x margin-r-1x"
                        width={'119px'}
                      />
                    </a>
                  ) : (
                    <a href={baseURL}>
                      <img
                        src={
                          theme === 'dark'
                            ? indexTextyellow
                            : indexTextyellowdark
                        }
                        alt="AdvanceVerfication"
                        className="font_30x margin-r-1x"
                        width={'119px'}
                      />
                    </a>
                  )}
                  {localStorage.getItem('userlogged') === 'normal' ? (
                    <></>
                  ) : (
                    <a href={baseHiveURL}>
                      <img
                        src={hive}
                        alt="AdvanceVerfication"
                        className="font_30x margin-r-1x"
                        width={'40px'}
                      />
                    </a>
                  )}
                  <button onClick={toggleLevel1} style={{ marginLeft: '25px' }}>
                    <CloseIcon fill="var(--body_color)" />
                  </button>
                </div>
              </div>
              <List sx={{ ml: 5 }}>
                {selectedItem.subItems.map((subItem, index) => (
                  <ListItem button key={index}>
                    {(selectedItem.name === 'Profile' &&
                      subItem.name === 'Logout') === true ? (
                      <a
                        href={subItem.url}
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={logOutUser}
                      >
                        <ListItemText
                          primary={
                            <Typography className="second-list">
                              {subItem.name}
                            </Typography>
                          }
                        />
                      </a>
                    ) : (
                      <a
                        href={subItem.url}
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <ListItemText
                          primary={
                            <Typography className="second-list">
                              {subItem.name}
                            </Typography>
                          }
                        />
                      </a>
                    )}
                  </ListItem>
                ))}
              </List>
              <Typography
                fontSize={'20px'}
                color="rgb(134, 134, 139)"
                mt={2}
                ml={7}
              >
                Action
              </Typography>
              <List sx={{ ml: 5 }}>
                {selectedItem.action.map((subItem, index) => (
                  <ListItem button key={index}>
                    <a
                      href={subItem.url}
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemText
                        primary={
                          <Typography className="act-list">
                            {subItem.name}
                          </Typography>
                        }
                      />
                    </a>
                  </ListItem>
                ))}
              </List>
              <Typography
                fontSize={'20px'}
                color="rgb(134, 134, 139)"
                mt={2}
                ml={7}
              >
                Support
              </Typography>
              <List sx={{ ml: 5 }}>
                {selectedItem.support.map((subItem, index) => (
                  <ListItem button key={index}>
                    <a
                      href={subItem.url}
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemText
                        primary={
                          <Typography className="act-list">
                            {subItem.name}
                          </Typography>
                        }
                      />
                    </a>
                  </ListItem>
                ))}
              </List>
            </div>
          </Paper>
        </Drawer>
      )}
    </div>
  );
};

export default MobileHeader;
