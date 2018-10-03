import AuthConfig from './auth.config';
import { AuthService } from './auth.service';
import jwt from 'angular-jwt';

export default
  angular.module("auth", [jwt])
    .config(AuthConfig)
    .service("authService", AuthService)
    .name;