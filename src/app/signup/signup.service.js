import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../app.constant';

export class SignupService {

    constructor($http) {
        this.$http = $http;
    }

    signup(credentials) {
        let resPromise = this.$http.post(CONFIG.ENDPOINT + '/auth/signup', credentials, { skipAuthorization: true });
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

SignupService.$inject = ['$http'];