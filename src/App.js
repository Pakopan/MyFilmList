import './App.css';
import Header from './Components/Header';
import { WatchListProvider } from './WatchListContext';
import { SearchBarProvider } from './SearchBarContext';
import React from 'react';
import AppChild from './Components/AppChild';

import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <Router>
      <SearchBarProvider>
      <WatchListProvider>
        <div className="App">
            <Header/>
            <AppChild/>
        </div>
      </WatchListProvider>
      </SearchBarProvider>
    </Router>
  );
}

export default App;
