import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { baseCEXURL, getAllStockPrice } from '../../services/api';
import './ETFComponentsTable.css';
import { useTheme } from '@emotion/react';
import { ETFData } from '../MarketAbout/ETFData';

const ETFComponentsTable = ({ symbol, data }) => {
  const [sorted, setsorted] = useState([]);
  const [allInfo, setAllInfo] = useState([]);
  // const [fdata, setFdata] = useState([]);
  // const [collData, setCollData] = useState([]);
  // const [fullData, setFullData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  console.log(sorted, 'sorted 222');

  useEffect(() => {
    const allDetails = ETFData.filter((item) => item.symbol === symbol)[0];
    // console.log(allDetails.components, 'all');
    // setAllInfo(allDetails);
    // setsorted(allDetails.components);

    if (allDetails && data?.allStockPrice) {
      const updatedComponents = allDetails.components.map(component => {
        const stockPriceInfo = data.allStockPrice.find(stock => stock.symbol === component.symbol);
        return {
          ...component,
          market_value: stockPriceInfo?.price || component.market_value,
          percentage_value: stockPriceInfo?.weightedPrice || component.percentage_value
        };
      });
      setAllInfo({ ...allDetails, components: updatedComponents });
      setsorted(updatedComponents);
    }
  }, [symbol, data]);

  console.log(sorted, 'sorted');

  // useEffect(() => {
  //     setFdata(fullData);
  // }, [fullData]);

  // useEffect(() => {
  //   if (searchText === "" || searchText === undefined) {
  //     setCollData(fdata);
  //   } else {
  //     const filteredItems = fdata.filter(item =>
  //       item.name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setCollData(filteredItems);
  //   }
  // }, [searchText, fdata]);

  // useEffect(() => {
  //   if(sort === "Name : A to Z") {
  //     const filteredItems = [...collData].sort((a,b) => (a.name).localeCompare(b.name));
  //     setsorted(filteredItems);
  //   }
  //   else if(sort === "Name : Z to A") {
  //     const filteredItems = [...collData].sort((a,b) => (b.name).localeCompare(a.name));
  //     setsorted(filteredItems);
  //   }
  //   else if(sort === "Price : High to Low") {
  //     const filteredItems = [...collData].sort((a,b) => b.value - a.value);
  //     setsorted(filteredItems);
  //   }
  //   else if(sort === "Price : Low to High") {
  //     const filteredItems = [...collData].sort((a,b) => a.value - b.value);
  //     setsorted(filteredItems);
  //   }
  //   else {
  //     setsorted(collData);
  //   }
  // }, [sort, collData])

  // useEffect(() => {
  //   // Fetch stock prices from the backend
  //   getAllStockPrice()
  //     .then(data => {
  //       if (data.status === 200) {
  //         // const updatedData = CollectionData.map(item => {
  //         //   // Find the corresponding stock price using the symbol
  //         //   const stockInfo = data.data.find(stock => stock.token === item.symbol);
  //         //   // If a matching stock price is found, update the value
  //         //   if (stockInfo) {
  //         //     return {
  //         //       ...item,
  //         //       value: stockInfo.value
  //         //     };
  //         //   }
  //         //   // Otherwise, return the original item
  //         //   return item;
  //         // });
  //         setCollData(ETFData); // Use the updated data
  //         setFullData(ETFData);
  //       } else {
  //         console.error('Failed to fetch stock prices:', data);
  //       }
  //     })
  //     .catch(err => {
  //       console.error('Error fetching stock prices:', err);
  //     });
  // }, []);

  return (
    <TableContainer className="etf_table" component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{allInfo?.column_name}</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Asset Class</TableCell>
            <TableCell>Market Value</TableCell>
            <TableCell>Weight(%)</TableCell>
            <TableCell>Percentage Value</TableCell>
            {/* <TableCell>Shares</TableCell> */}
            <TableCell>Market Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((collection) => (
            <TableRow
              key={collection.id}
              className="row-link"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <TableCell
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    gap: isMobile ? 0.8 : 2,
                  }}
                >
                  <Box
                  // width={isMobile ? '15px' : '60px'}
                  >
                    <img
                      src={collection.image}
                      alt="image"
                      style={{
                        width: `${isMobile
                          ? '15px'
                          : collection?.type.includes('Stock')
                            ? '70px'
                            : '35px'
                          }`,
                      }}
                    />
                  </Box>
                  <Box sx={{ alignSelf: 'center' }}>{collection.name}</Box>
                </Box>
              </TableCell>

              <TableCell style={{ textDecoration: 'none' }}>
                {collection.symbol}
              </TableCell>
              <TableCell style={{ textDecoration: 'none' }}>
                {collection.sector}
              </TableCell>
              <TableCell style={{ textDecoration: 'none' }}>
                {collection.asset_class}
              </TableCell>
              <TableCell style={{ textDecoration: 'none' }}>
                $ {
                  collection?.market_value < 0.0001 ?
                    <>
                      {(collection.market_value.toFixed(8))}{' '}
                      <span
                        style={{
                          fontSize: `${isMobile ? '6px' : '10px'}`,
                          opacity: '0.9',
                        }}
                      >
                        USD
                      </span>
                    </> :
                    <>
                      {collection.market_value.toFixed(2)}{' '}
                      <span
                        style={{
                          fontSize: `${isMobile ? '6px' : '10px'}`,
                          opacity: '0.9',
                        }}
                      >
                        USD
                      </span>
                    </>
                }

              </TableCell>
              <TableCell style={{ textDecoration: 'none' }}>
                {collection.percentage}%
              </TableCell>
              <TableCell style={{ textDecoration: 'none' }}>
                $ {Math.floor(collection.percentage_value * 10000) / 10000}{' '}
                <span
                  style={{
                    fontSize: `${isMobile ? '6px' : '10px'}`,
                    opacity: '0.9',
                  }}
                >
                  USD
                </span>
              </TableCell>
              {/* <TableCell style={{ textDecoration: 'none' }}>
                {collection.shares}
              </TableCell> */}
              <TableCell style={{ textDecoration: 'none' }}>
                {collection.market_currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ETFComponentsTable;
