import React,{useEffect, useContext, useState} from 'react'
import { SearchBarContext } from '../SearchBarContext'
import axios from 'axios';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

export default function SearchResults({input=""}) {
    const [searchValue, setSearchValue] = useContext(SearchBarContext);
    const [searchURL, setSearchURL] = useState (`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${searchValue}&language=en-US&page=1&include_adult=false`);
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(()=>{
        setSearchURL(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${searchValue}&language=en-US&page=1&include_adult=false`);
        axios.get(searchURL).then((response)=>{setSearchResults(response.data.results)});
    },[searchValue])

    return (
        <div>
            <h1>Ini adalah halaman hasil pencarian</h1>
            {searchResults.map((sr)=>(
                <p>{sr.title}</p>
            ))}
            <h1>{input}</h1>
        </div>
    )
}

