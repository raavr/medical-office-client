import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class PatientBrowseService {

    constructor($http) {
        this.$http = $http;
    }

    getPatients() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/admin/users/patients');
        return Observable.fromPromise(resPromise)
                         .map((res) => res.data.users)
                         .catch(error => Observable.throw(error));
    }

}

PatientBrowseService.$inject = ['$http'];