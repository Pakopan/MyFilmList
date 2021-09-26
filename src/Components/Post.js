import React,{useState, useContext} from 'react'
import { Collapse } from 'reactstrap';
import {StarFill} from 'react-bootstrap-icons';
import { WatchListContext } from '../WatchListContext';
import { Link } from 'react-router-dom';

export default function Post({title, id, popularity=0, release_date="", poster_path, overview="", vote_average=0, movie, overview_visibility=true}) {
    const [sinopisFlag, setSinopsisFlag] = useState(false);
    const [, setWatchList] = useContext(WatchListContext);
    
    const addToWatchList = () => setWatchList(prev=>[...prev,movie.id]);

    let overview2=[...overview];   

    return (
        <div className="border shadow bg-light rounded ">
                <div className={title.length<20?"title-normal":"title-long"} style={{minHeight:"5vw"}}>
                    <hr></hr>
                <Link to={`/movie/${id}`} style={{textDecoration:"none"}}><b>{title}</b> </Link>
                    <hr></hr>
                </div>
                <div className="cont-ku border shadow-lg">
                    <button className="btn btn-primary btn-sm" id="watchlistBtn" onClick={addToWatchList}><b>+</b></button>
                    <img className={sinopisFlag?"sinopsis-on":""} src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt="poster film"/>
                  <Collapse className="sinopsis" isOpen={sinopisFlag}>
                        <p style={{fontSize:"small"}}>
                            {overview.length<430?overview2:
                            [...overview2.splice(0,430),"...(cont.)"]} </p>
                    </Collapse>
  
                        <div className={`p-3 row ${overview_visibility?"":"d-none"} d-flex`}>
                            <div className="col-6 align-self-start">
                                <h4> <StarFill className="pb-1" color="orange" size={40}/>{vote_average}</h4>
                            </div>
                            <div className="col-6 align-self-start ">
                            <button onClick={()=>(setSinopsisFlag(!sinopisFlag))} type="button" 
                            className="btn btn-warning btn-sm">Sinopsis</button>
                        </div>
                        </div>
                </div>
                <div  className={`pt-3 row ${overview_visibility?"":"d-none"}`} style={{minHeight:"100px"}}>
                    <h5><span className="text-danger">Popularitas : </span>{popularity}</h5>
                    <h6><span className="text-primary">Tanggal Rilis : </span>{release_date}</h6>
                </div>
        </div>
    )
}
