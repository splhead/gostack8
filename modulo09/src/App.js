import React from 'react';
import { Router } from 'react-router-dom';
import './App.css';

import Routes from './routes';
import history from './services/history.js';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
