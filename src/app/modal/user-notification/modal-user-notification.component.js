import template from './modal-user-notification.component.html';

class ModalUserNotificationCtrl {

  $onInit() {
    this.ntf = this.resolve.notification;
  }

  ok() {
    this.dismiss();
  }

  markAsRead() {
    this.close();
  }
}

export const ModalUserNotificationComponent = {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template,
  controller: ModalUserNotificationCtrl
}