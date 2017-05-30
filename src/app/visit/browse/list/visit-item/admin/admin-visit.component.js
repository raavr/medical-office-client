import "./admin-visit.component.scss";
import template from "./admin-visit.component.html";

class AdminVisitController {
    toggleSelection() {
        this.onChange({ 
            visitId : this.visit.id
        });
    }
}


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