import uiBootstrapModal from 'angular-ui-bootstrap/src/modal';
import { ModalAdminNotificationComponent } from './admin-notification/modal-admin-notification.component';
import { ModalUserNotificationComponent } from './user-notification/modal-user-notification.component';
import { ModalRejectionVisitComponent } from './rejection-of-visit/modal-rejection-visit.component';

export default 
    angular.module("modal", [ uiBootstrapModal ])
           .component("modalAdminNotification", ModalAdminNotificationComponent)
           .component("modalUserNotification", ModalUserNotificationComponent)
           .component("modalRejectionVisit", ModalRejectionVisitComponent)
           .name;