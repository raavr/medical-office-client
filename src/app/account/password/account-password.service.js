import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class AccountPasswordService {

    constructor($http) {
        this.$http = $http;
    }

    changePassword(account) {
        let resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/me/change-pass', account);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

AccountPasswordService.$inject = ['$http'];