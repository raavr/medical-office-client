import uiRouter from 'angular-ui-router';
import uiBootstrapTimepicker from 'angular-ui-bootstrap/src/timepicker';
import { VisitManageComponent } from './visit-manage.component';
import VisitManageConfig from './visit-manage.config';
import visitManageService from './visit-manage.service';
import visitCommon from '../common/visit.common';
import DayOfWeekNameFilter from './day-of-week/day-of-week.filter';
import { DayOfWeekComponent } from './day-of-week/day-of-week.component';
import Alert from '../../alert/alert';
import { VisitTimeComponent } from './visit-time/visit-time.component';
import { DayOfWeekListComponent } from './day-of-week-list/day-of-week-list.component';
import { DisabledDateComponent } from './disabled-date/disabled-date.component';

export default
  angular.module("visit.manage", [uiRouter, uiBootstrapTimepicker, visitManageService, visitCommon, Alert])
    .config(VisitManageConfig)
    .component("visitManage", VisitManageComponent)
    .component("dayOfWeekList", DayOfWeekListComponent)
    .component("dayOfWeek", DayOfWeekComponent)
    .component("visitTime", VisitTimeComponent)
    .component("disabledDate", DisabledDateComponent)
    .filter("dayOfWeekName", DayOfWeekNameFilter)
    .name;