import "./notification.component.scss";
import template from "./notification.component.html";

class NotificationController {
  constructor(notificationService, notificationEventService) {
    this.notificationService = notificationService;
    this.notificationEventService = notificationEventService;
  }

  $onInit() {
    this.getNotificationsCount();
    this.isNotificationPanelOpen = false;

    this.notificationEventSubscription =
      this.notificationEventService
        .refreshNotificationCount$
        .subscribe(() => this.getNotificationsCount());

    this.notificationMenuHidingSubscription =
      this.notificationEventService
        .hideNotificationMenuSource$
        .filter(() => this.isNotificationPanelOpen)
        .subscribe(() => this.isNotificationPanelOpen = false);
  }

  getNotificationsCount() {
    this.notificationService
      .getNotificationsCount()
      .subscribe((data) => this.notificationsCount = data.count);
  }

  toggleNotificationMenu() {
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
    if (this.isNotificationPanelOpen) {
      this.getNotificationsCount();
    }
  }

  $onDestroy() {
    this.notificationEventSubscription.unsubscribe();
    this.notificationMenuHidingSubscription.unsubscribe();
  }
}

NotificationController.$inject = ['notificationService', 'notificationEventService'];

export const NotificationComponent = {
  template,
  controller: NotificationController
}