import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Template({ children }) {
  return (
    <div>
      <header className="ma-header">
        <h1>Marvel API</h1>
      </header>
      <aside className="ma-menu">
        <div>
          <NavLink to="/" exact activeClassName="active">
            <div className="ma-menu-item">
              <i className="fa fa-fw fa-2x fa-users" />
              <span>Characters</span>
            </div>
          </NavLink>
          <NavLink to="/comics" exact activeClassName="active">
            <div className="ma-menu-item">
              <i className="fa fa-fw fa-2x fa-book" />
              <span>Comics</span>
            </div>
          </NavLink>
          <NavLink to="/about" exact activeClassName="active">
            <div className="ma-menu-item">
              <i className="fa fa-fw fa-2x fa-info-circle" />
              <span>About</span>
            </div>
          </NavLink>
        </div>
      </aside>
      <main className="ma-app-container">{children}</main>
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.any,
};

export default Template;
