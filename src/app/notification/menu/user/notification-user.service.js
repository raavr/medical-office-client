import { NotificationBaseService } from '../common/notification-base.service';

export class NotificationUserService extends NotificationBaseService {

    constructor($http) {
        super($http);
    }

    markAllAsRead() {
        return super._putRequest('/api/notifications');
    }

    markAsRead(notificationId) {
        return super._putRequest('/api/notifications', { notificationId });;
    }
    
}

NotificationUserService.$inject = ['$http'];