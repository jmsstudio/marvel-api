import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

import Template from './pages/Template';
import AboutPage from './pages/AboutPage';
import CharactersPage from './pages/CharactersPage';
import ComicsPage from './pages/ComicsPage';

//needed to compile sass to css
/* eslint-disable no-unused-vars */
import styles from './assets/styles/marvel-api.scss';
import './assets/images/favicon.ico';

const history = createHistory();

function App() {
  return (
    <Router history={history}>
      <Template>
        <Route component={CharactersPage} exact path="/" />
        <Route component={ComicsPage} exact path="/comics" />
        <Route component={AboutPage} exact path="/about" />
      </Template>
    </Router>
  );
}

export default App;
