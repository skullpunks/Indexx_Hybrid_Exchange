import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { Line } from 'react-chartjs-2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '24px 32px',
    background: 'transparent',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  header: {
    marginBottom: '20px',
    '& .goBack': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.primary,
      fontSize: '14px',
      cursor: 'pointer',
      textDecoration: 'none',
      marginBottom: '24px',
      width: 'fit-content',
      '& svg': {
        fontSize: '20px',
        marginRight: '4px',
      },
    },
    '& h1': {
      color: theme.palette.text.primary,
      fontSize: '20px',
      fontWeight: 500,
      margin: 0,
      width: '100%',
    },
  },
  statLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
    '& .label': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
    },
    '& .icon': {
      padding: '4px',
      marginLeft: '8px',
      '& svg': {
        fontSize: '16px',
      },
    },
  },
  statsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '24px',
    },
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '20px',
    padding: '24px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      marginBottom: '24px',
    },
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '16px',
    },
  },
  statItem: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .label': {
      color: theme.palette.text.secondary,
      fontSize: '14px',
      marginBottom: '8px',
      display: 'inline-block',
      marginRight: '8px',
    },
    '& .value': {
      color: theme.palette.text.primary,
      fontSize: '24px',
      fontWeight: 500,
      letterSpacing: '0.2px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },
    '& .icon': {
      padding: '4px',
      verticalAlign: 'middle',
      '& svg': {
        fontSize: '16px',
      },
    },
  },
  chartSection: {
    background: 'transparent',
    borderRadius: '8px',
    padding: '24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  pnlInfo: {
    marginBottom: '32px',
    '& .pnlRow': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
    },
    '& .label': {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginBottom: '4px',
    },
    '& .value': {
      fontSize: '16px',
      fontWeight: 500,
    },
    '& .positive': {
      color: '#11BE6A',
    },
    '& .negative': {
      color: '#FF4D4F',
    },
  },
  timeButtons: {
    display: 'flex',
    gap: '6px',
    alignSelf: 'flex-end',
    marginBottom: '16px',
    '& button': {
      background: 'transparent',
      border: 'none',
      color: theme.palette.text.primary,
      padding: '4px 8px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      minWidth: '42px',
      transition: 'background 0.2s',
      '&:hover': {
        background: theme.palette.action.selected,
      },
      '&.active': {
        background: theme.palette.action.selected,
        color: theme.palette.text.primary,
      },
    },
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'stretch',
      '& button': {
        flex: 1,
      },
    },
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'space-between',
      '& button': {
        flex: 1,
      },
    },
    '& button': {
      background: theme.palette.action.hover,
      border: 'none',
      color: theme.palette.text.primary,
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background 0.2s',
      '&:hover': {
        background: theme.palette.action.selected,
      },
    },
  },
  pnlValue: {
    fontSize: '16px !important',
    fontWeight: 500,
    display: 'block',
    marginBottom: '8px',
  },
  pnlSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '32px',
  },
  pnlItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .label': {
      color: theme.palette.text.secondary,
      fontSize: '13px',
      width: '100px',
    },
    '& .value': {
      fontSize: '13px',
      fontWeight: 500,
    },
    '& .percentage': {
      fontSize: '13px',
      fontWeight: 400,
    },
    '& .positive': {
      color: '#11BE6A',
    },
    '& .negative': {
      color: '#FF4D4F',
    },
  },
  contentBox: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    padding: '24px',
    background: 'transparent',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 12px',
    },
  },
}));

