import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class NewPassService {

    constructor($http) {
        this.$http = $http;
    }

    setNewPassword(token, newPass) {
        let resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/reset/' + token, newPass);
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.message)
                         .catch(error => Observable.throw(error));
    }
    
    checkValidToken(token) {
        let resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/reset/' + token);
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.message)
                         .catch(error => Observable.throw(error));
    }

}

NewPassService.$inject = ['$http'];