import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class PatientCreateService {

    constructor($http) {
        this.$http = $http;
    }

    createPatient(patient) {
        let resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/admin/create-patient', {patient: patient});
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

PatientCreateService.$inject = ['$http'];