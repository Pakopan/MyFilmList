import React from 'react'

export default function PageNavbar({pageNumber, onClickNextPage, onClickPrevPage, pageTotal}) {
    return (
        <div>
            <div className="card bg-warning shadow" 
                style={{width: "5rem", 
                        position:"fixed", 
                        zIndex:"1",
                        top: "40%",
                        left: "93%"
                        }}>
                    <h5 className="card-header">Page</h5>
                    <div className="card-body">
                        <h1>{pageNumber}</h1>
                        <p>of {pageTotal}</p>
                        <div className="row d-flex">
                            <div>
                                <button className="btn btn-dark btn-sm" onClick={onClickPrevPage}>Back</button>
                            </div>
                            <div className="pt-2">
                            <button className="btn btn-dark btn-sm" onClick={onClickNextPage}>Next</button>
                            </div>
                        </div>
                    </div>
            </div>            
        </div>
    )
}
