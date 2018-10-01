import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../../app.constant';

export class NotificationBaseService {

    constructor($http) {
        this.$http = $http;
    }

    _getRequest(url) {
        const resPromise = this.$http.get(CONFIG.ENDPOINT + url);
		return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

    _putRequest(url, data) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + url, data);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}