import './admin-action-panel.component.scss';
import template from "./admin-action-panel.component.html";

class AdminActionPanelController {

    constructor(adminActionService) {
        this.adminActionService = adminActionService;
    }
    
    acceptSelectedVisits() {
        this.isUpdating({isUpdating: true});
        this.adminActionService
                .acceptVisits(this.selectedVisits.map((elem) => elem.id))
                .subscribe(
                    () => {
                        console.log("Wizyty zaakceptowane");
                        this.onVisitsUpdated({status: 'accepted'});
                    },
                    (err) => { 
                        console.log(err);
                        this.isUpdating({isUpdating: false});
                    }
                );       
        
    }

    cancelSelectedVisits() {
        this.isUpdating({isUpdating: true});
        this.adminActionService
            .rejectVisits(this.selectedVisits.map((elem) => elem.id), "Powodu brak")
            .subscribe(
                () => {
                    console.log("Wizyty odrzucone");
                    this.onVisitsUpdated({status: 'canceled'});
                },
                (err) => {
                    console.log(err);
                    this.isUpdating({isUpdating: false});
                }
            );       
    }
}

AdminActionPanelController.$inject = ['adminActionService'];


export const AdminActionPanelComponent = {
    bindings: {
        selectedVisits: "<",
        onVisitsUpdated: "&",
        isUpdating: "&"
    },
    template: template,
    controller: AdminActionPanelController
}