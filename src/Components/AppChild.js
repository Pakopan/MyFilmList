import React,{useContext, useEffect, useState} from 'react'
import {Switch, Route} from 'react-router-dom';
import axios from 'axios';
import UpcomingMovie from './UpcomingMovie';
import Base from './Base';

import { SearchBarContext } from './Context/SearchBarContext';
import { FavoriteContext, FavoritePostURL,
        UpdatedFavoriteStatusContext, useGetFavoriteTotal
     } from './Context/FavoriteContext';

import SearchResults from './SearchResults';
import About from './About';
import PostDetail from './PostDetail';
import MySpace from './MySpace';

export default function AppChild() {
    const [favorite,] = useContext(FavoriteContext);
    const [addedFavoriteStatus, setAddedFavoriteStatus] = useState ({success:true});
    const [updatedFavoriteStatus,] = useContext(UpdatedFavoriteStatusContext);

    const getFavoriteTotal = useGetFavoriteTotal();
    
    useEffect(()=>{
        if (favorite!==[]){
            favorite.map((fav)=>(
                axios.post(FavoritePostURL,
                    {
                        media_type: "movie",
                        media_id : parseInt(fav),
                        favorite: true
                    }
                ).then(response=>{
                  setAddedFavoriteStatus(response.data);
                })
            ));
        }
        
    },[favorite]);

    useEffect(()=>{
        if (addedFavoriteStatus.success) getFavoriteTotal();
    },[addedFavoriteStatus]);

    useEffect(()=>{
        if (updatedFavoriteStatus.success) getFavoriteTotal();
    },[updatedFavoriteStatus]);

    const [searchValue] = useContext(SearchBarContext);
    return (
        <Switch>
            <Route path="/" exact component={Base}/>
            <Route path="/upcoming" component={UpcomingMovie}/>
            <Route path="/search-results" component={() => <SearchResults input={searchValue} />}/>
            <Route path="/about" component={About}/>
            <Route path="/movie/:id" component={PostDetail}/>
            <Route path="/my-space" component={MySpace}/>
      </Switch>
    )
}
