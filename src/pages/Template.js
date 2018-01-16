import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Template({ children }) {
  return (
    <div>
      <header className="ma-header">
        <h2>Marvel API</h2>
      </header>
      <aside className="ma-menu">
        <ul>
          <li className="ma-menu-item">
            <NavLink to="/" exact activeClassName="active">
              Main
            </NavLink>
          </li>
          <li className="ma-menu-item">
            <NavLink to="/comics" exact activeClassName="active">
              Comics
            </NavLink>
          </li>
        </ul>
      </aside>
      <main className="ma-app-container">{children}</main>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.any
};

export default Template;
