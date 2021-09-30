import './App.css';
import Header from './Components/Header';
import { WatchListProvider } from './Components/Context/WatchListContext';
import { SearchBarProvider } from './Components/Context/SearchBarContext';
import { FavoriteProvider } from './Components/Context/FavoriteContext';

import React from 'react';
import AppChild from './Components/AppChild';

import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <Router>
      <FavoriteProvider>
      <SearchBarProvider>
      <WatchListProvider>
        <div className="App">
            <Header/>
            <AppChild/>
        </div>
      </WatchListProvider>
      </SearchBarProvider>
      </FavoriteProvider>
    </Router>
  );
}

export default App;
