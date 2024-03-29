import { AUTH_CONFIG } from './auth.constant';
import { ROLES } from './auth-roles.constant';
import { CONFIG } from '../app.constant';
import { Observable } from 'rxjs/Observable';

export class AuthService {
  constructor($http, jwtHelper) {
    this.$http = $http;
    this.jwtHelper = jwtHelper;
  }

  isDoctor() {
    const token = localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME);
    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken.hasOwnProperty('role')) {
      return false;
    }

    return decodedToken['role'] === ROLES.DOCTOR;
  }

  loggedIn() {
    const token = localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME);
    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  login(credentials) {
    return Observable.fromPromise(
      this.$http.post(CONFIG.ENDPOINT + '/auth/login', JSON.stringify(credentials), { skipAuthorization: true })
    )
    .map(data => localStorage.setItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME, data.data.token))
    .catch(error => Observable.throw(error));
  }

  logout() {
    return Observable.of(localStorage.removeItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME));
  }

}

AuthService.$inject = ['$http', 'jwtHelper'];