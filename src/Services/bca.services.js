import request from 'superagent';
import {API_URL_BASE} from '../globals'

const WEBSERVICES_BUREAU = API_URL_BASE + '/bureau/'
const WEBSERVICES_COMMUNE = API_URL_BASE + '/commune/'
const WEBSERVICES_DEPARTEMENT = API_URL_BASE + '/departement/'
const WEBSERVICES_PASSAGE = API_URL_BASE + '/jourpassage/'

class BcaServices {

    fetchBureau(codePays, codePostal) {
        return request.get(WEBSERVICES_BUREAU + codePays + '/' + codePostal);
    }

    fetchDepartements(codePays) {
        return request.get(WEBSERVICES_DEPARTEMENT + codePays);
    }

    fetchCommunes(codePays, codeDepartement) {
        return request.get(WEBSERVICES_COMMUNE + codePays + '/' + codeDepartement)
    }

    fetchJoursPassage(codeDepartement, codeBureau) {
        return request.get(WEBSERVICES_PASSAGE + codeDepartement + '/' + codeBureau)
    }



}


export default new BcaServices();