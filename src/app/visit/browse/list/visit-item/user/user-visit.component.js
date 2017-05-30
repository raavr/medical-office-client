import "./user-visit.component.scss";
import template from "./user-visit.component.html";

class UserVisitController {
    constructor(visitBrowseService, $window) {
        this.visitBrowseService = visitBrowseService;
        this.$window = $window;
    }

    cancelVisit() {
        let confirmed = this.$window.confirm('Czy na pewno chcesz wypisać się z wizyty?');

        if(confirmed) {
            this.isUpdating({isUpdating: true});
            this.visitBrowseService
                .cancelVisit(this.visit.id)
                .subscribe(
                    () => { 
                        console.log("Wizyta została anulowna");
                        this.onVisitCanceled({visitId: this.visit.id});       
                    },
                    (err) => { 
                        console.log(err); 
                        this.isUpdating({isUpdating: false});
                    }
                );
        }
    }
}

UserVisitController.$inject = ['visitBrowseService', '$window']

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