import template from './modal-doctor-notification.component.html';
import { VISIT_STATUS } from '../../visit/common/visit-status.constant';

class ModalDoctorNotificationCtrl {

  $onInit() {
    this.ntf = this.resolve.notification;
  }

  reject() {
    this.close({ $value: VISIT_STATUS.CANCELED });
  }

  accept() {
    this.close({ $value: VISIT_STATUS.ACCEPTED });
  }

  cancel() {
    this.dismiss();
  }
}

export const ModalDoctorNotificationComponent = {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template,
  controller: ModalDoctorNotificationCtrl
}