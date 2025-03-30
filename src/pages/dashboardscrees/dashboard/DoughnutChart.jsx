import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Brands', 'Creators'], // Labels for the chart
    datasets: [
      {
        data: [0, 0], // Default values
        backgroundColor: ['#78222E', '#42151B'], // Colors for Brands and Creators
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/user-counts') // Adjust API URL if needed
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setChartData((prevData) => ({
            ...prevData,
            datasets: [
              { ...prevData.datasets[0], data: [data.data.brands, data.data.creators] },
            ],
          }));
        }
      })
      .catch((error) => console.error('Error fetching user counts:', error));
  }, []);

  const options = {
    responsive: true,
    cutout: 120,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return ` ${tooltipItem.label}: ${tooltipItem.raw}`; // Display count with label
          },
        },
      },
    },
  };

  return (
    <>
      <div className='sm:w-[460px] w-60 relative h-[370px] mt-6 shadow-lg rounded-lg'>
        <h1 className='absolute text-xl font-semibold px-6'>User Distribution</h1>
        <Doughnut data={chartData} options={options} className='p-8 absolute top-4' />
      </div>
      <div className='w-[350px] shadow-lg rounded-lg sm:hidden'>
        <h1 className='text-xl font-semibold px-6'>User Distribution</h1>
        <Doughnut data={chartData} options={options} className='p-8' />
      </div>
    </>
  );
};

export default DoughnutChart;
