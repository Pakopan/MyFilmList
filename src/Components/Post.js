import React,{useState, useContext, useEffect} from 'react'
import { Collapse } from 'reactstrap';
import axios from 'axios';

import {StarFill, BookmarkStarFill} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { WatchListContext } from './Context/WatchListContext';
import { FavoriteContext, FavoriteTotalContext, 
        UpdatedFavoriteStatusContext, FavoritePostURL } from './Context/FavoriteContext';

export default function Post({title, id, popularity=0, 
    release_date="", poster_path, overview="", vote_average=0, 
    overview_visibility=true, add_to_watchlist_visibility=true}) {
    const [sinopisFlag, setSinopsisFlag] = useState(false);
    const [isFavorite, setIsFavorite] = useState (false);

    const [,setWatchList] = useContext(WatchListContext);
    const [favorite, setFavorite] = useContext(FavoriteContext);
    const [totalFavorite,] = useContext(FavoriteTotalContext);
    const [,setUpdatedFavoriteStatus] = useContext(UpdatedFavoriteStatusContext);
    
    const addToWatchList = () => setWatchList(prev=>[...prev, id]);
    
    const addToFavorite = () => {
        if (isFavorite===false)setFavorite(prevFav=>[...prevFav, id]);
        else {
            axios.post(FavoritePostURL,
                {
                    media_type: "movie",
                    media_id : parseInt(id),
                    favorite: false
                }
            ).then(response=>{setUpdatedFavoriteStatus(response.data)});

            setFavorite(favorite.filter((fav)=>(fav !== id)));
        }
    }

    useEffect(()=>{
        let totalFavoriteId=[];
        totalFavorite.forEach((tf)=>{
            totalFavoriteId=[...totalFavoriteId,tf.id];
        })
        if (totalFavoriteId.includes(id)) setIsFavorite(true);
        else setIsFavorite(false);
    },[totalFavorite,id]);


    let overview2=[...overview];   

    return (
        <div className="border shadow bg-light rounded ">
                <div className={title.length<20?"title-normal":"title-long"} style={{minHeight:"5vw"}}>
                    <hr></hr>
                <Link to={`/movie/${id}`} style={{textDecoration:"none"}}><b>{title}</b> </Link>
                    <hr></hr>
                </div>
                <div className="cont-ku border shadow-lg">
                    <button className={`btn btn-primary btn-sm ${add_to_watchlist_visibility?"":"d-none"}`} 
                    id="watchlistBtn" onClick={addToWatchList}><b>+</b></button>
                    <button className="btn btn-danger" id="favorite-btn" 
                    onClick={addToFavorite}><BookmarkStarFill size={20} color={`${isFavorite?"yellow":"white"}`}/></button>
                    <img className={sinopisFlag?"sinopsis-on":""} src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt="poster film"/>
                  <Collapse className="sinopsis" isOpen={sinopisFlag}>
                        <p style={{fontSize:"small"}}>
                            {overview.length<430?overview2:
                            [...overview2.splice(0,430),"...(cont.)"]} </p>
                    </Collapse>
  
                        <div className={`p-3 row ${overview_visibility?"":"d-none"} d-flex`}>
                            <div className="col-6 align-self-start">
                                <h4> <StarFill className="pb-1" color="orange" size={40}/>{vote_average}</h4>
                            </div>
                            <div className="col-6 align-self-start ">
                            <button onClick={()=>(setSinopsisFlag(!sinopisFlag))} type="button" 
                            className="btn btn-warning btn-sm">Sinopsis</button>
                        </div>
                        </div>
                </div>
                <div  className={`pt-3 row ${overview_visibility?"":"d-none"}`} style={{minHeight:"100px"}}>
                    <h5><span className="text-danger">Popularitas : </span>{popularity}</h5>
                    <h6><span className="text-primary">Tanggal Rilis : </span>{release_date}</h6>
                </div>
        </div>
    )
}
