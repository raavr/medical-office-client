import "./patient-create.component.scss";
import template from "./patient-create.component.html";
import { Observable } from 'rxjs/Observable';

class PatientCreateController {
  constructor(patientCreateService, alertEventService, $state) {
    this.patientCreateService = patientCreateService;
    this.alertEventService = alertEventService;
    this.$state = $state;
  }

  $onInit() {
    this.patient = {};
  }

  createPatient() {
    this.patientCreateService
      .createPatient(this.patient)
      .subscribe(
        (data) => {
          this.alertEventService.showSuccessAlert(data.message);
          this.$state.go("patient-browse");
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
        }
      );
  }

}

PatientCreateController.$inject = ['patientCreateService', 'alertEventService', '$state'];

export const PatientCreateComponent = {
  template,
  controller: PatientCreateController
}