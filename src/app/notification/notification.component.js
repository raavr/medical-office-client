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
                .refreshNotificationCountObservable
                .subscribe(() => this.getNotificationsCount());
        
        this.notificationMenuHidingSubscription = 
            this.notificationEventService
                .hideNotificationMenuSourceObservable
                .filter(() => this.isNotificationPanelOpen)
                .subscribe(() => this.isNotificationPanelOpen = false);
    }

    getNotificationsCount() {
        const nCountObservable = this.notificationService
            .getNotificationsCount()
            .subscribe((count) => this.notificationsCount = count);
    }

    toggleNotificationMenu() {
        this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
        if(this.isNotificationPanelOpen) {
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
    template: template,
    controller: NotificationController
}