import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
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
import { Theme } from '@mui/material/styles';
import { getPerformanceData, type PerformanceData } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme: Theme) => ({
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

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '6M'] as const;
type TimeframeKey = (typeof TIMEFRAMES)[number];

const HIDDEN_BALANCE = '***********';

const createChartOptions = (theme: Theme) => ({
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
});

const PerformancePage = () => {
  const navigate = useNavigate();
  const theme = useTheme() as Theme;
  const classes = useStyles();

  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeKey>('1D');
  const [visibleStats, setVisibleStats] = useState({
    estimatedBalance: true,
    stakedBalance: true,
    totalBalance: true,
    investmentAmount: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('No email found');
        }
        const data = await getPerformanceData(email);
        setPerformanceData(data);
      } catch (error) {
        console.error('Failed to fetch performance data:', error);
        // Set default values on error
        setPerformanceData({
          balances: {
            estimatedBalance: 0,
            stakedBalance: 0,
            totalBalance: 0,
            investmentAmount: 0,
          },
          pnl: {
            today: { value: 0, percentage: 0 },
            portfolio: { value: 0, percentage: 0 },
          },
          chartData: {
            '1D': {
              labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
              data: Array.from({ length: 24 }, () => 0),
            },
            '1W': {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              data: Array.from({ length: 7 }, () => 0),
            },
            '1M': {
              labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
              data: Array.from({ length: 30 }, () => 0),
            },
            '3M': {
              labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
              data: Array.from({ length: 12 }, () => 0),
            },
            '6M': {
              labels: Array.from({ length: 24 }, (_, i) => `Week ${i + 1}`),
              data: Array.from({ length: 24 }, () => 0),
            },
          },
        });
      }
    };

    fetchData();
  }, []);

  const chartOptions = useMemo(() => createChartOptions(theme), [theme]);

  const chartData = useMemo(
    () =>
      performanceData
        ? {
            labels: performanceData.chartData[timeframe].labels,
            datasets: [
              {
                data: performanceData.chartData[timeframe].data,
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
          }
        : null,
    [timeframe, performanceData]
  );

  const handleTimeframeChange = useCallback((tf: TimeframeKey) => {
    setTimeframe(tf);
  }, []);

  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  const toggleVisibility = useCallback((stat: keyof typeof visibleStats) => {
    setVisibleStats((prev) => ({
      ...prev,
      [stat]: !prev[stat],
    }));
  }, []);

  const formatValue = useCallback(
    (key: keyof typeof visibleStats) => {
      if (!performanceData) return HIDDEN_BALANCE;
      return visibleStats[key]
        ? `$${performanceData.balances[key].toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : HIDDEN_BALANCE;
    },
    [visibleStats, performanceData]
  );

  const getPnLClasses = (value: number) =>
    value >= 0 ? 'positive' : 'negative';

  return (
    <Box className={classes.container} style={{ marginTop: '80px' }}>
      <Box className={classes.header}>
        <a className="goBack" onClick={handleGoBack}>
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
                <div
                  className={`value ${getPnLClasses(
                    performanceData?.pnl.today.value ?? 0
                  )}`}
                >
                  $
                  {Math.abs(
                    performanceData?.pnl.today.value ?? 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={`percentage ${getPnLClasses(
                    performanceData?.pnl.today.percentage ?? 0
                  )}`}
                >
                  ({Math.abs(performanceData?.pnl.today.percentage ?? 0)}%)
                </div>
              </div>

              <div className={classes.pnlItem}>
                <div className="label">Portfolio PnL:</div>
                <div
                  className={`value ${getPnLClasses(
                    performanceData?.pnl.portfolio.value ?? 0
                  )}`}
                >
                  $
                  {Math.abs(
                    performanceData?.pnl.portfolio.value ?? 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={`percentage ${getPnLClasses(
                    performanceData?.pnl.portfolio.percentage ?? 0
                  )}`}
                >
                  ({Math.abs(performanceData?.pnl.portfolio.percentage ?? 0)}%)
                </div>
              </div>
            </Box>
          </Box>

          <Box className={classes.actionButtons}>
            <button onClick={() => navigate('/deposit-crypto-select-coin')}>
              Deposit
            </button>
            <button onClick={() => navigate('/withdraw-crypto-select-coin')}>
              Withdraw
            </button>
            <button onClick={() => navigate('/indexx-exchange/send')}>
              Transfer
            </button>
          </Box>
        </Box>

        <Box className={classes.chartSection}>
          <Box className={classes.timeButtons}>
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                className={timeframe === tf ? 'active' : ''}
                onClick={() => handleTimeframeChange(tf)}
              >
                {tf}
              </button>
            ))}
          </Box>

          <Box height={400}>
            {chartData && (
              <Line data={chartData} options={chartOptions as any} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformancePage;
