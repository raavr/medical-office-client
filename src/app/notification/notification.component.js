import "./notification.component.scss";
import template from "./notification.component.html";

class NotificationController {
    constructor(authService, notificationAdminService, notificationUserService, notificationEventService) {
        this.authService = authService;
        this.notificationAdminService = notificationAdminService;
        this.notificationUserService = notificationUserService;
        this.notificationEventService = notificationEventService;
    }

    $onInit() {
        this.getNotificationCount();
        this.isNotificationPanelOpen = false;

        this.notificationEventSubscription = this.notificationEventService
                .refreshNotificationCountObservable
                .subscribe(() => this.getNotificationCount());
        
        this.notificationMenuHidingSubscription = this.notificationEventService
                .hideNotificationMenuSourceObservable
                .subscribe(() => {     
                    if(this.isNotificationPanelOpen) {
                        this.isNotificationPanelOpen = false;
                    }
                });
    }

    getNotificationCount() {
        const nCountObservable = this.authService.isAdmin() ?  
                                this.notificationAdminService.getAdminNotificationCount() : 
                                this.notificationUserService.getUserNotificationCount();

        nCountObservable.subscribe((count) => this.notificationsCount = count);
    }

    toggleNotificationMenu() {
         this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
         if(this.isNotificationPanelOpen) {
             this.getNotificationCount();
         }
    }

    $onDestroy() {
        this.notificationEventSubscription.unsubscribe();
        this.notificationMenuHidingSubscription.unsubscribe();
    }
}

NotificationController.$inject = ['authService', 'notificationAdminService', 'notificationUserService', 'notificationEventService'];

export const NotificationComponent = {
    template: template,
    controller: NotificationController
}