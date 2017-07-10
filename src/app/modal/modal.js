import uiBootstrapModal from 'angular-ui-bootstrap/src/modal';
import { ModalAdminNotificationComponent } from './admin-notification/modal-admin-notification.component';
import { ModalUserNotificationComponent } from './user-notification/modal-user-notification.component';
import { ModalRejectionVisitComponent } from './rejection-of-visit/modal-rejection-visit.component';
import { ModalVisitMoreInfoComponent } from './visit-more-info/visit-more-info.component';
import Auth from '../auth/auth';

export default 
    angular.module("modal", [ uiBootstrapModal, Auth ])
           .component("modalAdminNotification", ModalAdminNotificationComponent)
           .component("modalUserNotification", ModalUserNotificationComponent)
           .component("modalRejectionVisit", ModalRejectionVisitComponent)
           .component("modalVisitMoreInfo", ModalVisitMoreInfoComponent)
           .name;