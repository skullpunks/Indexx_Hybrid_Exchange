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
    justifyContent: 'center',
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
}));

const SmartCrypto = () => {
  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
  const [selectedInnerTab, setSelectedInnerTab] = useState(0);
  const [allocationPopop, setAllocationPopup] = useState(false);
  const [createAPlanPopop, setCreateAPlanPopup] = useState(false);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const descriptionData = [
    { name: '', description: '', img: '' },
    {
      name: 'Ripple Plan',
      img: ripple,
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
    },
    {
      name: 'Surge Plan',
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
      img: surge,
    },
    {
      name: 'Wave Plan',
      img: wave,
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
    },
  ];
  const classes = useStyles();
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSmartCryptoPackages();
        // Sort by subTitle (assuming subTitle is a string)
        const sortedData = (response.data || []).sort((a, b) =>
          a.subTitle.localeCompare(b.subTitle)
        );

        setPackagesData(sortedData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPackages(
      selectedInnerTab === 0
        ? packagesData
        : packagesData.filter((pkg) =>
            pkg.portfolioName.includes(
              selectedInnerTab === 1
                ? 'Ripple'
                : selectedInnerTab === 2
                ? 'Surge'
                : 'Wave'
            )
          )
    );
  }, [selectedInnerTab]);

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

  // Dynamic Content Based on Selected Tab

  return (
    <>
      <div className={classes.Container}>
        <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
        <div className={classes.contentContainer}>
          <div>
            <div>
              <h3>Smart Crypto</h3>
            </div>
            <p>#Start growing your assets on Smart Crypto</p>
          </div>

          <div>
            <SmartCryptoTabs
              setSelectedInnerTab={setSelectedInnerTab}
              selectedInnerTab={selectedInnerTab}
            />
          </div>

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

          <div className={classes.cardWrapper}>
            {loading ? (
              <p>Loading...</p>
            ) : filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <div key={pkg._id} className={classes.cardContainer}>
                  <h3>
                    {pkg.portfolioName} ({pkg?.subTitle})
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
                      onClick={() => setAllocationPopup(true)}
                    />
                    <GenericButton
                      text="Create a Plan"
                      className={classes.yellowButton}
                      onClick={() => setCreateAPlanPopup(true)}
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
      {allocationPopop && (
        <AllocationPopup onClose={() => setAllocationPopup(false)} />
      )}

      {createAPlanPopop && (
        <CreateAPlanPopup onClose={() => setCreateAPlanPopup(false)} />
      )}
    </>
  );
};

export default SmartCrypto;
