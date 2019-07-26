import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

class VisitSignupService {
  constructor($http) {
    this.$http = $http;
  }

  getDisabledDates(doctorId) {
    const reqPromise = this.$http.get(
      CONFIG.ENDPOINT + '/api/unavailable_dates',
      { params: { doctorId } }
    );
    return Observable.fromPromise(reqPromise)
      .map(res => res.data.disabledDates)
      .catch(error => Observable.throw(error));
  }

  getAvailableTimes(date, doctorId) {
    const reqPromise = this.$http.get(
      CONFIG.ENDPOINT + '/api/available_times',
      { params: { date, doctorId } }
    );
    return handleRequest(reqPromise);
  }

  addVisit(visit) {
    const reqPromise = this.$http.post(CONFIG.ENDPOINT + '/api/visits', visit);
    return handleRequest(reqPromise);
  }

  findUsers(userName) {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/patients', {
      params: { name: userName }
    });

    const users$ = handleRequest(reqPromise).map(data => data.patients);
    return this._mapUsers(users$);
  }

  getDoctors() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/doctors');
    return this._mapUsers(handleRequest(reqPromise));
  }

  _mapUsers(users$) {
    return users$
      .flatMap(data => Observable.from(data))
      .map(data => ({ id: data.id, name: `${data.name} ${data.surname}` }))
      .toArray();
  }
}

VisitSignupService.$inject = ['$http'];

export default angular
  .module('visit.service', [])
  .service('visitSignupService', VisitSignupService).name;
