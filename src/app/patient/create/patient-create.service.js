import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class PatientCreateService {

  constructor($http) {
    this.$http = $http;
  }

  createPatient(patient) {
    const reqPromise = this.$http.post(CONFIG.ENDPOINT + '/api/patients', patient);
    return handleRequest(reqPromise);
  }

}

PatientCreateService.$inject = ['$http'];