import '../common/notification-item.scss';
import template from './notification-admin.component.html';
import { NOTF_TYPE } from './notification-type.enum';
import { NotificationBaseCtrl } from '../common/notification-base.controller';

class NotificationAdminCtrl extends NotificationBaseCtrl {

  constructor(notificationEventService, notificationService, $uibModal, adminActionService) {
    super();
    this.notificationEventService = notificationEventService;
    this.notificationService = notificationService;
    this.$uibModal = $uibModal;
    this.adminActionService = adminActionService;
  }

  openNotificationModal(index) {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalAdminNotification',
      resolve: {
        notification: () => this.notifications[index]
      }
    });

    modalInstance.result.then(
      (type) => {
        type === NOTF_TYPE.ACCEPT
          ? this.adminActionService
              .acceptVisits([this.notifications[index].id])
              .subscribe(() => this._onSuccess({ type, index }))
          : this.openRejectVisitModal(index);
      },
      () => { }
    );
  }

  openRejectVisitModal(index) {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalRejectionVisit'
    });

    modalInstance.result.then(
      (rejectReason) => {
        this.adminActionService
          .rejectVisits([this.notifications[index].id], rejectReason)
          .subscribe(() => this._onSuccess({ type: NOTF_TYPE.CANCEL, index }, rejectReason));
      },
      () => { }
    );
  }

  _onSuccess(ntf, rejectReason) {
    this.notificationEventService.updateVisitStatusEvent({ 
      type: ntf.type, 
      id: this.notifications[ntf.index].id, 
      rejectReason 
    });
    this.notifications.splice(ntf.index, 1);
    this.notificationEventService.refreshNotificationCount();
  }

}

NotificationAdminCtrl.$inject = ['notificationEventService', 'notificationService', '$uibModal', 'adminActionService'];

export const NotificationAdminComponent = {
  bindings: {
    onNotificationLoaded: "&"
  },
  template,
  controller: NotificationAdminCtrl
}