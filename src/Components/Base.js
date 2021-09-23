import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import Post from './Post';
import { WatchListContext } from '../WatchListContext';
import WatchList from './WatchList';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";

const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=`;
const watchListPostURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${API_Key}&session_id=${session_id}`
const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export default function Base() {
    const [page, setPage] = useState(()=>1);
    const [post, setPost] = useState([]);
    const [url, setURL] = useState (()=>`${baseURL}1`);
    const [totalPages, setTotalPages] = useState (1);
    const [watchList] = useContext(WatchListContext);

    const [watchListTotal, setWatchListTotal] = useState([]);
    
    const [addedWatchListStatus, setAddedWatchListStatus] = useState([]);
    const [updatedWatchListStatus, setUpdatedWatchListStatus] = useState ([]);
    

    const nextPage = () => {
        if (totalPages>1){
            setPage(page+1);
            setURL(`${baseURL}${page+1}`);
        }
    }
    const prevPage = () => {
        if (page>1) {
            setPage(page-1);
            setURL(`${baseURL}${page-1}`);
        }
    }

    useEffect(()=>{
        axios.get(url).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(url).then((response)=>{setPost(response.data.results)});
    },[url]);

    useEffect(()=>{
        if (watchList>0){
            axios.post(watchListPostURL,
                {
                    media_type: "movie",
                    media_id : parseInt(watchList),
                    watchlist: true
                }
            ).then(response=>{
                setAddedWatchListStatus(a=>[...a,response.data]);
            });
        }
    },[watchList]);

    useEffect(()=>{
        axios.get(watchListURL).then((response)=>setWatchListTotal(response.data.results));
    },[addedWatchListStatus, updatedWatchListStatus]);

    return (
        <div>
            <div className="card bg-warning" 
                style={{width: "5rem", 
                        position:"fixed", 
                        zIndex:"1",
                        top: "40%",
                        left: "93%"
                        }}>
                    <h5 className="card-header">Page</h5>
                    <div className="card-body">
                        <h1>{page}</h1>
                        <div className="row d-flex">
                            <div>
                                <button className="btn btn-dark btn-sm" onClick={prevPage}>Back</button>
                            </div>
                            <div className="pt-2">
                            <button className="btn btn-dark btn-sm" onClick={nextPage}>Next</button>
                            </div>
                        </div>
                    </div>
            </div>
            <hr></hr>
            <div className="container overflow-hidden">
                <div className="row g-5">
                    <div className="col-4">
                        <h1>Watchlist</h1>
                        {watchListTotal.map(w=>(
                            <WatchList title={w.title} 
                                release_date={w.release_date} 
                                poster_path={w.poster_path}
                                movie={w}
                                watchListTotal={watchListTotal}
                                setWatchListTotal={setWatchListTotal}
                                updatedWatchListStatus={updatedWatchListStatus}
                                setupdatedWatchListStatus = {setUpdatedWatchListStatus}
                                watchListPostURL = {watchListPostURL}
                                />
                        ))}
                    </div>
                    <div className="col-8">
                        <h1>POPULER HARI INI</h1>
                        <div className="row">
                        {post.map(p=>(
                        <div className="col-4">
                            <Post title={p.title}
                            popularity={p.popularity}
                            release_date={p.release_date}
                            overview={p.overview}
                            vote_average={p.vote_average}
                            poster_path={p.poster_path}
                            movie={p}
                            />
                        </div>
                ))}
                        </div>
                    </div>
                </div> 
                <div className="row pt-5">
                    <div className="col">
                    <h1>Insert something cool here</h1>
                    </div>
                    <div className="col">
                       <h1>Insert something cool here</h1>
                    </div>
                </div>    
            </div>
        </div>
    );
}
