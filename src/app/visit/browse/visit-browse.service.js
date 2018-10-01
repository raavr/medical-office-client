import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';
import { AdminActionService } from './list/admin-action/admin-action.service';
import { VisitFilterService } from './list/filter/visit-filter.service';

class VisitBrowseService {

    constructor($http) {
        this.$http = $http;
    }
      
    getVisits(filters = {}) {
        return this._getVisits('/api/visits', filters);
    }

    _getVisits(url, filters) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + url, { params: filters });
        return Observable.fromPromise(resPromise).map(res => res.data)
                         .catch(error => Observable.throw(error));
    }

    cancelVisit(visitId) {
        const resPromise = this.$http.delete(CONFIG.ENDPOINT + '/api/visits/' + visitId);
		return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }


}

VisitBrowseService.$inject = ['$http'];

export default angular.module("visit.browse.service", [])
                      .service("visitBrowseService", VisitBrowseService)
                      .service("adminActionService", AdminActionService)
                      .service("visitFilterService", VisitFilterService)
                      .name;