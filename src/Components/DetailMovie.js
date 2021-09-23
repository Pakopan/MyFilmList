import React from 'react'
import { Justify } from 'react-bootstrap-icons'
import {StarFill} from 'react-bootstrap-icons';

export default function DetailMovie({overview, release_date}) {
    return (
        <div>
            <div className="row d-flex">
                <div className="col-6 align-self-center">
                    <h5>Release Date:<br></br> <b className="bg-success text-light">{release_date}</b></h5>
                </div>
                <div className="col-6 align-self-center">
                    <h4> <StarFill className="pb-1" color="orange" size={40}/> <b>9.8</b></h4>
                </div>
            </div>
            <hr></hr>
            <p style={{textAlign:"Justify"}}>{overview}</p>
            <hr></hr>
        </div>
    )
}
