import { NotificationDoctorComponent } from './menu/doctor/notification-doctor.component';
import { NotificationUserComponent } from './menu/user/notification-user.component';
import { NotificationComponent } from './notification.component';
import { NotificationMenuComponent } from './menu/notification-menu.component';
import NotificationClickOutside from './notification-click-outside.directive';
import NotificationTypeFilter from './menu/user/notification-user.filter';
import NotifcationService from './notification.service';
import Auth from '../auth/auth';
import Modal from '../modal/modal';

export default
  angular.module("notification", [Auth, NotifcationService, Modal])
    .component("notification", NotificationComponent)
    .component("notificationMenu", NotificationMenuComponent)
    .component("notificationDoctor", NotificationDoctorComponent)
    .component("notificationUser", NotificationUserComponent)
    .directive("notificationClickOutside", NotificationClickOutside)
    .filter("notificationTypeFilter", NotificationTypeFilter)
    .name;
