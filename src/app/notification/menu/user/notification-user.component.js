import '../base/notification-item.scss';
import template from './notification-user.component.html';

class NotificationUserCtrl {
    constructor(notificationEventService, notificationUserService) {
        this.notificationEventService = notificationEventService;
        this.notificationUserService = notificationUserService;
    }

    $onInit() {
        this._initRefreshEvent();
        this._getNotification();
    }

    _getNotification() {
        this.notificationUserService
                .getUserNotifications()
                .subscribe((data) => { 
                    this.notifications = data; 
                    this.onNotificationLoaded({isLoading: false})
                });
    }

    _initRefreshEvent() {
        this.notificationEventSubscription = 
            this.notificationEventService
                .loadNotificationObservable
                .subscribe(
                    () => { this._getNotification(); }
                );
    }

    markAsRead(notificationId) {
       this.notificationUserService
                .markAsRead(notificationId)
                .subscribe(
                    () => { 
                        let idx = this.notifications.findIndex((notf) => notf.id === notificationId);
                        this.notifications.splice(idx, 1);
                        this.onNotificationReaded();
                    },
                    (err) => console.log(err)
                );
    }

    markAllAsRead() {
        this.notificationUserService
                .markAllAsRead()
                .subscribe(
                    () => { 
                        this.notifications = [];
                        this.onNotificationReaded();
                    },
                    (err) => console.log(err)
                );
    }

    $onDestroy() {
        this.notificationEventSubscription.unsubscribe();
    }
    
}

NotificationUserCtrl.$inject = ['notificationEventService', 'notificationUserService'];

export const NotificationUserComponent = {
    bindings: {
        onNotificationLoaded: "&",
        onNotificationReaded: "&"
    },
    template: template,
    controller: NotificationUserCtrl
}