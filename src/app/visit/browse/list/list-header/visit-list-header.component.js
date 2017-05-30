import template from "./visit-list-header.component.html";
import "./visit-list-header.component.scss";

const LIST_HEADERS = {
    "admin_past": [
        { title: "Data", class: "col-xs-2" },
        { title: "Godzina", class: "col-xs-2" },
        { title: "Pacjent", class: "col-xs-4" },
        { title: "Status", class: "col-xs-2" },
        { title: "Akcje", class: "col-xs-2" }
    ],
    "admin_current": [
        { title: "", class: "col-xs-1" },
        { title: "Data", class: "col-xs-2" },
        { title: "Godzina", class: "col-xs-2" },
        { title: "Pacjent", class: "col-xs-3" },
        { title: "Status", class: "col-xs-2" },
        { title: "Akcje", class: "col-xs-2" }
    ],
    "user_current": [
        { title: "Data", class: "col-xs-2" },
        { title: "Godzina", class: "col-xs-2" },
        { title: "Informacje dodatkowe", class: "col-xs-4" },
        { title: "Status", class: "col-xs-2" },
        { title: "Akcje", class: "col-xs-2" }
    ],
    "user_past": [
        { title: "Data", class: "col-xs-2" },
        { title: "Godzina", class: "col-xs-2" },
        { title: "Informacja zwrotna", class: "col-xs-4" },
        { title: "Status", class: "col-xs-2" },
        { title: "Koszt wizyty", class: "col-xs-2" }
    ]
};

class VisitListHeaderController {
    $onInit() {
        this.listHeaders = LIST_HEADERS[this.parent.type];
    }    
}


export const VisitListHeaderComponent = {
    require: {
        parent: "^visitList"
    },
    template: template,
    controller: VisitListHeaderController
}