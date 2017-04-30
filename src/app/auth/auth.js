import AuthConfig from './auth.config';
import { AuthService } from './auth.service';

export default angular.module("auth", ['angular-jwt'])
.config(AuthConfig)
.service("authService", AuthService)
.name;