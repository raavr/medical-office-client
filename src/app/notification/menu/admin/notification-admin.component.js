import '../base/notification-item.scss';
import template from './notification-admin.component.html';
import { NOTF_TYPE } from './notification-type.enum';

class NotificationAdminCtrl {
    
    constructor(notificationEventService, notificationAdminService, $uibModal, adminActionService) {
        this.notificationEventService = notificationEventService;
        this.notificationAdminService = notificationAdminService;
        this.$uibModal = $uibModal;
        this.adminActionService = adminActionService;
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
            (type) => {
                if(type === NOTF_TYPE.ACCEPT) {
                    this.adminActionService
                        .acceptVisits([this.notifications[index].id])
                        .subscribe(() => this._onSuccess(type, index));
                } else {
                    this.adminActionService
                        .rejectVisits([this.notifications[index].id], "Tymczasowy powód odrzucenia")
                        .subscribe(() => this._onSuccess(type, index));
                }  
            },
            () => {}
        );
    }

    _onSuccess(type, index) {
        this.notificationEventService.updateVisitStatusEvent({ type: type, id: this.notifications[index].id});
        this.notifications.splice(index, 1);
        this.notificationEventService.refreshNotificationCount();
    }
    
}

NotificationAdminCtrl.$inject = ['notificationEventService', 'notificationAdminService', '$uibModal', 'adminActionService'];

export const NotificationAdminComponent = {
    bindings: {
        onNotificationLoaded: "&"
    },
    template: template,
    controller: NotificationAdminCtrl
}