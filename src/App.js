import React, { Component } from 'react';
import {Row, Col, Button, Container, Modal} from 'react-bootstrap';
import './App.css';
import BCAServices from './Services/bca.services';
import FormBca from "./Components/Form";
import BureauPe from "./Components/BureauPe";
import PassageList from "./Components/PassageList";
import bcaServices from './Services/bca.services';

class MainApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codePostal: null,
            codePays: 'F',
            codeDepartement: '',
            codeCommune: '',
            codeBureau: '',
            jourDePassage: [],
            communes: [],
            departements: [],
            bureau:{},
            communeSelected:'',
            departementSelected:'',
            isLoaded:false,
            showModal:false,
            screenWidth: null,
            notFound:false,
            postalCodeDisplay: ''
            
          
        }

        //this.submitForm = this.submitForm.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    

    

    componentDidMount() {
        BCAServices.fetchDepartements(this.state.codePays).then(res => {
            if(res.ok){
                this.setState({departements:res.body});
                this.setState({isLoaded:true});
            }
        })

        window.addEventListener("resize", this.updateWindowDimensions());
    }   
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    getListCommunes = (codeDepartement) => {
        //var postalCodesJoin;
        var jsonBody;
        BCAServices.fetchCommunes(this.state.codePays, codeDepartement).then(res => {
                if(res.ok){
                    jsonBody = res.body;
                    this.setState({communes: jsonBody})
                }
            }
        ).catch(err => {
            console.log(err.response);
        })
    }

    updateWindowDimensions = () => {
        this.setState({screenWidth: window.innerWidth});
    }

    getBureau = (codesObject) => {
        var jsonBody;
        BCAServices.fetchBureau(this.state.codePays, codesObject).ok(res => res.status < 500).then(res => {
            if(res.ok){
                jsonBody = res.body;
                this.setState({bureau:jsonBody, notFound:false})
                //console.log(res);
            } else {
                this.setState({
                    notFound:true,
                    bureau:{},
                })
            }
            
        }).catch(error => {
            var response = error.response;
            if(response.statusCode === 500){
                console.log("im error 500");
                this.setState({
                    notFound:true,
                    bureau:{},
                })
            }

        })
    }

    handleFormSubmitted = (formData) => {
        var postalCodesJoin;
        var postalCodesSubString = [];
        var postalCodesString;
        if(formData.dataFromDepartement) {
            postalCodesJoin = formData.dataFromDepartement.numDepartement + formData.dataFromDepartement.numBureauDistrib
            this.getBureau(postalCodesJoin);
            this.setState({
                codeDepartement:formData.dataFromDepartement.numDepartement, 
                codeBureau:formData.dataFromDepartement.numBureauDistrib,
            }, () => {
                this.getJoursDePassage();
            }
            );
            
        } 
        else if(formData.dataFromPostalCode) {
            postalCodesString = formData.dataFromPostalCode.postalCode;
            this.setState({postalCodeDisplay:postalCodesString})
            postalCodesSubString.push(postalCodesString.substring(0, 2))
            postalCodesSubString.push(postalCodesString.substring(postalCodesString.length - 3));
            //console.log(postalCodesSubString);
            //console.log(Number.parseInt(postalCodesSubString[0]));
            this.getBureau(formData.dataFromPostalCode.postalCode);
            this.getJoursDePassage(postalCodesSubString);
            

        }
    }

    getJoursDePassage = (params) => {
        var jsonArray;
        var jsonBody;
        if(params !== undefined || Array.isArray(params)){
            bcaServices.fetchJoursPassage(params[0], params[1]).then(res => {
                if(res.ok){
                    jsonBody = res.body;
                    jsonArray = [jsonBody];
                    this.setState({jourDePassage:jsonArray})
                } else {
                    this.setState({
                        notFound:true,
                        jourDePassage:[],
                    })
                }
            }).catch(err => {
                if(err.statusCode === 500){
                    this.setState({
                        notFound:true,
                        jourDePassage:[],
                    })
                }
            })
        }  else {
            bcaServices.fetchJoursPassage(this.state.codeDepartement, this.state.codeBureau).then(res => {
                if(res.ok){
                    jsonBody = res.body;
                    jsonArray = [jsonBody];
                    this.setState({jourDePassage:jsonArray, notFound:false})
                } else {
                    this.setState({
                        notFound:true,
                        jourDePassage:[],
                    })
                }
            }).catch(err => {
                console.log("im error 500");
                if(err.statusCode === 500){
                    this.setState({
                        notFound:true,
                        jourDePassage:[],
                    })
                }
            })
            
        }
        //bcaServices.fetchJoursPassage()
    }

    handleOpen = () => {
        this.setState({showModal:true})
    }
    handleClose = () => {
        this.setState({showModal:false, jourDePassage:[], bureau:{}})
        
    }

    handleReset = () => {
        this.setState({
            jourDePassage:[],
            bureau:{},
        })
    }


    render() {
        
        
        return (
            <div>
                <Button className="modal-expert bca-btn" variant="primary" onClick={this.handleOpen}>
                  Jours de passage de l'expert
                </Button>
                {
                    !this.state.isLoaded &&
                        <span>Loading ...</span>
                }
                {
                    this.state.isLoaded &&
                <div className="modal-main">
                    <Modal show={this.state.showModal}  onHide={this.handleClose}>
                        <Modal.Header  closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="popup-expert-main">
                            <Container>
                                <Row>
                                    <Col className="section-title">
                                        <h1 className="mt-0">Jours de passage de l'expert</h1>
                                    </Col>
                                </Row>
                                <FormBca 
                                    postalCodesBureau={this.state.codePostal} 
                                    submittedForm={this.handleFormSubmitted} 
                                    departmentsList={this.state.departements} 
                                    communesList={this.state.communes} 
                                    fetchVilleDept={this.getListCommunes}
                                    screenResponsive={this.state.screenWidth}
                                    reset={this.handleReset}
                                />
                            </Container>

                            <Container>
                                <BureauPe bureauItem={this.state.bureau} />
                                {
                                    this.state.notFound &&
                                    <span>le code postal {this.state.postalCodeDisplay} ne correspond pas à un bureau distributeur</span>
                                }
                                
                            </Container>
                            <Container>
                                <PassageList passageItems={this.state.jourDePassage} />
                            </Container>
                        </div>
                        </Modal.Body>
                    </Modal>
                </div>
                }
            </div>
                )
            }
}

export default MainApp;