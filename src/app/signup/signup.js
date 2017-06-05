import uiRouter from 'angular-ui-router';
import { SignupComponent } from './signup.component';
import SignupConfig from './signup.config';
import Auth from '../auth/auth';
import { SignupService } from './signup.service'; 

export default 
    angular.module("signup", [uiRouter, Auth])
           .config(SignupConfig)
           .component("signup", SignupComponent)
           .service("signupService", SignupService)
           .name;
