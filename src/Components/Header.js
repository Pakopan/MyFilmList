import React, { useContext, useState } from 'react'
import CstmNavbar from './CstmNavbar'
import { Link } from 'react-router-dom'
import { SearchBarContext } from '../SearchBarContext'

export default function Header() {
    const [keyword, setKeyword] = useState("");
    const [searchValue, setSearchValue] = useContext(SearchBarContext);

    const updateKeyword = (event) => setKeyword(event.target.value);
    const updateSearchValue = () => setSearchValue(keyword);

    return (
           <div className="card">
                <div className="row card-body d-flex mx-0"
                    style={{backgroundImage: "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)"}}>
                    <div className="col-7 align-self-center">
                        <CstmNavbar/>
                        </div>
                        <div style={{zIndex:"1"}} className="col-5 align-self-center">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                                value={keyword} onChange={updateKeyword}/>
                            <Link to={keyword===""?"/":"/search-results"}>
                                <button className="btn btn-outline-light" type="submit" onClick={updateSearchValue}>Search</button>
                            </Link>
                        </form>
                    </div>    
                </div>
            </div>
    )
}
