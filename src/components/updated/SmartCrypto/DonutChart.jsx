import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const DonutChart = () => {
  const theme = useTheme(); // Access the theme for dynamic styling

  const [chartData, setChartData] = useState({
    series: [30, 40, 20, 10], // Your data values
    options: {
      chart: {
        type: 'donut', // Type of chart
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
      labels: ['Category A', 'Category B', 'Category C', 'Category D'], // Labels for the segments
      colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019'], // Custom segment colors
      responsive: [
        {
          breakpoint: 480, // Adjust chart for small screens
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
        position: 'right', // Position of the legend
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
          expandOnClick: false, // Disable the expanding effect on click
        },
      },
      stroke: {
        width: 0, // Remove the inner and outer border
      },
      title: {
        text: undefined, // Remove the chart title
      },
      tooltip: {
        theme: 'dark', // Tooltip theme for better visibility
      },
      states: {
        hover: {
          filter: {
            type: 'lighten', // Highlight the segment on hover
            value: 0.15,
          },
        },
      },
    },
  });

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
