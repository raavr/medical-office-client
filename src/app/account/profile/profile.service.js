import { CONFIG } from '../../app.constant';
import { handleRequest } from '../../app.helper';

export class ProfileService {

  constructor($http) {
    this.$http = $http;
  }

  getProfile() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/profile');
    return handleRequest(reqPromise);
  }

  updateProfile(profileData) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/profile', profileData);
    return handleRequest(reqPromise);
  }

}

ProfileService.$inject = ['$http'];