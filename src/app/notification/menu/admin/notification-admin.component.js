import '../base/notification-item.scss';
import template from './notification-admin.component.html';
import { NOTF_TYPE } from './notification-type.enum';

class NotificationAdminCtrl {
    
    constructor(notificationEventService, notificationAdminService, $uibModal) {
        this.notificationEventService = notificationEventService;
        this.notificationAdminService = notificationAdminService;
        this.$uibModal = $uibModal;
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

    openNotificationModal(index) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            component: 'modalAdminNotification',
            resolve: {
                notification: () => this.notifications[index]
            }  
        });

        modalInstance.result.then(
            (type) =>  {
                this.notificationEventService.updateVisitStatusEvent({ type: type, id: this.notifications[index].id});
                this.notifications.splice(index, 1);
                this.onNotificationChange();
            },
            () => {}
        );
    }
    
}

NotificationAdminCtrl.$inject = ['notificationEventService', 'notificationAdminService', '$uibModal'];

export const NotificationAdminComponent = {
    bindings: {
        onNotificationLoaded: "&",
        onNotificationChange: "&"
    },
    template: template,
    controller: NotificationAdminCtrl
}