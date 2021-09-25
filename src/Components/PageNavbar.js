import React from 'react'
import { UncontrolledCollapse, Card, CardBody, CardHeader, Button} from 'reactstrap';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
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
                    <CardBody>
                        <h1>{pageNumber}</h1>
                        <p>of {pageTotal}</p>
                        <div className="row">
                            <div className="col-6">
                                <ArrowLeftCircleFill className="pageNav" onClick={onClickPrevPage} style={{cursor:"pointer"}}
                                size={22} />
                            </div>
                            <div className="col-6">
                            <ArrowRightCircleFill className="pageNav" onClick={onClickNextPage} style={{cursor:"pointer"}} size={22}/>
                            </div>
                        </div>
                    </CardBody>
            </Card>       
            </UncontrolledCollapse>
        </div>
    )
}
