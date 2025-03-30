import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Brands',
        data: Array(12).fill(0), // Initial empty data
        backgroundColor: '#78222E',
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 20,
      },
      {
        label: 'Creators',
        data: Array(12).fill(0), // Initial empty data
        backgroundColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/all-registrations-graph') // Adjust API URL if needed
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const brandCounts = data.data.map((item) => item.brands);
          const creatorCounts = data.data.map((item) => item.creators);

          setChartData((prevData) => ({
            ...prevData,
            datasets: [
              { ...prevData.datasets[0], data: brandCounts },
              { ...prevData.datasets[1], data: creatorCounts },
            ],
          }));
        }
      })
      .catch((error) => console.error('Error fetching registration data:', error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    },
  };

  return (
    <div className='lg:w-[700px] md:w-[450px] sm:w-[550px] w-60  mt-6 shadow-lg rounded-lg'>
      <h1 className='text-xl font-bold px-6'>Monthly Registrations</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
