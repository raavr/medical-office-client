import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

class VisitManageService {

  constructor($http) {
    this.$http = $http;
  }

  getAvailableTimesAndDisabledDates() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/weekly_times');
    return handleRequest(reqPromise)
      .map(data => {
        const sunday = data.weeklyVisitTimes.shift();
        return {
          times: data.times,
          disabledDates: data.disabledDates,
          weeklyVisitTimes: [...data.weeklyVisitTimes, sunday]
        }
      })
  }

  updateWeeklyTimes(weeklyVisitTimes) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/weekly_times', { weeklyVisitTimes });
    return handleRequest(reqPromise);
  }

  updateVisitsTimes(times) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/visits_times', { times });
    return handleRequest(reqPromise);
  }

  updateDisabledDates(disabledDates) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/disabled_dates', { disabledDates });
    return handleRequest(reqPromise);
  }

}

VisitManageService.$inject = ['$http'];

export default angular.module("visit.manage.service", [])
  .service("visitManageService", VisitManageService)
  .name;