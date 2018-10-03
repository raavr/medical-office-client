import { CONFIG } from '../../../app.constant';
import { handleRequest } from '../../../app.helper';

export class PatientItemService {

  constructor($http) {
    this.$http = $http;
  }

  deletePatient(patientId) {
    const reqPromise = this.$http.delete(CONFIG.ENDPOINT + '/api/patients/' + patientId);
    return handleRequest(reqPromise);
  }

}

PatientItemService.$inject = ['$http'];