import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

class VisitManageService {

    constructor($http) {
        this.$http = $http;
    }

    getAvailableTimesAndDisabledDates() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/weekly_times');
        return Observable.fromPromise(resPromise)
            .map(res => res.data)
            .catch(error => Observable.throw(error));
    }

    updateAvailableTimesAndDisabledDates(datetimes) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/weekly_times', datetimes);
        return Observable.fromPromise(resPromise)
            .catch(error => Observable.throw(error));
    }

}

VisitManageService.$inject = ['$http'];

export default angular.module("visit.manage.service", [])
    .service("visitManageService", VisitManageService)
    .name;