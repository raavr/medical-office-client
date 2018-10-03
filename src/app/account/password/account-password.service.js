import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class AccountPasswordService {

  constructor($http) {
    this.$http = $http;
  }

  changePassword(account) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/change_password', account);
    return handleRequest(reqPromise);
  }

}

AccountPasswordService.$inject = ['$http'];