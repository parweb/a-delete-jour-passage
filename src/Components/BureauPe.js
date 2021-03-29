import {Row, Col, Container} from 'react-bootstrap';
import React from 'react';
export default function BureauPe (props)  {

    const {bureauItem} = props;

    return (
        <Row>

                    {
                        Object.keys(bureauItem).length !==0 &&
                        <Container className="bureau-container">
    
                        <div className="title-pe">
                            <h1 className="bold">{bureauItem.nomPE}</h1>
                        </div>
                        <div className="content-pole-expert">
                            {<Row>
                                <Col md={"6"} className="address-col">
                                    <span>{bureauItem.adresseL1}</span>
                                    <span>{bureauItem.adresseL2}</span>
                                    <span>{bureauItem.adresseL3}</span>
                                    <span>{bureauItem.adresseL4}</span>
                                    <span>{bureauItem.codePostal} {bureauItem.localite}</span>
                                </Col>
                                <Col md={"6"} className="contact-col">
                                    {
                                        bureauItem.tel != null && 
                                        <span><i className="icon_phone default-color"></i> {bureauItem.tel}</span>
                                    }
                                    {
                                        bureauItem.fax != null &&
                                        <span><i className="icon_printer default-color"></i> {bureauItem.fax}</span>
                                    }
                                    {
                                        bureauItem.mail != null &&
                                        <span><i className="icon_mail default-color"></i> {bureauItem.mail}</span>
                                    }
                                    
                                    
                                </Col>
                            </Row>}
                        </div>
                    </Container>
                    }
            </Row>
    )

}