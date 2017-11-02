import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../../app.constant';

const ACTION_TYPE = {
    ACCEPT: 1,
    REJECT: 2
}

export class AdminActionService {

    constructor($http) {
        this.$http = $http;
    }

    rejectVisits(visits, reason) {
        return this._updateVisits(ACTION_TYPE.REJECT, visits, reason);
    }

    acceptVisits(visits) {
        return this._updateVisits(ACTION_TYPE.ACCEPT, visits);
    }

    _updateVisits(type, visits, reason) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/admin/visits/updatevisit', { type : type, visits: visits, info: reason });
		return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }


}

AdminActionService.$inject = ['$http'];