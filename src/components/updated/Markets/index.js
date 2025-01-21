import React, { useEffect, useState } from 'react';
import MarketsTable from './MarketTable';
import { makeStyles } from '@mui/styles';
import { hotTokenData, marketsData, newListingData } from '../../../services/api';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1280px',
    width: '100%',
    padding: '20px',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const Markets = () => {
  const classes = useStyles();
  const [hotTokens, setHotTokens] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch all necessary data
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const hotTokensResponse = await hotTokenData();
        console.log("hotTokensResponse", hotTokensResponse)
        setHotTokens(hotTokensResponse.data);

        const marketsResponse = await marketsData();
        console.log("marketsResponse", marketsResponse)

        setGainers(marketsResponse.topGainers);
        setLosers(marketsResponse.topLosers);
        setVolumes(marketsResponse.topVolumes);

        const newListingResponse = await newListingData();
        setNewListings(newListingResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <MarketsTable title="All Coins" data={gainers.concat(losers, volumes)} loading={loading} />
        <MarketsTable title="Hot Coins" data={hotTokens} loading={loading} />
      </div>
      <div className={classes.container}>
        <MarketsTable title="Top Gainers" data={gainers} loading={loading} />
        <MarketsTable title="Top Losers" data={losers} loading={loading} />
      </div>
      <div className={classes.container}>
        <MarketsTable title="Top Volume" data={volumes} loading={loading} />
        <MarketsTable title="New Listings" data={newListings} loading={loading} />
      </div>
    </div>
  );
};

export default Markets;
