import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

class VisitSignupService {

    constructor($http) {
        this.$http = $http;
    }

    getDisabledDates(doctorId) {
		const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/visits/disabled_dates', { params: { doctor_id: doctorId }});
        return Observable.fromPromise(resPromise).map(res => res.data.disabled_dates)
            .mergeMap(res => Observable.from(res))
            .map(a => a.date_visit)
            .toArray()
            .catch(error => Observable.throw(error));
	}

    getAvailableTimes(date, doctorId) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/visits/times', { params: { date : date, doctor_id: doctorId }});
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.datetimes)
                         .catch(error => Observable.throw(error));
    }

    addVisit(visit) {
         const resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/visits', visit);
         return Observable.fromPromise(resPromise)
                          .catch(error => Observable.throw(error));
    }

    findUsers(userName) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/users/patients', { params: { name : userName}});
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.users)
                         .catch(error => Observable.throw(error));
    }

    getDoctors() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/users/doctors');
        return Observable.fromPromise(resPromise)
                         .map(res => res.data.doctors)
                         .catch(error => Observable.throw(error));
    }

}

VisitSignupService.$inject = ['$http'];

export default angular.module("visit.service", [])
                      .service("visitSignupService", VisitSignupService)
                      .name;