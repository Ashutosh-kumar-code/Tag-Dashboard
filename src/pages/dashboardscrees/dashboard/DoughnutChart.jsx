import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['Material', 'Equipment', 'Labour', 'Subcontractors'], // Labels for segments
    datasets: [
      {
        data: [4000, 5000, 8000, 3000], // Values for each segment
        backgroundColor: ['#C7AC9C', '#78222E', '#42151B', '#CCC5C5'], // Colors for each segment
        // hoverBackgroundColor: ['#A24C60', '#D1D1D1', '#1EC123', '#F1F1A0'], // Hover colors
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: 120,
    raduis: 190,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return ` ${tooltipItem.label}: $${tooltipItem.raw}`; // Display value with label
          },
        },
      },
    },
  };

  return (<>

    <div className='sm:w-[460px] w-60 relative h-[370px] mt-6 shadow-lg rounded-lg res-640-hidden'>
      <h1 className=' absolute text-xl font-semibold px-6 '>Cost Breakdown</h1>
      <Doughnut data={data} options={options} className='p-8 absolute top-4' />
    </div>
    <div className='w-[350px] shadow-lg rounded-lg sm:hidden'>
      <h1 className=' text-xl font-semibold px-6 '>Cost Breakdown</h1>
      <Doughnut data={data} options={options} className='p-8' />
    </div>
  </>
  );
};

export default DoughnutChart;
