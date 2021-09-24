import './App.css';
import Header from './Components/Header';
import Base from './Components/Base';
import { WatchListProvider } from './WatchListContext';
import UpcomingMovie from './Components/UpcomingMovie';
import SearchResults from './Components/SearchResults';
import { SearchBarProvider } from './SearchBarContext';
import { SearchBarContext } from './SearchBarContext';
import React,{useContext} from 'react';
import AppChild from './Components/AppChild';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
