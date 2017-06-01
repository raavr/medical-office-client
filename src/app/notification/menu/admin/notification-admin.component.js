import '../base/notification-item.scss';
import template from './notification-admin.component.html';

class NotificationAdminCtrl {
    
    constructor(notificationEventService, notificationAdminService) {
        this.notificationEventService = notificationEventService;
        this.notificationAdminService = notificationAdminService;
    }

    $onInit() {
        this._initRefreshEvent();
        this._getNotification();
    }

    _getNotification() {
        this.notificationAdminService
                .getAdminNotifications()
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

    $onDestroy() {
        this.notificationEventSubscription.unsubscribe();
    }
    
}

NotificationAdminCtrl.$inject = ['notificationEventService', 'notificationAdminService'];

export const NotificationAdminComponent = {
    bindings: {
        onNotificationLoaded: "&"
    },
    template: template,
    controller: NotificationAdminCtrl
}