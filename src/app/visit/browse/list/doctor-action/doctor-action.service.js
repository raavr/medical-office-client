import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../../app.constant';
import { handleRequest } from '../../../../app.helper';
import { VISIT_STATUS } from '../../../common/visit-status.constant';

export class DoctorActionService {

  constructor($http) {
    this.$http = $http;
  }

  rejectVisits(visits, reason) {
    return this._updateVisits(VISIT_STATUS.CANCELED, visits, reason);
  }

  acceptVisits(visits) {
    return this._updateVisits(VISIT_STATUS.ACCEPTED, visits);
  }

  _updateVisits(status, visits, reason) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/visits', { status, visits, info: reason });
    return handleRequest(reqPromise);
  }


}

DoctorActionService.$inject = ['$http'];