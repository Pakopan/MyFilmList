import React from 'react'
import { Spinner } from 'reactstrap'

const style = {
    display:"grid", placeItems:"center", width:"100vw", height:"100vh",
    letterSpacing:"1vw"
}

export default function LoadingPage() {
    return (
        <div style={style}> 
            <div>
                <b><h1>LOADING.....</h1></b>
                <Spinner color="primary" children="" style={{ width: '3vw', height: '3vw' }} />
            </div>
        </div>
    )
}
