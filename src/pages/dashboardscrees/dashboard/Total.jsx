import React from 'react';
import { Icons } from '../../../icons';

const Total = () => {
  return (
    <div className="total-main">
      {/* First box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">5420</span> <br />
          <span className="total-value-text">Total User</span>
        </span>
        <span className="total-icon">
          <Icons.totalusers size={30} />
        </span>
      </div>

      {/* Second box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">1250</span> <br />
          <span className="total-value-text">Total Creators</span>
        </span>
        <span className="total-icon">
          <Icons.Chart size={30} />
        </span>
      </div>

      {/* Third box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">5420</span> <br />
          <span className="total-value-text">Total Brands</span>
        </span>
        <span className="total-icon">
          <Icons.contract size={30} />
        </span>
      </div>

      {/* Fourth box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">4400</span> <br />
          <span className="total-value-text">Total Videos</span>
        </span>
        <span className="total-icon">
          <Icons.totalSale size={30} />
        </span>
      </div>

      {/* Fifth box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">1200</span> <br />
          <span className="total-value-text">Total Sorts</span>
        </span>
        <span className="total-icon">
          <Icons.totalcompany size={30} />
        </span>
      </div>
    </div>
  );
};

export default Total;
