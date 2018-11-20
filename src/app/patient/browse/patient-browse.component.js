import "./patient-browse.component.scss";
import template from "./patient-browse.component.html";
import { Observable } from 'rxjs/Observable';

class PatientBrowseController {

  constructor(authService, $uibModal, patientBrowseService) {
    this.authService = authService;
    this.$uibModal = $uibModal;
    this.patientBrowseService = patientBrowseService;
  }

  $onInit() {
    this.onFilterChange();
    this.showUpdatingPanel(false);
  }

  _getFilteredPatients(patients) {
    return Observable.from(patients || this.patients)
      .filter((pat) => {
        const patString = `${pat.name} ${pat.surname} ${pat.email}`;
        return !this.filter || patString.indexOf(this.filter) >= 0
      })
      .toArray();
  }

  onFilterChange() {
    this._getFilteredPatients()
      .subscribe((patients) => this.filteredPatients = patients);
  }

  onPatientDeleted(patientId) {
    const index = this.patients.findIndex((pat) => pat.id === patientId);

    if (index >= 0) {
      this.patients.splice(index, 1);
      this.onFilterChange();
    }

    this.showUpdatingPanel(false);
  }

  showUpdatingPanel(isUpdating) {
    this.isUpdating = isUpdating;
  }

  openPatientModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'patientCreate'
    });

    modalInstance.result
      .then(() => this.patientBrowseService
        .getPatients()
        .switchMap(
          (patients) => this._getFilteredPatients(patients), 
          (patients, filteredPatients) => ({patients, filteredPatients})
        )
        .subscribe((allPatients) => {
          this.patients = allPatients.patients;
          this.filteredPatients = allPatients.filteredPatients;
        })
      )
      .catch(() => {});
  }
}

PatientBrowseController.$inject = ['authService', '$uibModal', 'patientBrowseService'];

export const PatientBrowseComponent = {
  bindings: {
    patients: "<",
  },
  template,
  controller: PatientBrowseController
}