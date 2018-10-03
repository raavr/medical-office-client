import uiRouter from 'angular-ui-router';
import { LoginComponent } from './login.component';
import LoginConfig from './login.config';
import Auth from '../auth/auth';

export default
  angular.module("login", [uiRouter, Auth])
    .config(LoginConfig)
    .component("login", LoginComponent)
    .name;
