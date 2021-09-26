import React,{useContext} from 'react'
import {Switch, Route} from 'react-router-dom';

import UpcomingMovie from './UpcomingMovie';
import Base from './Base';
import { SearchBarContext } from '../SearchBarContext';
import SearchResults from './SearchResults';
import About from './About';
import PostDetail from './PostDetail';

export default function AppChild() {
    const [searchValue] = useContext(SearchBarContext);
    return (
        <Switch>
            <Route path="/" exact component={Base}/>
            <Route path="/upcoming" component={UpcomingMovie}/>
            <Route path="/search-results" component={() => <SearchResults input={searchValue} />}/>
            <Route path="/about" component={About}/>
            <Route path="/movie/:id" component={PostDetail}/>
      </Switch>
    )
}
