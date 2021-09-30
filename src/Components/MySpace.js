import React,{useEffect, useContext} from 'react'
import WatchList from './WatchList';
import axios from 'axios'

import { UpdatedWatchlistStatusContext } from './Context/UpdatedWatchlistStatusContext';
import { AddedWatchlistStatusContext } from './Context/AddedWatchlistStatus';
import { FavoriteTotalContext } from './Context/FavoriteTotalContext';
import { WatchListTotalContext } from './Context/WatchListTotalContext';
import Post from './Post';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";
const watchListPostURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${API_Key}&session_id=${session_id}`
const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export default function MySpace() {
    const [totalWatchList, setTotalWatchList] = useContext(WatchListTotalContext)
    const [totalFavorite,] = useContext(FavoriteTotalContext);
    const [updatedWatchListStatus,] = useContext(UpdatedWatchlistStatusContext);
    const [addedWatchListStatus,] = useContext(AddedWatchlistStatusContext);

    useEffect(()=>{
        if (addedWatchListStatus.success) //utk menghindari asycn gagal post ke server
            axios.get(watchListURL).then((response)=>setTotalWatchList(response.data.results));
    },[addedWatchListStatus]);

    useEffect(()=>{
        if (updatedWatchListStatus.success) //utk menghindari async gagal post ke server
            axios.get(watchListURL).then((response)=>setTotalWatchList(response.data.results));
    },[updatedWatchListStatus]);

    return (
        <div className="row" style={{justifyContent:"center", widht:"100vw", paddingTop:"10vw"}}>
            <div className="row bg-light" style={{width:"80vw"}}>
                <div className="row d-flex" style={{justifyContent:"space-evenly"}}>
                <h1>Watchlist</h1>
                     {totalWatchList.map(w=>(
                         <div className="col-4 d-flex">
                            <WatchList title={w.title}
                                key={w.id}
                                release_date={w.release_date} 
                                poster_path={w.poster_path}
                                movie={w}
                                watchListPostURL = {watchListPostURL}
                                />
                            </div>
                        ))}
                </div>
                <div className="row d-flex mt-5" style={{justifyContent:"space-evenly"}}>
                <hr/>
                    <h1>Favorite</h1>
                    { totalFavorite.map(p=>(
                        <div className="col-3 pt-4">
                            <Post title={p.title}
                            id={p.id}
                            popularity={p.popularity}
                            release_date={p.release_date}
                            overview={p.overview}
                            vote_average={p.vote_average}
                            poster_path={p.poster_path}
                            overview_visibility={false}
                            add_to_watchlist_visibility={false}
                            />
                        </div>))
                    }
                </div>
            </div>
        </div>
    )
}
