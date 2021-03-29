import React, { useEffect, useState, useRef } from 'react';
import {Form, Row, Col, Button, FormControl, FormLabel, FormGroup, Image} from 'react-bootstrap';
import searchIcon from '../resources/search.svg';

export default function FormBca (props)  {
    const [validated, setValidated] = useState(false);
    const [departmentSelected, setDepartmentSelected] = useState('');
    const [villeSelected, setVilleSelected] = useState('');
    const [postalInput, setPostalInput] = useState('');
    const [displayVille, setDisplayVille] = useState(false);
    const [disableInputPostal, setDisableInputPostal] = useState(false);
    const [disableSelectDepartement, setDisableSelectDepartement] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [postalCodeValid, setPostalCodeValid] = useState(Boolean);
    /*const [formData, setFormData] = useState({
        codePostal: null,
        codeDepartement: null,
        codeBureau: null,

    });*/
    const [clearInput, setClearInput] = useState(false);
    const {departmentsList, communesList, fetchVilleDept, submittedForm, screenResponsive, reset} = props;
    const selectDepartement = useRef(null);
    const selectVille= useRef(null);

    useEffect(() => {
        if(departmentSelected === ''){
            setDisplayVille(displayVille)
            setDisableInputPostal(disableInputPostal);
        } else {
            //setPostalInput('');
            setDisplayVille(displayVille);
            setDisableInputPostal(disableInputPostal);
        }

        if(departmentSelected || postalInput){
            setDisplayWarning(false);
        }
        
        postalInput ? setDisableSelectDepartement(true) : setDisableSelectDepartement(false);
    
      }, [departmentSelected, displayVille, disableInputPostal, postalInput]);
  

    const submitForm = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if(departmentSelected === '' && postalInput === ''){
            setDisplayWarning(true);
        }
        if(form.checkValidity()){
            if(isDataPostalHelper()){
                submittedForm(
                    {
                        dataFromPostalCode:
                    {
                        postalCode:postalInput,
                    }
                }
                )
            } else {
                submittedForm(
                    {
                        dataFromDepartement:
                    {
                        numDepartement:departmentSelected,
                        numBureauDistrib: villeSelected
                    }
                }) 
           }
        }
        setValidated(true);
    }

    const handleInputChange = (event) => {
        if(event) {
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name; 

        switch (name) {
            case 'codeDepartement':
                    if(value !== ""){
                        setDepartmentSelected(value);
                        fetchVilleDept(value);
                        setDisplayVille(true)
                        setDisableInputPostal(true);
                        setClearInput(true);
                    } else {
                        setDisplayVille(false)
                        setDisableInputPostal(false);
                        setClearInput(false);
                    }
                break;
            case 'codePostal' :
                setPostalInput(value);
                setClearInput(true);
                value !== "" ? setClearInput(true) : setClearInput(false);
                value.match("[a-zA-Z]") ? setPostalCodeValid(false) :  setPostalCodeValid(true);
                break;
            case 'communeSelected' :
                setVilleSelected(value);
                break;
            default:
                break;
        }
        

        
          //this.setState({[name]: value});
          
        }
      }

      function formatDepartementNumber(numero){
        
        var stringFormated = "";
        var hundredsString = "000";
        numero < 10 ? stringFormated = "0"+numero+hundredsString : stringFormated = numero+hundredsString;
        return stringFormated;

      }

      function isDataPostalHelper() {
        if(disableInputPostal)
            return false
        else
            return true        
      } 

      const clearInputValues = () => {
        //displayVille ? setDisableInputPostal(true) : setDisableInputPostal(false);
        setDisplayVille(false);
        setDisableInputPostal(false);
        setVilleSelected("");
        setPostalInput("");
        setDepartmentSelected('');
        //setClearInput(false);
        //console.log(selectVille.current.value);
        if(selectDepartement.current != null) {
            selectDepartement.current.value = "" ;
        }
        if(selectVille.current != null) {
            selectVille.current.value = "" ;
        }
        reset();
        
        
      }

    return (
        <Row>
                <Form method="GET" onSubmit={e => submitForm(e)} noValidate validated={validated} className="col-md-12">
                        <FormGroup as={Row}>
                            <FormLabel column md="2">Code Postal :</FormLabel>
                            <Col md="2">
                                <FormControl required={!disableInputPostal} id="formGriPostalCode" disabled={disableInputPostal} minLength={5} maxLength={5} pattern="[0-9]+$" name="codePostal" type="text" onChange={handleInputChange} value={postalInput} />
                                    {
                                        postalInput !== '' && postalInput.length < 5 && postalCodeValid &&
                                        <Form.Control.Feedback type="invalid">
                                            Saisie de 5 chiffres obligatoires
                                        </Form.Control.Feedback>
                                    }
                                    {
                                        !postalCodeValid &&
                                        <Form.Control.Feedback type="invalid">
                                            Champ Numérique
                                        </Form.Control.Feedback>
                                    }
                                    
                            </Col>
                            
                            <FormLabel column md="2">Ou un Département : </FormLabel>
                            <Col md="4">

                                <FormControl ref={selectDepartement} id="formGriDepartement" disabled={disableSelectDepartement} required={disableInputPostal || postalInput === ""}  name="codeDepartement" as="select" onChange={handleInputChange} >
                                     <option value=''>Veuillez séléctionner un Département</option>
                                    {   
                                        departmentsList.length > 0 && departmentsList.map((items, index) => {
                                        return (<option key={index} value={items.numero}>{items.libelle} ({formatDepartementNumber(items.numero)})</option>)
                                        })
                                    }   
                                </FormControl>
                            </Col>
                            {
                                !displayVille &&

                                <Col md="2">
                                    <Button  className="bca-btn form-sub-btn clear-inp" onClick={clearInputValues}>
                                        Réinitialiser 
                                    </Button>
                                </Col>
                            }
                        </FormGroup>
                        {
                            displayVille &&
                            <FormGroup as={Row} controlId="formGridVille">
                                <FormLabel column md="2">Ville : </FormLabel>
                                <Col md="8">
                                    <FormControl ref={selectVille} required name="communeSelected" as="select" onChange={handleInputChange} >
                                    
                                    <option value=''>Veuillez séléctionner une Ville</option>
                                    {   
                                        communesList.length > 0 && communesList.map((items, index) => {
                                            return (<option key={index} value={items.numBureauDistrib}>{items.libelle}</option>)
                                        })
                                    }

                                    </FormControl>
                                    <Form.Control.Feedback type="invalid">
                                        Vous devez sélectionner une localité
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md="2">
                                    <Button  className="bca-btn form-sub-btn clear-inp" onClick={clearInputValues}>
                                        Réinitialiser 
                                    </Button>
                                </Col>

                            </FormGroup>
                        }
                            <FormGroup as={Row} controlId="formGridReset">
                                <Col>
                                    <Button className="bca-btn form-sub-btn" type="submit">
                                        <Image src={searchIcon} alt="" />
                                        {
                                            screenResponsive != null && (screenResponsive < 480 || screenResponsive > 1024) && 
                                            ("Recherche")
                                        }
                                    </Button>
                                </Col>
                            </FormGroup>
                        

                </Form>
                {
                    displayWarning &&
                    <span>Veuillez saisir un code postal ou sélectionner un département et une localité</span>
                }
            </Row>
    )
};
