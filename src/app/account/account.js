import uiRouter from 'angular-ui-router';
import Auth from '../auth/auth';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountPasswordComponent } from './password/account-password.component';
import AccountConfig from './account.config';
import { ProfileService } from './profile/profile.service';
import { AccountPasswordService } from './password/account-password.service';
import PasswordMatch from './password/password-match.directive';

export default 
    angular.module("account", [ uiRouter, Auth ])
           .config(AccountConfig)
           .component("account", AccountComponent)
           .component("profile", ProfileComponent)
           .component("accountPassword", AccountPasswordComponent)
           .service("profileService", ProfileService)
           .service("accountPasswordService", AccountPasswordService)
           .directive("passwordMatch", PasswordMatch)
           .name;
