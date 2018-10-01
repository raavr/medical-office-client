import "./user-visit.component.scss";
import template from "./user-visit.component.html";

class UserVisitController {
    constructor(visitBrowseService, $window, alertEventService, $uibModal) {
        this.visitBrowseService = visitBrowseService;
        this.$window = $window;
        this.alertEventService = alertEventService;
        this.$uibModal = $uibModal;
    }

    cancelVisit() {
        const confirmed = this.$window.confirm('Czy na pewno chcesz wypisać się z wizyty?');

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

    showMore() {
        const modalInstance = this.$uibModal.open({
            animation: true,
            component: 'modalVisitMoreInfo',
            resolve: {
                visit: () => this.visit
            }  
        });

        modalInstance.result.catch(() => {});    
    }
}

UserVisitController.$inject = ['visitBrowseService', '$window', 'alertEventService', '$uibModal']

export const UserVisitComponent = {
    bindings: {
        visit: "<",
        type: "<",
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