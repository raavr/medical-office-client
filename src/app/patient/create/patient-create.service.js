import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class PatientCreateService {

    constructor($http) {
        this.$http = $http;
    }

    createPatient(patient) {
        const resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/patients', patient);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

PatientCreateService.$inject = ['$http'];