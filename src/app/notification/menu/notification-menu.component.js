import './notification-menu.component.scss';
import template from './notification-menu.component.html';

class NotificationMenuCtrl {
  constructor(authService, notificationEventService) {
    this.authService = authService;
    this.notificationEventService = notificationEventService;
  }

  $onInit() {
    this.setLoading(true);
  }

  refreshNotificationEvent() {
    this.notificationEventService.loadNotificationEvent();
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

}

NotificationMenuCtrl.$inject = ['authService', 'notificationEventService'];

export const NotificationMenuComponent = {
  template,
  controller: NotificationMenuCtrl
}