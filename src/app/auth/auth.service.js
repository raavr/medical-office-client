import { AUTH_CONFIG } from './auth.constant';
import { CONFIG } from '../app.constant';
import { Observable } from 'rxjs/Observable';

export class AuthService {
    constructor($http, jwtHelper) {
        this.$http = $http;
        this.jwtHelper = jwtHelper;
    }

    isAdmin() {
      let token = localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME);

      if(!token) {
        return false;
      }
      
      let decodedToken = this.jwtHelper.decodeToken(token);
      
      if (!decodedToken.hasOwnProperty('role')) {
        return null;
      }

      return decodedToken['role'] === 'admin';
    }

    loggedIn() {
        let token = localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME);
        
        if(!token) {
            return false;
        }

        return !this.jwtHelper.isTokenExpired(token);
    }

    login(credentials) {
        return Observable.fromPromise(this.$http
            .post(CONFIG.ENDPOINT + '/auth/login', JSON.stringify(credentials), { skipAuthorization: true }))
            .map(data => localStorage.setItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME, data.data.token));
    }

    logout() {
        return Observable.of(localStorage.removeItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME));
    }

}

AuthService.$inject = ['$http', 'jwtHelper'];