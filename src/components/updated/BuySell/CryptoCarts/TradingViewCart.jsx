import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useTheme } from '@mui/material/styles';

const TradingViewChart = ({ data, days }) => {
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
      timeScale: {
        rightOffset: 0,
        barSpacing: days === 1 ? 15 : 3,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        timeVisible: true,
        secondsVisible: days === 1,
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(0, 255, 0, 0.5)',
      bottomColor: 'rgba(0, 255, 0, 0.1)',
      lineColor: 'rgba(0, 255, 0, 1)',
    });

    areaSeries.setData(data);

    if (days === 1) {
      chart.applyOptions({
        timeScale: {
          tickMarkFormatter: (time) => {
            const date = new Date(time * 1000);
            return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          },
        },
      });
    } else {
      chart.timeScale().fitContent();
    }

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [data, days, theme]);

  return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};

export default TradingViewChart;
