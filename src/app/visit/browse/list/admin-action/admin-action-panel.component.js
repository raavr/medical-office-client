import './admin-action-panel.component.scss';
import template from "./admin-action-panel.component.html";
import { VISIT_STATUS } from '../../../common/visit-status.constant';

class AdminActionPanelController {

  constructor(adminActionService, notificationEventService, alertEventService, $uibModal) {
    this.adminActionService = adminActionService;
    this.notificationEventService = notificationEventService;
    this.alertEventService = alertEventService;
    this.$uibModal = $uibModal;
  }

  $onInit() {
    this.notificationEventSubscription =
      this.notificationEventService
        .updateVisitStatus$
        .subscribe((ntf) => this._onSuccess(ntf));
  }

  acceptSelectedVisits(id = -1) {
    this.isUpdating({ isUpdating: true });
    this.adminActionService
      .acceptVisits(this.selectedVisits.map((elem) => elem.id))
      .subscribe(
        () => {
          this._onSuccess({ status: VISIT_STATUS.ACCEPTED, id });
        },
        (err) => {
          console.log(err);
          this.isUpdating({ isUpdating: false });
        }
      );

  }

  _onSuccess(ntf) {
    this.alertEventService.showSuccessAlert(
      ntf.status === VISIT_STATUS.ACCEPTED 
        ? 'Wizyty zostały zaakceptowane.' 
        : 'Wizyty zostały odrzucone.'
    );
    this.onVisitsUpdated({ visit: ntf });
    this.notificationEventService.refreshNotificationCount();
  }

  openRejectModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalRejectionVisit'
    });

    modalInstance.result.then(
      (rejectReason) => {
        this._cancelSelectedVisits(rejectReason);
      },
      () => { }
    );
  }

  _cancelSelectedVisits(rejectReason, id = -1) {
    this.isUpdating({ isUpdating: true });
    this.adminActionService
      .rejectVisits(this.selectedVisits.map((elem) => elem.id), rejectReason)
      .subscribe(
        () => {
          this._onSuccess({ status: VISIT_STATUS.CANCELED, id, rejectReason });
        },
        (err) => {
          console.log(err);
          this.isUpdating({ isUpdating: false });
        }
      );
  }

  $onDestroy() {
    this.notificationEventSubscription.unsubscribe();
  }
}

AdminActionPanelController.$inject = ['adminActionService', 'notificationEventService', 'alertEventService', '$uibModal'];


export const AdminActionPanelComponent = {
  bindings: {
    selectedVisits: "<",
    onVisitsUpdated: "&",
    isUpdating: "&"
  },
  template,
  controller: AdminActionPanelController
}