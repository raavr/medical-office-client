import template from "./visit-filter.component.html";

class VisitFilterController {
    constructor() {
        this.filter = {
            type: "all"
        };
    }
}


export const VisitFilterComponent = {
    bindings: {
        onFilterChange: "&"
    },
    require: {
        parent: "^visitList"
    },
    template: template,
    controller: VisitFilterController
}