import './App.css';
import Header from './Components/Header';
import { WatchListProvider } from './WatchListContext';
import { SearchBarProvider } from './SearchBarContext';
import { FavoriteProvider } from './FavoriteContext';
import {FavoriteTotalProvider} from './FavoriteTotalContext';
import { UpdatedFavoriteStatusProvider } from './UpdatedFavoriteStatusContext';
import React from 'react';
import AppChild from './Components/AppChild';

import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <Router>
      <UpdatedFavoriteStatusProvider>
      <FavoriteTotalProvider>
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
      </FavoriteTotalProvider>
      </UpdatedFavoriteStatusProvider>
    </Router>
  );
}

export default App;
