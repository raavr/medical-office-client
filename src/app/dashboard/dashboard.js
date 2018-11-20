import DashboardConfig from "./dashboard.config";
import { DashboardComponent } from "./dashboard.component";
import uiRouter from 'angular-ui-router';
import Auth from '../auth/auth';

export default
  angular.module("dashboard", [
    Auth,
    uiRouter,
  ]).config(DashboardConfig)
    .component("dashboard", DashboardComponent)
    .name;