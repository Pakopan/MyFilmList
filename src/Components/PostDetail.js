import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { TagsFill, CalendarFill, Megaphone, StarFill, PeopleFill  } from 'react-bootstrap-icons';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import LoadingPage from './LoadingPage';

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
export default function PostDetail({match}) {
    const reviewURL = `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${API_Key}&language=en-US&page=1`
    const baseURL = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_Key}&language=en-US`
    const videoURL = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_Key}&language=en-US`
    const [detail, setDetail] = useState(
        {
            title:"-",
            tagline:"-",
            overview:"-",
            genres: [],
            vote_average:"-",
            release_date:"-",
            poster_path:"-",
            backdrop_path:"-",
            popularity:"-",
            vote_count:"-",
        });
    const [review, setReview] = useState([]);
    const [video, setVideo] = useState ("");
    const [isPageLoading, setIsLoadingPage] = useState(true);

    useEffect(()=>{
        axios.get(baseURL).then(response=>{
            setDetail(response.data);
        });;
        axios.get(reviewURL).then(response=>{
            setReview(response.data.results)
            
        });
        axios.get(videoURL).then(response=>{
            setVideo(response.data.results[0].key);
            setIsLoadingPage(false); 
        });
    },[baseURL, reviewURL, videoURL])

    if (isPageLoading) return <LoadingPage/>
    else return (
        <div style={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`})`, minHeight:"768px"}}>
            <div className="row" style={{paddingTop:"10vw"}}></div>
            <div className="row border shadow bg-light rounded p-5 mx-5">  
                <div className="col-6">
                    <img src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt="poster film" />
                </div>
                <div className="col-6">
                    <h1>{detail.title}</h1>
                    <p><i>"{detail.tagline}"</i></p>
                    <p>{detail.overview}</p>
                    <hr />
                    <div style={{textAlign:"left"}}>
                        <p><TagsFill color="#d9534f" size={25}/> <b>Genre : </b>
                            {detail.genres.map((genre, index)=>(
                                <span> {`${genre.name}${index<detail.genres.length-1?",":""}`}</span>
                            ))}
                        </p>
                        <p><CalendarFill color="#5bc0de" size={25}/> <b>Release Date : </b>{detail.release_date}</p>
                        <p><Megaphone color='#5cb85c' size={25}/> <b>Popularity : </b>{detail.popularity}</p>
                        <p><b><PeopleFill color="#0275d8" size={25}/> Vote Count : </b> {detail.vote_count}</p>
                        <p><StarFill color="#f0ad4e" size={25}/><b> Vote Average : </b>{detail.vote_average}</p>
                        <iframe title="film trailer" src={`https://www.youtube.com/embed/${video}`} width="520" height="315" frameborder="0"></iframe>
                    </div>
                    <hr />
                </div>
                <div className="row mt-5">
                <h2><b>{`${review.length===0?"":"Review"}`}</b></h2>
                <hr />
                {
                    review.map((r, index)=>(
                                <div className="col-6" style={{paddingBottom:"1vw"}}>
                                    <h4><b>{r.author}&emsp;</b> 
                                    <span className="bg-dark text-white"><StarFill size={25}/> 
                                        {`${r.author_details.rating===null?"-":r.author_details.rating}`}</span></h4>
                                    <button className="btn btn-primary btn-sm" id={`togglerReview${index}`}>read</button>
                                    <UncontrolledCollapse toggler={`#togglerReview${index}`}>
                                        <Card className="bg-light">
                                            <CardBody>
                                                <p style={{textAlign:"justify"}}>{r.content}</p>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                            ))
                }
                </div>
                </div>
        </div>
    )
}
