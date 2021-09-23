import React from 'react'

export default function Header() {
    return (

           <div className="card">
            <div className="row card-body d-flex mx-0 "
                style={{backgroundImage: "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)"}}>
                <div className="col-6 align-self-center">
                    <h1 style={{color:"white"}}><b>MY MOVIE LIST</b></h1>
                </div>
            <div className="col-6 align-self-center">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>    
            </div>
            </div>
    )
}
