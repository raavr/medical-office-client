import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class AccountPasswordService {

    constructor($http) {
        this.$http = $http;
    }

    changePassword(account) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/users/me/change_pass', account);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

AccountPasswordService.$inject = ['$http'];