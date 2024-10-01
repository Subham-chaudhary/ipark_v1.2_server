import React from 'react';
import "../EventCardsCss/CheckingCard.css"



const CheckingCard = ({update}) => {
  console.log(update);
  return (
    
    <div className="card-container">
      <div className="card-header1">
        <h3>{update.plate_number}</h3>
        <div className="card-icon">
          <span>&#x21BB;</span> {/* This represents the downward arrow icon */}
        </div>
      </div>
      
      <div className="card-content">
        <div className="car-info">
          <span>Black</span>
          <span className="dot"></span>
          <span id="CheckingShru"><strong>06</strong>, A2</span>
          <span>{update.parking_spot}</span>
        </div>
      </div>
      <div className="card-footer">
        <span>{update.timestamp}</span>
      </div>
    </div>
  );
};

export default CheckingCard;
