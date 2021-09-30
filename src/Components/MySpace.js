import React,{useEffect, useContext} from 'react'
import WatchList from './WatchList';

import { FavoriteTotalContext } from './Context/FavoriteContext';

import { WatchListTotalContext, UpdatedWatchlistStatusContext, 
    AddedWatchlistStatusContext, useGetWatchListTotal,
    watchListPostURL } from './Context/WatchListContext';

import Post from './Post';

export default function MySpace() {
    const [totalFavorite] = useContext(FavoriteTotalContext);

    const [totalWatchList] = useContext(WatchListTotalContext);
    const [updatedWatchListStatus] = useContext(UpdatedWatchlistStatusContext);
    const [addedWatchListStatus] = useContext(AddedWatchlistStatusContext);

    const getWatchListTotal = useGetWatchListTotal();

    useEffect(()=>{
        if (addedWatchListStatus.success) getWatchListTotal();
    },[addedWatchListStatus]);

    useEffect(()=>{
        if (updatedWatchListStatus.success) getWatchListTotal();
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
