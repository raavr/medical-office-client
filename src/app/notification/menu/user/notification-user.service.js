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
        return super._putRequest('/api/msgs');
    }

    markAsRead(msgId) {
        return super._putRequest('/api/msgs', { msg_id: msgId });;
    }
    
}

NotificationUserService.$inject = ['$http'];