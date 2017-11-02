import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class NewPassService {

    constructor($http) {
        this.$http = $http;
    }

    _transformPromise(httpPromise) {
        return Observable.fromPromise(httpPromise)
                .map(res => res.data.message)
                .catch(error => Observable.throw(error));
    }

    setNewPassword(token, newPass) {
        const resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/reset/' + token, newPass);
        return this._transformPromise(resPromise);
    }
    
    checkValidToken(token) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/reset/' + token);
        return this._transformPromise(resPromise);
    }

}

NewPassService.$inject = ['$http'];