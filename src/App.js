import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Template from './pages/Template';
import MainPage from './pages/MainPage';
import CharactersPage from './pages/CharactersPage';
import ComicsPage from './pages/ComicsPage';

//needed to compile sass to css
import styles from './assets/styles/marvel-api.scss';

function App() {
  return (
    <Router>
      <Template>
        <Route component={MainPage} exact path="/" />
        <Route component={CharactersPage} exact path="/characters" />
        <Route component={ComicsPage} exact path="/comics" />
      </Template>
    </Router>
  );
}

export default App;
