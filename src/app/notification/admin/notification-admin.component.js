import '../notification.component.scss';
import template from './notification-admin.component.html';

class NotificationAdminCtrl {
    $onInit() {
        
        this.notifications = [
                {
                    "name": "John",
                    "surname": "Doe", 
                    "visitdate": "2017-05-24T09:30:00"
                }, 
            ];
    }
    
}

export const NotificationAdminComponent = {
    template: template,
    controller: NotificationAdminCtrl
}