import React from 'react'
import CstmNavbar from './CstmNavbar'

export default function Header() {
    return (

           <div className="card">
            <div className="row card-body d-flex mx-0 "
                style={{backgroundImage: "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)"}}>
                <div className="col-7 align-self-center">
                    <CstmNavbar/>
                </div>
                <div style={{zIndex:"1"}} className="col-5 align-self-center">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>    
            </div>
            </div>
    )
}
