import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Justify } from 'react-bootstrap-icons';


const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";

export default function PostDetail({match}) {
    const reviewURL = `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${API_Key}&language=en-US&page=1`
    const baseURL = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_Key}&language=en-US`
    const [detail, setDetail] = useState(
        {
            title:"",
            tagline:"",
            overview:"",
            vote_average:"",
            release_date:"",
            poster_path:"",
            backdrop_path:"",
        });

    const [review, setReview] = useState([]);
    useEffect(()=>{
        axios.get(baseURL).then(response=>(setDetail(response.data)));
        axios.get(reviewURL).then(response=>(setReview(response.data.results)))
    },[baseURL, reviewURL])
    return (
        <div /*style={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`})`, minHeight:"768px"}}*/>
            <div className="row" style={{paddingTop:"10vw"}}></div>
            <div className="row border shadow bg-light rounded p-5 mx-5">  
                <div className="col-6">
                    <img src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt="poster film" />
                </div>
                <div className="col-6">
                    <h1>{detail.title}</h1>
                    <p><i>{detail.tagline}</i></p>
                    <p>{detail.overview}</p>
                    <hr />
                </div>
                <div className="row mt-5">
                <h2 className="text-primary">Review</h2>
                {review.map((r)=>(
                            <div className="col-6">
                                <p><b>{r.author}</b></p>
                                <p style={{textAlign:"justify"}}>{r.content}</p>
                            </div>
                        ))}
                </div>
                </div>
        </div>
    )
}
