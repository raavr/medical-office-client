import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class NewPassService {

  constructor($http) {
    this.$http = $http;
  }

  setNewPassword(token, newPass) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/reset/' + token, newPass);
    return handleRequest(reqPromise);
  }

  checkValidToken(token) {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/reset/' + token);
    return handleRequest(reqPromise);
  }

}

NewPassService.$inject = ['$http'];