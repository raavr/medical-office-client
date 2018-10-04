import { CONFIG } from '../../app.constant';
import { DoctorActionService } from './list/doctor-action/doctor-action.service';
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
  .service("doctorActionService", DoctorActionService)
  .service("visitFilterService", VisitFilterService)
  .name;