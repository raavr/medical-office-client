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
                () => this.alertEventService.showSuccessAlert("Zmiany zostały wprowadzone."),
                () => this.alertEventService.showDangerAlert("Wystąpił błąd. Zmiany nie zostały wprowadzone.")
            );
    }

}

VisitManageController.$inject = ['visitManageService', 'alertEventService'];

export const VisitManageComponent = {
    bindings: {
        visitDatetimes: "<"
    },
    template: template,
    controller: VisitManageController
}