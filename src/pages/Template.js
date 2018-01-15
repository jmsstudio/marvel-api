import React from 'react';
import PropTypes from 'prop-types';

function Template({ children }) {
  return (
    <div>
      <header className="ma-header">
        <h2>Marvel API</h2>
      </header>
      <aside className="ma-menu">Menu</aside>
      <main className="ma-app-container">{children}</main>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.any
};

export default Template;
