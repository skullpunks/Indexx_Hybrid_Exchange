import React, { useEffect, useRef, useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
import { makeStyles } from '@mui/styles';
import SmartCryptoTabs from './IconicHeader';
import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import GenericButton from '../shared/Button';
import {
  decodeJWT,
  getOrderDetails,
  getSmartCryptoPackages,
  getUserShortToken,
} from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import AllocationPopup from './AllocationPopup';
import CreateAPlanPopup from './CreateAPlan';
import CustomSelectBox from './CustomSelectBox';
import { Link, useSearchParams } from 'react-router-dom';
import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';
import AccordionExpandDefault from './Accordion';
import smartCryptoLogo from '../../../assets/updated/smartCrypto/smartCryptoLogo.png';
import CategoryIconicHeader from './CategoryIconicHeader';
import CreateOwnPlan from './CreateOwnPlan';
import { useLocation, useNavigate } from 'react-router-dom';
import initialTokens from '../../../utils/Tokens.json';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';
import xBlueIconUpdated from '../../../assets/updated/smartCrypto/bitcoinLogo.svg';
import xBitcoinIconUpdated from '../../../assets/updated/smartCrypto/x-blueLogo.svg';

import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import plusIcon from '../../../assets/updated/smartCrypto/plusIcon.svg';
import DetailPopup from './DetailPopup';
import CongratulationsPopup from './Congratulations';
import ProcessingFailedPopup from './ProcessingFailedPopup';
import DemoInvestmentPopup from './DemoInvestmentPopup';
import DemoInvestmentPopup1 from './DemoInvestmentPopup1';
import DemoInvestmentPopup2 from './DemoInvestmentPopup2';
import DemoInvestmentPopup3 from './DemoInvestmentPopup3';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1400px',
    width: '100%',
    margin: '50px auto 0px auto',
    padding: '24px',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '100px auto',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '30px',
    },
  },
  descriptionWrapper: {
    display: 'flex',
    gap: '10px',
    margin: '0px 0px 50px 0px',
    alignItems: 'center',
    '& h4': {
      fontSize: '20px',
      fontWeight: '500',
      color: theme.palette.text.primary,
      margin: 0,
    },
    '& p': {
      fontSize: '14px',
      margin: 0,
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',

    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  assetContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  assetsText: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    margin: '0px 0px 5px',
  },
  imgGroup: {},
  buttonContainer: {
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
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  flexContainer1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '50px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      '&>div': {
        width: '100%',
      },
    },
  },
  faqContainer: {
    margin: '80px auto',
    '& h3': {
      fontSize: '48px',
      fontWeight: '500',
      marginBottom: '16px',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
  },
  smartCryptoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',

    gap: '5px',
    '& img': {
      height: '70px',
    },
  },
  headerText: {
    flex: 1,
    fontSize: '32px',
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: 'auto',
    aspectRatio: '16/9', // Ensures the video maintains a 16:9 aspect ratio
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Full width on mobile
    },
    [theme.breakpoints.up('md')]: {
      width: '100%', // Wider view on tablets and desktops
      margin: '100px auto 20px auto', // Centered alignment
    },
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover', // Ensures the video fills the container proportionally
  },
  card: {
    background: theme.palette.divider,
    position: 'relative',
    padding: '20px',
    paddingBottom: '100px',
    flex: 1,
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '& p': {
      flex: 1,
      fontSize: '18px',
    },
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    '& img': {
      height: '60px',
    },
    '& span': {
      fontSize: '18px',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  smallCardContainer: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '25px',
  },
  smallCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignitems: 'center',
    textAlign: 'center',
    transition: 'all .2s linear',
    '&:hover': {
      '& > img': {
        transform: 'scale(1.05)',
        transition: 'all .2s linear',
      },
    },
  },
  blueSmCardHover: {
    '&:hover': {
      '& span': {
        color: '#08A6FD',
      },
    },
  },
  yellowSmCardHover: {
    '&:hover': {
      '& span': {
        color: '#FBB002',
      },
    },
  },
  cardRoot: {
    margin: '200px 0px',
    '& h3': {
      fontSize: '48px',
      marginBottom: '20px',
      fontWeight: '500',
    },
    '& p': {
      fontSize: '14px',
      marginBottom: '50px',
      maxWidth: '700px',
    },
  },
  testimonialRoot: {
    margin: '200px 0px',
    '& h3': {
      fontSize: '48px',
      marginBottom: '20px',
      fontWeight: '500',
    },
    '& p': {
      fontSize: '14px',
      marginBottom: '50px',
      maxWidth: '700px',
    },
    '& .videoContainer': {
      maxWidth: '1280px',
      margin: 'auto',
    },
  },
  plusContainer: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    bottom: 15,
    right: 15,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItem: 'center',
    '&:hover': {
      opacity: 0.6,
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  disclaimerContainer: {
    marginTop: '200px',
    marginBottom: '-190px',
    '& h3': {
      fontSize: '14px',
      fontWeight: 'light',
    },
    '& p': {
      fontSize: '12px',
      marginBottom: '25px',
      fontWeight: 'light',
    },
  },
}));

