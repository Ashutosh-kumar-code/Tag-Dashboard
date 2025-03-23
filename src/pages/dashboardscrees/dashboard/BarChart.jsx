import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 7000, 8000, 6000, 9000, 10000, 11000],
        backgroundColor: '#78222E', // Revenue bar color
        borderWidth: 1,
        borderRadius: 10, // Rounded top edges
        barThickness: 20, // Set specific bar width
      },
      {
        label: 'Expenses',  
        data: [3000, 5000, 4000, 3000, 7000, 8000, 9000],
        backgroundColor: '#EDEDED', // Profit bar color
        borderWidth: 1,
        borderRadius: 10, // Rounded top edges
        barThickness: 20, // Set specific bar width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true, // Keep tooltips for interactivity
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Disable horizontal grid lines
        },
        title: {
          display: true,
          // text: 'Values ($)',
        },
      },
      x: {
        grid: {
          display: false, // Disable vertical grid lines
          
        },
        title: {
          display: true,
          // text: 'Months',
        },
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    },
  };

  return (<>
    <div  className='lg:w-[700px] md:w-[450px]  sm:w-[550px] w-60 lg:h-[370px] mt-6 shadow-lg rounded-lg res-640-hidden'> 
    <h1 className=' text-xl font-bold px-6'>Cash Flow</h1>
      <Bar data={data} options={options}/>
    </div>
    <div  className='w-[350px] sm:hidden block '> 
    <h1 className=' text-xl font-semibold px-6'>Cash Flow</h1>
      <Bar data={data} options={options}/>
    </div>
    </>
  );
};

export default BarChart;
