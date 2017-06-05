import "./day-of-week.component.scss";
import template from "./day-of-week.component.html";

class DayOfWeekController {
    
    setSelected(checked) {
        let arr = this.visitTime.visittime;
        arr.forEach((elem) => elem.selected = checked);
    }

}

export const DayOfWeekComponent = {
    bindings: {
        visitTime: "<"
    },
    template: template,
    controller: DayOfWeekController
}