import { NotificationAdminComponent } from './menu/admin/notification-admin.component';
import { NotificationUserComponent } from './menu/user/notification-user.component';
import { NotificationComponent } from './notification.component';
import { NotificationMenuComponent } from './menu/notification-menu.component';
import NotifcationService from './notification.service';
import Auth from '../auth/auth';

export default 
    angular.module("notification", [ Auth, NotifcationService ])
           .component("notification", NotificationComponent)
           .component("notificationMenu", NotificationMenuComponent)
           .component("notificationAdmin", NotificationAdminComponent)
           .component("notificationUser", NotificationUserComponent)
           .name;
