import uiRouter from 'angular-ui-router';
import HomeConfig from './home.config';
import { HomeComponent } from './home.component';

export default 
    angular.module("home", [uiRouter])
           .config(HomeConfig)
           .component("home", HomeComponent)
           .name;
