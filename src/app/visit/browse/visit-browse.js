import uiRouter from 'angular-ui-router';
import uiBootstrapBtns from 'angular-ui-bootstrap/src/buttons';
import uiBootstrapPagination from 'angular-ui-bootstrap/src/pagination';
import uiBootstrapTooltip from 'angular-ui-bootstrap/src/tooltip';
import uiBootstrapPopover from 'angular-ui-bootstrap/src/popover';
import VisitBrowseConfig from './visit-browse.config';
import { VisitBrowseComponent } from './visit-browse.component';
import { VisitListComponent } from './list/visit-list.component';
import { VisitListHeaderComponent } from './list/list-header/visit-list-header.component';
import { VisitFilterComponent } from './list/filter/visit-filter.component';
import { UserVisitComponent } from './list/visit-item/user/user-visit.component';
import { DoctorVisitComponent } from './list/visit-item/doctor/doctor-visit.component';
import { ItemsLimitComponent } from './list/items-limit/items-limit.component';
import { DoctorActionPanelComponent } from './list/doctor-action/doctor-action-panel.component';
import visitBrowseService from './visit-browse.service';
import Auth from '../../auth/auth';
import Modal from '../../modal/modal';

export default
  angular.module("visit.browse", [
    Auth,
    uiRouter,
    uiBootstrapBtns,
    uiBootstrapPagination,
    uiBootstrapTooltip,
    uiBootstrapPopover,
    visitBrowseService,
    Modal
  ]).config(VisitBrowseConfig)
    .component("visitBrowse", VisitBrowseComponent)
    .component("visitList", VisitListComponent)
    .component("visitListHeader", VisitListHeaderComponent)
    .component("visitFilter", VisitFilterComponent)
    .component("userVisit", UserVisitComponent)
    .component("doctorVisit", DoctorVisitComponent)
    .component("itemsLimit", ItemsLimitComponent)
    .component("doctorActionPanel", DoctorActionPanelComponent)
    .name;