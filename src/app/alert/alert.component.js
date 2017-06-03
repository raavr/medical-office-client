import "./alert.component.scss";
import template from "./alert.component.html";

const ALERT_TIMEOUT = 5000; //5s

class AlertController {
    constructor(alertEventService, $timeout) {
        this.alertEventService = alertEventService;
        this.$timeout = $timeout;
        this.alertData = {};
    }

    $onInit() {
        this.isAlertVisible = false;

        this.alertEventService
            .showAlertObservable
            .subscribe((data) => {
                this.alertData = data;
                
                this.isAlertVisible = true;
                this.$timeout(() => this.isAlertVisible = false, ALERT_TIMEOUT);
            })
    }

    toggleVisibility() {
         this.isAlertVisible = !this.isAlertVisible;
    }
}

AlertController.$inject = ['alertEventService', '$timeout'];

export const AlertComponent = {
    template: template,
    controller: AlertController
}