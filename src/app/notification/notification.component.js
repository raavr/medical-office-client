import "./notification.component.scss";
import template from "./notification.component.html";

class NotificationController {
    constructor(authService, notificationAdminService, notificationUserService) {
        this.authService = authService;
        this.notificationAdminService = notificationAdminService;
        this.notificationUserService = notificationUserService;
    }

    $onInit() {
        this.getNotificationCount();
        this.isNotificationPanelOpen = false;
    }

    getNotificationCount() {
        let nCountObservable = this.authService.isAdmin() ?  
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
}

NotificationController.$inject = ['authService', 'notificationAdminService', 'notificationUserService'];

export const NotificationComponent = {
    template: template,
    controller: NotificationController
}