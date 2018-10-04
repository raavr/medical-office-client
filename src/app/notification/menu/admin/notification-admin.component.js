import '../common/notification-item.scss';
import template from './notification-admin.component.html';
import { NotificationBaseCtrl } from '../common/notification-base.controller';
import { VISIT_STATUS } from '../../../visit/common/visit-status.constant';

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
      (status) => {
        status === VISIT_STATUS.ACCEPTED
          ? this.adminActionService
              .acceptVisits([this.notifications[index].id])
              .subscribe(() => this._onSuccess({ status, index }))
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
          .subscribe(() => this._onSuccess({ status: VISIT_STATUS.CANCELED, index }, rejectReason));
      },
      () => { }
    );
  }

  _onSuccess(ntf, rejectReason) {
    this.notificationEventService.updateVisitStatusEvent({ 
      status: ntf.status, 
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