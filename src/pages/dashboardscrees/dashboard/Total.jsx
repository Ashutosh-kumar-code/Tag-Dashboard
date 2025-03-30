import React, { useEffect, useState } from 'react';
import { Icons } from '../../../icons';

const Total = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/total-stats') // Adjust API URL if needed
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="total-main">
      {loading ? (
        <p>Loading...</p>
      ) : stats ? (
        <>
          {/* Total Users */}
          <div className="box-container-total">
            <span>
              <span className="total-value">{stats.totalUsers}</span> <br />
              <span className="total-value-text">Total Users</span>
            </span>
            <span className="total-icon">
              <Icons.totalusers size={30} />
            </span>
          </div>

          {/* Total Creators */}
          <div className="box-container-total">
            <span>
              <span className="total-value">{stats.totalCreators}</span> <br />
              <span className="total-value-text">Total Creators</span>
            </span>
            <span className="total-icon">
              <Icons.Chart size={30} />
            </span>
          </div>

          {/* Total Brands */}
          <div className="box-container-total">
            <span>
              <span className="total-value">{stats.totalBrands}</span> <br />
              <span className="total-value-text">Total Brands</span>
            </span>
            <span className="total-icon">
              <Icons.brandicon size={30} />
            </span>
          </div>

          {/* Total Videos */}
          <div className="box-container-total">
            <span>
              <span className="total-value">{stats.totalVideos}</span> <br />
              <span className="total-value-text">Total Videos</span>
            </span>
            <span className="total-icon">
              <Icons.video_icon size={30} />
            </span>
          </div>

          {/* Total Shorts */}
          <div className="box-container-total">
            <span>
              <span className="total-value">{stats.totalShorts}</span> <br />
              <span className="total-value-text">Total Shorts</span>
            </span>
            <span className="total-icon">
              <Icons.sorts_icon size={30} />
            </span>
          </div>
        </>
      ) : (
        <p>Error loading data</p>
      )}
    </div>
  );
};

export default Total;
