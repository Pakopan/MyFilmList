import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import { WatchListContext, WatchListTotalContext,
        UpdatedWatchlistStatusContext, AddedWatchlistStatusContext,
    } from './Context/WatchListContext';

import { useGetWatchListTotal } from './Context/WatchListContext';
import { watchListPostURL } from './Context/WatchListContext';

import WatchList from './WatchList';
import PageNavbar from './PageNavbar';
import CstmTab from './CstmTab';
import { Spinner } from 'reactstrap';
import Post from './Post';
import LoadingPage from './LoadingPage';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
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

    const [backDrop, setBackdrop] = useState ("");
    const [titleBackdrop, setTitleBackdrop] = useState("");
    const [overviewBackdrop, setOverviewBackdrop] = useState("");
    
    const [watchList] = useContext(WatchListContext);
    const [watchListTotal] = useContext(WatchListTotalContext);
    const [addedWatchListStatus, setAddedWatchListStatus] = useContext(AddedWatchlistStatusContext);
    const [updatedWatchListStatus,] = useContext (UpdatedWatchlistStatusContext);

    const [activeTab, setActiveTab] = useState('1');
    const [loading, setLoading] = useState (false);
    const [isPageLoading, setIsPageLoading] = useState (true);
    
    const getWatchListTotal=useGetWatchListTotal();

    const popularMovieContent = 
                                post.map(p=>(
                                    <div className="col-4 pt-4">
                                        <Post title={p.title}
                                        id={p.id}
                                        popularity={p.popularity}
                                        release_date={p.release_date}
                                        overview={p.overview}
                                        vote_average={p.vote_average}
                                        poster_path={p.poster_path}
                                        />
                                    </div>
                                ));
    const topMovieContent = 
                            topPost.map(tp=>(
                                <div className="col-4 pt-4">
                                    <Post title={tp.title}
                                    id={tp.id}
                                    popularity={tp.popularity}
                                    release_date={tp.release_date}
                                    overview={tp.overview}
                                    vote_average={tp.vote_average}
                                    poster_path={tp.poster_path}
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
            default : 
                break;
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
            default : 
                break;
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

        axios.get(url).then((response)=>{setTitleBackdrop(response.data.results[0].title)});
        axios.get(url).then((response)=>{setOverviewBackdrop(response.data.results[0].overview)});
        axios.get(url).then((response)=>{
            setBackdrop(response.data.results[0].backdrop_path);
            setIsPageLoading(false);
        });
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
                    setAddedWatchListStatus(response.data);
                })
            ));
            setLoading(true);
        }
    },[watchList]);

    useEffect(()=>{
        if (addedWatchListStatus.success) getWatchListTotal();
        setLoading(false);
    },[addedWatchListStatus]);

    useEffect(()=>{
        if (updatedWatchListStatus.success) getWatchListTotal();
        setLoading(false)
    },[updatedWatchListStatus]);


    if (isPageLoading) return <LoadingPage/>
    else return (
        <div className="row p-0 m-0">
            <PageNavbar onClickNextPage={nextPage} onClickPrevPage={prevPage} pageNumber={activeTab==="1"?page:pageTopPost}
                    pageTotal={activeTab==="1"?totalPages:totalPagesTopPost}/>   
            <div className="col">
                <div className="row" style={{paddingTop:"8vw"}}>
                <div className="col-8" style={{backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)", height:"38vw"}}>
                    <img style={{height:"100%", width:"100%"}}  className="shadow-lg" src={`https://image.tmdb.org/t/p/original/${backDrop}`} alt="back drop film" />
                </div>
                <div className="col-4 px-5 d-flex" style={{backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",color:"white", height:"38vw"}}>
                    <div className="align-self-center">
                        <br></br>
                    <h1 style={{textTransform:"uppercase"}}> {titleBackdrop} </h1>
                    <hr></hr>
                    <p>{overviewBackdrop.length>400?`${overviewBackdrop.slice(0,400)} ... (read more)`:overviewBackdrop}</p>
                    </div>
                </div>
                </div>
            </div>
                     

            <div className="row p-5">
                    <div className="col-4" style={{paddingLeft:"5%", paddingRight:"5%"}}>
                        <h1>Watchlist</h1>
                     {watchListTotal.map(w=>(
                            <WatchList title={w.title}
                                key={w.id}
                                release_date={w.release_date} 
                                poster_path={w.poster_path}
                                movie={w}
                                watchListPostURL = {watchListPostURL}
                                />
                        ))}
                        <Spinner className={loading?"visible":"invisible"} color="primary" children="" style={{ width: '3rem', height: '3rem' }} />
                    </div>
                    <div className="col-8" style={{paddingRight:"2%", paddingLeft:"0"}}>
                        <CstmTab activeTab={activeTab} toggle={toggle}
                        firstTabLabel="Popular Today" secondTabLabel="Top Movie"
                        contentTab1={popularMovieContent} contentTab2={topMovieContent}/>
                    </div>
            </div>
        </div>
    );
}
