import './visit-selector.component.scss';
import template from "./visit-selector.component.html";

class VisitSelectorController {

    $onInit() {
        this.isSelected = false;
    }

    selectAll() {
        this.isSelected = !this.isSelected;
        this.onSelectBtnClicked({isSelected: this.isSelected});
    }
}


export const VisitSelectorComponent = {
    bindings: {
        onSelectBtnClicked: "&"
    },
    template: template,
    controller: VisitSelectorController
}