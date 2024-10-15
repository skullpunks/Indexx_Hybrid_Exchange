import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import in500 from '../../../assets/token-icons/IN500_logo.png';
import inxc from '../../../assets/token-icons/INXC_logo.png';
import iusdp from '../../../assets/token-icons/IUSDP_logo.png';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  greenText: {
    color: `${theme.palette.success.main} !important`,
  },
  redText: {
    color: `${theme.palette.error.main} !important`,
  },
  hoverRow: {
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
}));

// Dummy data for Name, Price, and Change columns
const dummyRecords = [
  {
    id: '1',
    name: 'INEX',
    price: 50,
    change: 2.5,
  },
  {
    id: '2',
    name: 'IN500',
    price: 10,
    change: -1.2,
  },
  {
    id: '3',
    name: 'INXC',
    price: 25,
    change: 0.8,
  },
  {
    id: '4',
    name: 'IUSD+',
    price: 1,
    change: 0.0,
  },
];

// Function to get the coin's image
const getImage = (image) => {
  try {
    if (image === 'INEX') {
      return Inex;
    } else if (image === 'IN500') {
      return in500;
    } else if (image === 'INXC') {
      return inxc;
    } else if (image === 'IUSD+') {
      return iusdp;
    } else {
      return require(`../../../assets/token-icons/${image}.png`).default;
    }
  } catch (error) {
    return Inex;
  }
};

export default function EnhancedTable({ searchQuery, hideAssets }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching by using dummy records
    setLoading(true);
    setRows(dummyRecords);
    setLoading(false);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearchQuery = row.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesSearchQuery;
    });
  }, [rows, searchQuery]);

  const handleRowClick = (row) => {
    console.log(`Row clicked: ${row.name}`);
    window.location.href = '/indexx-exchange/trading-view/BTC';
    // Add your click functionality here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-labelledby="tableTitle">
          {/* Table Headings */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none !important' }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                Price
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                Change
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={classes.hoverRow}
                role="checkbox"
                tabIndex={-1}
                sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  sx={{ borderBottom: 'none !important' }}
                >
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      //   paddingLeft: 0,
                      '&:hover': {
                        background: 'transparent !important',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Avatar alt={`${row.name}`} src={getImage(row.name)} />
                      </Avatar>
                    </ListItemAvatar>
                    {row.name}
                  </ListItem>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: 'none !important' }}
                >
                  ${row.price}
                </TableCell>
                <TableCell
                  align="right"
                  className={
                    row.change >= 0 ? classes.greenText : classes.redText
                  }
                  sx={{ borderBottom: 'none !important' }}
                >
                  {row.change >= 0 ? `+${row.change}%` : `${row.change}%`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  hideAssets: PropTypes.bool.isRequired,
};
