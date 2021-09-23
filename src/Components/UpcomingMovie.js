import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import Post from './Post';
import DetailMovie from './DetailMovie';


const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=`;

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
            <h1>Upcoming Movies</h1>
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
