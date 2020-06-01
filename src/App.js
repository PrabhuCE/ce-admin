import React from 'react';
import './App.css';
import Layout from '../src/Components/Layout';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { createBrowserHistory } from 'history';

function App(props) {
  return (
    <Router history={createBrowserHistory()}>
      <div className="App">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
