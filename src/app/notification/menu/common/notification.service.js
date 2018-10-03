import { handleRequest } from '../../../app.helper';
import { CONFIG } from '../../../app.constant';

export class NotificationService {

  constructor($http) {
    this.$http = $http;
  }

  getNotificationsCount() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/notifications/count');
    return handleRequest(reqPromise);
  }

  getNotifications() {
    const reqPromise = this.$http.get(CONFIG.ENDPOINT + '/api/notifications');
    return handleRequest(reqPromise);
  }

}

NotificationService.$inject = ['$http'];