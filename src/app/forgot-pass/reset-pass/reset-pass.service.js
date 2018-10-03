import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class ResetPassService {

  constructor($http) {
    this.$http = $http;
  }

  resetPassword(email) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/reset', email);
    return handleRequest(reqPromise);
  }

}

ResetPassService.$inject = ['$http'];