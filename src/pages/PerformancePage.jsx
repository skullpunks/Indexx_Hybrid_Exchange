import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1380px',
    width: '100%',
    padding: '24px',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      padding: '16px',
    },
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '64px',
    marginTop: '32px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gap: '32px',
      justifyItems: 'center',
    },
  },
  statItem: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  statLabel: {
    fontSize: '14px !important',
    color: theme.palette.text.secondary,
    marginBottom: '8px !important',
  },
  statValue: {
    fontSize: '28px !important',
    fontWeight: '600 !important',
    color: theme.palette.text.primary,
  },
  positiveValue: {
    color: '#11BE6A !important',
  },
  negativeValue: {
    color: '#FF4D4F !important',
  },
}));

const PerformancePage = () => {
  const classes = useStyles();
  const theme = useTheme();

  // Mock data - replace with actual data later
  const performanceData = {
    estimatedBalance: 25430.5,
    todayPnL: 345.2,
    thirtyDayPnL: -123.45,
  };

  return (
    <Box className={classes.container} style={{ marginTop: '50px' }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: '16px',
        }}
      >
        Profit and Loss Analysis
      </Typography>

      <Box className={classes.statsContainer}>
        {/* Estimated Balance */}
        <Box className={classes.statItem}>
          <Typography className={classes.statLabel}>
            Estimated Balance
          </Typography>
          <Typography className={classes.statValue}>
            $
            {performanceData.estimatedBalance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        {/* Today's PnL */}
        <Box className={classes.statItem}>
          <Typography className={classes.statLabel}>Today's PnL</Typography>
          <Typography
            className={`${classes.statValue} ${
              performanceData.todayPnL >= 0
                ? classes.positiveValue
                : classes.negativeValue
            }`}
          >
            {performanceData.todayPnL >= 0 ? '+' : ''}$
            {Math.abs(performanceData.todayPnL).toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        {/* 30 Days PnL */}
        <Box className={classes.statItem}>
          <Typography className={classes.statLabel}>30 Days PnL</Typography>
          <Typography
            className={`${classes.statValue} ${
              performanceData.thirtyDayPnL >= 0
                ? classes.positiveValue
                : classes.negativeValue
            }`}
          >
            {performanceData.thirtyDayPnL >= 0 ? '+' : '-'}$
            {Math.abs(performanceData.thirtyDayPnL).toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformancePage;
