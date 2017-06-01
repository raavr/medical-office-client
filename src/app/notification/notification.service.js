import { NotificationEventService } from './notification-event.service';
import { NotificationAdminService } from './menu/admin/notification-admin.service';
import { NotificationUserService } from './menu/user/notification-user.service';

export default angular.module("notification.service", [])
                      .service("notificationEventService", NotificationEventService)
                      .service("notificationAdminService", NotificationAdminService)
                      .service("notificationUserService", NotificationUserService)
                      .name;