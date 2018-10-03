import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

class VisitManageService {

  constructor($http) {
    this.$http = $http;
  }

  getAvailableTimesAndDisabledDates() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/weekly_times');
    return handleRequest(reqPromise);
  }

  updateAvailableTimesAndDisabledDates(datetimes) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/weekly_times', datetimes);
    return handleRequest(reqPromise);
  }

}

VisitManageService.$inject = ['$http'];

export default angular.module("visit.manage.service", [])
  .service("visitManageService", VisitManageService)
  .name;