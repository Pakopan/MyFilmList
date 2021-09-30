import React,{useEffect, useState} from 'react'
import Post from './Post';
import axios from 'axios';
import PageNavbar from './PageNavbar';
import LoadingPage from './LoadingPage';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

export default function SearchResults({input=""}) {
    const URL = (search_value, page_number=1, apikey=API_Key) => `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${search_value}&language=en-US&page=${page_number}&include_adult=false`;

    const [page, setPage] = useState (()=>1);
    const [totalPages, setTotalPages] = useState(()=>1);
    const [searchResults, setSearchResults] = useState([]);
    const [searchURL, setSearchURL] = useState (URL(input));
    const [isPageLoading, setIsPageLoading] = useState (true);
    

    const nextPage = () => {
        if (page<totalPages) {
            setPage(prev=>(prev+1));
            setSearchURL((URL(input,page+1)));
            setIsPageLoading(true);
        }
    }

    const prevPage = () => {
        if (page>1){
            setPage(prev=>(prev-1));
            setSearchURL((URL(input,page-1)));
            setIsPageLoading(true);
        }
    }
    
    useEffect(()=>{
        setSearchURL(URL(input,page));
        axios.get(URL(input,page)).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(searchURL).then((response)=>{
            setSearchResults(response.data.results);
            setIsPageLoading(false);
        });
    },[input, searchURL, page]);

    if (isPageLoading) return <LoadingPage/>
    else return (
        <div className="d-flex" style={{alignContent:"center", justifyContent:"center"}}>
            <PageNavbar pageNumber={page} onClickNextPage={nextPage} onClickPrevPage={prevPage} pageTotal={totalPages}/>
            <div className="row" style={{paddingTop:"8vw", width:"80vw"}}>
            <h1 style={{paddingBottom:"2vw", paddingTop:"3vw"}}>Hasil pencarian "{input}"</h1>
            {searchResults.map(p=>(
                 <div className="col-3 pt-4">
                       <Post title={p.title}
                       id={p.id}
                       popularity={p.popularity}
                       release_date={p.release_date}
                       overview={p.overview}
                       vote_average={p.vote_average}
                       poster_path={p.poster_path}/>
                </div>))
            }
            </div>
        </div>
    )
}

