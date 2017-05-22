import '../notification.component.scss';
import template from './notification-user.component.html';

class NotificationUserCtrl {
    $onInit() {
        
        this.notifications = [
                {
                    "type": "success", 
                    "visitdate": "2016-05-24T09:30:00"
                }, 
                {
                    "type": "danger", 
                    "visitdate": "2016-05-26T09:30:00"
                }
            ];
    }
    
}

export const NotificationUserComponent = {
    template: template,
    controller: NotificationUserCtrl
}