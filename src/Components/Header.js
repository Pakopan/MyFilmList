import React, { useContext, useState } from 'react'
import CstmNavbar from './CstmNavbar'
import { Link } from 'react-router-dom'
import { SearchBarContext } from '../SearchBarContext'
import { Search } from 'react-bootstrap-icons'

export default function Header() {
    const [keyword, setKeyword] = useState("");
    const [, setSearchValue] = useContext(SearchBarContext);

    const updateKeyword = (event) => setKeyword(event.target.value);
    const updateSearchValue = () => setSearchValue(keyword);

    return (
           <div className="card border-0 shadow-lg position-fixed" style={{width:"100%", height:"8vw", zIndex:"1"}}>
                <div className="row card-body d-flex mx-0"
                    style={{backgroundImage: "linear-gradient(to right, #0250c5 0%, #d43f8d 100%)"}}>
                    <div className="col-8 align-self-center">
                        <CstmNavbar/>
                        </div>
                        <div style={{zIndex:"1"}} className="col-4 align-self-center">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                                value={keyword} onChange={updateKeyword}/>
                            <Link to={keyword===""?"/":"/search-results"}>
                                <button className="btn btn-outline-light" type="submit" onClick={updateSearchValue}>
                                    <Search className="iconSearchBar" size={20}/>
                                </button>
                            </Link>
                        </form>
                    </div>    
                </div>
            </div>
    )
}
