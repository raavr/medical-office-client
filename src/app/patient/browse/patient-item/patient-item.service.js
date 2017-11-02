import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../app.constant';

export class PatientItemService {

    constructor($http) {
        this.$http = $http;
    }
    
    deletePatient(patientId) {
        const resPromise = this.$http.delete(CONFIG.ENDPOINT + '/api/admin/users/' + patientId);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

PatientItemService.$inject = ['$http'];