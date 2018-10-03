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
import { AdminVisitComponent } from './list/visit-item/admin/admin-visit.component';
import { ItemsLimitComponent } from './list/items-limit/items-limit.component';
import { VisitSelectorComponent } from './list/visit-selector/visit-selector.component';
import { AdminActionPanelComponent } from './list/admin-action/admin-action-panel.component';
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
    .component("adminVisit", AdminVisitComponent)
    .component("itemsLimit", ItemsLimitComponent)
    .component("visitSelector", VisitSelectorComponent)
    .component("adminActionPanel", AdminActionPanelComponent)
    .name;