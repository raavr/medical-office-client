import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../app.constant';

export class NotificationBaseService {

    constructor($http) {
        this.$http = $http;
    }

    _getNotificationCount(url) {
        return this._getRequest(url)
            .map((res) => res.data.count);
    }

    _getNotifications(url) {
		return this._getRequest(url)
                   .map((res) => res.data.ms);
    }

    _getRequest(url) {
        let resPromise = this.$http.get(CONFIG.ENDPOINT + url);
		return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

    _putRequest(url, data) {
        let resPromise = this.$http.put(CONFIG.ENDPOINT + url, data);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}