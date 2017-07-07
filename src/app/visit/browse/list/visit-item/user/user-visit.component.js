import "./user-visit.component.scss";
import template from "./user-visit.component.html";

class UserVisitController {
    constructor(visitBrowseService, $window, alertEventService) {
        this.visitBrowseService = visitBrowseService;
        this.$window = $window;
        this.alertEventService = alertEventService;
    }

    cancelVisit() {
        let confirmed = this.$window.confirm('Czy na pewno chcesz wypisać się z wizyty?');

        if(confirmed) {
            this.isUpdating({isUpdating: true});
            this.visitBrowseService
                .cancelVisit(this.visit.id)
                .subscribe(
                    () => {
                        this.alertEventService.showSuccessAlert('Wizyta została anulowna.'); 
                        this.onVisitCanceled({visitId: this.visit.id});       
                    },
                    (err) => { 
                        this.alertEventService.showDangerAlert(err.data.message);  
                        this.isUpdating({isUpdating: false});
                    }
                );
        }
    }
}

UserVisitController.$inject = ['visitBrowseService', '$window', 'alertEventService']

export const UserVisitComponent = {
    bindings: {
        visit: "<",
        isEven: "<",
        onVisitCanceled: "&",
        isUpdating: "&"
    },
    require: {
        parent: "^visitList"
    },
    template: template,
    controller: UserVisitController
}