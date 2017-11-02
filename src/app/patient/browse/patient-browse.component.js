import "./patient-browse.component.scss";
import template from "./patient-browse.component.html";
import { Observable } from 'rxjs/Observable';

class PatientBrowseController {

    $onInit() {
        this._getFilteredPatients();
        this.showUpdatingPanel(false);
    }

    _getFilteredPatients() {
          return Observable.from(this.patients)
                    .filter((pat) => {
                        const patString = `${pat.name} ${pat.surname} ${pat.email}`;
                        return !this.filter || patString.indexOf(this.filter) >= 0
                    })
                    .toArray()
                    .subscribe((patients) => this.filteredPatients = patients);            
    }

    onFilterChange() {
        this._getFilteredPatients();
    }

    onPatientDeleted(patientId) {
        const index = this.patients.findIndex((pat) => pat.id === patientId);
        
        if(index >= 0) {
            this.patients.splice(index, 1);
            this._getFilteredPatients();
        }

        this.showUpdatingPanel(false);
    }

    showUpdatingPanel(isUpdating) {
        this.isUpdating = isUpdating;
    } 

}

export const PatientBrowseComponent = {
    bindings: {
        patients: "<",
    },
    template: template,
    controller: PatientBrowseController
}