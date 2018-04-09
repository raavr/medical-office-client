import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

class VisitManageService {

    constructor($http) {
        this.$http = $http;
    }

    getUnavailableDates() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/admin/visits/disabled_dates');
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.disabled_dates)
                         .mergeMap(res => Observable.from(res))
                         .map(a => a.disabledate)
                         .toArray()
                         .catch(error => Observable.throw(error));
    }

    getAvailableVisitTimes() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/admin/visits/weeks_times');
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.weeks_times)
                         .catch(error => Observable.throw(error));
    }

    updateAvailableVisitTimes(dates, times) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/admin/visits/weeks_times', { dates: dates, times : times });
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

VisitManageService.$inject = ['$http'];

export default angular.module("visit.manage.service", [])
                      .service("visitManageService", VisitManageService)
                      .name;