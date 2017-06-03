import "./alert.component.scss";
import template from "./alert.component.html";

class AlertController {
    constructor(alertEventService) {
        this.alertEventService = alertEventService;
        this.alertData = {};
    }

    $onInit() {
        this.isAlertVisible = false;

        this.alertEventService
            .showAlertObservable
            .subscribe((data) => {
                this.alertData.type = data.type,
                this.alertData.message = data.message;
                this.isAlertVisible = true;
            })
    }

    toggleVisibility() {
         this.isAlertVisible = !this.isAlertVisible;
    }
}

AlertController.$inject = ['alertEventService'];

export const AlertComponent = {
    template: template,
    controller: AlertController
}