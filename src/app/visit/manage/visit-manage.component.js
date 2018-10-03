import "./visit-manage.component.scss";
import template from "./visit-manage.component.html";
import { toDate_ddmmyyyy } from '../../app.helper';

class VisitManageController {

  constructor(visitManageService, alertEventService) {
    this.visitManageService = visitManageService;
    this.alertEventService = alertEventService;
  }

  changeDate(event) {
    this.visitDatetimes.disabledDates = event.dates.map((elem) => toDate_ddmmyyyy(elem));
  }

  saveChanges() {
    this.visitManageService
      .updateAvailableTimesAndDisabledDates(this.visitDatetimes)
      .subscribe(
        (data) => this.alertEventService.showSuccessAlert(data.message),
        (err) => this.alertEventService.showDangerAlert(err.data.message)
      );
  }

}

VisitManageController.$inject = ['visitManageService', 'alertEventService'];

export const VisitManageComponent = {
  bindings: {
    visitDatetimes: "<"
  },
  template,
  controller: VisitManageController
}