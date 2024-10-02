import React from 'react'
import "../EventCardsCss/TresspassingCard.css"

const TresspassingCard = ({update}) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{update.plate_number}</span>
        <button className="close-button">✕</button>
      </div>
      <div className="card-content">
        <span className="color-info">Black ●</span>
        <span className="location-info"><strong>06</strong>, A2 Slot: {update.parking_spot}</span>
      </div>
      <div className="error-message">Error Occured</div>

      <div className="checkout-info">
        <span>{update.timestamp}</span>
      </div>
    </div>
  );
};

export default TresspassingCard;
