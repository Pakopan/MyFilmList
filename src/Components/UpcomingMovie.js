import React,{useEffect, useState} from 'react'
import axios from 'axios'

import Post from './Post';
import DetailMovie from './DetailMovie';
import PageNavbar from './PageNavbar';
import LoadingPage from './LoadingPage';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=`;

export default function UpcomingMovie() {
    const [upcomingMovie, setUpcomingMovie] = useState([]);
    const [url, setURL] = useState (()=>`${baseURL}1`);
    const [page, setPage] = useState (()=>1);
    const [totalPages, setTotalPages] = useState(()=>1);
    const [isPageLoading, setisPageLoading] = useState (true);

    const nextPage = () => {
        if (page<totalPages) {
            setPage(prev=>(prev+1));
            setURL(`${baseURL}${page+1}`);
            setisPageLoading(true);
        }
    }

    const prevPage = () => {
        if (page>1){
            setPage(prev=>(prev-1));
            setURL(`${baseURL}${page-1}`);
            setisPageLoading(true);
        }
    }

    useEffect (()=>{
        axios.get(url).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(url).then((response)=>{
            setUpcomingMovie(response.data.results);
            setisPageLoading(false);
        });
    },[url]);

    if (isPageLoading) return <LoadingPage/>
    else return (
        <div>
            <PageNavbar onClickNextPage={nextPage} onClickPrevPage={prevPage} pageNumber={page} pageTotal={totalPages}/>
            <div className="container overflow-hidden pt-5">
            <div className="row" style={{paddingTop:"8vw"}}>
            <h1 style={{paddingBottom:"3vw"}}>Upcoming Movies</h1>
            {upcomingMovie.map((um)=>(
                <div className="col-6 pb-5">
                <div className="row d-flex">
                    <div className="col-6 align-self-center">
                        <Post title={um.title}
                        poster_path={um.poster_path}
                        movie={um}
                        id={um.id}
                        overview_visibility={false}/>
                    </div>
                    <div className="col-6 align-self-start">
                        <DetailMovie overview={um.overview} release_date={um.release_date} vote_average={um.vote_average}/>
                    </div>
                </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}
