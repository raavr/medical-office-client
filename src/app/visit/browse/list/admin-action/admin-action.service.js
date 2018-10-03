import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../../app.constant';
import { handleRequest } from '../../../../app.helper';

const ACTION_TYPE = {
  ACCEPT: 'accepted',
  REJECT: 'canceled'
}

export class AdminActionService {

  constructor($http) {
    this.$http = $http;
  }

  rejectVisits(visits, reason) {
    return this._updateVisits(ACTION_TYPE.REJECT, visits, reason);
  }

  acceptVisits(visits) {
    return this._updateVisits(ACTION_TYPE.ACCEPT, visits);
  }

  _updateVisits(status, visits, reason) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/visits', { status, visits, info: reason });
    return handleRequest(reqPromise);
  }


}

AdminActionService.$inject = ['$http'];