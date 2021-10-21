import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorDisplay({ children }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{children}</p>
    </div>
  );
}

ErrorDisplay.propTypes = {
  children: PropTypes.node.isRequired,
};
