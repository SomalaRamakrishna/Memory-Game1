import React from 'react';


const Card = ({ emoji, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      {isFlipped ? emoji : '❓'}
    </div>
  );
};

export default Card;
