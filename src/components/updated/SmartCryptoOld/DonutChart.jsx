import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const DonutChart = ({ portfolioData }) => {
  const theme = useTheme(); // Access the theme for dynamic styling

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        events: {
          dataPointMouseEnter: (event, chartContext, config) => {
            const label = document.querySelector(
              `#label-${config.dataPointIndex}`
            );
            if (label) {
              label.style.backgroundColor = theme.palette.action.hover; // Add hover effect on corresponding label
              label.style.borderRadius = '5px';
              label.style.padding = '5px';
            }
          },
          dataPointMouseLeave: (event, chartContext, config) => {
            const label = document.querySelector(
              `#label-${config.dataPointIndex}`
            );
            if (label) {
              label.style.backgroundColor = 'transparent'; // Reset background color
              label.style.padding = '0';
            }
          },
        },
      },
      labels: [], // Will be dynamically updated
      colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0', '#FF66C4', '#00D9E9', '#FEB100'], // Define enough colors
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'right',
            },
          },
        },
      ],
      legend: {
        position: 'right',
        formatter: (label, opts) => {
          return `<span id="label-${opts.seriesIndex}" style="cursor: pointer;">${label}</span>`;
        },
        labels: {
          colors: theme.palette.text.primary, // Legend text color based on the theme
        },
      },
      dataLabels: {
        enabled: false, // Disable values inside the donut
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false, // Disable inner text of the donut
            },
          },
          expandOnClick: false,
        },
      },
      stroke: {
        width: 0,
      },
      title: {
        text: undefined,
      },
      tooltip: {
        theme: 'dark',
      },
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.15,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (portfolioData) {
      const seriesData = portfolioData.cryptocurrencies.map(
        (crypto) => crypto.percentage
      );
      const labelData = portfolioData.cryptocurrencies.map(
        (crypto) => crypto.name
      );

      setChartData((prevData) => ({
        ...prevData,
        series: seriesData,
        options: {
          ...prevData.options,
          labels: labelData,
        },
      }));
    }
  }, [portfolioData]);

  console.log("chartData", chartData)

  return (
    <div style={{ marginTop: '20px' }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="400"
      />
    </div>
  );
};

export default DonutChart;
