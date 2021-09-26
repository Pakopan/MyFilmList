import React,{useContext} from 'react'
import axios from 'axios';
import { WatchListContext } from '../WatchListContext';

export default function WatchList({title, release_date,poster_path, 
                                movie,setupdatedWatchListStatus,watchListPostURL}) 
    {
    const [watchList, setWatchList] = useContext(WatchListContext);
    const deleteWatchList = () => {
        axios.post(watchListPostURL,
            {
                media_type: "movie",
                media_id : parseInt(movie.id),
                watchlist: false
            }
        ).then(response=>{
            setupdatedWatchListStatus(a=>[...a,response.data]);
        });
        setWatchList(watchList.filter((wl)=>(wl !== movie.id)));
    }
    return (
        <div className="row border shadow bg-light rounded">
                <div className="col-4">
                    <img style={{height:"auto", width:"100%"}} alt="poster film" src={`https://image.tmdb.org/t/p/w200/${poster_path}`}></img>
                </div>
                <div className="col-5 d-flex">
                    <div className="align-self-center">
                        <h5>{title}</h5>
                        <p>{release_date}</p>
                    </div>
                </div>
                <div className="col-3 d-flex">
                    <div className="align-self-center">
                        <button className="btn btn-danger btn-sm" onClick={deleteWatchList}>Delete</button>
                    </div>
                </div>
        </div>
    )
}
