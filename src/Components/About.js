import React from 'react'
import ervan from './img/ervan.png'
import { Github } from 'react-bootstrap-icons'
import { Linkedin } from 'react-bootstrap-icons'

export default function About() {
    const imageStyle ={
        height: "80%",
        width : "auto"
    }
    return (
        <div className="row" style={{paddingTop:"10vw"}}>
            <div className="col-5 pt-5" >
                <img className="border-bottom border-dark" style={imageStyle} src={ervan} alt="ervan profile" />
            </div>
            <div className="col-7 pt-5 align-self-center" >
                <h1 style={{letterSpacing:"1vw"}}>ERVAN ANDI WIJAYA</h1>
                <h4 style={{letterSpacing:"1vw"}}>Indonesia</h4>
                <hr/>
                <div className="row">
                <a className="col-6" href="https://github.com/Pakopan"> <Github size={45} style={{paddingRight:"1%"}}/>Pakopan</a>
                <a className="col-6" href="https://www.linkedin.com/in/ervan-andi-wijaya-66b669117/">
                    <Linkedin size={45} style={{paddingRight:"1%"}}/>Ervan Andi Wijaya</a>
                </div>
            </div>
        </div>
    )
}
