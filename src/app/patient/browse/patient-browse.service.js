import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class PatientBrowseService {

  constructor($http) {
    this.$http = $http;
  }

  getPatients() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/patients');
    return handleRequest(reqPromise);
  }

}

PatientBrowseService.$inject = ['$http'];