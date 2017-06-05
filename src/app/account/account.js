import uiRouter from 'angular-ui-router';
import Auth from '../auth/auth';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import AccountConfig from './account.config';
import { ProfileService } from './profile/profile.service';

export default 
    angular.module("account", [ uiRouter, Auth ])
           .config(AccountConfig)
           .component("account", AccountComponent)
           .component("profile", ProfileComponent)
           .service("profileService", ProfileService)
           .name;
