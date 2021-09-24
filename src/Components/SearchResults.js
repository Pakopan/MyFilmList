import React,{useEffect, useState} from 'react'
import Post from './Post';
import axios from 'axios';
import PageNavbar from './PageNavbar';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

export default function SearchResults({input=""}) {
    const URL = (search_value, page_number=1, apikey=API_Key) => `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${search_value}&language=en-US&page=${page_number}&include_adult=false`;

    const [page, setPage] = useState (()=>1);
    const [totalPages, setTotalPages] = useState(()=>1);
    const [searchResults, setSearchResults] = useState([]);
    const [searchURL, setSearchURL] = useState (URL(input));
    

    const nextPage = () => {
        if (page<totalPages) {
            setPage(prev=>(prev+1));
            setSearchURL((URL(input,page+1)));
        }
    }

    const prevPage = () => {
        if (page>1){
            setPage(prev=>(prev-1));
            setSearchURL((URL(input,page-1)));
        }
    }
    
    useEffect(()=>{
        setSearchURL(URL(input,page));
        axios.get(URL(input,page)).then((response)=>setTotalPages(response.data.total_pages));
        axios.get(searchURL).then((response)=>{setSearchResults(response.data.results)});
    },[input, searchURL, page])

    return (
        <div>
            <PageNavbar pageNumber={page} onClickNextPage={nextPage} onClickPrevPage={prevPage} pageTotal={totalPages}/>
            <h1>Hasil pencarian "{input}"</h1>
            <div className="container overflow-hidden">
            <div className="row">
            { searchResults.map(p=>(
                 <div className="col-3 pt-4">
                       <Post title={p.title}
                       popularity={p.popularity}
                       release_date={p.release_date}
                       overview={p.overview}
                       vote_average={p.vote_average}
                       poster_path={p.poster_path}
                       movie={p}/>
                </div>))
            }
            </div>
            </div>
        </div>
    )
}
