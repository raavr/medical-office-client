import { CONFIG } from '../app.constant';
import { handleRequest } from '../app.helper';

export class SignupService {

  constructor($http) {
    this.$http = $http;
  }

  signup(credentials) {
    const reqPromise = this.$http.post(CONFIG.ENDPOINT + '/auth/signup', credentials, { skipAuthorization: true });
    return handleRequest(reqPromise)
  }

}

SignupService.$inject = ['$http'];