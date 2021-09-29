import React,{useContext, useEffect, useState} from 'react'
import {Switch, Route} from 'react-router-dom';
import axios from 'axios';
import UpcomingMovie from './UpcomingMovie';
import Base from './Base';

import { SearchBarContext } from './Context/SearchBarContext';
import { FavoriteContext } from './Context/FavoriteContext';
import { FavoriteTotalContext } from './Context/FavoriteTotalContext';
import { UpdatedFavoriteStatusContext } from './Context/UpdatedFavoriteStatusContext';

import SearchResults from './SearchResults';
import About from './About';
import PostDetail from './PostDetail';
import MySpace from './MySpace';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";
const FavoritePostURL = `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${API_Key}&session_id=${session_id}`
const FavoriteURL = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export default function AppChild() {
    const [favorite,] = useContext(FavoriteContext);
    const [,setTotalFavorite] = useContext(FavoriteTotalContext);
    const [addedFavoriteStatus, setAddedFavoriteStatus] = useState ([]);
    const [updatedFavoriteStatus,] = useContext(UpdatedFavoriteStatusContext);
    
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
                    setAddedFavoriteStatus(a=>[...a,response.data]);
                })
            ));
        }
    },[favorite]);

    useEffect(()=>{
        axios.get(FavoriteURL).then((response)=>setTotalFavorite(response.data.results));
    },[addedFavoriteStatus, updatedFavoriteStatus]);

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
