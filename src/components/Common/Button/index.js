import React from 'react';
import './styles.css';

function Button({ text, onClick, outlined }) {
  // Make sure onClick is a function before calling it
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <div className={outlined ? 'outlined-btn' : 'btn'} onClick={handleClick}>
      {text}
    </div>
  );
}

export default Button;
