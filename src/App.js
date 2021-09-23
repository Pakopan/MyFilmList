import './App.css';
import Header from './Components/Header';
import Base from './Components/Base';
import { WatchListProvider } from './WatchListContext';
import UpcomingMovie from './Components/UpcomingMovie';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <WatchListProvider>
        <div className="App">
            <Header/>
            <Switch>
              <Route path="/" exact component={Base}/>
              <Route path="/upcoming" component={UpcomingMovie}/>
            </Switch>
        </div>
      </WatchListProvider>
    </Router>
  );
}

export default App;
