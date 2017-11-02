import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';
import { AdminActionService } from './list/admin-action/admin-action.service';

class VisitBrowseService {

    constructor($http) {
        this.$http = $http;
    }
      
    getUsersVisits() {
        return this._getVisits('/api/visits/browse');
    }

    getPastUsersVisits() {
        return this._getVisits('/api/visits/browse/past');
    }

    getAdminVisits() {
        return this._getVisits('/api/admin/visits');
    }

    getPastAdminVisits() {
        return this._getVisits('/api/admin/visits/past');
    }

    _getVisits(url) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + url);
        return Observable.fromPromise(resPromise).map(res => res.data.vs)
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
                      .name;