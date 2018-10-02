import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

class VisitSignupService {

    constructor($http) {
        this.$http = $http;
    }

    getDisabledDates(doctorId) {
		const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/unavailable_dates', { params: { doctorId }});
        return Observable.fromPromise(resPromise)
            .map(res => res.data.disabledDates)
            .catch(error => Observable.throw(error));
	}

    getAvailableTimes(date, doctorId) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/available_times', { params: { date, doctorId }});
        return Observable.fromPromise(resPromise)
                         .map(res => res.data)
                         .catch(error => Observable.throw(error));
    }

    addVisit(visit) {
         const resPromise = this.$http.post(CONFIG.ENDPOINT + '/api/visits', visit);
         return Observable.fromPromise(resPromise)
                          .catch(error => Observable.throw(error));
    }

    findUsers(userName) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/patients', { params: { name : userName}});
        return this._getUsers(resPromise);
    }

    getDoctors() {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/doctors');
        return this._getUsers(resPromise);
    }

    _getUsers(resPromise) {
        return Observable.fromPromise(resPromise)
            .map(res => res.data)
            .flatMap(data => Observable.from(data))
            .map(data => ({ id: data.id, name: `${data.name} ${data.surname}`}))
            .toArray()
            .catch(error => Observable.throw(error));
    }

}

VisitSignupService.$inject = ['$http'];

export default angular.module("visit.service", [])
                      .service("visitSignupService", VisitSignupService)
                      .name;