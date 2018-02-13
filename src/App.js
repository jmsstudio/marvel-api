import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Template from './pages/Template';
import AboutPage from './pages/AboutPage';
import CharactersPage from './pages/CharactersPage';
import ComicsPage from './pages/ComicsPage';

//needed to compile sass to css
/* eslint-disable no-unused-vars */
import styles from './assets/styles/marvel-api.scss';

function App() {
  return (
    <Router>
      <Template>
        <Route component={CharactersPage} exact path="/" />
        <Route component={ComicsPage} exact path="/comics" />
        <Route component={AboutPage} exact path="/about" />
      </Template>
    </Router>
  );
}

export default App;
