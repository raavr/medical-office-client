import "./patient-item.component.scss";
import template from "./patient-item.component.html";

class PatientItemController {
  constructor(patientItemService, $window, alertEventService) {
    this.patientItemService = patientItemService;
    this.$window = $window;
    this.alertEventService = alertEventService;
  }

  deletePatient() {
    const confirmed = this.$window.confirm('Czy na pewno chcesz usunąć konto pacjenta?');

    if (confirmed) {
      this.isUpdating({ isUpdating: true });
      this.patientItemService
        .deletePatient(this.patient.id)
        .subscribe(
          (data) => {
            this.alertEventService.showSuccessAlert(data.message);
            this.onPatientDeleted({ patientId: this.patient.id });
          },
          (err) => {
            this.alertEventService.showDangerAlert(err.data.message);
            this.isUpdating({ isUpdating: false });
          }
        );
    }
  }
}


PatientItemController.$inject = ['patientItemService', '$window', 'alertEventService'];

export const PatientItemComponent = {
  bindings: {
    patient: "<",
    isEven: "<",
    onPatientDeleted: "&",
    isUpdating: "&"
  },
  template,
  controller: PatientItemController
}