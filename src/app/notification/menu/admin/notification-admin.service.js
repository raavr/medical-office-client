import { NotificationBaseService } from '../base/notification-base.service';

export class NotificationAdminService extends NotificationBaseService {

    constructor($http) {
       super($http);
    }

    getAdminNotificationCount() {
        return super._getNotificationCount('/api/admin/msgs/count');
    }

    getAdminNotifications() {
        return super._getNotifications('/api/admin/msgs');
    }

}

NotificationAdminService.$inject = ['$http'];