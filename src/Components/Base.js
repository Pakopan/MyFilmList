import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'

import Post from './Post';
import { WatchListContext } from '../WatchListContext';
import WatchList from './WatchList';
import PageNavbar from './PageNavbar';
import CstmTab from './CstmTab';
import { Spinner } from 'reactstrap';
import { Textfit } from 'react-textfit';

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
            setLoading(true);
        }
    },[watchList]);

    useEffect(()=>{
        axios.get(watchListURL).then((response)=>setWatchListTotal(response.data.results));
        setLoading(false);
    },[addedWatchListStatus, updatedWatchListStatus]);

    //styling------------------------------------
    const backdropStyle = {
            height: "100%",
            width: "100%"
    }
    //----------------------------end of styling

    return (
        <div className="row p-0 m-0">
            <PageNavbar onClickNextPage={nextPage} onClickPrevPage={prevPage} pageNumber={activeTab==="1"?page:pageTopPost}
                    pageTotal={activeTab==="1"?totalPages:totalPagesTopPost}/>
            
                <div className="col-8" style={{backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)", height:"38vw"}}>
                 <img style={backdropStyle}  className="shadow-lg" src={`https://image.tmdb.org/t/p/original/${backDrop}`} alt="" />
                </div>
                <div className="col-4 px-5" style={{backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",color:"white", height:"38vw"}}>
                    <div className="align-self-center">
                        <br></br>
                    <h1 style={{textTransform:"uppercase", letterSpacing:"1vw", }}> <Textfit mode="multi"> {titleBackdrop} </Textfit></h1>
                    <hr></hr>
                    <Textfit mode="multi">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.</Textfit>
                    </div>
                </div>
            <div className="row p-5">
                    <div className="col-4 px-5">
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
                            <Spinner className={loading?"":"d-none"} style={{ width: '3rem', height: '3rem' }} 
                                color="primary" children=""/>
                        </div>
                    </div>
                    <div className="col-8 px-5">
                        <CstmTab activeTab={activeTab} toggle={toggle}
                        firstTabLabel="Popular Today" secondTabLabel="Top Movie"
                        contentTab1={popularMovieContent} contentTab2={topMovieContent}/>
                    </div>
            </div>
        </div>
    );
}
