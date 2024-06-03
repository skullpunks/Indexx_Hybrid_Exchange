import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTheme } from '@mui/material/styles';

const TradingViewChart = ({ data }) => {
  const chartContainerRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: {
          type: ColorType.Solid,
          color: theme.palette.background.default,
        },
        textColor: theme.palette.text.primary,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: theme.palette.divider,
        },
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(0, 255, 0, 0.5)',
      bottomColor: 'rgba(0, 255, 0, 0.1)',
      lineColor: 'rgba(0, 255, 0, 1)',
    });

    areaSeries.setData(data);

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [data, theme]);

  return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};

export default TradingViewChart;
