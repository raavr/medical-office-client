import uiRouter from 'angular-ui-router';
import { SignupComponent } from './signup.component';
import SignupConfig from './signup.config';
import Auth from '../auth/auth';
import { SignupService } from './signup.service'; 
import Alert from '../alert/alert';
import PasswordMatch from '../account/password/password-match';

export default 
    angular.module("signup", [uiRouter, Auth, Alert, PasswordMatch])
           .config(SignupConfig)
           .component("signup", SignupComponent)
           .service("signupService", SignupService)
           .name;
