export class NotificationBaseCtrl {

  $onInit() {
    this._initRefreshEvent();
    this._getNotifications();
  }

  _getNotifications() {
    this.notificationService
      .getNotifications()
      .do(() => this.onNotificationLoaded({ isLoading: false }))
      .subscribe(data => this.notifications = data);
  }

  _initRefreshEvent() {
    this.notificationEventSubscription =
      this.notificationEventService
        .loadNotification$
        .subscribe(() => this._getNotifications());
  }

  $onDestroy() {
    this.notificationEventSubscription.unsubscribe();
  }

}