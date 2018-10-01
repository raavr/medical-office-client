import '../common/notification-item.scss';
import template from './notification-user.component.html';

class NotificationUserCtrl {
    constructor(notificationEventService, notificationService, notificationUserService, $uibModal) {
        this.notificationEventService = notificationEventService;
        this.notificationService = notificationService;
        this.notificationUserService = notificationUserService;
        this.$uibModal = $uibModal;
    }

    $onInit() {
        this._initRefreshEvent();
        this._getNotifications();
    }

    _getNotifications() {
        this.notificationService
            .getNotifications()
            .do(() => this.onNotificationLoaded({isLoading: false}))
            .subscribe(data => this.notifications = data);
    }

    _initRefreshEvent() {
        this.notificationEventSubscription = 
            this.notificationEventService
                .loadNotificationObservable
                .subscribe(() => this._getNotifications());
    }

    markAsRead(notification) {
        this.notificationUserService
            .markAsRead(notification.notification.id)
            .subscribe(
                () => { 
                    let idx = this.notifications.findIndex((notf) => notf === notification);
                    this.notifications.splice(idx, 1);
                    this.notificationEventService.refreshNotificationCount();
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
                    this.notificationEventService.refreshNotificationCount();
                },
                (err) => console.log(err)
            );
    }

    $onDestroy() {
        this.notificationEventSubscription.unsubscribe();
    }

    openNotificationModal(index) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            component: 'modalUserNotification',
            resolve: {
                notification: () => this.notifications[index]
            }  
        });

        modalInstance.result.then(
            () =>  this.markAsRead(this.notifications[index]),
            () => {}
        );
    }

    
}

NotificationUserCtrl.$inject = ['notificationEventService', 'notificationService', 'notificationUserService', '$uibModal'];

export const NotificationUserComponent = {
    bindings: {
        onNotificationLoaded: "&"
    },
    template: template,
    controller: NotificationUserCtrl
}