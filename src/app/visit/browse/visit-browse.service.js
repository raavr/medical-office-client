import { CONFIG } from '../../app.constant';
import { AdminActionService } from './list/admin-action/admin-action.service';
import { VisitFilterService } from './list/filter/visit-filter.service';
import { handleRequest } from '../../app.helper';

class VisitBrowseService {

  constructor($http) {
    this.$http = $http;
  }

  getVisits(filters = {}) {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/visits', { params: filters });
    return handleRequest(reqPromise);
  }

  cancelVisit(visitId) {
    const reqPromise = this.$http.delete(CONFIG.ENDPOINT + '/api/visits/' + visitId);
    return handleRequest(reqPromise);
  }


}

VisitBrowseService.$inject = ['$http'];

export default angular.module("visit.browse.service", [])
  .service("visitBrowseService", VisitBrowseService)
  .service("adminActionService", AdminActionService)
  .service("visitFilterService", VisitFilterService)
  .name;