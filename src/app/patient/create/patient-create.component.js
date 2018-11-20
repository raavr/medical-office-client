import "./patient-create.component.scss";
import template from "./patient-create.component.html";

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
          this.close();
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
          this.close();
        }
      );
  }

}

PatientCreateController.$inject = ['patientCreateService', 'alertEventService', '$state'];

export const PatientCreateComponent = {
  bindings: {
    close: "&",
    dismiss: "&"
  },
  template,
  controller: PatientCreateController
}