const timeframeData = {
  '1D': {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    data: Array.from({ length: 24 }, () => Math.random() * 1000 + 26000),
  },
  '1W': {
    labels: Array.from(
      { length: 7 },
      (_, i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
    ),
    data: Array.from({ length: 7 }, () => Math.random() * 2000 + 25500),
  },
  '1M': {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    data: Array.from({ length: 30 }, () => Math.random() * 3000 + 25000),
  },
  '3M': {
    labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
    data: Array.from({ length: 12 }, () => Math.random() * 4000 + 24500),
  },
  '6M': {
    labels: Array.from({ length: 24 }, (_, i) => `Week ${i + 1}`),
    data: Array.from({ length: 24 }, () => Math.random() * 5000 + 24000),
  },
};

const PerformancePage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [timeframe, setTimeframe] = useState('1D');
  const [visibleStats, setVisibleStats] = useState({
    estimatedBalance: true,
    stakedBalance: true,
    totalBalance: true,
    investmentAmount: true,
  });

  const toggleVisibility = (stat: keyof typeof visibleStats) => {
    setVisibleStats((prev) => ({
      ...prev,
      [stat]: !prev[stat],
    }));
  };

  const formatValue = (value: keyof typeof visibleStats) => {
    return visibleStats[value] ? '$26,368,964.19' : '***********';
  };

  const getChartData = (period: string) => ({
    labels: timeframeData[period].labels,
    datasets: [
      {
        data: timeframeData[period].data,
        borderColor: '#FFB300',
        borderWidth: 2,
        tension: 0.4,
        fill: {
          target: 'origin',
          above: 'rgba(255, 179, 0, 0.1)',
        },
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        padding: 12,
        displayColors: false,
        borderColor: theme.palette.divider,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme.palette.text.secondary },
      },
      y: {
        grid: {
          color: theme.palette.divider,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const getPnLClasses = (value: number) => {
    return value >= 0 ? 'positive' : 'negative';
  };

  return (
    <Box className={classes.container} style={{ marginTop: '80px' }}>
      <Box className={classes.header}>
        <a className="goBack" onClick={() => window.history.back()}>
          <ArrowBackIcon /> Go Back
        </a>
        <h1>Performance History</h1>
      </Box>

      <Box className={classes.contentBox}>
        <Box className={classes.statsHeader}>
          <Box className={classes.statsContainer}>
            <Box className={classes.statsRow}>
              <div className={classes.statItem}>
                <span className="label">Estimated Balance</span>
                {visibleStats.estimatedBalance ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('estimatedBalance')}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('estimatedBalance')}
                  />
                )}
                <div className="value">{formatValue('estimatedBalance')}</div>
              </div>
              <div className={classes.statItem}>
                <span className="label">Staked Balance</span>
                {visibleStats.stakedBalance ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('stakedBalance')}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('stakedBalance')}
                  />
                )}
                <div className="value">{formatValue('stakedBalance')}</div>
              </div>
            </Box>

            <Box className={classes.statsRow}>
              <div className={classes.statItem}>
                <span className="label">Total Balance</span>
                {visibleStats.totalBalance ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('totalBalance')}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('totalBalance')}
                  />
                )}
                <div className="value">{formatValue('totalBalance')}</div>
              </div>
              <div className={classes.statItem}>
                <span className="label">Investment Amount</span>
                {visibleStats.investmentAmount ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('investmentAmount')}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => toggleVisibility('investmentAmount')}
                  />
                )}
                <div className="value">{formatValue('investmentAmount')}</div>
              </div>
            </Box>

            <Box className={classes.pnlSection}>
              <div className={classes.pnlItem}>
                <div className="label">Today's PnL:</div>
                <div className={`value ${getPnLClasses(364920.15)}`}>
                  $
                  {Math.abs(364920.15).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className={`percentage ${getPnLClasses(5.64)}`}>
                  ({Math.abs(5.64)}%)
                </div>
              </div>
              <div className={classes.pnlItem}>
                <div className="label">Portfolio PnL:</div>
                <div className={`value ${getPnLClasses(-26488904.35)}`}>
                  $
                  {Math.abs(26488904.35).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className={`percentage ${getPnLClasses(-584732.36)}`}>
                  ({Math.abs(584732.36)}%)
                </div>
              </div>
            </Box>
          </Box>

          <Box className={classes.actionButtons}>
            <button>Deposit</button>
            <button>Withdraw</button>
            <button>Transfer</button>
          </Box>
        </Box>

        <Box className={classes.chartSection}>
          <Box className={classes.timeButtons}>
            {['1D', '1W', '1M', '3M', '6M'].map((tf) => (
              <button
                key={tf}
                className={timeframe === tf ? 'active' : ''}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </Box>

          <Box height={400}>
            <Line data={getChartData(timeframe)} options={chartOptions} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformancePage;
