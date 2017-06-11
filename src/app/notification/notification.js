import { NotificationAdminComponent } from './menu/admin/notification-admin.component';
import { NotificationUserComponent } from './menu/user/notification-user.component';
import { NotificationComponent } from './notification.component';
import { NotificationMenuComponent } from './menu/notification-menu.component';
import { ModalUserNotificationComponent } from './menu/user/modal/modal-user-notification.component';
import { ModalAdminNotificationComponent } from './menu/admin/modal/modal-admin-notification.component';
import NotificationClickOutside from './notification-click-outside.directive';
import NotificationTypeFilter from './menu/user/notification-user.filter';
import NotifcationService from './notification.service';
import Auth from '../auth/auth';
import uiBootstrapModal from 'angular-ui-bootstrap/src/modal';

export default 
    angular.module("notification", [ Auth, NotifcationService, uiBootstrapModal ])
           .component("notification", NotificationComponent)
           .component("notificationMenu", NotificationMenuComponent)
           .component("notificationAdmin", NotificationAdminComponent)
           .component("notificationUser", NotificationUserComponent)
           .component("modalUserNotification", ModalUserNotificationComponent)
           .component("modalAdminNotification", ModalAdminNotificationComponent)
           .directive("notificationClickOutside", NotificationClickOutside)
           .filter("notificationTypeFilter", NotificationTypeFilter)
           .name;
