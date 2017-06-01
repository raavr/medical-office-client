import { NotificationBaseService } from '../base/notification-base.service';

export class NotificationUserService extends NotificationBaseService {

    constructor($http) {
       super($http);
    }

    getUserNotificationCount() {
        return super._getNotificationCount('/api/msgs/count');
    }
    
    getUserNotifications() {
        return super._getNotifications('/api/msgs');
    }

    markAllAsRead() {
        return super._putRequest('/api/msgs/updateall');
    }

    markAsRead(notificationId) {
        return super._putRequest('/api/msgs/update', { idmsg: notificationId });;
    }
    
}

NotificationUserService.$inject = ['$http'];