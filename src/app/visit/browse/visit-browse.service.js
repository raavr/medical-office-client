import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';
import { AdminActionService } from './list/admin-action/admin-action.service';
import { VisitFilterService } from './list/filter/visit-filter.service';

class VisitBrowseService {

    constructor($http) {
        this.$http = $http;
    }
      
    getUsersVisits(filters = {}) {
        return this._getVisits('/api/visits/browse', filters);
    }

    getPastUsersVisits(filters = {}) {
        return this._getVisits('/api/visits/browse/past', filters);
    }

    getAdminVisits(filters = {}) {
        return this._getVisits('/api/admin/visits', filters);
    }

    getPastAdminVisits(filters = {}) {
        return this._getVisits('/api/admin/visits/past', filters);
    }

    _getVisits(url, filters) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + url, { params: filters });
        return Observable.fromPromise(resPromise).map(res => res.data)
                         .catch(error => Observable.throw(error));
    }

    cancelVisit(visitId) {
        const resPromise = this.$http.delete(CONFIG.ENDPOINT + '/api/visits/delete/' + visitId);
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