const SmartCrypto = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const idValue = params.get('id');
  const typeValue = params.get('type');
  const plainId = params.get('plan_id');

  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
  const [planDetailPopupOpen, setPlanDetailPopupOpen] = useState(false);
  const [selectedInnerTab, setSelectedInnerTab] = useState(
    typeValue === 'ripple' || typeValue === 'blooming'
      ? 1
      : typeValue === 'rush' || typeValue === 'surge'
      ? 2
      : typeValue === 'wave' || typeValue === 'bull-run'
      ? 3
      : 0
  );
  const [allocationPopop, setAllocationPopup] = useState(false);
  const [createAPlanPopop, setCreateAPlanPopup] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedPlanName, setSelectedPlanName] = useState('');

  const [allTokens, setAllTokens] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState(0);
  const [createOwnPlan, setCreateOwnPlan] = useState(false);
  const descriptionXBlueData = [
    { name: '', description: '', img: '' },
    {
      name: 'Ripple Plan',
      img: ripple,
      description: 'Designed for Less volatility and stable returns.',
    },
    {
      name: 'Surge Plan',
      description: 'Moderate volatility, consistent returns.',
      img: surge,
    },
    {
      name: 'Wave Plan',
      img: wave,
      description: 'High volatility, high rewards. ',
    },
  ];
  const descriptionxBitcoinData = [
    { name: '', description: '', img: '' },
    {
      name: 'Blooming Plan',
      img: bloomingIcon,
      description: 'Optimized for low volatility and steady performance.',
    },
    {
      name: 'Rush Plan',
      description: 'Moderate volatility, consistent returns.',
      img: rushIcon,
    },
    {
      name: 'Bull-Run Plan',
      img: bullRunIcon,
      description: 'High volatility, high potential returns.',
    },
  ];
  const classes = useStyles();
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('x-Blue');
  const [congratulationsPopup, setCongratulationsPopup] = useState(false);
  const [failedPopup, setFailedPopup] = useState(false);
  const [userSellPlanReformed, setUserPlanNameReformed] = useState(
    'x-Bitcoin Bull-Run(Omkar)'
  );
  const [userSellPlan, setUserPlanName] = useState('x-Bitcoin Bull-Run(Omkar)');
  // x-Blue Ripple(Issa)
  // x-Blue Surge(Issa)
  // x-Blue Wave(Issa)
  // x-Bitcoin Blooming(Omkar)
  // x-Bitcoin Rush(Omkar)
  // x-Bitcoin Bull-Run(Omkar)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Extract user info from JWT token
  const [isWebinarUser, setIsWebinarUser] = useState(false);
  const [demoPopupOpen, setDemoPopupOpen] = useState(false);
  const [demoPopupOpen1, setDemoPopupOpen1] = useState(false);
  const [demoPopupOpen3, setDemoPopupOpen3] = useState(false);
  const [isClosingPopup, setIsClosingPopup] = useState(false); // Flag to ensure transition
  const location = useLocation();
  // Step 1: Ensure the first popup closes completely before opening the second one
  useEffect(() => {
    if (isClosingPopup && !demoPopupOpen) {
      setTimeout(() => {
        setDemoPopupOpen1(true);
        setIsClosingPopup(false); // Reset flag
      }, 500); // Ensure state updates first before showing the next popup
    }
  }, [demoPopupOpen, isClosingPopup]);

  const [isFreeTrialUpgrade, setIsFreeTrialUpgrade] = useState(false);
  useEffect(() => {
    console.log(location.pathname);
    setIsFreeTrialUpgrade(location?.state?.isFreeTrialUpgrade ? true : false);
  }, [location]);

  const isManuallyClosed = useRef(false);

  // Function to close the first demo popup and open the next one after delay
  const closeDemoPopup = () => {
    isManuallyClosed.current = true;
    setDemoPopupOpen(false);
    setTimeout(() => setDemoPopupOpen1(true), 500);
  };
  // Effect to check user type and open the appropriate popups
  useEffect(() => {
    const fetchData = async () => {
      let access_token = localStorage.getItem('access_token');
      if (access_token) {
        const decodedToken = decodeJWT(access_token);
        let shortToken = await getUserShortToken(decodedToken?.email);

        // Check if the user is a webinar user with inactive test funds
        const decodeShortToken = decodeJWT(shortToken.data);
        console.log('decodeShortToken', decodeShortToken);
        const isWebinarUser = decodeShortToken?.isWebinarUser || false;
        const isTestFundActive = decodeShortToken?.isTestFundActive || false;

        if (isWebinarUser && !isTestFundActive) {
          setIsWebinarUser(true);
          if (!isManuallyClosed.current) {
            setDemoPopupOpen(true);
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let getRequiredCoin = initialTokens.filter(
      (x) => x.commonToken === true && x.isStock === false && x.isETF === false
    );
    setAllTokens(getRequiredCoin);
  }, []);
  useEffect(() => {
    setCategory(selectedCategory === 0 ? 'x-Blue' : 'x-Bitcoin');
  }, [selectedCategory]);
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
        const applicableNames = categoryFilters[category] || [];
        console.log('applicableNames', applicableNames);
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
  }, [category]);

  const [orderID, setOrderId] = useState('');
  const [orderData, setOrderData] = useState('');
  const [orderId] = useSearchParams();
  const [success] = useSearchParams();

  useEffect(() => {
    if (!demoPopupOpen && isWebinarUser) {
      console.log('DemoInvestmentPopup closed, opening DemoInvestmentPopup1');
      setDemoPopupOpen1(true);
    }
  }, [demoPopupOpen]);

  useEffect(() => {
    const orderIdParam = orderId.get('orderId');
    const successParam = success.get('success');

    // Prevent opening DemoInvestmentPopup if orderId and success are present
    if (!orderId || !success) {
      setDemoPopupOpen(false);
    }

    // Ensure both orderId and success are available
    if (orderIdParam && successParam) {
      setOrderId(String(orderIdParam));
      console.log('success', successParam);

      if (orderIdParam !== undefined) {
        let access_token = String(localStorage.getItem('access_token'));
        let decoded = decodeJWT(access_token);

        getOrderDetails(decoded.email, String(orderIdParam)).then((res) => {
          const userEmail = decoded.email;
          const userKey = localStorage.getItem('userkey');
          const userType = localStorage.getItem('userType');
          console.log('userEmail', userEmail);
          console.log('userKey', userKey);

          console.log(res);
          let orderData = res;
          if (res.status === 200) {
            console.log('orderData', orderData);
            setOrderData(orderData.data);

            // Check the orderType and success status
            if (successParam === 'true') {
              if (orderData.data.orderType === 'FreeTrailOrder') {
                setDemoPopupOpen3(true); // Show Free Trail Order Popup
              } else {
                setCongratulationsPopup(true); // Show Normal Confirmation Popup
              }
            } else {
              setFailedPopup(true);
            }
          }
        });
      }
    } else {
      console.log(
        'Missing orderId or success parameter. Skipping state updates.'
      );
    }
  }, [orderId, success]);

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

      const applicableNames = categoryFilters[category] || [];

      // Filter with partial matches
      const filteredByCategory = packagesData.filter((pkg) =>
        applicableNames.some((name) =>
          pkg.portfolioName.toLowerCase().includes(name.toLowerCase())
        )
      );

      // Filtering logic based on selectedInnerTab
      return selectedInnerTab === 0
        ? filteredByCategory
        : filteredByCategory.filter((pkg) =>
            pkg.portfolioName.includes(
              category === 'x-Blue'
                ? selectedInnerTab === 1
                  ? 'Ripple'
                  : selectedInnerTab === 2
                  ? 'Surge'
                  : 'Wave'
                : selectedInnerTab === 1
                ? 'Blooming'
                : selectedInnerTab === 2
                ? 'Rush'
                : 'Bull-Run'
            )
          );
    });
  }, [selectedInnerTab, packagesData, category]);

  useEffect(() => {
    const fetchData = async () => {
      if (plainId) {
        try {
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

          const applicableNames = categoryFilters[category] || [];
          const filteredData = sortedData.filter((pkg) =>
            applicableNames.includes(pkg.portfolioName)
          );

          setSelectedAllocation(filteredData.find((el) => el._id === plainId));
          setCreateAPlanPopup(true);
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      }
    };

    fetchData(); // Call the async function
  }, [plainId, category]);

  const handleViewAllocation = (allocationData) => {
    setSelectedAllocation(allocationData);
    setAllocationPopup(true);
  };

  const handleClickBuyPlan = (allocationData) => {
    setSelectedAllocation(allocationData);
    setCreateAPlanPopup(true);
    const params = new URLSearchParams(search);
    params.set('plan_id', allocationData._id);
    navigate({ search: params.toString() }, { replace: true });
  };

  // Dynamic Content Based on Selected Tab
  const descriptionData =
    category === 'x-Blue' ? descriptionXBlueData : descriptionxBitcoinData;

  const categoryDiscription = {
    0: 'A stable crypto option with moderate volatility and consistent returns.',
    1: 'A package with 60% Bitcoin and 40% altcoins, balancing stability with growth potential.',
  };
  const handleBlueCard = (planName = 'ripple') => {
    setSelectedCategory('x-Blue');
    if (isWebinarUser) {
      setDemoPopupOpen1(false);
      setPlanDetailPopupOpen(true);
      // ✅ Scroll to "Get to know Smart Crypto" section
      setTimeout(() => {
        const section = document.getElementById('get-to-know');
        if (section) {
          section.scrollIntoView();
        }
      }, 300);
    } else {
      setPlanDetailPopupOpen(true);
    }
    setSelectedPlanName(planName);
  };

  const handleYellowCard = (planName = 'blooming') => {
    setSelectedCategory('x-Bitcoin');
    if (isWebinarUser) {
      setDemoPopupOpen1(false);
      setPlanDetailPopupOpen(true);
      // ✅ Scroll to "Get to know Smart Crypto" section
      setTimeout(() => {
        const section = document.getElementById('get-to-know');
        if (section) {
          section.scrollIntoView();
        }
      }, 300);
    } else {
      setPlanDetailPopupOpen(true);
    }
    setSelectedPlanName(planName);
  };

  useEffect(() => {
    if (idValue === 'get-to-know') {
      const element = document.getElementById('get-to-know');
      element.scrollIntoView();
    }
  }, [idValue]);
  return (
    <>
      <div className={classes.Container}>
        <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
        <div className={classes.contentContainer}>
          <div className={classes.smartCryptoContainer}>
            <img src={smartCryptoLogo} />
            <div>
              <h3 style={{ fontStyle: 'italic' }}>
                <span style={{ color: '#FBAF01 ' }}>Smart Crypto</span>
                <InfoButton page={'SmartCrypto'} />
              </h3>
              <p>Autopilot, hands-off investment vehicle</p>
            </div>
          </div>

          <div className={classes.headerText}>
            We've outperformed Bitcoin and other altcoins.
          </div>
        </div>
        <div className={classes.videoContainer}>
          <iframe
            className={classes.video}
            src="https://www.youtube.com/embed/A51sWNnCtD4?si=jLS4KKFWGeIMCqmB"
            title="Embedded YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={classes.cardRoot}>
          <h3 id="get-to-know">Get to know Smart Crypto</h3>
          <p>
            Indexx Smart crypto is an AI self driving, hands off Vehicle of
            future money investment, taking you to a successful crypto paradise.
            We offer two exclusive investment options: x-Blue and x-Bitcoin,
            both carefully crafted to boost your portfolio’s performance. Choose
            one and watch your investment grow{' '}
          </p>
          <div className={classes.cardContainer}>
            <div className={classes.card}>
              <div className={classes.imgContainer}>
                <img src={xBitcoinIconUpdated} />
                {/* <span>x-Blue</span> */}
              </div>
              <p>
                With over 80% altcoins and less than 20% Bitcoin, this offers a
                diverse range of cryptocurrencies for your investment, allowing
                you to stay in tune with the heartbeat of the crypto industry.
              </p>

              <div className={classes.smallCardContainer}>
                <div
                  className={`${classes.smallCard} ${classes.blueSmCardHover}`}
                  onClick={() => handleBlueCard('ripple')}
                >
                  <img src={ripple} />
                  <span>Ripple</span>
                </div>

                <div
                  className={`${classes.smallCard} ${classes.blueSmCardHover}`}
                  onClick={() => handleBlueCard('surge')}
                >
                  <img src={surge} />
                  <span>Surge</span>
                </div>

                <div
                  className={`${classes.smallCard} ${classes.blueSmCardHover}`}
                  onClick={() => handleBlueCard('wave')}
                >
                  <img src={wave} />
                  <span>Wave</span>
                </div>
              </div>

              <div
                className={classes.plusContainer}
                onClick={() => handleBlueCard()}
              >
                <img src={plusIcon} />
              </div>
            </div>

            <div className={classes.card}>
              <div className={classes.imgContainer}>
                <img src={xBlueIconUpdated} />
              </div>
              <p>
                A portfolio consisting of 60% Bitcoin and 40% altcoins offers a
                balanced approach, combining the stability of Bitcoin with the
                growth potential of altcoins.
              </p>

              <div className={classes.smallCardContainer}>
                <div
                  className={`${classes.smallCard} ${classes.yellowSmCardHover}`}
                  onClick={() => handleYellowCard('blooming')}
                >
                  <img src={bloomingIcon} />
                  <span>Blooming</span>
                </div>

                <div
                  className={`${classes.smallCard} ${classes.yellowSmCardHover}`}
                  onClick={() => handleYellowCard('rush')}
                >
                  <img src={rushIcon} />
                  <span>Rush</span>
                </div>

                <div
                  className={`${classes.smallCard} ${classes.yellowSmCardHover}`}
                  onClick={() => handleYellowCard('bull-run')}
                >
                  <img src={bullRunIcon} />
                  <span>Bull-Run</span>
                </div>
              </div>

              <div
                className={classes.plusContainer}
                onClick={() => handleYellowCard()}
              >
                <img src={plusIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.testimonialRoot}>
          <h3 id="get-to-know">Hear it from the investors</h3>
          <p>
            Hear the success stories of investors who achieved their goals with
            Indexx Smart Crypto. Discover how our AI-driven platform has
            transformed their investments into profitable journeys.
          </p>
          <div style={{ maxWidth: '1200px', margin: 'auto' }}>
            <div className={classes.videoContainer}>
              <iframe
                className={classes.video}
                src="https://www.youtube.com/embed/aPrWpQgKvRQ?si=SXZbK7oGc22fTrx5"
                title="Embedded YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3
              style={{
                fontSize: '46px',
                textAlign: 'center',
                marginBottom: '150px',
              }}
            >
              Tony Banks
            </h3>
            <div className={classes.videoContainer}>
              <iframe
                className={classes.video}
                src="https://www.youtube.com/embed/nQkR9Rccu6U?si=U71I1-8Z29BRinkI"
                title="Embedded YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3
              style={{
                fontSize: '46px',
                textAlign: 'center',
              }}
            >
              Rod Fowler
            </h3>
          </div>
        </div>
        <div className={classes.faqContainer}>
          <h3>FAQ</h3>
          <AccordionExpandDefault />
        </div>
        <div className={classes.disclaimerContainer}>
          <h3>Note</h3>
          <p>
            Let’s talk about how Smart Crypto is structured to ensure both
            transparency and value for our investors. We’ve built a simple and
            fair system that supports your investment journey:
          </p>
          <p>
            1. One-Time Setup Fee:
            <br />
            To set up your portfolio and align it with your chosen package,
            there’s a small, one-time setup fee of $150. This covers the initial
            costs of creating and customizing a portfolio tailored to your risk
            preferences and financial goals.
          </p>
          <p>
            2. Transaction Fee:
            <br /> To ensure your portfolio is actively monitored and adjusted
            to align with market conditions, we charge a 3% Transaction fee.
            This allows us to continuously optimize your investments with our AI
            and expert team.
          </p>
          <p>
            3. Profit-Based Success Fee:
            <br /> Here’s where we align our success with yours. We charge a 15%
            performance fee only when your portfolio generates a profit. And if
            your portfolio doesn’t make money? We don’t charge this fee. This
            ensures we’re fully committed to maximizing your returns.{' '}
          </p>

          <p>
            4. Portfolio Flexibility:
            <br /> Your money is always accessible. You can withdraw your
            principal and profits at any time—no penalties, no restrictions.
            Your funds remain under your control.
          </p>
          <p>
            This structure keeps everything clear, fair, and focused on helping
            you succeed in the ever-changing crypto market. Our goal is to
            ensure that every step of your investment journey is aligned with
            your goals and maximizes your potential.
          </p>
        </div>
        {planDetailPopupOpen && (
          <DetailPopup
            category={selectedCategory}
            onClose={() => setPlanDetailPopupOpen(false)}
            planName={selectedPlanName}
            isWebinarUser={isWebinarUser}
            isFreeTrialUpgrade={isFreeTrialUpgrade}
          />
        )}
        {congratulationsPopup && !demoPopupOpen3 && (
          <CongratulationsPopup
            onClose={() => setCongratulationsPopup(false)}
            category={'x-Bitcoin'}
            userSellPlanReformed={userSellPlanReformed}
            userSellPlan={userSellPlan}
            orderData={orderData}
          />
        )}
        {failedPopup && (
          <ProcessingFailedPopup
            onClose={() => setFailedPopup(false)}
            category={'x-Bitcoin'}
          />
        )}
        {/* Show DemoInvestmentPopup only for Webinar Users */}
        {isWebinarUser && demoPopupOpen && (
          <DemoInvestmentPopup
            onClose={closeDemoPopup}
            isWebinarUser={isWebinarUser}
          />
        )}

        {/* You can enable other demo popups similarly */}
        {/* Show DemoInvestmentPopup1 when first popup closes */}
        {isWebinarUser && demoPopupOpen1 && (
          <DemoInvestmentPopup1
            onClose={() => {
              setDemoPopupOpen1(false);
              setDemoPopupOpen(false);
            }}
            isWebinarUser={isWebinarUser}
          />
        )}

        {demoPopupOpen3 && (
          <DemoInvestmentPopup3
            isWebinarUser={isWebinarUser}
            onClose={() => setDemoPopupOpen3(false)}
          />
        )}
        {/* <PlanDetails /> */}
      </div>
    </>
  );
};

export default SmartCrypto;
