import "./visit-manage.component.scss";
import template from "./visit-manage.component.html";

class VisitManageController {

  constructor(visitManageService, alertEventService, authService) {
    this.visitManageService = visitManageService;
    this.alertEventService = alertEventService;
    this.authService = authService;
  }

  updateWeeklyTimes() {
    this.visitManageService
      .updateWeeklyTimes(this.visitDatetimes.weeklyVisitTimes)
      .subscribe(
        (data) => this.alertEventService.showSuccessAlert(data.message),
        (err) => this.alertEventService.showDangerAlert(err.data.message)
      );
  }

  updateTimes(times) {
    this.visitDatetimes.times = times;
    this.visitManageService.updateVisitsTimes(times)
      .switchMap(
        res => this.visitManageService.getAvailableTimesAndDisabledDates(), 
        (res, visitDatetimes) => ({ 
          message: res.message, 
          weeklyVisitTimes: visitDatetimes.weeklyVisitTimes
        })
      )
      .subscribe(
        (messageAndData) => {
          this.visitDatetimes.weeklyVisitTimes = messageAndData.weeklyVisitTimes;
          this.alertEventService.showSuccessAlert(messageAndData.message);
        },
        (err) => this.alertEventService.showDangerAlert(err.data.message)
      );
  }

  updateDates(dates) {
    this.visitDatetimes.disabledDates = dates;
    this.visitManageService
      .updateDisabledDates(this.visitDatetimes.disabledDates)
      .subscribe(
        (data) => this.alertEventService.showSuccessAlert(data.message),
        (err) => this.alertEventService.showDangerAlert(err.data.message)
      );
  }

}

VisitManageController.$inject = ['visitManageService', 'alertEventService', 'authService'];

export const VisitManageComponent = {
  bindings: {
    visitDatetimes: "<"
  },
  template,
  controller: VisitManageController
}