import "./alert.component.scss";
import template from "./alert.component.html";

class AlertController {
    constructor(alertEventService) {
        this.alertEventService = alertEventService;
        this.alertData = {};
    }

    $onInit() {
        this.isAlertVisisble = false;

        this.alertEventService
            .showAlertObservable
            .subscribe((data) => {
                this.alertData.type = data.type,
                this.alertData.message = data.message;
                this.isAlertVisisble = true;
            })
    }

    toggleVisibility() {
         this.isAlertVisisble = !this.isAlertVisisble;
    }
}

AlertController.$inject = ['alertEventService'];

export const AlertComponent = {
    template: template,
    controller: AlertController
}