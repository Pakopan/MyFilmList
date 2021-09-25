import React from 'react'
import { UncontrolledCollapse, Card, CardBody, CardHeader, Button} from 'reactstrap';
export default function PageNavbar({pageNumber, onClickNextPage, onClickPrevPage, pageTotal}) {
    return (
            <div style={{width: "8vw", 
            position:"fixed", 
            zIndex:"1",
            top: "40%",
            left: "3%"
            }}>
            <Button color="primary" id="toggler" className="shadow">
                PAGE NAV
                </Button>
            <UncontrolledCollapse toggler="#toggler">
             <Card className="bg-warning">
                            <CardHeader><h5>Page</h5></CardHeader>
                    
                    <CardBody>
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
                    </CardBody>
            </Card>       
            </UncontrolledCollapse>
        </div>
    )
}
