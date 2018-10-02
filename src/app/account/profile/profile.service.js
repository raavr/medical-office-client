import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.constant';
import { mapRequest } from '../../app.helper';

export class ProfileService {

  constructor($http) {
    this.$http = $http;
  }

  getProfile() {
    const resPromise = this.$http.get(CONFIG.ENDPOINT + '/api/profile');
    return mapRequest(resPromise);
  }

  updateProfile(profileData) {
    const resPromise = this.$http.put(CONFIG.ENDPOINT + '/api/profile', profileData);
    return mapRequest(resPromise);
  }

}

ProfileService.$inject = ['$http'];