import { NotificationAdminComponent } from './admin/notification-admin.component';
import { NotificationUserComponent } from './user/notification-user.component';
import { NotificationComponent } from './notification.component';
import Auth from '../auth/auth';

export default 
    angular.module("notification", [ Auth ])
           .component("notification", NotificationComponent)
           .component("notificationAdmin", NotificationAdminComponent)
           .component("notificationUser", NotificationUserComponent)
           .name;
