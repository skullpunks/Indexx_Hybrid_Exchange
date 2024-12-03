import React, { useEffect, useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
import { makeStyles } from '@mui/styles';
import SmartCryptoTabs from './IconicHeader';

import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import GenericButton from '../shared/Button';
import { getSmartCryptoPackages } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import AllocationPopup from './AllocationPopup';
import CreateAPlanPopup from './CreateAPlan';
import CustomSelectBox from './CustomSelectBox';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';
import AccordionExpandDefault from './Accordion';
import smartCryptoLogo from '../../../assets/updated/smartCrypto/smartCryptoLogo.png';
import CategoryIconicHeader from './CategoryIconicHeader';
import CreateOwnPlan from './CreateOwnPlan';
import { useLocation, useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1248px',
    width: '100%',
    margin: '50px auto',
    padding: '24px',
  },
  contentContainer: {},
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
      fontSize: '24px',
      fontWeight: '500',
      marginBottom: '16px',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
  },
  smartCryptoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '& img': {
      height: '70px',
    },
  },
}));

const SmartCrypto = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const categoryValue = params.get('category');
  const typeValue = params.get('type');
  const plainId = params.get('plan_id');

  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
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
  const [selectedCategory, setSelectedCategory] = useState(
    categoryValue === 'x-blue' || !categoryValue ? 0 : 1
  );

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
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

        const applicableNames = categoryFilters[category] || [];
        const filteredData = sortedData.filter((pkg) =>
          applicableNames.includes(pkg.portfolioName)
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
      const filteredByCategory = packagesData.filter((pkg) =>
        applicableNames.includes(pkg.portfolioName)
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

  console.log(
    categoryDiscription[selectedCategory],
    selectedCategory,
    'categoryDiscription[selectedCategory]'
  );
  return (
    <>
      <div className={classes.Container}>
        <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
        <div className={classes.contentContainer}>
          <div className={classes.flexContainer1}>
            <div>
              <div className={classes.smartCryptoContainer}>
                <img src={smartCryptoLogo} />
                <h3>Smart Crypto</h3>
              </div>
              <p>#Start growing your assets on Smart Crypto</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '35px',
            }}
          >
            <CategoryIconicHeader
              selectedTab={selectedCategory}
              setSelectedTab={(value) => {
                setSelectedCategory(value);
                setSelectedInnerTab(0);
              }}
            />

            <p>{categoryDiscription[selectedCategory]}</p>
          </div>

          <div>
            <SmartCryptoTabs
              setSelectedInnerTab={setSelectedInnerTab}
              selectedInnerTab={selectedInnerTab}
              backgroundColor={category === 'x-Blue' ? '#07A6FC' : '#F1C232'}
              category={category}
            />
          </div>
          {selectedInnerTab !== 0 && (
            <div className={classes.descriptionWrapper}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: 0,
                  gap: '5px',
                }}
              >
                <img
                  style={{ height: '50px' }}
                  src={descriptionData[selectedInnerTab].img}
                />
                <h4>{descriptionData[selectedInnerTab].name}</h4>
              </div>

              <p>{descriptionData[selectedInnerTab].description}</p>
            </div>
          )}

          <div className={classes.cardWrapper}>
            {loading ? (
              <p>Loading...</p>
            ) : filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
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
            {/* <div className={classes.cardContainer}>
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
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
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
            </div> */}
          </div>
        </div>

        <div className={classes.faqContainer}>
          <h3>FAQ</h3>
          <AccordionExpandDefault />
        </div>
      </div>
      {allocationPopop && (
        <AllocationPopup
          onClose={() => setAllocationPopup(false)}
          category={category}
          allocationData={selectedAllocation}
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
        />
      )}
    </>
  );
};

export default SmartCrypto;
