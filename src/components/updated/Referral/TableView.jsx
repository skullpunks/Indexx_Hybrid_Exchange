import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { decodeJWT, getAllRefferedDetails } from '../../../services/api';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  greenText: {
    color: `${theme.palette.success.main} !important`,
  },
  redText: {
    color: `${theme.palette.error.main} !important`,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'rank',
    numeric: true,
    disablePadding: false,
    label: 'Rank',
  },
  {
    id: 'commission',
    numeric: true,
    disablePadding: false,
    label: 'Commission',
  },
  {
    id: 'commission_percentage',
    numeric: true,
    disablePadding: false,
    label: 'Commission Percentage',
  },
  {
    id: 'orderTotal',
    numeric: true,
    disablePadding: false,
    label: 'Order Total',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isMobile } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  if (isMobile) {
    return null; // Don't render the table header on mobile devices
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ borderBottom: 'none !important' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default function EnhancedTable() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('type');
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchReferredUsers() {
      try {
        let access_token = String(localStorage.getItem('access_token'));
        let decoded = decodeJWT(access_token);
        const response = await getAllRefferedDetails(decoded.email);
        if (response.data) {
          const users = response.data.referredUsers.map((user, index) => {
            const orders = user.orders || [];
            return {
              id: index + 1,
              type: 'User', // Assuming 'User' as the type
              name: user.email,
              date:
                orders.length > 0
                  ? new Date(orders[0].date).toLocaleDateString()
                  : 'N/A',
              rank: 'N/A', // Rank is not provided, setting as 'N/A'
              commission: orders.length > 0 ? orders[0].commission : 0,
              commission_percentage:
                orders.length > 0 ? orders[0].commission_percentage : 0,
              orderTotal: orders.length > 0 ? orders[0].total : 0,
            };
          });
          setRows(users);
        } else {
          setRows([]);
        }
      } catch (error) {
        console.error('Error fetching referred users:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReferredUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table
          sx={{ minWidth: { xs: '100%', sm: 750 } }} // Use minWidth based on screen size
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            isMobile={isMobile}
          />
          <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{ borderBottom: 'none !important' }}
                  >
                    {row.type}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: 'none !important' }}
                  >
                    {row.name}
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: 'none !important' }}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: 'none !important' }}
                      >
                        {row.rank}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: 'none !important' }}
                      >
                        {row.commission}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: 'none !important' }}
                      >
                        {row.commission_percentage}%
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: 'none !important' }}
                      >
                        {row.orderTotal}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No referral users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string,
  hideAssets: PropTypes.bool,
};
