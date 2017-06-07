import "./patient-item.component.scss";
import template from "./patient-item.component.html";

class PatientItemController {
    constructor(patientItemService, $window, alertEventService) {
        this.patientItemService = patientItemService;
        this.$window = $window;
        this.alertEventService = alertEventService;
    }

    deletePatient() {
        let confirmed = this.$window.confirm('Czy na pewno chcesz usunąć konto pacjenta?');

        if(confirmed) {
            this.isUpdating({isUpdating: true});
            this.patientItemService
                .deletePatient(this.patient.id)
                .subscribe(
                    () => {
                        this.alertEventService.showSuccessAlert('Konto pacjenta zostało poprawnie usunięte.'); 
                        this.onPatientDeleted({patientId: this.patient.id});       
                    },
                    (err) => { 
                        this.alertEventService.showDangerAlert('Coś poszło nie tak. Konto pacjenta nie zostało usunięte.');  
                        this.isUpdating({isUpdating: false});
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
    template: template,
    controller: PatientItemController
}