import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class PatientBrowseService {

  constructor($http) {
    this.$http = $http;
  }

  getPatients() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/patients');
    return handleRequest(reqPromise).map(data => data.patients);
  }

}

PatientBrowseService.$inject = ['$http'];