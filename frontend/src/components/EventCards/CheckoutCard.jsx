import React from 'react';
import "../EventCardsCss/CheckoutCard.css"

const CheckOutCard = ({update}) => {
  // console.log(update);
  
  return (
    <div className="car-card">
      <div className="car-header">
        <h3>{update.plate_number}</h3>
        <div className="upload-icon">
          <i className="arrow-icon">↗️</i>
        </div>
      </div>
      <hr className="divider" />
      <div className="car-info">
        <span>Black</span>
        <span className="dot"></span>
        <span><strong>06</strong>, A2</span>
        <span>Slot: {update.parking_spot}</span>
      </div>
      <div className="payment-info">
        <span>Payment: <span className="payment-status">Successful</span></span>
        <span>Via Online</span>
      </div>
      <div className="checkout-info">
        <span>{update.timestamp}</span>
      </div>
    </div>
  );
}

export default CheckOutCard;
