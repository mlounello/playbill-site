// src/components/Button.js

import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onClick, type }) => {
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string, // e.g., 'primary', 'secondary'
};

Button.defaultProps = {
  onClick: () => {},
  type: '',
};

export default Button;