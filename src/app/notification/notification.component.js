import "./notification.component.scss";
import template from "./notification.component.html";

const RING_ANIM_TIMEOUT = 20000;

class NotificationController {
  constructor(notificationService, notificationEventService, $scope, $timeout) {
    this.notificationService = notificationService;
    this.notificationEventService = notificationEventService;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.animTimeout = null;
  }

  $onInit() {
    this.isNotificationPanelOpen = false;
    this.notificationCountChanged = false;

    this.notificationEventSubscription =
      this.notificationEventService
        .refreshNotificationCount$
        .subscribe(count => this.updateNotificationCount(count));

    this.notificationMenuHidingSubscription =
      this.notificationEventService
        .hideNotificationMenuSource$
        .filter(() => this.isNotificationPanelOpen)
        .subscribe(() => this.isNotificationPanelOpen = false);
  }

  updateNotificationCount(count) {
    if (count > this.notificationsCount) {
      this._runNotificationBellAnim();
    }
    this.$scope.$applyAsync(() => this.notificationsCount = count);
  }

  _runNotificationBellAnim() {
    this.notificationCountChanged = true;
    this.$timeout.cancel(this.animTimeout);
    this.animTimeout = this.$timeout(
      () => this.notificationCountChanged = false,
      RING_ANIM_TIMEOUT
    );
  }

  _stopNotificationBellAnim() {
    this.notificationCountChanged = false;
    this.$timeout.cancel(this.animTimeout);
  }

  toggleNotificationMenu() {
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
    this._stopNotificationBellAnim();
  }

  $onDestroy() {
    this.notificationEventSubscription.unsubscribe();
    this.notificationMenuHidingSubscription.unsubscribe();
  }
}

NotificationController.$inject = ['notificationService', 'notificationEventService', '$scope', '$timeout'];

export const NotificationComponent = {
  template,
  controller: NotificationController
}