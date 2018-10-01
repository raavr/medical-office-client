import { NotificationBaseService } from './notification-base.service';

export class NotificationService extends NotificationBaseService {

    constructor($http) {
       super($http);
    }

    getNotificationsCount() {
        return super._getRequest('/api/notifications/count').map((res) => res.data.count);
    }

    getNotifications() {
        return super._getRequest('/api/notifications').map((res) => res.data);
    }

}

NotificationService.$inject = ['$http'];