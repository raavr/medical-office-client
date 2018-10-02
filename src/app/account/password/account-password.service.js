import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class AccountPasswordService {

  constructor($http) {
    this.$http = $http;
  }

  changePassword(account) {
    const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/change_password', account);
    return Observable.fromPromise(resPromise)
      .map(res => res.data)
      .catch(error => Observable.throw(error));
  }

}

AccountPasswordService.$inject = ['$http'];