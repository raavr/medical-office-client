import { handleRequest } from '../../../app.helper';
import { CONFIG } from '../../../app.constant';

export class NotificationUserService {

  constructor($http) {
    this.$http = $http;
  }

  markAllAsRead() {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/notifications');
    return handleRequest(reqPromise);
  }

  markAsRead(notificationId) {
    const reqPromise = this.$http.put(CONFIG.ENDPOINT + '/api/notifications', { notificationId });
    return handleRequest(reqPromise);
  }

}

NotificationUserService.$inject = ['$http'];