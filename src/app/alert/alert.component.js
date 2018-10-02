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
    let timeoutPromise = null;
    this.isAlertVisible = false;

    this.alertEventService
      .showAlert$
      .subscribe((data) => {
        this.$timeout.cancel(timeoutPromise);
        this.alertData = data;
        this.isAlertVisible = true;

        timeoutPromise = this.$timeout(
          () => this.isAlertVisible = false, 
          ALERT_TIMEOUT
        );
      })
  }

  toggleVisibility() {
    this.isAlertVisible = !this.isAlertVisible;
  }
}

AlertController.$inject = ['alertEventService', '$timeout'];

export const AlertComponent = {
  template,
  controller: AlertController
}