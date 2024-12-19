import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';

import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';

import { Avatar, AvatarGroup } from '@mui/material';
import GenericButton from '../shared/Button';
import { useNavigate, useParams } from 'react-router-dom';

import { getSmartCryptoPackages } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import initialTokens from '../../../utils/Tokens.json';
import AllocationPopup from './AllocationPopup';
import CreateAPlanPopup from './CreateAPlan';
import CreateOwnPlan from './CreateOwnPlan';
import IconicHeader from '../shared/IconicHeader';
import plusIcon from '../../../assets/updated/smartCrypto/plusIcon.svg';
import DetailPopup from './DetailPopup';
import xBlueBg from '../../../assets/updated/smartCrypto/x-bluebg.png';
import xBitcoinBg from '../../../assets/updated/smartCrypto/x-Bitcoinbg.png';
import PlanIconicHeader from '../Assets/PlanIconicHeader';
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: '1280px',
    // width: '100%',
    margin: '0 auto',
  },
  header: {
    maxWidth: '1280px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '100px auto',
  },
  headerIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    marginBottom: '20px',
    alignItems: 'center',
    transition: 'all .3s linear',
    cursor: 'pointer',
    '& img': {
      height: '70px',
    },
    '& p': {
      fontSize: '24px',
      fontWeight: '500',
      fontStyle: 'italic',
    },
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .3s linear',
    },
  },
  cardWrapper: {
    maxWidth: '1280px',
    width: '100%',
    display: 'flex',
    margin: 'auto',
    justifyContent: 'flex-start',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
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
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexContainer1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    transition: 'all .2s linear',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.15)',
    },
    '& img': {
      height: '60px',
    },
    '& h2': {
      fontSize: '16px',
      fontWeight: '400',
      margin: 0,
    },
    margin: '0px 0px 20px 0px',
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
  cardRoot: {
    maxWidth: '1280px',
    width: '100%',
    margin: '200px auto',
    '& h3': {
      fontSize: '48px',
      marginBottom: '20px',
      fontWeight: '500',
    },
    '& p': {
      fontSize: '14px',
      marginBottom: '50px',
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
      width: '70px',
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
  cardContainerOne: {
    display: 'flex',
    justifyContent: 'center',

    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
  absoluteImg: {
    position: 'absolute',
    top: -50,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  exploreBgContainer: {
    background: theme.palette.divider,
    padding: '50px',
  },
  contentContainer: {
    maxWidth: '1280px',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    gap: '20px',
    '&>div': {
      maxWidth: '270px',
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  planCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.divider,
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
  cardDescription: {
    margin: '50px 0px',
    '& h4': {
      fontSize: '16px',
    },
  },
  flexContainertwo: {
    display: 'flex',
    gap: '100px',
    marginBottom: '10px',
  },
  activePlan: {
    transform: 'scale(1.15)',
  },
  activeBar: {
    width: '16px',
    height: '3px',
    background: 'white',
    marginTop: '10px',
  },
}));

const PlanDetails = () => {
  const classes = useStyles();
  const { name: names } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [details, setDetails] = useState({});
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [allocationPopop, setAllocationPopup] = useState(false);
  const [createAPlanPopop, setCreateAPlanPopup] = useState(false);
  const [allTokens, setAllTokens] = useState([]);
  const [createOwnPlan, setCreateOwnPlan] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
  const [selectedCategory, setSelectedCategory] = useState();
  const [planDetailPopupOpen, setPlanDetailPopupOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');
  const [selectedPlanTab, setSelectedPlanTab] = useState(0);
  const [name, setName] = useState(names);

  const xBluePlan = [
    {
      img: ripple,
      name: 'Ripple',
    },
    {
      img: surge,
      name: 'Surge',
    },
    {
      img: wave,
      name: 'Wave',
    },
  ];

  const xBitcoinPlan = [
    {
      img: bloomingIcon,
      name: 'Blooming',
    },
    {
      img: rushIcon,
      name: 'Rush',
    },
    {
      img: bullRunIcon,
      name: 'Bull Run',
    },
  ];

  const selectedPlan = category === 'x-Blue' ? xBluePlan : xBitcoinPlan;

  useEffect(() => {
    if (selectedPlanTab) {
      setCategory('x-Bitcoin');
      setName('blooming');
    } else {
      setCategory('x-Blue');
      setName('ripple');
    }
  }, [selectedPlanTab]);
  useEffect(() => {
    let getRequiredCoin = initialTokens.filter(
      (x) => x.commonToken === true && x.isStock === false && x.isETF === false
    );
    setAllTokens(getRequiredCoin);
  }, []);

  useEffect(() => {
    console.log(name, 'name');
    if (name === 'blooming') {
      setCategory('x-Bitcoin');
      setDetails({
        name: 'Blooming',
        logo: bloomingIcon,
        description: ' Optimized for low volatility and steady performance.',
      });
    } else if (name === 'rush') {
      setCategory('x-Bitcoin');
      setDetails({
        name: 'Rush',
        logo: rushIcon,
        description: ' Moderate volatility, consistent returns.',
      });
    } else if (name === 'bull run') {
      setCategory('x-Bitcoin');
      setDetails({
        name: 'Bull-Run',
        logo: bullRunIcon,
        description: ' High volatility, high potential returns.',
      });
    } else if (name === 'ripple') {
      setCategory('x-Blue');
      setDetails({
        name: 'Ripple',
        logo: ripple,
        description: '  Designed for stability and stable returns.',
      });
    } else if (name === 'surge') {
      setCategory('x-Blue');
      setDetails({
        name: 'Surge',
        logo: surge,
        description: '  Moderate volatility, consistent returns.',
      });
    } else if (name === 'wave') {
      setCategory('x-Blue');
      setDetails({
        name: 'Wave',
        logo: wave,
        description: '   High volatility, high rewards.',
      });
    }

    setPlanDetailPopupOpen(false);
  }, [name]);

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
  }, [category, name]);

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
      console.log(details?.name, 'applicablenames');
      // Filter with partial matches
      const filteredByCategory = packagesData.filter((pkg) =>
        applicableNames.some((name) =>
          pkg.portfolioName.toLowerCase().includes(name.toLowerCase())
        )
      );

      // Filtering logic based on selectedInnerTab
      return filteredByCategory.filter((pkg) =>
        pkg.portfolioName.includes(details?.name)
      );
    });
  }, [details, packagesData, category, name]);

  const handleViewAllocation = (allocationData) => {
    setSelectedAllocation(allocationData);
    setAllocationPopup(true);
  };

  const handleClickBuyPlan = (allocationData) => {
    setSelectedAllocation(allocationData);
    setCreateAPlanPopup(true);
    // const params = new URLSearchParams(search);
    // params.set('plan_id', allocationData._id);
    // navigate({ search: params.toString() }, { replace: true });
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBlueCard = (planName = 'ripple') => {
    setSelectedCategory('x-Blue');
    setPlanDetailPopupOpen(true);
    setSelectedPlanName(planName);
  };

  const handleYellowCard = (planName = 'blooming') => {
    setSelectedCategory('x-Bitcoin');
    setPlanDetailPopupOpen(true);
    setSelectedPlanName(planName);
  };

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

  const handleHeader = () => {
    navigate(`/smart-crypto?id=get-to-know`);
  };

  const planDetails =
    category === 'x-Blue' ? xBlueplanDetails : xBitcoinplanDetails;
  return (
    <div className={classes.root}>
      <div style={{ margin: '100px auto' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={classes.header}>
        {/* <div className={classes.headerIconContainer} onClick={handleHeader}>
          <img src={category === 'x-Bitcoin' ? xBitcoinIcon : xBlueIcon} />
          <p>{category === 'x-Bitcoin' ? 'x-Bitcoin' : 'x-Blue'}</p>
        </div> */}
        <PlanIconicHeader
          selectedPlanTab={selectedPlanTab}
          setSelectedPlanTab={setSelectedPlanTab}
          largeFont={true}
        />

        <div className={classes.flexContainertwo}>
          {selectedPlan.map((curr) => (
            <div
              className={`${classes.flexContainer1} ${
                name === curr.name.toLowerCase() && classes.activePlan
              }`}
              onClick={() => setName(curr.name.toLowerCase())}
            >
              <img src={curr?.img} alt="" />
              <h2>{curr?.name}</h2>
              {name === curr.name.toLowerCase() && (
                <div className={classes.activeBar}></div>
              )}
            </div>
          ))}
        </div>

        <p>{details?.description}</p>
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
              <p>{pkg.description}</p>
              <div className={classes.flexContainer}>
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
                <p>dsdd sjdsjns jdjfjsjf jdfdsfdsjf sdjfjdsjf skdfsnf</p>
              </div>
              <div className={classes.buttonContainer}>
                <GenericButton
                  text="View Allocation"
                  className={classes.greyButton}
                  onClick={() => handleViewAllocation(pkg)}
                />
                <GenericButton
                  text="Start Plan"
                  className={
                    category === 'x-Blue'
                      ? classes.blueButton
                      : classes.yellowButton
                  }
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
          <div className={classes.flexContainer}>
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
            <p>dsdd sjdsjns jdjfjsjf jdfdsfdsjf sdjfjdsjf skdfsnf</p>
          </div>
          <div className={classes.buttonContainer}>
            <GenericButton
              text="Create your own plan!"
              className={
                category === 'x-Blue'
                  ? classes.blueButton
                  : classes.yellowButton
              }
              onClick={() => setCreateOwnPlan(true)}
            />
          </div>
        </div>
      </div>

      {/* <div className={classes.exploreContainer}>
        <h3>Explore {category}</h3>
        <div className={classes.absoluteImg}>
          <img src={category === 'x-Blue' ? xBlueBg : xBitcoinBg} alt="" />
        </div>
        <div className={classes.exploreBgContainer}>
          <div className={classes.contentContainer}>
            {planDetails.map((curr) => (
              <div className={classes.planCardRoot}>
                <img src={curr.image} />
                <h4>{curr.name}</h4>
                <p>{curr.description}</p>
                <GenericButton
                  text="View Package"
                  className={
                    category === 'x-Blue'
                      ? classes.blueButton
                      : classes.yellowButton
                  }
                  onClick={() => {
                    navigate(curr.path);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.cardRoot}>
        <h3>Get to know Smart Crypto</h3>
        <p>We offers two exclusive strategies, x-Blue, x-Bitcoin </p>
        <div className={classes.cardContainerOne}>
          <div className={classes.card}>
            <div className={classes.imgContainer}>
              <img src={xBlueIcon} />
              <span>x-Blue</span>
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
              <img src={xBitcoinIcon} />
              <span>x-Bitcoin</span>
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
      </div> */}

      {allocationPopop && (
        <AllocationPopup
          onClose={() => setAllocationPopup(false)}
          category={category}
          allocationData={selectedAllocation}
          onStartPopup={(pkg) => handleClickBuyPlan(pkg)}
        />
      )}

      {createAPlanPopop && (
        <CreateAPlanPopup
          onClose={() => setCreateAPlanPopup(false)}
          category={category}
          allocationData={selectedAllocation}
        />
      )}
      {createOwnPlan && (
        <CreateOwnPlan
          onClose={() => setCreateOwnPlan(false)}
          category={category}
          filteredTokens={allTokens}
        />
      )}
      {planDetailPopupOpen && (
        <DetailPopup
          category={selectedCategory}
          onClose={() => setPlanDetailPopupOpen(false)}
          planName={selectedPlanName}
        />
      )}
    </div>
  );
};

export default PlanDetails;
