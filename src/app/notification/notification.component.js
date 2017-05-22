import "./notification.component.scss";
import template from "./notification.component.html";

class NotificationController {
    constructor(authService) {
        this.authService = authService;
    }

    $onInit() {
        this.notificationsCount = 1;
    }
}

NotificationController.$inject = ['authService'];

export const NotificationComponent = {
    template: template,
    controller: NotificationController
}