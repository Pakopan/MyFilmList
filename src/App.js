import './App.css';
import Header from './Components/Header';
import { WatchListProvider } from './Components/Context/WatchListContext';
import { SearchBarProvider } from './Components/Context/SearchBarContext';
import { FavoriteProvider } from './Components/Context/FavoriteContext';
import {FavoriteTotalProvider} from './Components/Context/FavoriteTotalContext';
import { UpdatedFavoriteStatusProvider } from './Components/Context/UpdatedFavoriteStatusContext';
import {UpdatedWatchlistStatusProvider} from './Components/Context/UpdatedWatchlistStatusContext';
import { AddedWatchlistStatusProvider } from './Components/Context/AddedWatchlistStatus';
import { WatchListTotalProvider } from './Components/Context/WatchListTotalContext';

import React from 'react';
import AppChild from './Components/AppChild';

import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <Router>
      <WatchListTotalProvider>
      <AddedWatchlistStatusProvider>
      <UpdatedWatchlistStatusProvider>
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
      </UpdatedWatchlistStatusProvider>
      </AddedWatchlistStatusProvider>
      </WatchListTotalProvider>
    </Router>
  );
}

export default App;
