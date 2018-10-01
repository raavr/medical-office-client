import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';

export class ProfileService {

    constructor($http) {
        this.$http = $http;
    }

    getProfile() {
		const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/profile');
        return Observable.fromPromise(resPromise)
                         .map(res => res.data)
                         .catch(error => Observable.throw(error));
	}

    updateProfile(profileData) {
        const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/profile', profileData);
        return Observable.fromPromise(resPromise)
                         .catch(error => Observable.throw(error));
    }

}

ProfileService.$inject = ['$http'];