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
import { useParams } from 'react-router-dom';

import { getSmartCryptoPackages } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import initialTokens from '../../../utils/Tokens.json';
import AllocationPopup from './AllocationPopup';
import CreateAPlanPopup from './CreateAPlan';
import CreateOwnPlan from './CreateOwnPlan';
import IconicHeader from '../shared/IconicHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1280px',
    width: '100%',
    padding: '20px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '100px 0px',
  },
  headerIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    marginBottom: '20px',
    alignItems: 'center',
    '& img': {
      height: '70px',
    },
    '& p': {
      fontSize: '24px',
      fontWeight: '500',
      fontStyle: 'italic',
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
    gap: '10px',
    '& img': {
      height: '120px',
    },
    '& h2': {
      fontSize: '52px',
      fontWeight: '500',
      margin: 0,
    },
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
}));

const PlanDetails = () => {
  const classes = useStyles();
  const { name } = useParams();
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

  useEffect(() => {
    let getRequiredCoin = initialTokens.filter(
      (x) => x.commonToken === true && x.isStock === false && x.isETF === false
    );
    setAllTokens(getRequiredCoin);
  }, []);

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

  return (
    <div className={classes.root}>
      <div style={{ margin: '100px auto' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={classes.header}>
        <div className={classes.headerIconContainer}>
          <img src={category === 'x-Bitcoin' ? xBitcoinIcon : xBlueIcon} />
          <p>{category === 'x-Bitcoin' ? 'x-Bitcoin' : 'x-Blue'}</p>
        </div>
        <div className={classes.flexContainer1}>
          <img src={details?.logo} alt="" />
          <h2>{details?.name}</h2>
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
                <div>
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
    </div>
  );
};

export default PlanDetails;
