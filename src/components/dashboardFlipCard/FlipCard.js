import React, { useState } from "react";
import "./FlipCard.css";

const FlipCard = ({ icon, name, buttons }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={handleClick}
    >
      <div className='flip-card-front'>
        <img src={icon} height='50px' alt={name} />
        <span>{name}</span>
      </div>
      <div className='flip-card-back'>
        {buttons.map((button) => (
          <button key={button.label} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlipCard;
