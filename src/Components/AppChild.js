import React,{useContext} from 'react'
import {Switch, Route} from 'react-router-dom';

import UpcomingMovie from './UpcomingMovie';
import Base from './Base';
import { SearchBarContext } from '../SearchBarContext';
import SearchResults from './SearchResults';

export default function AppChild() {
    const [searchValue, setSearchValue] = useContext(SearchBarContext);
    return (
        <Switch>
            <Route path="/" exact component={Base}/>
            <Route path="/upcoming" component={UpcomingMovie}/>
            <Route path="/search-results" component={() => <SearchResults input={searchValue} />}/>
      </Switch>
    )
}
