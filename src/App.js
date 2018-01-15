import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Template from './pages/Template';
import MainPage from './pages/MainPage';
import ComicsPage from './pages/ComicsPage';

function App() {
  return (
    <Router>
      <Template>
        <Route component={MainPage} exact path="/" />
        <Route component={ComicsPage} exact path="/comics" />
      </Template>
    </Router>
  );
}

export default App;
