import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import Post from './Post';
import DetailMovie from './DetailMovie';

import { WatchListContext } from '../WatchListContext';
import WatchList from './WatchList';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";

const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=`;
//const watchListPostURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${API_Key}&session_id=${session_id}`
//const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export default function UpcomingMovie() {
    const [upcomingMovie, setUpcomingMovie] = useState([]);
  //  const [watchList, setWatchList] = useContext(WatchListContext);
    const [url, setURL] = useState (()=>`${baseURL}1`);

    useEffect(()=>{
        //axios.get(url).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(url).then((response)=>{setUpcomingMovie(response.data.results)});
        console.log(upcomingMovie);
        console.log(url);
    },[]);

    return (
        <div>
            <h1>This is upcoming movies page</h1>
            <div className="container overflow-hidden pt-5">
            <div className="row">
            {upcomingMovie.map((um)=>(
                <div className="col-6 pb-5">
                <div className="row d-flex">
                    <div className="col-6 align-self-center">
                        <Post title={um.title}
                        poster_path={um.poster_path}
                        movie={um}
                        overview_visibility={false}/>
                    </div>
                    <div className="col-6 align-self-start">
                        <DetailMovie overview={um.overview} release_date={um.release_date} />
                    </div>
                </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}
