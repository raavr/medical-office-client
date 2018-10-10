import '../common/notification-item.scss';
import template from './notification-doctor.component.html';
import { NotificationBaseCtrl } from '../common/notification-base.controller';
import { VISIT_STATUS } from '../../../visit/common/visit-status.constant';

class NotificationDoctorCtrl extends NotificationBaseCtrl {

  constructor(notificationEventService, notificationService, $uibModal, doctorActionService) {
    super();
    this.notificationEventService = notificationEventService;
    this.notificationService = notificationService;
    this.$uibModal = $uibModal;
    this.doctorActionService = doctorActionService;
  }

  openNotificationModal(index) {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalDoctorNotification',
      resolve: {
        notification: () => this.notifications[index]
      }
    });

    modalInstance.result.then(
      (status) => {
        status === VISIT_STATUS.ACCEPTED
          ? this.doctorActionService
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
        this.doctorActionService
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
  }

}

NotificationDoctorCtrl.$inject = ['notificationEventService', 'notificationService', '$uibModal', 'doctorActionService'];

export const NotificationDoctorComponent = {
  bindings: {
    onNotificationLoaded: "&"
  },
  template,
  controller: NotificationDoctorCtrl
}