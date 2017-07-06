import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class ResetPassService {

    constructor($http) {
        this.$http = $http;
    }

    resetPassword(email) {
        let resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/reset', email);
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.message)
                         .catch(error => Observable.throw(error));
    }

}

ResetPassService.$inject = ['$http'];