import "./admin-visit.component.scss";
import template from "./admin-visit.component.html";

class AdminVisitController {
    constructor($uibModal) {
        this.$uibModal = $uibModal;
    }

    toggleSelection() {
        this.onChange({ 
            visitId : this.visit.id
        });
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

AdminVisitController.$inject = ['$uibModal'];


export const AdminVisitComponent = {
    bindings: {
        visit: "<",
        isEven: "<",
        onChange: "&"
    },
    require: {
        parent: "^visitList"
    },
    template: template,
    controller: AdminVisitController
}