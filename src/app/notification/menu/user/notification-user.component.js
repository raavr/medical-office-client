import '../common/notification-item.scss';
import template from './notification-user.component.html';
import { NotificationBaseCtrl } from '../common/notification-base.controller';

class NotificationUserCtrl extends NotificationBaseCtrl {

  constructor(notificationEventService, notificationService, notificationUserService, $uibModal) {
    super();
    this.notificationEventService = notificationEventService;
    this.notificationService = notificationService;
    this.notificationUserService = notificationUserService;
    this.$uibModal = $uibModal;
  }

  markAsRead(notification) {
    this.notificationUserService
      .markAsRead(notification.notification.id)
      .subscribe(
        () => {
          let idx = this.notifications.findIndex((notf) => notf === notification);
          this.notifications.splice(idx, 1);
          this.notificationEventService.refreshNotificationCount();
        },
        (err) => console.log(err)
      );
  }

  markAllAsRead() {
    this.notificationUserService
      .markAllAsRead()
      .subscribe(
        () => {
          this.notifications = [];
          this.notificationEventService.refreshNotificationCount();
        },
        (err) => console.log(err)
      );
  }

  openNotificationModal(index) {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalUserNotification',
      resolve: {
        notification: () => this.notifications[index]
      }
    });

    modalInstance.result.then(
      () => this.markAsRead(this.notifications[index]),
      () => { }
    );
  }


}

NotificationUserCtrl.$inject = ['notificationEventService', 'notificationService', 'notificationUserService', '$uibModal'];

export const NotificationUserComponent = {
  bindings: {
    onNotificationLoaded: "&"
  },
  template,
  controller: NotificationUserCtrl
}