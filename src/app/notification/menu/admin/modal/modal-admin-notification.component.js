import template from './modal-admin-notification.component.html';
import { NOTF_TYPE } from  '../notification-type.enum';

class ModalAdminNotificationCtrl {

    $onInit() {
        this.ntf = this.resolve.notification;
    }

    reject() {
        this.close({$value: NOTF_TYPE.CANCEL});
    }

    accept() {
        this.close({$value: NOTF_TYPE.ACCEPT});
    }

    cancel() {
        this.dismiss();
    }
}

export const ModalAdminNotificationComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template: template,
    controller: ModalAdminNotificationCtrl
}