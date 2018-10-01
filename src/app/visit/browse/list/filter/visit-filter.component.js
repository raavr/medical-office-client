import './visit-filter.component.scss';
import template from "./visit-filter.component.html";

class VisitFilterController {
    constructor(authService) {
        this.authService = authService;
        this.filter = {
            status: "all"
        };
    }
}

VisitFilterController.$inject = ['authService'];


export const VisitFilterComponent = {
    bindings: {
        onFilterChange: "&",
        type: "<"
    },
    template: template,
    controller: VisitFilterController
}