import uiRouter from 'angular-ui-router';
import { VisitManageComponent } from './visit-manage.component';
import VisitManageConfig from './visit-manage.config';
import visitManageService from './visit-manage.service';
import visitCommon from '../common/visit.common';
import DayOfWeekNameFilter from './day-of-week/day-of-week.filter';
import { DayOfWeekComponent } from './day-of-week/day-of-week.component';

export default 
    angular.module("visit.manage", [uiRouter, visitManageService, visitCommon])
           .config(VisitManageConfig)
           .component("visitManage", VisitManageComponent)
           .component("dayOfWeek", DayOfWeekComponent)
           .filter("dayOfWeekName", DayOfWeekNameFilter)
           .name;