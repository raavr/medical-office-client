import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

class VisitSignupService {

    constructor($http) {
        this.$http = $http;
    }

    getDisabledDates() {
		let resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/visits');
        return Observable.fromPromise(resPromise).map(res => res.data.vts)
            .mergeMap(res => Observable.from(res))
            .map(a => a.date_visit)
            .toArray()
            .catch(error => Observable.throw(error));
	}

    getAvailableTimes(date) {
        let resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/visits/times', { visittime : date });
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.ts)
                         .catch(error => Observable.throw(error));
    }

    addVisit(visit) {
         let resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/visits/check', visit);
         return Observable.fromPromise(resPromise)
                          .catch(error => Observable.throw(error));
    }

    findUsers(userName) {
        let resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/admin/usersbyname', {val : userName});
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.us)
                         .catch(error => Observable.throw(error));
    }
}

VisitSignupService.$inject = ['$http'];

export default angular.module("visit.service", [])
                      .service("visitSignupService", VisitSignupService)
                      .name;