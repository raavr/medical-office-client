import { NotificationEventService } from './notification-event.service';
import { NotificationUserService } from './menu/user/notification-user.service';
import { NotificationService } from './menu/common/notification.service';
import { NotificationSocketService } from './notification-socket.service';

export default
  angular.module("notification.service", [])
    .service("notificationEventService", NotificationEventService)
    .service("notificationService", NotificationService)
    .service("notificationUserService", NotificationUserService)
    .service('notificationSocketService', NotificationSocketService)
    .name;