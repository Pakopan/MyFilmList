import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import Post from './Post';
import { WatchListContext } from '../WatchListContext';
import WatchList from './WatchList';
import PageNavbar from './PageNavbar';
import CstmTab from './CstmTab';
import { Spinner } from 'reactstrap';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";

const watchListPostURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${API_Key}&session_id=${session_id}`
const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export default function Base() {
    const baseURL = (key, page_number=1, apikey=API_Key) => `https://api.themoviedb.org/3/movie/${key}?api_key=${apikey}&language=en-US&page=${page_number}`;
    const [page, setPage] = useState(()=>1);
    const [pageTopPost, setPageTopPost] = useState(()=>1);

    const [post, setPost] = useState([]);
    const [topPost, setTopPost] = useState ([]);

    const [url, setURL] = useState (baseURL("popular"));
    const [urlTopPost, setUrlTopPost] = useState (baseURL("top_rated"));


    const [totalPages, setTotalPages] = useState (()=>1);
    const [totalPagesTopPost, setTotalPageTopPost] = useState(()=>1);

    const [watchList] = useContext(WatchListContext);

    const [backDrop, setBackdrop] = useState ("");
    const [titleBackdrop, setTitleBackdrop] = useState("");

    const [watchListTotal, setWatchListTotal] = useState([]);
    
    const [addedWatchListStatus, setAddedWatchListStatus] = useState([]);
    const [updatedWatchListStatus, setUpdatedWatchListStatus] = useState ([]);

    const [activeTab, setActiveTab] = useState('1');
    const [loading, setLoading] = useState (false);
    
    const popularMovieContent = 
                                post.map(p=>(
                                    <div className="col-4 pt-4">
                                        <Post title={p.title}
                                        popularity={p.popularity}
                                        release_date={p.release_date}
                                        overview={p.overview}
                                        vote_average={p.vote_average}
                                        poster_path={p.poster_path}
                                        movie={p}
                                        />
                                    </div>
                                ));
    const topMovieContent = 
                            topPost.map(tp=>(
                                <div className="col-4 pt-4">
                                    <Post title={tp.title}
                                    popularity={tp.popularity}
                                    release_date={tp.release_date}
                                    overview={tp.overview}
                                    vote_average={tp.vote_average}
                                    poster_path={tp.poster_path}
                                    movie={tp}
                                    />
                                </div>
                            ));

    const nextPage = () => {
        switch(activeTab) {
            case "1" : {
                if (page<totalPages){
                    setPage(page+1);
                    setURL(baseURL("popular",page+1));
                }
                break;
            }
            case "2" : {
                if (pageTopPost<totalPagesTopPost) {
                    setPageTopPost(pageTopPost+1);
                    setUrlTopPost(baseURL("top_rated",pageTopPost+1));            
                }
                break;
            }
        }
    }
    const prevPage = () => {
        switch(activeTab) {
            case "1" : {
                if (page>1) {
                    setPage(page-1);
                    setURL(baseURL("popular",page-1));
                    setUrlTopPost(baseURL("top_rated",page-1));
                }
                break;
            }
            case "2" : {
                if (pageTopPost<totalPagesTopPost) {
                    setPageTopPost(pageTopPost-1);
                    setUrlTopPost(baseURL("top_rated",pageTopPost-1));            
                }
                break;
            }
        }
    }

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
      }

    useEffect(()=>{
        axios.get(url).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(urlTopPost).then((response)=>setTotalPageTopPost(response.data.total_pages));

        axios.get(url).then((response)=>{setPost(response.data.results)});
        axios.get(urlTopPost).then((response)=>{setTopPost(response.data.results)});

        axios.get(url).then((response)=>{setBackdrop(response.data.results[0].backdrop_path)});
        axios.get(url).then((response)=>{setTitleBackdrop(response.data.results[0].title)});
    },[url, urlTopPost]);


    useEffect(()=>{
        if (watchList!==[]){
            watchList.map((idwl)=>(
                axios.post(watchListPostURL,
                    {
                        media_type: "movie",
                        media_id : parseInt(idwl),
                        watchlist: true
                    }
                ).then(response=>{
                    setAddedWatchListStatus(a=>[...a,response.data]);
                })
            ));
            setLoading(false);
        }
    },[watchList]);

    useEffect(()=>{
        axios.get(watchListURL).then((response)=>setWatchListTotal(response.data.results));
        setLoading(true);
    },[addedWatchListStatus, updatedWatchListStatus]);

    return (
        <div>
            <PageNavbar onClickNextPage={nextPage} onClickPrevPage={prevPage} pageNumber={activeTab==="1"?page:pageTopPost}
                    pageTotal={activeTab==="1"?totalPages:totalPagesTopPost}/>
            <div className="row d-flex" style={{position:"relative"}}>
                <div className="col-3 text-black bg-light" style={{position:"absolute", top:"5vw"}}>
                    <h1 style={{textTransform:"uppercase"}}>{titleBackdrop}</h1>
                    </div>
                 <img className="backdrop" src={`https://image.tmdb.org/t/p/original/${backDrop}`} alt="" />
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
                        <div className = "p-5">
                            <Spinner className={loading?"d-none":""} color="primary" children="" />
                        </div>
                    </div>
                    <div className="col-8">
                        <CstmTab activeTab={activeTab} toggle={toggle}
                        firstTabLabel="Popular Today" secondTabLabel="Top Movie"
                        contentTab1={popularMovieContent} contentTab2={topMovieContent}/>
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
