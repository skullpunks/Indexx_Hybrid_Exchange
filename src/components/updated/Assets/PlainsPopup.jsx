import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarGroup, useTheme } from '@mui/material';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';
import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import { useNavigate } from 'react-router-dom';
import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';
import AllocationPopup from '../SmartCrypto/AllocationPopup';
import CreateAPlanPopup from '../SmartCrypto/CreateAPlan';
import { getSmartCryptoPackages } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import initialTokens from '../../../utils/Tokens.json';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .7)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '560px',
      width: '100%',
      marginTop: '50px',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
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
    maxWidth: '80%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  blueButton: {
    maxWidth: '80%',
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  coinRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '70vh',
    overflowY: 'auto',
    gap: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0px',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  coinWrapper: {
    width: '47%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imgContainer: {
    display: 'flex',
    gap: '6px',
    '& img': {
      width: '22px',
      height: '22px',
    },
    '& p': {
      fontSize: '14px',
    },
  },
  percentageText: {
    fontSize: '14px',
  },
  planName: {
    display: 'flex',
    padding: '18px',
    marginTop: '-20px',
    flexDirection: 'column',
    '& p': {
      textAlign: 'center',
    },
  },
  flexContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      height: '40px',
    },
    '& span': {
      fontSize: '24px',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  planCardContainer: {
    width: '100%',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '60vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  planCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.divider,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '20px',
    gap: '15px',
    '& img': {
      height: '200px',
      width: '200px',
      margin: 'auto',
    },
    '& h4': {
      marginTop: '-10px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    '& p': {
      marginBottom: '40px',
    },
  },
  cardContainer: {
    border:
      theme.palette.mode === 'dark'
        ? '1px solid rgb(71, 77, 87)'
        : `1px solid ${theme.palette.divider}`,
    background: theme.palette.mode === 'dark' ? theme.palette.divider : '#fff',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    margin: '0px',
    minWidth: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: '500',
      color: theme.palette.text.primary,
      margin: '0px 0px 16px',
      textAlign: 'left',
    },
  },
  buttonContainer: {
    width: '100%',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const PlainsPopup = ({
  onClose,
  plainName = 'blooming',
  setAllocationPopup,
  setCreateAPlanPopup,
  setSelectedAllocation,
  currentPlanName,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(plainName);
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [details, setDetails] = useState({});
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTokens, setAllTokens] = useState([]);
  const [createOwnPlan, setCreateOwnPlan] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
  const [selectedCategory, setSelectedCategory] = useState();
  const [planDetailPopupOpen, setPlanDetailPopupOpen] = useState(false);

  console.log(localStorage.getItem('CurrentPlan'), 'currentPlanName in popup');
  useEffect(() => {
    let getRequiredCoin = initialTokens.filter(
      (x) => x.commonToken === true && x.isStock === false && x.isETF === false
    );
    setAllTokens(getRequiredCoin);
  }, []);

  useEffect(() => {
    setName(plainName);
  }, [plainName]);

  useEffect(() => {
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
    } else if (name === 'bull-run') {
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
  }, [category]);

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
      console.log(applicableNames, 'applicablenames');
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
  }, [details, packagesData, category]);

  const handleViewAllocation = (allocationData) => {
    setSelectedAllocation(allocationData);
    setAllocationPopup(true);
    onClose();
  };

  const handleClickBuyPlan = (allocationData) => {
    setSelectedAllocation(allocationData);
    setCreateAPlanPopup(true);
    onClose();

    // const params = new URLSearchParams(search);
    // params.set('plan_id', allocationData._id);
    // navigate({ search: params.toString() }, { replace: true });
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

  const handleBlueCard = () => {
    setSelectedCategory('x-Blue');
    setPlanDetailPopupOpen(true);
  };

  const handleYellowCard = () => {
    setSelectedCategory('x-Bitcoin');
    setPlanDetailPopupOpen(true);
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

  const planDetails =
    category === 'x-Blue' ? xBlueplanDetails : xBitcoinplanDetails;
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          {/* <img src={passwordChanged} height="100px" /> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: '600' }}></div>

            <div
              onClick={onClose}
              style={{ cursor: 'pointer', padding: '18px' }}
            >
              <CloseIcon
              // color={theme.palette.text.secondary}
              // sx={{
              //   '&:hover': {
              //     color: theme.palette.text.primary,
              //   },
              // }}
              />
            </div>
          </div>

          <div className={classes.planName}>
            <div className={classes.flexContainer1}>
              <img src={details?.logo} />
              <span>{details?.name}</span>
              <p>{details?.description}</p>
            </div>
          </div>

          <div className={classes.planCardContainer}>
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
                    <div>
                      <p style={{ textAlign: 'left' }}>Assets</p>
                      <AvatarGroup max={10}>
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
                  <div className={classes.buttonContainer}>
                    <GenericButton
                      text="View Allocation"
                      className={classes.greyButton}
                      onClick={() => {
                        handleViewAllocation(pkg);
                        onClose();
                      }}
                    />
                    <GenericButton
                      text={
                        !isCurrentPlan(pkg.portfolioName, pkg?.managedBy)
                          ? 'Switch Plan'
                          : 'Current Plan'
                      }
                      className={
                        category === 'x-Blue'
                          ? classes.blueButton
                          : classes.yellowButton
                      }
                      onClick={() => {
                        handleClickBuyPlan(pkg);
                        onClose();
                      }}
                      disabled={isCurrentPlan(pkg.portfolioName, pkg?.managedBy)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No packages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlainsPopup;
